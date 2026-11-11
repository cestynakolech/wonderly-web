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
// Kolo 3 (11. 11. 2026): přidání celého nového podtématu projde, změna hotového dál ne.
{
  const tmp=mkdtempSync(join(tmpdir(),'omega-pojistka-nove-'));
  const dif=(a,b)=>{writeFileSync(join(tmp,'a'),a); writeFileSync(join(tmp,'b'),b); return spawnSync('git',['diff','--no-index','--unified=40','a','b'],{cwd:tmp,encoding:'utf8'}).stdout;};
  const podt=(slug,{mat='',odk=''}={})=>['        {',`          slug: '${slug}',`,`          nazev: 'Nové ${slug}',`,'          obsah: "<p>text</p>",',`          odkazy: [${odk}],`,`          materialy: [${mat}],`,'        },'];
  const zaklad=['export const temata = {',"  'fyzika/8-rocnik': [",'    {',"      slug: 'energie',","      nazev: 'Energie',",'      podtemata: [',
    '        {',"          slug: 'a',","          nazev: 'A',",'          obsah: "<p>text a</p>",','          odkazy: [],','          materialy: [',"            { druh: 'infografika', nazev: 'Inf A', cesta: '/materialy/a.svg' },",'          ],','        },',
    '        {',"          slug: 'b',","          nazev: 'B',",'          obsah: `<p>text b</p>`,','          materialy: [],','        },',
    '      ],','    },','  ],','};',''].join('\n');
  const Z=zaklad.split('\n'); const ix=t=>{const i=Z.indexOf(t); assert(i>=0,t); return i;};
  const uprav=(f)=>{const N=[...Z]; f(N); return N.join('\n');};
  const zm=(novy,stary=zaklad)=>zmenyMaterialu(dif(stary,novy),{stary,novy});
  const konecPodtemat=ix('      ],');
  const naKonec=uprav(N=>N.splice(konecPodtemat,0,...podt('c')));
  test('N(a) nové podtéma na konci tématu projde',()=>{const r=zm(naKonec); assert.equal(r.size,0);});
  // Skutečný vklad Šíření tepla (8. r., 11. 11. 2026): pevná data – 9 přidaných řádků z vklad.diff doslova,
  // soused ve tvaru skutečného souboru (tabulátory). Nezávisí na obsahu src/data/temata.ts.
  {
    const VKLAD=["\t\t\t\t{", "\t\t\t\t\tslug: 'sireni-tepla',", "\t\t\t\t\tnazev: 'Šíření tepla vedením, prouděním a zářením',", "\t\t\t\t\tobsah: \"<h2>Šíření tepla vedením, prouděním a zářením</h2>\\n\\n<p>V minulém podtématu jsme si řekli, že teplo přechází z teplejšího tělesa na chladnější, dokud se jejich teploty nevyrovnají. Tam se tělesa dotýkala, teplo se ale může předávat i bez dotyku těles, a to zářením. Teď si ukážeme, <strong>jakými cestami</strong> teplo putuje. Cesty jsou tři: <strong>vedení</strong>, <strong>proudění</strong> a <strong>záření</strong>. Záření tepla se říká také <strong>sálání</strong>.</p>\\n\\n<h3>Vedení tepla</h3>\\n<p>Vedením se teplo šíří uvnitř tělesa a mezi tělesy, která se <strong>dotýkají</strong>. Látka se přitom jako celek nepřemisťuje, nic neteče. Rychlejší částice v teplejší části narážejí do sousedních pomalejších částic a předávají jim část své energie. Ty ji pošlou dál, podobně jako štafetu.</p>\\n<p>Když dáš kovovou lžičku do horkého čaje, za chvíli se ohřeje i její konec, který držíš v ruce.</p>\\n<ul>\\n<li><strong>tepelné vodiče</strong> vedou teplo dobře, jsou to hlavně kovy (hrnec, pánev, žebra chladiče)</li>\\n<li><strong>tepelné izolanty</strong> vedou teplo špatně, třeba dřevo, plast, vlna nebo vzduch</li>\\n</ul>\\n<p>Proto mají hrnce rukojeti z plastu nebo ze dřeva a na horký plech bereme chňapku. Svetr nás chrání před zimou, protože mezi vlákny drží vzduch a ten teplo vede špatně. Teplo z těla pak uniká pomaleji.</p>\\n\\n<h3>Proudění tepla</h3>\\n<p>Prouděním se teplo šíří jen v <strong>kapalinách a plynech</strong>. Jejich částice se totiž mohou volně přemisťovat. Ohřátá kapalina nebo ohřátý plyn se přesune na jiné místo a teplo nese s sebou.</p>\\n<p>Teplý vzduch má menší hustotu než studený, a proto <strong>stoupá vzhůru</strong>. Studenější vzduch <strong>klesá dolů</strong>. Stejně se chová i voda.</p>\\n<ul>\\n<li><strong>topení v pokoji:</strong> vzduch se u topení ohřeje a stoupá ke stropu. Tam se ochladí, klesne k podlaze a vrací se zpátky k topení. Tak se postupně prohřeje celá místnost.</li>\\n<li><strong>voda v hrnci na plotně:</strong> teplá voda ode dna stoupá nahoru a studenější klesá dolů. Voda se tak promíchává a ohřeje se celá.</li>\\n</ul>\\n<p>V pevných látkách proudění nenastane, protože jejich částice zůstávají na svých místech.</p>\\n\\n<h3>Záření (sálání)</h3>\\n<p>Zářením se teplo šíří i tam, kde <strong>žádná látka není</strong>, třeba prázdným prostorem (vakuem) mezi Sluncem a Zemí. Proto nás Slunce hřeje, i když je od nás velmi daleko.</p>\\n<p>Teplá tělesa vysílají <strong>infračervené záření</strong>. Ze 7. ročníku víš, že ho okem nevidíme, ale vnímáme ho jako teplo. Když záření dopadne na jiné těleso, těleso ho pohltí a ohřeje se.</p>\\n<ul>\\n<li>u táboráku nás oheň hřeje do obličeje, ale záda zůstávají studená</li>\\n<li>zářením nás hřejí také kamna nebo rozpálená plotna</li>\\n<li><strong>tmavé povrchy</strong> záření pohlcují víc a více se ohřejí, <strong>světlé povrchy</strong> ho víc odrážejí. Proto je v létě na slunci v černém tričku větší horko než v bílém.</li>\\n</ul>\\n\\n<h3>Často všechno najednou</h3>\\n<p>V běžném životě se teplo často šíří všemi třemi způsoby zároveň. Když vaříš vodu v hrnci na plotně:</p>\\n<ul>\\n<li>dno hrnce se od plotny ohřeje <strong>vedením</strong></li>\\n<li>voda v hrnci se prohřeje <strong>prouděním</strong></li>\\n<li>když dáš ruku kousek vedle plotny, cítíš teplo, které k ní přichází <strong>zářením</strong></li>\\n</ul>\\n\\n<h3>Shrnutí</h3>\\n<p>Teplo se šíří třemi způsoby. Při <strong>vedení</strong> si energii předávají částice a látka se přitom nepřemisťuje; kovy vedou teplo dobře, dřevo, plast a vzduch špatně. Při <strong>proudění</strong> se v kapalinách a plynech přesouvá ohřátá látka: teplá stoupá, studená klesá. <strong>Zářením</strong> se teplo šíří i prázdným prostorem, a tak nás hřeje Slunce; tmavé povrchy záření pohlcují víc než světlé.</p>\",", "\t\t\t\t\tuvod: \"Když držíš hrnek s horkým čajem, ruce se ti ohřejí. Nad topením stoupá teplý vzduch až ke stropu. A na sluníčku tě hřeje, i když se Slunce vůbec nedotýkáš. Teplo tedy umí cestovat třemi různými způsoby.\",", "\t\t\t\t\tzapis: {\"body\":[\"teplo se šíří vedením, prouděním a zářením (sáláním)\",\"vedení: částice si předávají energii nárazy, látka se přitom nepřemisťuje\",\"kovy teplo vedou dobře (vodiče), dřevo, plast a vzduch špatně (izolanty)\",\"proudění: teplá kapalina nebo plyn stoupá a nese teplo s sebou\",\"záření: teplo se šíří i prázdným prostorem, tak nás hřeje Slunce\",\"tmavé povrchy záření pohlcují víc než světlé\",\"příklady: lžička v čaji (vedení), topení (proudění), táborák (záření)\",\"pozor: v pevných látkách teplo neproudí, částice zůstávají na místě\"]},", "\t\t\t\t\todkazy: [],", "\t\t\t\t\tmaterialy: [],", "\t\t\t\t},"];
    const stary=['export const temata: Record<string, Tema[]> = {',"\t'fyzika/8-rocnik': [",'\t\t{',"\t\t\tslug: 'energie',","\t\t\tnazev: 'Energie',",'\t\t\tpodtemata: [',
      '\t\t\t\t{',"\t\t\t\t\tslug: 'tepelna-vymena-a-teplo',","\t\t\t\t\tinterakce: 'kalorimetr',","\t\t\t\t\tnazev: 'Tepelná výměna, teplo, měrná tepelná kapacita',",'\t\t\t\t\tobsah: "<h2>Tepelná výměna</h2>\\n<p>text</p>",','\t\t\t\t\todkazy: [],','\t\t\t\t\tmaterialy: [',
      "\t\t\t\t\t\t{ druh: 'infografika', nazev: 'Infografika', cesta: '/materialy/fyzika/8-rocnik/energie/tepelna-vymena-a-teplo/infografika.svg' },","\t\t\t\t\t\t{ druh: 'youtube', nazev: 'Video: Teplo a teplota (ústřední topení)', cesta: 'YLiXzSWoRRg' },",'\t\t\t\t\t],','\t\t\t\t},',
      '\t\t\t],','\t\t},','\t],','};',''];
    const konec=stary.indexOf('\t\t\t],'), vloz=r=>{const N=[...stary]; N.splice(konec,0,...r); return N.join('\n');};
    const S=stary.join('\n'), novy=vloz(VKLAD);
    test('N(a) skutečný vklad Šíření tepla projde',()=>assert.equal(zm(novy,S).size,0));
    const i=stary.findIndex(l=>l.includes('nazev:')&&l.includes('Tepelná')), zmena=vloz(VKLAD).split('\n'); zmena[i]=zmena[i].replace("',","x',");
    test('N(b) skutečný vklad + změna názvu sousedního hotového podtématu se odmítne',()=>assert.throws(()=>zm(zmena.join('\n'),S),/hranice/));
    const dvaSlugy=[...VKLAD]; dvaSlugy.splice(2,0,"\t\t\t\t\tslug: 'tepelna-vymena-a-teplo',");
    test('Z1 skutečný vklad + druhý klíč slug = hotové sousední podtéma se odmítne',()=>assert.throws(()=>zm(vloz(dvaSlugy),S),/hranice|zmizelo/));
    // Celou cestou kontrola(): git repo se starou verzí v HEAD, nová v pracovní kopii; žádná cesta k ověření.
    const r3=mkdtempSync(join(tmpdir(),'omega-pojistka-n3-')); const g3=(...a)=>execFileSync('git',a,{cwd:r3,stdio:'pipe'});
    g3('init'); g3('config','user.email','test@example.invalid'); g3('config','user.name','Test');
    mkdirSync(join(r3,'src/data'),{recursive:true}); writeFileSync(join(r3,'src/data/temata.ts'),S); g3('add','.'); g3('commit','-m','n3');
    writeFileSync(join(r3,'src/data/temata.ts'),novy);
    test('N(a) skutečný vklad Šíření tepla projde přes kontrola()',()=>assert.equal(kontrola({cwd:r3,fetchLive:()=>({status:404,body:Buffer.alloc(0)}),exceptions:new Set()}).length,0));
  }
  // Z1: tvar klíčů nového podtématu (každý klíč nejvýš jednou, jen prostý identifikátor); S1: tvar slugu.
  const sKlicem=(k)=>uprav(N=>{const p=podt('c'); p.splice(2,0,k); N.splice(konecPodtemat,0,...p);});
  test('Z1 nové podtéma se dvěma klíči slug (poslední hotový) se odmítne',()=>assert.throws(()=>zm(sKlicem("          slug: 'a',")),/hranice|zmizelo/));
  test('Z1 druhý slug v uvozovkách se odmítne',()=>assert.throws(()=>zm(sKlicem("          'slug': 'a',")),/hranice|zmizelo/));
  test('Z1 jediný slug v uvozovkách se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const p=podt('c'); p[1]="          'slug': 'c',"; N.splice(konecPodtemat,0,...p);})),/hranice/));
  test('Z1 vypočtený klíč [\'slug\'] se odmítne',()=>assert.throws(()=>zm(sKlicem("          ['slug']: 'a',")),/Spread|hranice/));
  test('Z1 spread v novém podtématu se odmítne',()=>assert.throws(()=>zm(sKlicem('          ...{slug: \'a\'},')),/Spread/));
  test('Z1 zdvojený jiný klíč (nazev) se odmítne',()=>assert.throws(()=>zm(sKlicem("          nazev: 'Druhý',")),/hranice/));
  for (const [nazev,slug] of [['velké písmeno','A'],['mezera','a '],['prázdný',''],['lomítko','../a'],['diakritika','šíření'],['podtržítko','a_b'],['dvojitá pomlčka','a--b'],['pomlčka na konci','c-']])
    test(`S1 slug nového podtématu (${nazev}) se odmítne`,()=>assert.throws(()=>zm(uprav(N=>N.splice(konecPodtemat,0,...podt(slug)))),/hranice|zmizelo/));
  // Kolo 3 schválení (podmínka): nové podtéma smí mít jen doslovné hodnoty.
  test('D1 ${} výraz v obsahu nového podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const p=podt('c'); p[3]='          obsah: `<p>${1 + 1}</p>`,'; N.splice(konecPodtemat,0,...p);})),/hranice/));
  test('D1 okamžitě volaná funkce v názvu nového podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const p=podt('c'); p[2]="          nazev: (() => 'Nové')(),"; N.splice(konecPodtemat,0,...p);})),/hranice/));
  test('D1 šipková funkce ve vlastnosti nového podtématu se odmítne',()=>assert.throws(()=>zm(sKlicem('          f: () => 1,')),/hranice/));
  test('D1 doslovné hodnoty včetně šablony bez výrazů a objektu zapis projdou',()=>assert.equal(zm(uprav(N=>{const p=podt('c'); p[3]='          obsah: `<p>text</p>`,'; p.splice(4,0,'          zapis: {"body":["a","b"],"vzorec":"Q = m · c"},'); N.splice(konecPodtemat,0,...p);})).size,0));
  test('S1 platný slug (písmena, číslice, pomlčky) projde',()=>assert.equal(zm(uprav(N=>N.splice(konecPodtemat,0,...podt('sireni-tepla-2')))).size,0));
  test('N(b) nové podtéma + změna slova v cizím podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N.splice(konecPodtemat,0,...podt('c')); N[ix('          obsah: "<p>text a</p>",')]='          obsah: "<p>text A</p>",';})),/hranice/));
  test('N(b) nové podtéma + připojení materiálu do hotového se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N.splice(konecPodtemat,0,...podt('c')); N.splice(ix('          ],'),0,"            { druh: 'audio', nazev: 'X', cesta: '/materialy/x.m4a' },");})),/hranice/));
  test('N(c) změna textu hotového podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N[ix('          obsah: `<p>text b</p>`,')]='          obsah: `<p>text bb</p>`,';})),/hranice/));
  test('N(c) změna pořadí podtémat se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const a=N.splice(ix('        {'),9); assert.equal(a.at(-1),'        },'); N.splice(N.indexOf('      ],'),0,...a);})),/hranice/));
  test('N(d) smazání podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix("          slug: 'b',")-1,6))),/hranice|zmizelo/));
  test('N(d) smazání podtématu a přidání nového se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix("          slug: 'b',")-1,6,...podt('c')))),/hranice|zmizelo/));
  test('N(e) „nové“ podtéma s existujícím slugem se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecPodtemat,0,...podt('b')))),/hranice|zmizelo/));
  test('N(e) přejmenování slugu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N[ix("          slug: 'b',")]="          slug: 'c',";})),/hranice|zmizelo/));
  test('N(e) dvě nová podtémata se stejným slugem se odmítnou',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecPodtemat,0,...podt('c'),...podt('c')))),/hranice|zmizelo/));
  const doprostred=uprav(N=>N.splice(ix("          slug: 'b',")-1,0,...podt('c')));
  test('N(f) nové podtéma doprostřed tématu projde (stávající beze změny)',()=>assert.equal(zm(doprostred).size,0));
  test('N(f) dvě nová podtémata projdou',()=>assert.equal(zm(uprav(N=>{N.splice(konecPodtemat,0,...podt('d')); N.splice(ix('        {'),0,...podt('c'));})).size,0));
  test('N(f) řádek vložený do cizího podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{N.splice(konecPodtemat,0,...podt('c')); N.splice(ix("          nazev: 'B',")+1,0,'          uvod: "x",');})),/hranice/));
  test('N(f) „podtéma“ vnořené do cizího objektu se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix("          nazev: 'B',")+1,0,'          podtemata: [',...podt('c'),'          ],'))),/hranice/));
  test('N(f) nové podtéma na řádku cizího objektu se odmítne',()=>assert.throws(()=>zm(uprav(N=>{const i=ix('      ],')-1; N[i]=N[i]+" { slug: 'c', nazev: 'C', odkazy: [], materialy: [] },";})),/hranice/));
  test('N(f) nové téma (ne podtéma) se odmítá jako dřív',()=>assert.throws(()=>zm(uprav(N=>N.splice(ix('  ],'),0,'    {',"      slug: 'jine',","      nazev: 'Jiné',",'      podtemata: [],','    },'))),/hranice/));
  test('N spread v novém podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecPodtemat,0,'        { ...x },'))),/Spread/));
  test('N dynamický obsah materialy v novém podtématu se odmítne',()=>assert.throws(()=>zm(uprav(N=>N.splice(konecPodtemat,0,...podt('c',{mat:"{cesta:String('/materialy/c.svg')}"})))),/Dynamický/));
  // N(g) materiály nového podtématu: stejná pravidla jako dnes pro nové materiály (nove; 200 bez výjimky = odmítnuto).
  const sMat=uprav(N=>N.splice(konecPodtemat,0,...podt('c',{mat:"{ druh: 'infografika', nazev: 'Inf A', cesta: '/materialy/a.svg' }, { druh: 'video', nazev: 'V', cesta: '/media/v.mp4' }"})));
  test('N(g) cesta v materialy nového podtématu je mezi novými',()=>{const r=zm(sMat); assert.deepEqual([...r.nove],['public/materialy/a.svg']); assert.equal(r.stavajici.size,0);});
  const sOdk=uprav(N=>N.splice(konecPodtemat,0,...podt('c',{odk:"{ nazev: 'A', url: '/materialy/a.svg' }"})));
  test('N(g) url /materialy/ v odkazy nového podtématu je mezi stávajícími (jako dnes)',()=>assert.deepEqual([...zm(sOdk).stavajici],['public/materialy/a.svg']));
  const r4=mkdtempSync(join(tmpdir(),'omega-pojistka-n4-')); const g4=(...a)=>execFileSync('git',a,{cwd:r4,stdio:'pipe'});
  g4('init'); g4('config','user.email','test@example.invalid'); g4('config','user.name','Test');
  mkdirSync(join(r4,'public/materialy'),{recursive:true}); mkdirSync(join(r4,'src/data'),{recursive:true});
  writeFileSync(join(r4,'public/materialy/a.svg'),'a'); writeFileSync(join(r4,'src/data/temata.ts'),zaklad); g4('add','.'); g4('commit','-m','n4');
  const nasaz=()=>({status:200,body:Buffer.from('a')});
  const k4=(text,exc,f=nasaz)=>{writeFileSync(join(r4,'src/data/temata.ts'),text); return kontrola({cwd:r4,fetchLive:f,exceptions:new Set(exc)});};
  test('N(g) nasazená cesta jiné stránky v novém podtématu bez výjimky odmítnuta',()=>assert.throws(()=>k4(sMat,[]),/hotový a nasazený/));
  test('N(g) nasazená cesta v novém podtématu s plošnou výjimkou projde jako připojení na konec (P2)',()=>assert.equal(k4(sMat,['src/data/temata.ts'])[0].vysledek,'výjimka učitele'));
  test('N(g) nová cesta (404) v novém podtématu projde',()=>assert.equal(k4(sMat,[],()=>({status:404,body:Buffer.alloc(0)}))[0].vysledek,'povoleno'));
  test('N(g) url nasazeného materiálu v odkazy nového podtématu s plošnou výjimkou odmítnuta',()=>assert.throws(()=>k4(sOdk,['src/data/temata.ts']),/hotový a nasazený/));
  test('N nové podtéma bez materiálů projde přes kontrola()',()=>assert.equal(k4(naKonec,[]).length,0));
  test('N nové podtéma + změna hotového přes kontrola() odmítnuta',()=>assert.throws(()=>k4(uprav(N=>{N.splice(konecPodtemat,0,...podt('c')); N[ix("          nazev: 'B',")]="          nazev: 'Bé',";}),[]),/hranice/));
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
