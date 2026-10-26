import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const flow = JSON.parse(await readFile(new URL('assets/data/chatbot-flow.json', root), 'utf8'));
const inquiry = JSON.parse(await readFile(new URL('assets/data/inquiry-config.json', root), 'utf8'));
if (!flow.nodes[flow.start] || !flow.nodes[flow.fallback]) throw new Error('Invalid start/fallback');
for (const [id, node] of Object.entries(flow.nodes)) {
  if (!node.title || !node.answer || !Array.isArray(node.keywords) || !Array.isArray(node.buttons)) throw new Error(`Invalid node: ${id}`);
  if (node.form && !inquiry.categories[node.form]) throw new Error(`Unknown form: ${id}`);
  for (const button of node.buttons) {
    if (!button.label || Boolean(button.next) === Boolean(button.href)) throw new Error(`Invalid button: ${id}`);
    if (button.next && !flow.nodes[button.next]) throw new Error(`Unknown branch: ${button.next}`);
    if (button.href && !/^[a-z][a-z0-9-]*\.html(?:#[a-z0-9-]+)?$/.test(button.href)) throw new Error(`Unsafe link: ${button.href}`);
  }
}
if (inquiry.publishableKey && !inquiry.publishableKey.startsWith('sb_publishable_')) throw new Error('Only a public Supabase publishable key is allowed');
if (inquiry.enabled && (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(inquiry.supabaseUrl) || !/^[a-z_][a-z0-9_]*$/.test(inquiry.table) || !inquiry.publishableKey || !inquiry.retention || !inquiry.privacyVersion || !inquiry.privacyContact)) throw new Error('Incomplete inquiry settings');
const safe = value => JSON.stringify(value, null, 2).replaceAll('<', '\\u003c').replaceAll('\u2028', '\\u2028').replaceAll('\u2029', '\\u2029');
const target = new URL('js/chatbot-data.js', root);
await writeFile(target, `// Generated from assets/data/*.json. Run node scripts/build-chatbot-data.mjs after editing.\nwindow.RAON_CHATBOT_DATA = ${safe(flow)};\nwindow.RAON_INQUIRY_CONFIG = ${safe(inquiry)};\n`);
console.log(`Validated ${Object.keys(flow.nodes).length} conversation nodes; generated ${fileURLToPath(target)}`);
