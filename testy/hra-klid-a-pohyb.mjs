#!/usr/bin/env node
// TEST HRY PRO SKUPINU „Vůči čemu?“ (Klid a pohyb tělesa, F7) — pilot složky č. 9.
//
// Co hlídá:
//  1) OPORA: každá karta (a každé pravidlo kola i bonus „naopak“) nese doslovný úryvek
//     výkladu — test ho hledá ve SKUTEČNÉM výkladu podtématu (temata.ts přes esbuild).
//     Hra tak nesmí tvrdit nic, co výklad neříká (OBSAH-PRAVIDLA.md kap. 7).
//  2) Každé číslo v textu karet je ve výkladu (celá čísla, žádné vymyšlené hodnoty).
//  3) Tvar hry: 3 kola × 6 karet, odpovědi A/B v každém kole aspoň 2× každá,
//     kolo 1 se vždy ptá „VŮČI …“ a má pozorovatele, id karet jsou jedinečná.
//  4) Bodování: kola 1 a 2 za 1 bod, finále za 2; maximum 24; pořadí se shodou bodů
//     sdílí místo (1., 1., 3.).
//  5) Scény: každá karta má scénu, která v komponentě existuje; to, co se ukáže až po
//     odhalení (data-odhal), má výchozí opacity="0" a stránka ho přepíná ATRIBUTEM
//     (classList je v SVG náhledu no-op); kolo 2 má po odhalení stopu trasy.
//
// Spuštění: node testy/hra-klid-a-pohyb.mjs
// Pro mutační zkoušku lze podvrhnout kopie: HRA_DATA=<cesta.ts> HRA_SCENA=<cesta.astro> HRA_STRANKA=<cesta.astro>
import { build } from 'esbuild';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaData = process.env.HRA_DATA || join(koren, 'src/data/hra-klid-a-pohyb.ts');
const cestaScena = process.env.HRA_SCENA || join(koren, 'src/components/hry/ScenaKlidPohyb.astro');
const cestaStranka = process.env.HRA_STRANKA || join(koren, 'src/pages/hry/klid-a-pohyb-telesa.astro');

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

async function nactiHru() {
	const docasny = mkdtempSync(join(tmpdir(), 'wonderly-hra-'));
	try {
		const vystup = join(docasny, 'hra.mjs');
		await build({ entryPoints: [cestaData], bundle: true, format: 'esm', outfile: vystup, logLevel: 'silent', platform: 'node' });
		return await import(pathToFileURL(vystup).href);
	} finally {
		rmSync(docasny, { recursive: true, force: true });
	}
}

const hra = await nactiHru();
const { temata } = await nactiData();

// výklad podtématu → čistý text (bez značek, sjednocené mezery)
let obsah = '';
for (const tema of temata['fyzika/7-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'klid-a-pohyb-telesa') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Klid a pohyb tělesa nalezen v temata.ts');
const text = obsah
	.replace(/alt="([^"]*)"/g, ' $1 ')
	.replace(/<\/?(strong|em|b|i)>/g, '')
	.replace(/<[^>]+>/g, ' ')
	.replace(/\s+/g, ' ');
const vyklad = (s) => text.includes(s.replace(/\s+/g, ' '));

const { KOLA, bodyZaKartu, maximumBodu, poradi, BONUS_NAOPAK } = hra;

// 1) opora
for (const k of KOLA) {
	ok(vyklad(k.opora), `kolo ${k.cislo}: pravidlo má oporu ve výkladu („${k.opora.slice(0, 50)}…“)`);
	for (const c of k.karty) {
		ok(c.opora.length >= 12 && vyklad(c.opora), `${c.id}: opora ve výkladu („${c.opora.slice(0, 50)}“)`);
		if (c.naopak) ok(c.naopak.opora.length >= 12 && vyklad(c.naopak.opora), `${c.id}: bonus „naopak“ má oporu ve výkladu`);
	}
}

// 2) čísla jen z výkladu
const cislaVykladu = new Set(text.match(/\d+/g) ?? []);
for (const k of KOLA) for (const c of k.karty) {
	for (const n of `${c.otazka} ${c.proc}`.match(/\d+/g) ?? []) {
		ok(cislaVykladu.has(n), `${c.id}: číslo ${n} je ve výkladu`);
	}
}
ok(KOLA.some((k) => k.karty.some((c) => /371/.test(c.otazka))), 'aspoň jedna karta pracuje s číslem z výkladu (371 km)');

