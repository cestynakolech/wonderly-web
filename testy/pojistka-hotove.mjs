import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { kontrola, vyjimky, zmenyMaterialu, stahni } from '../skripty/pojistka_hotove.mjs';
const root=mkdtempSync(join(tmpdir(),'omega-pojistka-'));
const git=(...a)=>execFileSync('git',a,{cwd:root,stdio:'pipe'});
git('init'); git('config','user.email','test@example.invalid'); git('config','user.name','Test');
const p='public/materialy/test.svg';
mkdirSync(join(root,'public/materialy'),{recursive:true}); mkdirSync(join(root,'src/data'),{recursive:true});
writeFileSync(join(root,p),'original'); writeFileSync(join(root,'src/data/temata.ts'),"const x = { nazev: 'První', cesta: '/materialy/test.svg' };\n");
git('add','.'); git('commit','-m','fixture');
writeFileSync(join(root,p),'changed');
const old={status:200,body:Buffer.from('original')};
const run=(fetchLive,exceptions=new Set(),staged=false)=>kontrola({cwd:root,fetchLive,exceptions,staged});
let n=0; function test(name,fn){fn();n++;console.log('PROŠLO '+name);}
test('nasazený SVG odmítnut',()=>assert.throws(()=>run(()=>old),/odmítnuta/));
test('výpadek sítě odmítnut',()=>assert.throws(()=>run(()=>{throw Error('síť');}),/síť/));
for (const status of [301,403,500]) test(`HTTP ${status} odmítnuto`,()=>assert.throws(()=>run(()=>({status})),/HTTP/));
test('výjimka s citací',()=>assert.equal(run(()=>old,vyjimky(`${p} | 2026-10-19 | „Schvaluji změnu materiálu.“`)).length,1));
test('výjimka bez citace odmítnuta',()=>assert.throws(()=>run(()=>old,vyjimky(`${p} | 2026-10-19 | ano`)),/odmítnuta/));
git('add',p); writeFileSync(join(root,p),'original');
test('staged změna zachycena i po vrácení pracovního souboru',()=>assert.throws(()=>run(()=>old,new Set(),true),/odmítnuta/));
git('reset','HEAD','--',p);
writeFileSync(join(root,'public/materialy/new.svg'),'new');
test('nový soubor 404 projde',()=>assert.equal(run(()=>({status:404,body:Buffer.alloc(0)})).length,1));
test('nový soubor existující na webu odmítnut',()=>assert.throws(()=>run(()=>old),/odmítnuta/));
git('add','public/materialy/new.svg'); git('commit','-m','new fixture');
writeFileSync(join(root,'src/data/temata.ts'),"const x = { nazev: 'Druhý', cesta: '/materialy/test.svg' };\n");
test('změna řádku materiálu odmítnuta',()=>assert.throws(()=>run(()=>old),/odmítnuta/));
test('víceřádkový název dohledá cestu v diffu',()=>assert(zmenyMaterialu("@@ -1,5 +1,5 @@\n {\n- nazev: 'Starý',\n+ nazev: 'Nový',\n cesta: '/materialy/test.svg',\n }\n").has(p)));
test('nový řádek nezabere okolní hotový materiál',()=>assert.deepEqual([...zmenyMaterialu("@@ -1,1 +1,2 @@\n {cesta: '/materialy/test.svg'},\n+ {cesta: '/materialy/new.svg'},\n")],['public/materialy/new.svg']));
test('změna ai zachycena',()=>assert(zmenyMaterialu("@@ -1,4 +1,4 @@\n {\n cesta: '/materialy/test.svg',\n- ai: false,\n+ ai: true,\n }\n").has(p)));
test('přidání prázdného panely zachyceno',()=>assert(zmenyMaterialu("@@ -1,3 +1,4 @@\n {\n cesta: '/materialy/test.svg',\n+ panely: [],\n }\n").has(p)));
test('externí odkaz s okolním materiálem neblokuje',()=>assert.equal(zmenyMaterialu("@@ -1,4 +1,4 @@\n { cesta: '/materialy/test.svg' },\n- { nazev: 'Starý', cesta: 'https://example.org' },\n+ { nazev: 'Nový', cesta: 'https://example.org' },\n").size,0));
test('externí odkaz bez okolního materiálu neblokuje',()=>assert.equal(zmenyMaterialu("@@ -1 +1 @@\n- { nazev: 'Starý', cesta: 'https://example.org' },\n+ { nazev: 'Nový', cesta: 'https://example.org' },\n").size,0));
test('uříznutý objekt bez cesty se odmítne',()=>assert.throws(()=>zmenyMaterialu('@@ -50 +50 @@\n- ai: false,\n+ ai: true,\n'),/hranice/));
test('uříznutý seznam panelů se odmítne',()=>assert.throws(()=>zmenyMaterialu('@@ -50,3 +50,3 @@\n "/materialy/last.svg",\n- ],\n+ ].slice(0, 1),\n },\n'),/hranice/));
test('dynamický seznam panelů se odmítne',()=>assert.throws(()=>zmenyMaterialu("@@ -1 +1 @@\n- { cesta: '/materialy/test.svg', panely: [] },\n+ { cesta: '/materialy/test.svg', panely: [].slice(0,1) },\n"),/Dynamická/));
// Přesný rozbor s celými soubory: okno diffu smí začínat uvnitř šablonového řetězce.
{
  const sablona = ['const t = [{', '  obsah: `', ...Array.from({length:5},(_,i)=>`  řádek ${i}`), '  `,', "  odkazy: [{nazev:'A',url:'https://a.example'},{nazev:'B',url:'https://b.example'}],", "  materialy: [{nazev:'Píseň',cesta:'/materialy/p.m4a'},{nazev:'V1',cesta:'/media/v1.mp4'}],", '}];', ''].join('\n');
  const L=sablona.split('\n');
  const diffZ=(novy)=>{ // ruční jednořádkový hunk se 3 řádky kontextu před změnou (začíná uvnitř šablony)
    const N=novy.split('\n'); const i=L.findIndex((l,k)=>l!==N[k]);
    return `@@ -${i-2},4 +${i-2},4 @@\n${L.slice(i-3,i).map(l=>' '+l).join('\n')}\n-${L[i]}\n+${N[i]}\n`;
  };
  const S=(f)=>{const N=[...L]; const i=L.findIndex(l=>l.includes(f[0])); N[i]=f[1](N[i]); return N.join('\n');};
  const pripoj=S(['materialy',l=>l.replace("}],","},{nazev:'Nové',cesta:'/media/n.mp4'}],")]);
  test('okno uvnitř šablony: bez souborů odmítnuto jako dřív',()=>assert.throws(()=>zmenyMaterialu(diffZ(pripoj)),/hranice/));
  test('okno uvnitř šablony: připojení na konec materialy projde',()=>assert.equal(zmenyMaterialu(diffZ(pripoj),{stary:sablona,novy:pripoj}).size,0));
  const zmenaCesty=S(['materialy',l=>l.replace('/materialy/p.m4a','/materialy/p2.m4a')]);
  test('změna cesty existující položky zachycena',()=>assert.deepEqual([...zmenyMaterialu(diffZ(zmenaCesty),{stary:sablona,novy:zmenaCesty})].sort(),['public/materialy/p.m4a','public/materialy/p2.m4a']));
  const smazani=S(['materialy',l=>l.replace("{nazev:'Píseň',cesta:'/materialy/p.m4a'},","")]);
  test('smazání existující položky zachyceno',()=>assert(zmenyMaterialu(diffZ(smazani),{stary:sablona,novy:smazani}).has('public/materialy/p.m4a')));
  const odkaz=S(['odkazy',l=>l.replace("{nazev:'A',url:'https://a.example'},","")]);
  test('odebrání odkazu projde',()=>assert.equal(zmenyMaterialu(diffZ(odkaz),{stary:sablona,novy:odkaz}).size,0));
  const obsah=S(['řádek 4',l=>l+' změna']);
  test('změna textu obsahu se odmítne jako dřív',()=>assert.throws(()=>zmenyMaterialu(diffZ(obsah),{stary:sablona,novy:obsah}),/hranice/));
  const spread=S(['materialy',l=>l.replace('materialy: [','materialy: [...x,')]);
  test('spread v materialy se odmítne',()=>assert.throws(()=>zmenyMaterialu(diffZ(spread),{stary:sablona,novy:spread}),/Dynamický/));
  test('hunk nesouhlasící se souborem se odmítne',()=>assert.throws(()=>zmenyMaterialu(diffZ(pripoj).replace('řádek','radek'),{stary:sablona,novy:pripoj}),/nesouhlasí/));
  test('posunutá hlavička hunku se odmítne',()=>assert.throws(()=>zmenyMaterialu(diffZ(pripoj).replace(/^@@ -(\d+)/,(m,n)=>`@@ -${+n+1}`),{stary:sablona,novy:pripoj}),/nesouhlasí/));
}
// Kolo 2: sémantické porovnání pole materialy po podtématech (U1–U3, vložení doprostřed, P2).
{
  const tmp=mkdtempSync(join(tmpdir(),'omega-pojistka-diff-'));
  const dif=(a,b)=>{writeFileSync(join(tmp,'a'),a); writeFileSync(join(tmp,'b'),b); return spawnSync('git',['diff','--no-index','--unified=3','a','b'],{cwd:tmp,encoding:'utf8'}).stdout;};
  const zaklad=['export const temata = {', "  'fyzika/6': [{", "    slug: 'a',", '    obsah: `', '      text', '    `,', '    odkazy: [', "      {nazev:'A',url:'https://a.example'},", "      {nazev:'B',url:'https://b.example'},", '    ],', '    materialy: [', "      {nazev:'Píseň',cesta:'/materialy/p.m4a'},", "      {nazev:'V1',cesta:'/media/v1.mp4'},", '    ],', '  }],', '};', ''].join('\n');
  const Z=zaklad.split('\n'); const ix=t=>{const i=Z.indexOf(t); assert(i>=0,t); return i;};
  const uprav=(f)=>{const N=[...Z]; f(N); return N.join('\n');};
  const zm=(novy)=>zmenyMaterialu(dif(zaklad,novy),{stary:zaklad,novy});
  const konecMat=ix('    ],',)+0; // první '    ],' je konec odkazy
  const konecMat2=Z.lastIndexOf('    ],');
  test('U1a vložené materialy: [] za polem se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2+1,0,'    materialy: [],'))),/Duplicitní/));
  test('U1b ], + materialy: [ před uzavírací se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2,0,'    ],','    materialy: ['))),/Duplicitní/));
  test('U1 duplicitní odkazy se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2+1,0,'    odkazy: [],'))),/Duplicitní|zmizelo/));
  test('U2 přejmenování materialy na odkazy se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N[ix('    materialy: [')]='    odkazy: [';})),/zmizelo/));
  test('U3 volání funkce v odkazy se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix('    odkazy: [')+1,0,"      {nazev:'X',url:encodeURI('https://x.example')},"))),/Dynamický/));
  test('U3 volání funkce v materialy se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2,0,"      {nazev:'X',cesta:String('/media/x.mp4')},"))),/Dynamický/));
  test('U3 šablona s ${} v materialy se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2,0,"      {nazev:'X',cesta:`/media/${'x'}.mp4`},"))),/Dynamický/));
  test('U3 proměnná místo pole materialy se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N.splice(ix('    materialy: ['),4,'    materialy: x,');})),/Dynamický|zmizelo/));
  test('vložení videa doprostřed materialy se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix('    materialy: [')+1,0,"      {nazev:'V0',cesta:'/media/v0.mp4'},"))),/doprostřed/));
  test('smazání videa /media/ se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix("      {nazev:'V1',cesta:'/media/v1.mp4'},"),1))),/bez cesty \/materialy\//));
  test('změna názvu videa /media/ se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const i=ix("      {nazev:'V1',cesta:'/media/v1.mp4'},"); N[i]=N[i].replace('V1','V2');})),/bez cesty \/materialy\//));
  const nazev=uprav(N=>{const i=ix("      {nazev:'Píseň',cesta:'/materialy/p.m4a'},"); N[i]=N[i].replace('Píseň','Písnička');});
  test('změna názvu nasazené položky: cesta mezi stávajícími',()=>{const r=zm(nazev); assert.deepEqual([...r.stavajici],['public/materialy/p.m4a']); assert.equal(r.nove.size,0);});
  const pripoj=uprav(N=>N.splice(konecMat2,0,"      {nazev:'Nová',cesta:'/materialy/n.svg'},"));
  test('připojení na konec: cesta mezi novými',()=>{const r=zm(pripoj); assert.deepEqual([...r.nove],['public/materialy/n.svg']); assert.equal(r.stavajici.size,0);});
  test('odebrání jednoho odkazu projde',()=>assert.equal(zm(uprav(N=>N.splice(ix("      {nazev:'A',url:'https://a.example'},"),1))).size,0));
  test('změna mimo diff (stará + diff ≠ nová) se odmítne',()=>assert.throws(()=>zmenyMaterialu(dif(zaklad,pripoj),{stary:zaklad,novy:pripoj.replace('text','texT')}),/nedává|nesouhlasí/));
  test('spread v objektu podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecMat2+1,0,'    ...{materialy: []},'))),/Spread/));
  // P2 přes kontrola(): plošná výjimka temata.ts jen pro připojené položky.
  const r2=mkdtempSync(join(tmpdir(),'omega-pojistka-p2-')); const g2=(...a)=>execFileSync('git',a,{cwd:r2,stdio:'pipe'});
  g2('init'); g2('config','user.email','test@example.invalid'); g2('config','user.name','Test');
  mkdirSync(join(r2,'public/materialy'),{recursive:true}); mkdirSync(join(r2,'src/data'),{recursive:true});
  writeFileSync(join(r2,'public/materialy/p.m4a'),'p'); writeFileSync(join(r2,'public/materialy/n.svg'),'n'); writeFileSync(join(r2,'src/data/temata.ts'),zaklad);
  g2('add','.'); g2('commit','-m','p2');
  const nasaz=p=>({status:200,body:Buffer.from(p.endsWith('p.m4a')?'p':'n')});
  const k2=(text,exc)=>{writeFileSync(join(r2,'src/data/temata.ts'),text); return kontrola({cwd:r2,fetchLive:nasaz,exceptions:new Set(exc)});};
  test('P2 změna názvu nasazené položky bez výjimky odmítnuta',()=>assert.throws(()=>k2(nazev,[]),/odmítnuta/));
  test('P2 změna názvu s plošnou výjimkou temata.ts ODMÍTNUTA',()=>assert.throws(()=>k2(nazev,['src/data/temata.ts']),/odmítnuta/));
  test('P2 změna názvu s výjimkou pro konkrétní cestu projde',()=>assert.equal(k2(nazev,['public/materialy/p.m4a'])[0].vysledek,'výjimka učitele'));
  test('P2 připojení nasazené cesty na konec s plošnou výjimkou projde',()=>assert.equal(k2(pripoj,['src/data/temata.ts'])[0].vysledek,'výjimka učitele'));
  test('P2 připojení nasazené cesty bez výjimky odmítnuto',()=>assert.throws(()=>k2(pripoj,[]),/odmítnuta/));
}
if(process.argv.includes('--live')) {
 const repo='/Users/Shared/wonderly-web';
 const files=execFileSync('git',['ls-tree','-r','--name-only','HEAD','--','public/materialy/fyzika/6-rocnik/sila/vzajemne-pusobeni-teles-sila'],{cwd:repo,encoding:'utf8'}).trim().split('\n');
 const deployed=files.find(p=>/panel-1\.svg$/.test(p)); assert(deployed,'W103 panel-1');
 const bytes=execFileSync('git',['show',`HEAD:${deployed}`],{cwd:repo});
 const live=stahni(deployed); assert.equal(live.status,200); assert.deepEqual(live.body,bytes);
 mkdirSync(join(root,deployed,'..'),{recursive:true}); writeFileSync(join(root,deployed),bytes); git('add',deployed); git('commit','-m','live fixture');
 git('checkout','HEAD','--','src/data/temata.ts');
 writeFileSync(join(root,deployed),Buffer.concat([bytes,Buffer.from('\n<!-- test -->')]));
 test('živý W103 se shoduje s HEAD a změna na kopii neprojde',()=>assert.throws(()=>run(stahni),/odmítnuta/));
}
console.log(`${n} kontrol prošlo; izolovaná kopie zachována: ${root}`);
