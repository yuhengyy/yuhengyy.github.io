import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve('dist');
const origin = 'https://yuhengyy.github.io';
const routes = JSON.parse(await readFile('maintenance/legacy-routes.json', 'utf8'));
const migration = JSON.parse(await readFile('maintenance/content-map.json', 'utf8'));
const failures = [];
async function filesIn(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(files.map((file) => file.isDirectory() ? filesIn(resolve(dir, file.name)) : resolve(dir, file.name)))).flat();
}
const files = await filesIn(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const pages = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await readFile(file, 'utf8')])));
const decode = (text) => text.replace(/&amp;/g, '&');
async function resolveUrl(input, base) {
  if (/^(?:data:|mailto:|tel:|javascript:)/i.test(input)) return null;
  const target = new URL(decode(input), base);
  if (target.origin !== origin) return null;
  const path = resolve(root, '.' + decodeURIComponent(target.pathname));
  if (path !== root && !path.startsWith(root + sep)) throw new Error('Path outside build');
  try {
    const info = await stat(path);
    return { path: info.isDirectory() ? resolve(path, 'index.html') : path, hash: decodeURIComponent(target.hash.slice(1)) };
  } catch { return { path, hash: '' }; }
}
for (const [file, html] of pages) {
  const route = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  const base = new URL(route, origin);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const input = match[1];
    try {
      const target = await resolveUrl(input, base);
      if (!target) continue;
      await stat(target.path);
      if (target.hash && pages.has(target.path)) {
        const destination = pages.get(target.path);
        if (!destination.includes(`id="${target.hash}"`) && !destination.includes(`id='${target.hash}'`)) {
          failures.push(`${route}: missing anchor ${input}`);
        }
      }
    } catch { failures.push(`${route}: missing local link/asset ${input}`); }
  }
}
for (const post of migration.posts) {
  const html = pages.get(resolve(root, 'posts', post.slug, 'index.html'));
  if (!html || !html.includes('data-pagefind-body') || !html.includes('整理于')) failures.push(`Migrated article missing: ${post.slug}`);
}
for (const [route, entry] of Object.entries(routes)) {
  const html = pages.get(resolve(root, '.' + route, 'index.html'));
  if (!html) failures.push(`Legacy URL missing: ${route}`);
  else if (entry.type === 'retired' && !html.includes('noindex,follow')) failures.push(`Legacy notice indexable: ${route}`);
  else if (entry.type === 'redirect' && !html.includes('http-equiv="refresh"')) failures.push(`Legacy redirect missing: ${route}`);
}
const rss = await readFile(resolve(root, 'rss.xml'), 'utf8');
for (const post of migration.posts) if (!rss.includes(`/posts/${post.slug}/`)) failures.push(`RSS missing: ${post.slug}`);
const sitemap = (await Promise.all(files.filter((file) => /sitemap.*\.xml$/.test(file)).map((file) => readFile(file, 'utf8')))).join('');
for (const route of Object.keys(routes)) if (decodeURIComponent(sitemap).includes(`${origin}${route}</loc>`)) failures.push(`Legacy URL in sitemap: ${route}`);
for (const target of ['.nojekyll', '404.html', 'pagefind/pagefind.js', 'brand/landscape.svg', 'brand/avatar.svg']) {
  try { await stat(resolve(root, target)); } catch { failures.push(`Build artifact missing: ${target}`); }
}
if (failures.length) { console.error([...new Set(failures)].join('\n')); process.exit(1); }
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
await writeFile(resolve(root, 'build-info.json'), JSON.stringify({ sourceCommit, builtAt: new Date().toISOString(), framework: 'Fuwari / Astro' }, null, 2) + '\n');
console.log(`Verified ${htmlFiles.length} HTML pages, local links/assets, ${migration.posts.length} migrated articles, ${Object.keys(routes).length} legacy URLs, RSS and sitemap.`);
