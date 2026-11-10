import sharp from 'sharp';
import {readdir,mkdir,writeFile,readFile} from 'node:fs/promises';
const files=(await readdir('fotos')).filter(f=>/\.(jpe?g|png|webp|avif)$/i.test(f)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
await mkdir('public/photos',{recursive:true});
const manifest=[];
for(const [index,name] of files.entries()){
 const input=`fotos/${name}`; const meta=await sharp(input).metadata();
 const variants=[];
 for(const size of [480,960,1600]){const file=`photos/${index+1}-${size}.webp`;const info=await sharp(input).rotate().resize({width:size,withoutEnlargement:true}).webp({quality:82}).toFile(`public/${file}`);variants.push({file,width:info.width});}
 manifest.push({name,width:meta.width,height:meta.height,variants});
}
await writeFile('src/config/photos.json',JSON.stringify(manifest,null,2));
const config=await readFile('src/config/wedding.ts','utf8');
const selected=config.match(/sharing:\s*'([^']+)'/)?.[1];
const cover=files.includes(selected)?selected:files[0];
const svg=Buffer.from(`<svg width="1200" height="630"><rect width="660" height="630" fill="#F8F5EF"/><rect x="28" y="28" width="606" height="574" fill="none" stroke="#C5A777"/><g fill="#405548" text-anchor="middle" font-family="Georgia"><text x="330" y="180" font-size="18" letter-spacing="5">NOSSO CASAMENTO</text><text x="330" y="275" font-size="65">Pedro</text><text x="330" y="330" font-size="40" font-style="italic">&amp;</text><text x="330" y="400" font-size="65">Evandro</text><text x="330" y="490" font-size="25" letter-spacing="4">19.11.2026</text></g></svg>`);
let base=sharp({create:{width:1200,height:630,channels:3,background:'#F8F5EF'}});
const layers=[];if(cover)layers.push({input:await sharp(`fotos/${cover}`).rotate().resize(540,630,{fit:'cover',position:'right'}).toBuffer(),left:660,top:0});layers.push({input:svg,left:0,top:0});
await base.composite(layers).jpeg({quality:90}).toFile('public/og-image.jpg');
console.log(`Manifesto e versões responsivas gerados: ${files.length} fotos. Originais preservados.`);
