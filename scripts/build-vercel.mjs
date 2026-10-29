import { mkdir, cp, readdir, readFile, writeFile, lstat, rm, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readServiceKey } from '../lib/busan-tourism.mjs';
const root = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const output = path.resolve(root, 'public');
if (output !== path.join(root, 'public') || !output.startsWith(root + path.sep)) throw new Error('UNSAFE_OUTPUT');
const exists = await lstat(output).catch(() => null);
if (exists) {
  if (exists.isSymbolicLink() || !exists.isDirectory() || await realpath(output) !== output) throw new Error('UNSAFE_OUTPUT');
  if (await readFile(path.join(output, '.portfolio-build'), 'utf8').catch(() => '') !== 'generated') throw new Error('OUTPUT_NOT_OWNED');
  await rm(output, { recursive: true });
}
await mkdir(output);
await writeFile(path.join(output, '.portfolio-build'), 'generated');
const extensions = new Set(['.html','.css','.js','.json','.png','.jpg','.jpeg','.webp','.svg','.gif','.ico','.woff','.woff2','.ttf','.mp4','.webm','.mp3','.pdf']);
async function copyFilter(source) {
  const info = await lstat(source);
  if (info.isSymbolicLink() || path.basename(source).startsWith('.')) return false;
  return info.isDirectory() || extensions.has(path.extname(source).toLowerCase());
}
for (const directory of ['assets', 'css', 'js', 'routemate-demo']) await cp(path.join(root, directory), path.join(output, directory), { recursive: true, filter: copyFilter });
for (const name of await readdir(root)) {
  if (!name.endsWith('.html') || !(await lstat(path.join(root, name))).isFile()) continue;
  let html = await readFile(path.join(root, name), 'utf8');
  if (name === 'report.html') html = html.replace('id="busan-tourism"', 'id="busan-tourism" data-tourism-api="/api/busan-tourism"');
  await writeFile(path.join(output, name), html);
}
// Fail closed if an actual configured secret has leaked into a copied public asset.
let secret = process.env.BUSAN_TOURISM_API_KEY;
if (!secret) { try { secret = readServiceKey(await readFile(path.join(root, '.env'), 'utf8')); } catch { /* Optional for static builds. */ } }
if (secret) {
  const variants = [...new Set([secret, encodeURIComponent(secret), (() => {try {return decodeURIComponent(secret)} catch {return secret}})()])].filter(Boolean).map(value => Buffer.from(value));
  async function check(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await check(target);
      else { const bytes = await readFile(target); if (variants.some(value => bytes.includes(value))) throw new Error('PUBLICATION_BLOCKED'); }
    }
  }
  await check(output);
}
console.log('Vercel static output ready. Only allowlisted public assets copied; no credentials exported.');
