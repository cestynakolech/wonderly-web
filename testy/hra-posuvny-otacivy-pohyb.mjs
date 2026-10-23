#!/usr/bin/env node
// TEST HRY „Jak se to pohybuje?“ (Posuvný a otáčivý pohyb, F7).
// Data hry jsou ve frontmatteru komponenty, proto je test čte z jejího textu regexem.
// Podvrh komponenty lze předat přes HRA_KOMPONENTA=<cesta>.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaKomponenty = process.env.HRA_KOMPONENTA || join(koren, 'src/components/hry/HraPosuvnyOtacivyPohyb.astro');
const zdroj = readFileSync(cestaKomponenty, 'utf8');

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

const retezec = String.raw`((?:\\.|[^'])*)`;
const rozbal = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
const opory = [...zdroj.matchAll(new RegExp(`\\bopora:\\s*'${retezec}'`, 'g'))].map((m) => rozbal(m[1]));

const kola = [...zdroj.matchAll(/\{\s*cislo:\s*(\d+),[\s\S]*?body:\s*(\d+),\s*karty:\s*\[([\s\S]*?)\n\t\t\],\s*\n\t\},/g)].map((m) => ({
	cislo: Number(m[1]),
	body: Number(m[2]),
	blok: m[3],
	karty: [],
}));

const kartaRe = new RegExp(
	`\\{\\s*id:\\s*'${retezec}',\\s*scena:\\s*'${retezec}',\\s*otazka:\\s*'${retezec}',\\s*spravne:\\s*'([AB])',\\s*` +
	`proc:\\s*'${retezec}',\\s*opora:\\s*'${retezec}'(?:,\\s*naopak:\\s*\\{\\s*odpoved:\\s*'${retezec}',\\s*opora:\\s*'${retezec}'\\s*\\})?\\s*\\}`,
	'g',
);
for (const kolo of kola) {
	for (const m of kolo.blok.matchAll(kartaRe)) {
		kolo.karty.push({
			id: rozbal(m[1]), scena: rozbal(m[2]), otazka: rozbal(m[3]), spravne: m[4],
			proc: rozbal(m[5]), opora: rozbal(m[6]),
			naopak: m[7] ? { odpoved: rozbal(m[7]), opora: rozbal(m[8]) } : null,
		});
	}
}

const { temata } = await nactiData();
let obsah = '';
for (const tema of temata['fyzika/7-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'posuvny-otacivy-pohyb') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Posuvný a otáčivý pohyb nalezen v temata.ts');
const text = obsah
	.replace(/alt="([^"]*)"/g, ' $1 ')
	.replace(/<\/?(strong|em|b|i)>/g, '')
	.replace(/<[^>]+>/g, ' ')
	.replace(/\s+/g, ' ');
const vyklad = (s) => text.includes(s.replace(/\s+/g, ' '));

// a) Všechny opory v komponentě musí být doslovně ve výkladu.
ok(opory.length === 20, `20 opor (je ${opory.length})`);
for (const opora of opory) ok(opora.length >= 12 && vyklad(opora), `opora ve výkladu („${opora.slice(0, 55)}“)`) ;

// b) Čísla v otázkách a vysvětleních jsou povolena jen tehdy, když jsou ve výkladu.
const cislaVykladu = new Set(text.match(/\d+/g) ?? []);
for (const kolo of kola) for (const karta of kolo.karty) {
	for (const n of `${karta.otazka} ${karta.proc}`.match(/\d+/g) ?? []) {
		ok(cislaVykladu.has(n), `${karta.id}: číslo ${n} je ve výkladu`);
	}
}

// c) Tři kola, patnáct jedinečných karet a vyvážené odpovědi.
ok(kola.length === 3, `3 kola (jsou ${kola.length})`);
const karty = kola.flatMap((k) => k.karty);
ok(karty.length === 15, `celkem 15 karet (je ${karty.length})`);
ok(new Set(karty.map((k) => k.id)).size === karty.length, 'id karet jsou jedinečná');
for (const kolo of kola) {
	ok(kolo.karty.length === 5, `kolo ${kolo.cislo}: 5 karet (je ${kolo.karty.length})`);
	const a = kolo.karty.filter((k) => k.spravne === 'A').length;
	const b = kolo.karty.filter((k) => k.spravne === 'B').length;
	ok(a + b === kolo.karty.length, `kolo ${kolo.cislo}: každá odpověď je A, nebo B`);
	ok(a >= 2 && b >= 2, `kolo ${kolo.cislo}: A i B aspoň 2× (A ${a}, B ${b})`);
}

// d) Bodování.
ok(kola[0]?.body === 1 && kola[1]?.body === 1, 'kola 1 a 2 jsou za 1 bod');
ok(kola[2]?.body === 2, 'finále je za 2 body');
const maximum = kola.reduce((s, k) => s + k.karty.length * k.body, 0);
ok(maximum === 20, `maximum bodů je 20 (je ${maximum})`);

// e) Scény a odhalování.
const sceny = new Set([...zdroj.matchAll(/case '([^']+)'/g)].map((m) => m[1]));
for (const karta of karty) ok(Boolean(karta.scena) && sceny.has(karta.scena), `${karta.id}: scéna „${karta.scena}“ existuje`);
ok(/scenyHtml\[c\.id\]\s*=/.test(zdroj) && /data-karta=\{k\.id\}[^>]*scenyHtml\[k\.id\]/.test(zdroj), 'každá karta dostává klíč ve scenyHtml a prvek data-karta');
const odhaly = [...zdroj.matchAll(/<g\s+data-odhal="1"[^>]*>/g)].map((m) => m[0]);
ok(odhaly.length >= 1 && odhaly.every((tag) => /opacity="0"/.test(tag)), 'prvky data-odhal mají výchozí opacity 0');
ok(/atr = 'data-odhal'[\s\S]*?`<g \$\{atr\}="1" opacity="0">/.test(zdroj), 'pomocná osa s data-odhal má výchozí opacity 0');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(zdroj), 'stránka při odhalení přepíná opacity atributem na 1');
ok(/\[data-odhal\],[^\n]*\[data-bonus\][^\n]*\.setAttribute\('opacity', '0'\)/.test(zdroj), 'stránka při nové kartě vrací opacity atributem na 0');

// f) Regrese N8-1: scény se přepínají třídou, ne atributem hidden, a animace začíná od nuly.
ok(/<div class="scena skryta" data-karta=\{k\.id\}/.test(zdroj) && !/<div class="scena[^"]*"[^>]*\shidden(?:\s|>)/.test(zdroj), 'scény začínají třídou skryta a nemají atribut hidden');
const cssSkryta = zdroj.match(/\.scena\.skryta\s*\{([^}]*)\}/)?.[1] ?? '';
ok(/visibility\s*:\s*hidden/.test(cssSkryta), 'CSS .scena.skryta obsahuje visibility: hidden');
ok(/classList\.toggle\('skryta',[\s\S]*?setCurrentTime\?\.\(0\)/.test(zdroj), 'po přepnutí scény se volá setCurrentTime(0)');

// g) Hra funguje bez cizích adres.
ok(!/https?:\/\/(?!lab\.wonderly)/.test(zdroj.replace(/xmlns="[^"]+"/g, '')), 'komponenta nenačítá nic z cizích adres');

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
