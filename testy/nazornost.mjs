#!/usr/bin/env node
// Přehled názornosti podtémat: má podtéma simulaci, obrázek, video nebo aspoň odkaz?
import { readFileSync } from 'node:fs';
const src = readFileSync('src/data/temata.ts', 'utf8');
const radky = src.split('\n');

const chtene = process.argv.slice(2);
let rocnik = null, tema = null, pod = null;
const vysledek = [];
const uloz = () => { if (pod) vysledek.push(pod); pod = null; };

for (const r of radky) {
	const mr = r.match(/^\t'([^']+)':\s*\[/);
	if (mr) { uloz(); rocnik = mr[1]; tema = null; continue; }
	const mt = r.match(/^\t\t\tslug:\s*'([^']+)'/);      // téma (celek)
	if (mt) { uloz(); tema = mt[1]; continue; }
	const mp = r.match(/^\t{5,}slug:\s*'([^']+)'/);      // podtéma (odsazení kolísá 5–6 tabů)
	if (mp) { uloz(); pod = { rocnik, tema, slug: mp[1], simulace: false, obrazek: false, zvuk: false, video: false, odkazy: 0, laborka: false }; continue; }
	if (!pod) continue;
	if (/^\s+interakce2?:\s*'/.test(r)) pod.simulace = true;
	if (/druh:\s*'obrazek'/.test(r)) pod.obrazek = true;
	if (/druh:\s*'zvuk'|druh:\s*'pisen'/.test(r)) pod.zvuk = true;
	if (/druh:\s*'video'|youtube/i.test(r)) pod.video = true;
	if (/^\s*\{\s*nazev:.*url:/.test(r)) pod.odkazy++;
}
uloz();

const filtr = chtene.length ? vysledek.filter((p) => chtene.some((c) => p.rocnik.includes(c))) : vysledek;
const bezNazornosti = filtr.filter((p) => !p.simulace && !p.obrazek && !p.video);

console.log(`Podtémat celkem: ${filtr.length}`);
console.log(`Bez jakékoli názornosti (simulace / obrázek / video): ${bezNazornosti.length}\n`);
let posledni = null;
for (const p of bezNazornosti) {
	if (p.tema !== posledni) { console.log(`\n[${p.rocnik}] ${p.tema}`); posledni = p.tema; }
	console.log(`   ${p.slug}${p.odkazy ? ` (odkazů: ${p.odkazy})` : ''}${p.zvuk ? ' [má zvuk]' : ''}`);
}
console.log('\n--- souhrn po ročnících ---');
const podleR = {};
for (const p of vysledek) {
	podleR[p.rocnik] ??= { celkem: 0, bez: 0 };
	podleR[p.rocnik].celkem++;
	if (!p.simulace && !p.obrazek && !p.video) podleR[p.rocnik].bez++;
}
for (const [k, v] of Object.entries(podleR)) console.log(`${k}: ${v.bez} bez názornosti z ${v.celkem}`);