// 3) tvar hry
ok(KOLA.length === 3, `3 kola (je ${KOLA.length})`);
const idcka = KOLA.flatMap((k) => k.karty.map((c) => c.id));
ok(new Set(idcka).size === idcka.length, 'id karet jsou jedinečná');
for (const k of KOLA) {
	ok(k.karty.length === 6, `kolo ${k.cislo}: 6 karet (je ${k.karty.length})`);
	const a = k.karty.filter((c) => c.spravne === 'A').length;
	const b = k.karty.filter((c) => c.spravne === 'B').length;
	ok(a + b === k.karty.length, `kolo ${k.cislo}: každá karta má odpověď A, nebo B`);
	ok(a >= 2 && b >= 2, `kolo ${k.cislo}: A i B aspoň 2× (A ${a}, B ${b}) — nejde tipovat jedno písmeno`);
	ok(k.moznosti.A.popis && k.moznosti.B.popis && k.moznosti.A.popis !== k.moznosti.B.popis, `kolo ${k.cislo}: dvě různé možnosti`);
}
const [k1, k2, k3] = KOLA;
ok(k1.moznosti.A.popis === 'KLID' && k1.moznosti.B.popis === 'POHYB', 'kolo 1: A = KLID, B = POHYB');
ok(k2.moznosti.A.popis === 'PŘÍMOČARÝ' && k2.moznosti.B.popis === 'KŘIVOČARÝ', 'kolo 2: A = PŘÍMOČARÝ, B = KŘIVOČARÝ');
ok(k3.moznosti.A.popis === 'TRASA' && k3.moznosti.B.popis === 'DRÁHA', 'kolo 3: A = TRASA, B = DRÁHA');
for (const c of k1.karty) {
	ok(/VŮČI/.test(c.otazka) && !!c.pozorovatel, `${c.id}: ptá se VŮČI pozorovateli`);
	// odpověď musí sedět se slovem v opoře: klid ↔ „v klidu“, pohyb ↔ „pohyb“
	const slovo = c.spravne === 'A' ? /v klidu/ : /pohyb/;
	ok(slovo.test(c.opora), `${c.id}: odpověď ${c.spravne} sedí s oporou`);
}
// stejné těleso ve stejné scéně musí mít u různých pozorovatelů i opačné odpovědi (jádro „vůči čemu“)
for (const scena of ['vytah', 'vlak']) {
	const odp = new Set(k1.karty.filter((c) => c.scena === scena).map((c) => c.spravne));
	ok(odp.size === 2, `kolo 1, scéna ${scena}: jednou KLID, jednou POHYB`);
}
const PRIMOCARE = ['výtah', 'zboží na pásu', 'letadlo', 'šiška'];
for (const c of k2.karty) {
	const prim = PRIMOCARE.some((s) => c.opora.toLowerCase().includes(s));
	ok((c.spravne === 'A') === prim, `${c.id}: ${c.spravne === 'A' ? 'přímočarý' : 'křivočarý'} odpovídá výčtu ve výkladu`);
}
for (const c of k3.karty) {
	const delka = /délk|km|metrech/.test(c.otazka.toLowerCase() + ' ' + c.opora.toLowerCase()) && !/ne její délku/.test(c.opora);
	ok((c.spravne === 'B') === delka, `${c.id}: ${c.spravne === 'B' ? 'dráha = délka' : 'trasa = čára'}`);
}

// 4) bodování
ok(bodyZaKartu(k1) === 1 && bodyZaKartu(k2) === 1, 'kola 1 a 2 za 1 bod');
ok(bodyZaKartu(k3) === 2, 'finále za 2 body');
ok(maximumBodu() === 24, `maximum bodů 6 + 6 + 12 = 24 (je ${maximumBodu()})`);
ok(BONUS_NAOPAK === 1, 'bonus „naopak“ za 1 bod');
const p = poradi([{ jmeno: 'A', body: 5 }, { jmeno: 'B', body: 9 }, { jmeno: 'C', body: 9 }, { jmeno: 'D', body: 2 }]);
ok(p.map((t) => t.jmeno).join('') === 'BCAD', `pořadí sestupně, při shodě původní pořadí (je ${p.map((t) => t.jmeno).join('')})`);
ok(p.map((t) => t.misto).join(',') === '1,1,3,4', `shoda bodů sdílí místo 1,1,3,4 (je ${p.map((t) => t.misto).join(',')})`);
ok(p[0].body === 9 && p[3].body === 2, 'pořadí nese body týmů');

// 5) scény a stránka
const zdrojScena = readFileSync(cestaScena, 'utf8');
const sceny = new Set([...zdrojScena.matchAll(/case '([a-z-]+)':/g)].map((m) => m[1]));
for (const k of KOLA) for (const c of k.karty) ok(sceny.has(c.scena), `${c.id}: scéna „${c.scena}“ existuje`);
const odhalovani = [...zdrojScena.matchAll(/<g data-odhal="1"[^>]*>/g)].map((m) => m[0]);
ok(odhalovani.length >= 1 && odhalovani.every((g) => /opacity="0"/.test(g)), 'prvky „po odhalení“ mají výchozí opacity="0"');
for (const c of k2.karty) {
	const blok = zdrojScena.split(`case '${c.scena}':`)[1]?.split('break;')[0] ?? '';
	ok(/trasa\(d,/.test(blok), `${c.id}: po odhalení se ukáže stopa trasy`);
	ok(/jede\(/.test(blok), `${c.id}: těleso se ve scéně pohybuje`);
}
for (const c of k1.karty) {
	const blok = zdrojScena.split(`case '${c.scena}':`)[1]?.split('break;')[0] ?? '';
	ok(blok.includes(`po('${c.pozorovatel}')`), `${c.id}: scéna umí vyznačit pozorovatele „${c.pozorovatel}“`);
	ok(blok.includes(`tr('${c.teleso}')`), `${c.id}: scéna umí vyznačit těleso „${c.teleso}“`);
}
const stranka = readFileSync(cestaStranka, 'utf8');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(stranka), 'stránka odhaluje stopu atributem opacity=1');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '0'\)\)/.test(stranka), 'stránka u nové karty stopu zase schová');
ok(/tymy\[\+b\.dataset\.i!\]\.body \+= body\)/.test(stranka) && /const body = kolo\(\)\.body;/.test(stranka), 'stránka přičítá body podle kola');
ok(/tymy\[\+b\.dataset\.i!\]\.body \+= BONUS_NAOPAK/.test(stranka), 'stránka přičítá bonus');
ok(!/https?:\/\/(?!lab\.wonderly)/.test(stranka.replace(/xmlns="[^"]+"/g, '')), 'stránka nenačítá nic z cizích adres (funguje bez internetu)');

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
