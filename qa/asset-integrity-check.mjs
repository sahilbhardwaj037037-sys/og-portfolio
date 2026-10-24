import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const manifest=JSON.parse(fs.readFileSync('docs/asset-integrity.json','utf8'));
assert.equal(new Set(manifest.assets.map(a=>a.path)).size,manifest.assets.length,'Duplicate manifest paths');
for(const a of manifest.assets){const b=fs.readFileSync(a.path);assert.equal(b.length,a.bytes,a.path+' size');assert.equal(crypto.createHash('sha256').update(b).digest('hex'),a.sha256,a.path+' SHA-256');}
console.log(`PASS ${manifest.assets.length} runtime asset sizes and SHA-256 checksums`);
