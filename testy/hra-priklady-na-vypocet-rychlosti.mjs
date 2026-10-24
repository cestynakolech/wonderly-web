#!/usr/bin/env node
// TEST HRY „Rychlostní laboratoř“ (Příklady na výpočet rychlosti, F7).
// Podvrh komponenty lze předat přes HRA_KOMPONENTA=<cesta>.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaKomponenty = process.env.HRA_KOMPONENTA || join(koren, 'src/components/hry/HraPrikladyNaVypocetRychlosti.astro');
const cestaPdf = '/tmp/codex-hry/pdf-text/7-04-rovnomerny-pohyb-vypocty.txt';
const cestaZdroju = '/tmp/codex-hry/priklady/zdroj.json';
const zdroj = readFileSync(cestaKomponenty, 'utf8');
const pdf = readFileSync(cestaPdf, 'utf8');
const zdrojeKaret = JSON.parse(readFileSync(cestaZdroju, 'utf8'));

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

const rozbal = (s = '') => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
const pole = (blok, jmeno) => rozbal(blok.match(new RegExp(`\\b${jmeno}:\\s*'((?:\\\\.|[^'])*)'`))?.[1] ?? '');
const popisMoznosti = (blok, pismeno) => rozbal(blok.match(new RegExp(`\\b${pismeno}:\\s*\\{\\s*popis:\\s*'((?:\\\\.|[^'])*)'`))?.[1] ?? '');
const kola = [...zdroj.matchAll(/\{\s*cislo:\s*(\d+),[\s\S]*?body:\s*(\d+),\s*karty:\s*\[([\s\S]*?)\n\t\t\],\s*\n\t\},/g)].map((m) => {
	const vychoziMoznosti = { A: popisMoznosti(m[0], 'A'), B: popisMoznosti(m[0], 'B') };
	const casti = [...m[3].matchAll(/\{ id:/g)].map((x) => x.index);
	const karty = casti.map((od, i) => m[3].slice(od, casti[i + 1] ?? m[3].length)).map((blok) => ({
		id: pole(blok, 'id'), scena: pole(blok, 'scena'), otazka: pole(blok, 'otazka'),
		spravne: pole(blok, 'spravne'), proc: pole(blok, 'proc'), opora: pole(blok, 'opora'), zdroj: pole(blok, 'zdroj'),
		moznosti: { A: popisMoznosti(blok, 'A') || vychoziMoznosti.A, B: popisMoznosti(blok, 'B') || vychoziMoznosti.B },
	}));
	return { cislo: Number(m[1]), body: Number(m[2]), blok: m[3], karty };
});
const karty = kola.flatMap((k) => k.karty);
const opory = [...zdroj.matchAll(/\bopora:\s*'((?:\\.|[^'])*)'/g)].map((m) => rozbal(m[1]));
const blokNapisu = zdroj.match(/const NAPIS[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? '';
const napisy = new Map([...blokNapisu.matchAll(/'([^']+)'\s*:\s*'((?:\\.|[^'])*)'/g)].map((m) => [m[1], rozbal(m[2])]));
const normalizujVysledek = (s) => s.toLocaleUpperCase('cs').replace(/\s+/g, '').replace(/−/g, '-');
const cislo = (s) => Number(String(s).replace(/\s/g, ''));

const { temata } = await nactiData();
let obsah = '';
for (const tema of temata['fyzika/7-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'priklady-na-vypocet-rychlosti') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Příklady na výpočet rychlosti nalezen');
const textVykladu = obsah.replace(/alt="([^"]*)"/g, ' $1 ').replace(/<\/?(strong|em|b|i)>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const veVykladu = (s) => textVykladu.includes(s.replace(/\s+/g, ' '));

ok(opory.length === 18, `18 opor: 3 kola a 15 karet (je ${opory.length})`);
for (const opora of opory) ok(opora.length >= 12 && veVykladu(opora), `opora doslova ve výkladu („${opora.slice(0, 55)}“)`);

const cislaPovolena = new Set(`${textVykladu} ${pdf}`.match(/\d+/g) ?? []);
for (const karta of karty) {
	const odvozena = new Set(karta.id === 'k3-10s' ? ['10', '50'] : karta.id === 'k3-4min' ? ['240'] : karta.id === 'k3-draha-minuta' ? ['60'] : []);
	for (const n of `${karta.otazka} ${karta.proc}`.match(/\d+/g) ?? []) ok(cislaPovolena.has(n) || odvozena.has(n), `${karta.id}: číslo ${n} je ve výkladu, PDF nebo přímo odvozeném výpočtu`);
}

ok(kola.length === 3, `3 kola (jsou ${kola.length})`);
ok(karty.length === 15, `celkem 15 karet (je ${karty.length})`);
ok(new Set(karty.map((k) => k.id)).size === 15, 'id karet jsou jedinečná');
ok(new Set(karty.map((k) => k.scena)).size === 15, 'každá karta má vlastní scénu');
for (const kolo of kola) {
	ok(kolo.karty.length === 5, `kolo ${kolo.cislo}: 5 karet`);
	const a = kolo.karty.filter((k) => k.spravne === 'A').length;
	const b = kolo.karty.filter((k) => k.spravne === 'B').length;
	ok(a >= 2 && b >= 2, `kolo ${kolo.cislo}: A i B aspoň 2× (A ${a}, B ${b})`);
}
ok(kola[0]?.body === 1 && kola[1]?.body === 1 && kola[2]?.body === 2, 'body za kola jsou 1, 1 a 2');
ok(kola.reduce((s, k) => s + k.body * k.karty.length, 0) === 20, 'maximum je 20 bodů');

const spravne = new Map([
	['k1-rychlost', 'A'], ['k1-draha', 'B'], ['k1-cas', 'A'], ['k1-tvrzeni-rychlost', 'B'], ['k1-tvrzeni-useky', 'A'],
	['k2-kmh', 'A'], ['k2-ms', 'A'], ['k2-osa-casu', 'B'], ['k2-graf-v', 'A'], ['k2-graf-s', 'B'],
	['k3-draha-minuta', 'A'], ['k3-4min', 'B'], ['k3-6min', 'A'], ['k3-rychlost', 'B'], ['k3-10s', 'A'],
]);
for (const karta of karty) ok(karta.spravne === spravne.get(karta.id), `${karta.id}: správná odpověď odpovídá zdroji`);

const ocekavaneOdpovedi = new Map([
	['k1-rychlost', 'DĚLIT'], ['k1-draha', 'NÁSOBIT'], ['k1-cas', 'DĚLIT'],
	['k1-tvrzeni-rychlost', 'NE'], ['k1-tvrzeni-useky', 'ANO'],
	['k2-kmh', 'ANO'], ['k2-ms', 'ANO'], ['k2-graf-v', 'ANO'], ['k2-osa-casu', 'NE'], ['k2-graf-s', 'NE'],
	['k3-rychlost', '5 m/s'], ['k3-draha-minuta', '300 m'], ['k3-4min', '1 200 m'], ['k3-6min', '1 800 m'], ['k3-10s', '50 m'],
]);
for (const karta of karty) {
	const ocekavana = normalizujVysledek(ocekavaneOdpovedi.get(karta.id) ?? '');
	const shody = Object.values(karta.moznosti).filter((moznost) => normalizujVysledek(moznost) === ocekavana).length;
	ok(Boolean(ocekavana), `${karta.id}: test zná věcně správný výsledek`);
	ok(shody === 1, `${karta.id}: právě jedna možnost obsahuje správný výsledek`);
	ok(normalizujVysledek(karta.moznosti[karta.spravne]) === ocekavana, `${karta.id}: označená možnost je jediný správný výsledek`);
}

for (const karta of karty.filter((k) => k.id.startsWith('k3-'))) {
	let hodnota;
	let jednotka;
	if (karta.id === 'k3-rychlost') {
		const vstupy = karta.otazka.match(/(\d[\d ]*) m za (\d[\d ]*) min/);
		ok(Boolean(vstupy), `${karta.id}: vstupní dráha a čas jsou čitelné ze zadání`);
		if (vstupy) hodnota = cislo(vstupy[1]) / (cislo(vstupy[2]) * 60);
		jednotka = 'm/s';
	} else {
		const vstupy = karta.otazka.match(/rychlostí (\d[\d ]*) m\/s[\s\S]*?za (\d[\d ]*) (min|s)/);
		ok(Boolean(vstupy), `${karta.id}: vstupní rychlost a čas jsou čitelné ze zadání`);
		if (vstupy) hodnota = cislo(vstupy[1]) * cislo(vstupy[2]) * (vstupy[3] === 'min' ? 60 : 1);
		jednotka = 'm';
	}
	ok(Number.isInteger(hodnota), `${karta.id}: přepočtený výsledek je celé číslo`);
	const ocekavanyText = `${hodnota?.toLocaleString('cs-CZ')} ${jednotka}`;
	ok(normalizujVysledek(karta.moznosti[karta.spravne]) === normalizujVysledek(ocekavanyText), `${karta.id}: správná možnost odpovídá přepočtu ze zadání (${ocekavanyText})`);
	ok(normalizujVysledek(napisy.get(karta.id) ?? '') === normalizujVysledek(ocekavanyText), `${karta.id}: nápis po odhalení odpovídá přepočtu (${ocekavanyText})`);
	ok(normalizujVysledek(karta.proc).includes(normalizujVysledek(ocekavanyText)), `${karta.id}: vysvětlení obsahuje přepočtený výsledek (${ocekavanyText})`);
	const rovnice = karta.proc.match(/(\d[\d ]*)\s*([·:])\s*(\d[\d ]*)\s*=\s*(\d[\d ]*)/);
	ok(Boolean(rovnice), `${karta.id}: vysvětlení obsahuje kontrolovatelnou rovnici`);
	if (rovnice) {
		const leva = rovnice[2] === '·' ? cislo(rovnice[1]) * cislo(rovnice[3]) : cislo(rovnice[1]) / cislo(rovnice[3]);
		ok(leva === cislo(rovnice[4]), `${karta.id}: rovnice ve vysvětlení je početně správná`);
		ok(leva === hodnota, `${karta.id}: rovnice vede ke správnému výsledku ze zadání`);
	}
}
for (const karta of karty) {
	const nap = napisy.get(karta.id) ?? '';
	const odpoved = karta.moznosti[karta.spravne];
	const detail = nap.includes(':') ? nap.slice(nap.indexOf(':') + 1) : nap;
	ok(Boolean(nap), `${karta.id}: má nápis po odhalení`);
	ok(normalizujVysledek(nap).startsWith(normalizujVysledek(odpoved)), `${karta.id}: nápis „${nap}“ odpovídá správné možnosti „${odpoved}“`);
	ok(normalizujVysledek(karta.proc).includes(normalizujVysledek(detail)), `${karta.id}: vysvětlení obsahuje výsledek nápisu „${detail.trim()}“`);
}

const strany = new Map([...pdf.matchAll(/=== STRANA (\d+) ===([\s\S]*?)(?==== STRANA|$)/g)].map((m) => [Number(m[1]), m[2]]));
ok(zdrojeKaret.length === 15, `zdrojový záznam má 15 položek (má ${zdrojeKaret.length})`);
for (const karta of karty) {
	const zaznam = zdrojeKaret.find((z) => z.id === karta.id);
	const n = Number(karta.zdroj.match(/^s\. (\d+)$/)?.[1]);
	ok(Boolean(karta.zdroj) && Number.isInteger(n), `${karta.id}: neprázdný zdroj ve tvaru s. N`);
	ok(Boolean(zaznam) && zaznam.otazka === karta.otazka && zaznam.spravne === karta.spravne, `${karta.id}: zdrojový záznam odpovídá kartě`);
	ok(zaznam?.zdroj_strana === n, `${karta.id}: strana ve zdrojovém záznamu souhlasí`);
	ok(typeof zaznam?.zdroj_uryvek === 'string' && zaznam.zdroj_uryvek.length >= 12 && strany.get(n)?.includes(zaznam.zdroj_uryvek), `${karta.id}: doslovný úryvek je na uvedené straně PDF`);
}

const sceny = new Set([...zdroj.matchAll(/case '([^']+)'/g)].map((m) => m[1]));
for (const karta of karty) ok(sceny.has(karta.scena), `${karta.id}: scéna „${karta.scena}“ existuje`);
ok(/scenyHtml\[c\.id\]\s*=/.test(zdroj) && /data-karta=\{k\.id\}[^>]*scenyHtml\[k\.id\]/.test(zdroj), 'každá karta dostává SVG přes scenyHtml a data-karta');
ok(/<animate(?:Transform|Motion)?\b/.test(zdroj), 'scény používají inline SMIL animace');
ok(/values="80 0;200 0;320 0;440 0;560 0"/.test(zdroj), 'rovnoměrný pohyb má stejné rozestupy za stejné doby');
ok(!/chůz/i.test(zdroj), 'hra neopakuje chybu PDF: pohyb 5 m/s není označen jako chůze');
ok(/1 min = 60 s, s = 5 · 60 = 300 m/.test(zdroj), 'finále ukazuje převod minuty na sekundy i výpočet dráhy');
ok(/6 min = 360 s, s = 5 · 360 = 1 800 m/.test(zdroj), 'karta se 6 minutami ukazuje převod i výpočet');
ok(/v \(m\/s\)/.test(zdroj) && /s \(m\)/.test(zdroj) && /t \(s\)/.test(zdroj), 'grafy popisují veličiny i jednotky');
const idMarkeru = [...zdroj.matchAll(/prazdnyGraf\('([^']+)'\)/g)].map((m) => m[1]);
ok(idMarkeru.length === 3 && new Set(idMarkeru).size === 3, 'každý graf má jedinečné id značky šipky');
for (const id of idMarkeru) ok(zdroj.includes(`prazdnyGraf('${id}')`), `značka šipky ${id} je použitá v grafu`);
ok(/M90 330 L540 100/.test(zdroj), 'přímka grafu dráhy vychází z počátku');
ok(/M90 175 H545/.test(zdroj) && /animateMotion path="M90 175 H545"/.test(zdroj), 'graf rychlosti začíná na svislé ose v čase 0');
ok(/popiskyGrafu = \(osaY: string\) => `<text x="100" y="70"/.test(zdroj), 'popisek osy y je napravo od svislé osy a mimo rámeček odpovědi');
ok(/font-size="30" font-weight="800">\$\{a\}/.test(zdroj), 'texty ve scénách formule používají písmo 30 px');
ok(/const tomasPohyb[\s\S]*?<circle[\s\S]*?case 'tomas-1min': return tomasPohyb/.test(zdroj), 'Tomáš je ve finále postava, ne auto');
ok(kola[2]?.karty[0]?.id === 'k3-rychlost', 'výpočet Tomášovy rychlosti je první kartou finále');
const prvniKoloBezOpor = kola[0]?.karty.map((k) => `${k.otazka} ${k.proc}`).join(' ') ?? '';
ok(!/5 m\/s|600 m|1 800 m/.test(prvniKoloBezOpor), 'první kolo neprozrazuje rychlost ani výsledky z finále');
ok(/case 'pohyb-useky': return rovnomernyPohyb\('Stejné časy → stejné dráhy'/.test(zdroj), 'scéna tvrzení o časových úsecích neprozrazuje čísla z finále');
ok(/id: 'k3-draha-minuta'[\s\S]*?moznosti: \{ A: \{ popis: '300 m'[\s\S]*?B: \{ popis: '150 m'/.test(zdroj), 'k3-draha-minuta má jedinou správnou možnost 300 m a chybný distraktor 150 m');
ok(kola[1]?.karty.map((k) => k.id).join(',') === 'k2-kmh,k2-ms,k2-osa-casu,k2-graf-v,k2-graf-s', 'karta o časové ose je před oběma grafy');
ok(kola[1]?.karty.filter((k) => k.spravne === 'A').length === 3 && kola[1]?.karty.filter((k) => k.spravne === 'B').length === 2, 'kolo 2 má poměr správných odpovědí A:B přesně 3:2');
ok(!zdroj.includes('k3-2min'), 've komponentě nezůstal starý zavádějící identifikátor k3-2min');
ok(/case 'osa-casu': return `\$\{prazdnyGraf\('sipka-osa-casu'\)\}<g data-odhal="1" opacity="0">\$\{popiskyGrafu/.test(zdroj), 'popisky časové osy se ukážou až po odhalení');
ok(/case 'pohyb-rychlost': return rovnomernyPohyb\('Rychlost se nemění', '#6741d9', true\)/.test(zdroj), 'odpovědní popisek scény o rychlosti je skrytý do odhalení');
ok(/case 'pohyb-useky': return rovnomernyPohyb\('Stejné časy → stejné dráhy', '#f08c00', true\)/.test(zdroj), 'odpovědní popisek scény o úsecích je skrytý do odhalení');
ok(/case 'graf-rychlosti': return `\$\{prazdnyGraf\('sipka-graf-rychlosti'\)\}<g data-odhal="1" opacity="0">\$\{popiskyGrafu/.test(zdroj), 'popisky obou os grafu rychlosti jsou skryté do odhalení');
ok(/case 'graf-drahy': return `\$\{prazdnyGraf\('sipka-graf-drahy'\)\}<g data-odhal="1" opacity="0">\$\{popiskyGrafu/.test(zdroj), 'popisky obou os grafu dráhy jsou skryté do odhalení');
ok(karty.some((k) => k.id === 'k1-tvrzeni-rychlost' && k.scena === 'pohyb-rychlost'), 'tvrzení o rychlosti má neutrální a věcný identifikátor');
ok(karty.some((k) => k.id === 'k1-tvrzeni-useky' && k.scena === 'pohyb-useky'), 'tvrzení o úsecích má neutrální a věcný identifikátor');
ok(/nazev: 'Vzorce a pravidla pohybu'[\s\S]*?pravidlo: 'Vyber správnou odpověď podle zadání karty\.'/s.test(zdroj), 'úvod prvního kola odpovídá smíšeným typům karet');
ok(kola[0]?.karty.filter((k) => /^(ANO|NE)$/.test(k.moznosti.A) && /^(ANO|NE)$/.test(k.moznosti.B)).every((k) => k.moznosti.A === 'ANO' && k.moznosti.B === 'NE'), 'ANO/NE má v prvním kole stejné pořadí A=ANO, B=NE jako ve druhém kole');
ok(!/<animate[^>]+attributeName="(?:opacity|display|visibility)"/.test(zdroj), 'těleso se během animace neskrývá');
const odhaly = [...zdroj.matchAll(/<g\s+data-odhal="1"[^>]*>/g)].map((m) => m[0]);
ok(odhaly.length >= 3 && odhaly.every((tag) => /opacity="0"/.test(tag)), 'všechny prvky data-odhal mají opacity 0');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(zdroj), 'odhalení přepíná opacity na 1');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '0'\)\)/.test(zdroj), 'nová karta vrací opacity na 0');
ok(/<div class="scena skryta" data-karta=\{k\.id\}/.test(zdroj) && !/<div class="scena[^"]*"[^>]*\shidden(?:\s|>)/.test(zdroj), 'scény začínají třídou skryta, ne atributem hidden');
ok(/\.scena\.skryta\s*\{[^}]*visibility\s*:\s*hidden/.test(zdroj), 'CSS .scena.skryta používá visibility: hidden');
ok(/classList\.toggle\('skryta',[\s\S]*?setCurrentTime\?\.\(0\)/.test(zdroj), 'po přepnutí scény se volá setCurrentTime(0)');
ok(!/https?:\/\/(?!lab\.wonderly)/.test(zdroj.replace(/xmlns="[^"]+"/g, '')), 'komponenta nenačítá cizí adresy');

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
