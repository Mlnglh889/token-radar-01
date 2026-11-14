import {copyFileSync,existsSync,mkdirSync,readdirSync,statSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build,data,issue,parse} from './lib/model.ts';
import {buildDossier} from './vendor/makefun-board.ts';
const here=fileURLToPath(new URL('.',import.meta.url));
function arg(k,d){const i=process.argv.indexOf('--'+k);return i>=0&&process.argv[i+1]?process.argv[i+1]:d}
const input=arg('input','/input');const file=input.endsWith('.json')?input:join(input,'snapshot.json');const out=arg('output',process.env.MAKEFUN_OUTPUT_DIR||'/output');
if(!existsSync(file))throw Error('snapshot missing: '+file);const snapshot=parse(readFileSync(file,'utf8'));const rows=build(snapshot);const bad=issue(rows,snapshot);if(bad)throw Error(bad);mkdirSync(out,{recursive:true});writeFileSync(join(out,'board.json'),JSON.stringify({rows})+'\n');writeFileSync(join(out,'data.js'),data(rows,snapshot));
function copyDir(src,dst){mkdirSync(dst,{recursive:true});for(const name of readdirSync(src)){if(name.startsWith('.'))continue;const p=join(src,name);if(statSync(p).isFile())copyFileSync(p,join(dst,name))}}
copyDir(join(here,'dashboard'),join(out,'dashboard'));copyDir(join(here,'screenshots'),join(out,'screenshots'));writeFileSync(join(out,'dossier.json'),buildDossier(out,{text_max_bytes:65536,screenshots:{max:4,max_bytes:524288},dashboard:{max_files:400,max_bytes:4194304}}));console.log(`token radar: ${rows.length} deterministic pre-token rows; ${snapshot.watchlist.length} watchlist covered`);
