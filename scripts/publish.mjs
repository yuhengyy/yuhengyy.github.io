import { execFileSync, spawnSync } from 'node:child_process';
import { readFile, mkdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';

const repo = resolve('.');
const git = (args, env = {}) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', env: { ...process.env, ...env } }).trim();
const expectedRemote = 'https://github.com/yuhengyy/yuhengyy.github.io.git';
if (git(['remote', 'get-url', 'origin']) !== expectedRemote) throw new Error('远端与本站配置不一致，停止发布。');
if (git(['branch', '--show-current']) !== 'main') throw new Error('请在 main 分支发布。');
if (git(['status', '--porcelain'])) throw new Error('源文件尚未全部提交。请先审核并提交本次改动，再发布。');
const sourceCommit = git(['rev-parse', 'HEAD']);
console.log(`源提交：${sourceCommit}\n目的地：https://yuhengyy.github.io/（origin/gh-pages）`);
if (!process.argv.includes('--yes')) {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await prompt.question('构建并推送 main 与 gh-pages？输入 publish 确认：');
  prompt.close();
  if (answer.trim() !== 'publish') process.exit(0);
}
const build = process.env.npm_execpath
  ? spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'build'], { cwd: repo, stdio: 'inherit' })
  : spawnSync(process.platform === 'win32' ? 'cmd.exe' : 'sh', process.platform === 'win32' ? ['/d', '/s', '/c', 'npx --yes pnpm@9.14.4 run build'] : ['-c', 'npx --yes pnpm@9.14.4 run build'], { cwd: repo, stdio: 'inherit' });
if (build.status !== 0) throw new Error('构建或检查失败，未推送。');
if (git(['status', '--porcelain']) || git(['rev-parse', 'HEAD']) !== sourceCommit) throw new Error('构建期间源码变化，未推送。');
const info = JSON.parse(await readFile('dist/build-info.json', 'utf8'));
if (info.sourceCommit !== sourceCommit) throw new Error('构建与源码版本不一致。');
git(['fetch', 'origin', 'main', 'gh-pages']);
git(['merge-base', '--is-ancestor', 'origin/main', 'HEAD']);
const parent = git(['rev-parse', 'origin/gh-pages']);
await mkdir('.local/deploy', { recursive: true });
const index = resolve('.local/deploy', `index-${process.pid}-${Date.now()}`);
const env = {
  GIT_DIR: git(['rev-parse', '--absolute-git-dir']), GIT_WORK_TREE: resolve('dist'), GIT_INDEX_FILE: index,
  GIT_AUTHOR_NAME: 'yhyy', GIT_AUTHOR_EMAIL: 'zhoujiayuan233@gmail.com',
  GIT_COMMITTER_NAME: 'yhyy', GIT_COMMITTER_EMAIL: 'zhoujiayuan233@gmail.com',
};
try {
  git(['read-tree', '--empty'], env);
  git(['--work-tree=' + resolve('dist'), 'add', '--all', '--', resolve('dist')], env);
  const tree = git(['write-tree'], env);
  if (!git(['ls-tree', '--name-only', tree]).split('\n').includes('index.html')) throw new Error('发布树缺少首页，未推送。');
  const commit = git(['commit-tree', tree, '-p', parent, '-m', `发布 Fuwari 博客（源码 ${sourceCommit.slice(0, 8)}）`], env);
  git(['push', 'origin', 'main']);
  git(['push', 'origin', `${commit}:refs/heads/gh-pages`]);
  console.log(`已推送：${commit}\n等待 GitHub Pages 部署完成后访问 https://yuhengyy.github.io/`);
} finally {
  await unlink(index).catch((error) => { if (error.code !== 'ENOENT') throw error; });
}
