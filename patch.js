'use strict';
const fs = require('fs')
const path = require('path')
const url = require('url')
const targetFiles = [
   path.join(
      __dirname,
      'node_modules/@zapo-js/native/dist/esm/transport/node/builders/message.js'
   ),
   path.join(
      __dirname,
      'node_modules/@zapo-js/native/dist/transport/node/builders/message.js'
   )
];
const MARKER = '/* OVERRIDE_CUSTOM_NODES_PATCH */';
const regex =
   /if\s*\(\s*input\.customNodes\s*\)\s*\{\s*for\s*\(\s*const\s+node\s+of\s+input\.customNodes\s*\)\s*\{\s*content\.push\(\s*node\s*\);\s*\}\s*\}/;
const patchReplacement = `${MARKER}
    if (input.customNodes) {
        for (const node of input.customNodes) {
            if (!node || !node.tag) continue;

            const existingIndex = content.findIndex(
                item => item && item.tag === node.tag
            );

            if (existingIndex !== -1) {
                content[existingIndex] = node;
            } else {
                content.push(node);
            }
        }
    }`;
let patchedCount = 0;
let skippedCount = 0;
let missingCount = 0;
let failedCount = 0;
const results = [];
for (const file of targetFiles) {
   const relativePath = path.relative(__dirname, file);
   if (!fs.existsSync(file)) {
      missingCount++;
      results.push(`⏭️ Gak ketemu: ${relativePath}`);
      continue;
   }
   let content = fs.readFileSync(file, 'utf8');
   if (content.includes(MARKER)) {
      skippedCount++;
      results.push(`ℹ️ Udah ter-patch: ${relativePath}`);
      continue;
   }
   if (!regex.test(content)) {
      failedCount++;
      results.push(`⚠️ Pattern gak match: ${relativePath}`);
      continue;
   }
   content = content.replace(regex, patchReplacement);
   fs.writeFileSync(file, content, 'utf8');
   patchedCount++;
   results.push(`✅ Berhasil patch: ${relativePath}`);
}
console.log(`
══════════════════════════════════════
        ZAPO-JS CUSTOM NODES PATCH
══════════════════════════════════════
`);
console.log(results.join('\n'));
console.log(`
══════════════════════════════════════
Total:
  ${patchedCount} patched
  ${skippedCount} sudah ter-patch
  ${missingCount} tidak ditemukan
  ${failedCount} gagal match
══════════════════════════════════════
`);
const albumTargets = [
   ...['dist', 'dist/esm'].flatMap((base) => [
      path.join(
         __dirname,
         `node_modules/@zapo-js/native/${base}/protocol/message.js`
      ),
      path.join(
         __dirname,
         `node_modules/@zapo-js/native/${base}/message/encode/content.js`
      )
   ])
];
const ALBUM_MARKER = '/* OVERRIDE_ALBUM_COLLECTION_PATCH */';
const albumResults = [];
let albumPatched = 0;
let albumSkipped = 0;
for (const file of albumTargets) {
   const relativePath = path.relative(__dirname, file);
   if (!fs.existsSync(file)) {
      albumResults.push(`⏭️ Gak ketemu: ${relativePath}`);
      continue;
   }
   let content = fs.readFileSync(file, 'utf8');
   if (content.includes(ALBUM_MARKER)) {
      albumSkipped++;
      albumResults.push(`ℹ️ Udah ter-patch: ${relativePath}`);
      continue;
   }
   const isEsm = file.includes('/esm/');
   const nsPrefix = isEsm ? '' : 'constants_1.';
   if (file.endsWith('protocol/message.js')) {
      const oldConstant = "GROUP_HISTORY: 'group_history'\n})";
      const newConstant = `GROUP_HISTORY: 'group_history',
    ${ALBUM_MARKER}
    COLLECTION: 'collection'
})`;
      if (!content.includes(oldConstant)) {
         albumResults.push(`⚠️ Pattern konstanta gak match: ${relativePath}`);
         continue;
      }
      content = content.replace(oldConstant, newConstant);
   } else {
      const indent = isEsm ? '    ' : '    ';
      const oldResolver = `${indent}if (msg.messageHistoryBundle)\n${indent}    return ${nsPrefix}WA_ENC_MEDIA_TYPES.GROUP_HISTORY;`;
      const newResolver =
         `${indent}${ALBUM_MARKER}\n` +
         `${indent}if (msg.albumMessage)\n${indent}    return ${nsPrefix}WA_ENC_MEDIA_TYPES.COLLECTION;\n` +
         oldResolver;
      if (!content.includes(oldResolver)) {
         albumResults.push(`⚠️ Pattern resolver gak match: ${relativePath}`);
         continue;
      }
      content = content.replace(oldResolver, newResolver);
   }
   fs.writeFileSync(file, content, 'utf8');
   albumPatched++;
   albumResults.push(`✅ Berhasil patch: ${relativePath}`);
}
const { execSync } = require('child_process');
execSync('npm i agent-base@7.0.0 --no-bin-links')
const pkg = require('./package.json')
delete pkg.dependencies['agent-base']
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))
fs.rmSync('node_modules/http-cookie-agent/node_modules', { force: true, recursive: true })
console.log(`
══════════════════════════════════════
      Fix Support Node Version 20+
══════════════════════════════════════
`)
console.log(`
══════════════════════════════════════
      ZAPO-JS ALBUM COLLECTION PATCH
══════════════════════════════════════
`);
console.log(albumResults.join('\n'));
console.log(`
══════════════════════════════════════
Total:
  ${albumPatched} patched
  ${albumSkipped} sudah ter-patch
══════════════════════════════════════
`);