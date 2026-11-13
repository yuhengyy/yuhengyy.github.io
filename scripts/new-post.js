import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [slug, ...args] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || (args.length && (args.length !== 2 || args[0] !== '--title'))) {
  console.error('用法：pnpm new-post my-first-post --title "文章标题"（slug 仅用英文小写、数字和短横线）');
  process.exit(1);
}
const title = args[1] || slug;
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
await mkdir('src/content/posts', { recursive: true });
const target = resolve('src/content/posts', `${slug}.md`);
try {
  await writeFile(target, `---\ntitle: ${JSON.stringify(title)}\npublished: ${date}\ndescription: ""\nimage: ""\ntags: []\ncategory: ""\ndraft: true\n---\n\n从这里开始记录。\n`, { encoding: 'utf8', flag: 'wx' });
  console.log(`已创建草稿：${target}\n填写摘要和分类，完成后将 draft 改为 false。`);
} catch (error) {
  if (error.code === 'EEXIST') { console.error(`文章已存在，未覆盖：${target}`); process.exit(1); }
  throw error;
}
