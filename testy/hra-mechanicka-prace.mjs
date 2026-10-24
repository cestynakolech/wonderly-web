#!/usr/bin/env node
// TEST HRY „Mechanická práce“ (F8). Podvrh lze předat přes HRA_KOMPONENTA=<cesta>.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaKomponenty = process.env.HRA_KOMPONENTA || join(koren, 'src/components/hry/HraMechanickaPrace.astro');
const zdroj = readFileSync(cestaKomponenty, 'utf8');
const pdfCesta = process.env.HRA_PDF || '/tmp/codex-hry/pdf-text/8-mechanicka-prace.txt';
// Citace zdroje (15 krátkých úryvků z PDF 8) jsou v repu; celý text PDF se nezveřejňuje.
const cestaZdroju = join(koren, 'testy/zdroje/mechanicka-prace-zdroj.json');
let pdf = null;
try { pdf = readFileSync(pdfCesta, 'utf8'); } catch { /* PDF text mimo repo nemusí být k dispozici (Cloudflare) */ }
const zdrojJson = JSON.parse(readFileSync(cestaZdroju, 'utf8'));

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};
const normalizuj = (s) => s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const retezec = String.raw`((?:\\.|[^'])*)`;
const rozbal = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

const kola = [...zdroj.matchAll(/\{\s*cislo:\s*(\d+),[\s\S]*?body:\s*(\d+),\s*karty:\s*\[([\s\S]*?)\n\t\t\],\s*\n\t\},/g)].map((m) => ({
	cislo: Number(m[1]), body: Number(m[2]), blok: m[3], karty: [],
}));
const kartaRe = new RegExp(
	`\\{\\s*id:\\s*'${retezec}',\\s*scena:\\s*'${retezec}',\\s*otazka:\\s*'${retezec}',\\s*spravne:\\s*'([AB])',\\s*` +
	`proc:\\s*'${retezec}',\\s*opora:\\s*'${retezec}',\\s*zdroj:\\s*'${retezec}'\\s*\\}`,
	'g',
);
for (const kolo of kola) {
	for (const m of kolo.blok.matchAll(kartaRe)) {
		kolo.karty.push({
			id: rozbal(m[1]), scena: rozbal(m[2]), otazka: rozbal(m[3]), spravne: m[4],
			proc: rozbal(m[5]), opora: rozbal(m[6]), zdroj: rozbal(m[7]),
		});
	}
}
const karty = kola.flatMap((k) => k.karty);

const { temata } = await nactiData();
let obsah = '';
for (const tema of temata['fyzika/8-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'mechanicka-prace') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Mechanická práce nalezen v temata.ts');
const text = normalizuj(obsah
	.replace(/alt="([^"]*)"/g, ' $1 ')
	.replace(/<\/?(strong|em|b|i)>/g, '')
	.replace(/<[^>]+>/g, ' '));
const vyklad = (s) => text.includes(normalizuj(s));

// a) Doslovné opory: tři pro kola a patnáct pro karty.
const opory = [...zdroj.matchAll(new RegExp(`\\bopora:\\s*'${retezec}'`, 'g'))].map((m) => rozbal(m[1]));
ok(opory.length === 18, `18 opor: 3 kola a 15 karet (je ${opory.length})`);
for (const opora of opory) ok(normalizuj(opora).length >= 12 && vyklad(opora), `opora je doslova ve výkladu („${opora.slice(0, 55)}“)`);

// b) Čísla v kartách smějí pocházet jen z výkladu nebo citovaných úryvků PDF.
const povolenaCisla = new Set(`${text} ${zdrojJson.map((z) => z.zdroj_uryvek).join(' ')}`.match(/\d+/g) ?? []);
for (const karta of karty) for (const n of `${karta.otazka} ${karta.proc}`.match(/\d+/g) ?? []) {
	ok(povolenaCisla.has(n), `${karta.id}: číslo ${n} je ve výkladu nebo citovaném úryvku PDF`);
}

// c) Tvar hry, vyváženost a bodování.
ok(kola.length === 3, `3 kola (jsou ${kola.length})`);
ok(karty.length === 15, `celkem 15 karet (je ${karty.length})`);
ok(new Set(karty.map((k) => k.id)).size === 15, 'id karet jsou jedinečná');
ok(new Set(karty.map((k) => k.scena)).size === 15, 'každá karta má vlastní scénu');
for (const kolo of kola) {
	ok(kolo.karty.length === 5, `kolo ${kolo.cislo}: 5 karet`);
	const a = kolo.karty.filter((k) => k.spravne === 'A').length;
	const b = kolo.karty.filter((k) => k.spravne === 'B').length;
	ok(a >= 2 && b >= 2, `kolo ${kolo.cislo}: A i B aspoň 2× (A ${a}, B ${b})`);
	const rada = kolo.karty.map((k) => k.spravne).join('');
	ok(!/AAA|BBB/.test(rada), `kolo ${kolo.cislo}: nejvýše dvě stejné odpovědi za sebou (${rada})`);
}
const radaCeleHry = karty.map((k) => k.spravne).join('');
ok(!/AAA|BBB/.test(radaCeleHry), `v celé hře ani přes hranice kol nejsou tři stejné odpovědi za sebou (${radaCeleHry})`);
ok(kola[0]?.body === 1 && kola[1]?.body === 1, 'kola 1 a 2 jsou za 1 bod');
ok(kola[2]?.body === 2, 'finále je za 2 body');
const maximum = kola.reduce((s, k) => s + k.karty.length * k.body, 0);
ok(maximum === 20, `maximum bodů je 20 (je ${maximum})`);

// d) Správné odpovědi se odvozují z doložených vstupů a výpočtů, ne z komponenty.
const strany = new Map();
for (const m of (pdf ?? '').matchAll(/=== STRANA (\d+) ===([\s\S]*?)(?==== STRANA|$)/g)) strany.set(Number(m[1]), m[2]);
const bezMezer = (s) => normalizuj(String(s)).replace(/\s/g, '').replace(/·|⋅/g, '*');
const uryvek = (z) => bezMezer(z.zdroj_uryvek).toLowerCase();
const vztahDrahyZUryvku = (z) => uryvek(z).match(/s=(?:w:f|f:w)/)?.[0] ?? '';
const prevedCislo = (s) => s == null ? Number.NaN : Number(String(s).replace(/\s/g, ''));
const rozdelOtazku = (otazka) => {
	const [zadani, tvrzeni = otazka] = otazka.split(/Tvrzení:\s*/i);
	return { zadani, tvrzeni };
};
const hodnotaRovnosti = (textOtazky, znacka, jednotka) => {
	const bezpecnaJednotka = jednotka.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return prevedCislo(textOtazky.match(new RegExp(`\\b${znacka}\\s*=\\s*([\\d][\\d ]*)\\s*${bezpecnaJednotka}`, 'i'))?.[1]);
};
const vztahZTvrzeni = (tvrzeni) => bezMezer(tvrzeni).toLowerCase().match(/s=(?:w:f|f:w)/)?.[0] ?? '';
const vstupyOtazky = (karta) => {
	const { zadani, tvrzeni } = rozdelOtazku(karta.otazka);
	if (karta.id === 'k2-joule') return {
		F: prevedCislo(tvrzeni.match(/síla\s+([\d ]+)\s*N/i)?.[1]),
		s: prevedCislo(tvrzeni.match(/dráze\s+([\d ]+)\s*m/i)?.[1]),
		tvrzeni: prevedCislo(tvrzeni.match(/Práce\s+([\d ]+)\s*J/i)?.[1]),
	};
	return {
		F: hodnotaRovnosti(zadani, 'F', 'N'), s: hodnotaRovnosti(zadani, 's', 'm'),
		m: hodnotaRovnosti(zadani, 'm', 'kg'), g: hodnotaRovnosti(zadani, 'g', 'N/kg'),
		W: hodnotaRovnosti(zadani, 'W', 'J'),
		tvrzeniW: hodnotaRovnosti(tvrzeni, 'W', 'J'), tvrzeniF: hodnotaRovnosti(tvrzeni, 'F', 'N'),
	};
};
const pravdivost = (z, karta) => {
	const o = z.overeni;
	const { tvrzeni } = rozdelOtazku(karta.otazka);
	const v = vstupyOtazky(karta);
	switch (o.typ) {
		case 'prace': return !uryvek(z).includes('tatosílanemážádnéposuvnéúčinky') && /(uvedemedopohybu|zvedánáklad|vykonápráci)/.test(uryvek(z));
		case 'vzorec': return bezMezer(z.zdroj_uryvek).includes('W=F*s') && o.tvrzeni === 'W=F*s';
		case 'jednotka': return normalizuj(z.zdroj_uryvek).toLowerCase().includes(tvrzeni.match(/je\s+([\p{L}]+)/iu)?.[1]?.toLowerCase() ?? '');
		case 'zakladni-jednotky': return uryvek(z).includes(o.sila) && uryvek(z).includes(o.draha);
		case 'prevod': return prevedCislo(uryvek(z).match(/1mj=(\d+)j/)?.[1]) === prevedCislo(bezMezer(tvrzeni).match(/1mj=(\d+)j/)?.[1]);
		case 'prace-vypocet': return v.F * v.s === (karta.id === 'k2-joule' ? v.tvrzeni : v.tvrzeniW);
		case 'zvedani': return v.m * v.g * v.s === v.tvrzeniW;
		case 'sila': return v.W / v.s === v.tvrzeniF;
		case 'vzorec-drahy': return vztahDrahyZUryvku(z) === vztahZTvrzeni(tvrzeni);
		default: return false;
	}
};
const skutecnyVysledek = (z, karta) => {
	const o = z.overeni;
	const v = vstupyOtazky(karta);
	if (o.typ === 'prace-vypocet') return v.F * v.s;
	if (o.typ === 'zvedani') return v.m * v.g * v.s;
	if (o.typ === 'sila') return v.W / v.s;
	return o.vysledek;
};
const napisyBlok = zdroj.match(/const NAPIS:[\s\S]*?=\s*\{([\s\S]*?)\n\};/)?.[1] ?? '';
const napisy = new Map([...napisyBlok.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]]));
const odvozovaneZOtazky = zdrojJson.filter((z) => z.id === 'k2-watt' || z.id === 'k2-megajoule' || z.id.startsWith('k3-'));
ok(odvozovaneZOtazky.every((z) => !['tvrzeni', 'F', 's', 'm', 'g', 'W', 'skutecnost', 'vysledek'].some((klic) => klic in z.overeni)), 'k2-watt, k2-megajoule a k3-* nemají vstupy ani tvrzení duplikované v JSON');
ok(uryvek(zdrojJson.find((z) => z.id === 'k1-nakup')).includes('tatosílanemážádnéposuvnéúčinky'), 'k1-nakup obsahuje doslovnou rozhodující větu z PDF');
for (const karta of karty) {
	const z = zdrojJson.find((x) => x.id === karta.id);
	const ocekavana = z && pravdivost(z, karta) ? 'A' : 'B';
	ok(Boolean(z) && karta.spravne === ocekavana, `${karta.id}: odpověď je odvozena ze zdroje nebo výpočtu`);
	const vysledek = z && skutecnyVysledek(z, karta);
	if (Number.isFinite(vysledek)) {
		const hledane = `${vysledek}${z.overeni.jednotka}`;
		ok(bezMezer(karta.proc).includes(hledane), `${karta.id}: vysvětlení obsahuje vypočtený výsledek ${hledane}`);
		ok(bezMezer(napisy.get(karta.id) ?? '').includes(hledane), `${karta.id}: nápis po odhalení obsahuje vypočtený výsledek ${hledane}`);
	}
	if (z?.overeni.typ === 'vzorec-drahy') {
		const spravnyVztah = vztahDrahyZUryvku(z);
		ok(Boolean(spravnyVztah) && bezMezer(karta.proc).toLowerCase().includes(spravnyVztah), `${karta.id}: vysvětlení uvádí vztah odvozený z úryvku`);
		ok(Boolean(spravnyVztah) && bezMezer(napisy.get(karta.id) ?? '').toLowerCase().includes(spravnyVztah), `${karta.id}: nápis uvádí vztah odvozený z úryvku`);
	}
}

// e) Citace PDF i výkladu a samostatný zdrojový soupis.
for (const karta of karty) {
	ok(/^(s\. \d+|výklad podtématu)$/.test(karta.zdroj), `${karta.id}: zdroj je přesně označen`);
}
ok(Array.isArray(zdrojJson) && zdrojJson.length === 15, 'zdrojový záznam obsahuje 15 položek');
for (const karta of karty) {
	const z = zdrojJson.find((x) => x.id === karta.id);
	ok(Boolean(z) && z.otazka === karta.otazka && z.zdroj === karta.zdroj, `${karta.id}: zdrojový záznam odpovídá kartě`);
	ok(Boolean(z) && z.zdroj_uryvek.length >= 12, `${karta.id}: citace má úryvek aspoň 12 znaků`);
	if (z?.zdroj === 'výklad podtématu') ok(vyklad(z.zdroj_uryvek), `${karta.id}: úryvek je doslova ve výkladu`);
	else if (pdf) ok(Boolean(z) && normalizuj(strany.get(z.zdroj_strana) ?? '').includes(normalizuj(z.zdroj_uryvek)), `${karta.id}: úryvek je doslova na citované straně PDF`);
}
if (!pdf) console.log('PŘESKOČENO: PDF text není k dispozici (kontrola stran a úryvků proti PDF; hlavní kontrola citací z testy/zdroje/ proběhla)');

// f) Každá scéna existuje, je animovaná a odpověď je skrytá do odhalení.
const sceny = new Map([...zdroj.matchAll(/case '([^']+)': return `([\s\S]*?)`;/g)].map((m) => [m[1], m[2]]));
for (const karta of karty) {
	const scena = sceny.get(karta.scena) ?? '';
	ok(Boolean(scena), `${karta.id}: scéna „${karta.scena}“ existuje`);
	ok(/<animate(?:Transform)?\b/.test(scena), `${karta.id}: scéna je animovaná pomocí SMIL`);
}
const viditelnyTextSceny = (scena) => [...scena.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => normalizuj(m[1])).join(' ');
const obsahujeVysledek = (textSceny, z, karta) => {
	const vysledek = skutecnyVysledek(z, karta);
	return Number.isFinite(vysledek) && bezMezer(textSceny).includes(`${vysledek}${z.overeni.jednotka}`);
};
for (const kolo of kola) for (const karta of kolo.karty) {
	const z = zdrojJson.find((x) => x.id === karta.id);
	const scena = sceny.get(karta.scena) ?? '';
	if (z && Number.isFinite(skutecnyVysledek(z, karta))) ok(!obsahujeVysledek(viditelnyTextSceny(scena), z, karta), `${karta.id}: scéna před odhalením neukazuje výsledek`);
	for (const jina of kolo.karty.filter((x) => x.id !== karta.id)) {
		const jinyZdroj = zdrojJson.find((x) => x.id === jina.id);
		if (jinyZdroj && Number.isFinite(skutecnyVysledek(jinyZdroj, jina))) ok(!obsahujeVysledek(`${karta.otazka} ${viditelnyTextSceny(scena)}`, jinyZdroj, jina), `${karta.id}: neprozrazuje výsledek karty ${jina.id}`);
	}
}
ok([...zdroj.matchAll(/<g\s+data-odhal="1"[^>]*>/g)].every((m) => /opacity="0"/.test(m[0])), 'všechny prvky data-odhal mají výchozí opacity 0');
ok(/scenyHtml\[c\.id\]\s*=/.test(zdroj) && /data-karta=\{k\.id\}[^>]*scenyHtml\[k\.id\]/.test(zdroj), 'každá karta dostává vlastní vykreslenou scénu');
ok(!/<animate(?:Transform)?[^>]+attributeName="(?:opacity|display|visibility)"/.test([...sceny.values()].join('\n')), 'tělesa se během animace neskrývají');
for (const [nazev, scena] of sceny) if (/type="translate"/.test(scena)) ok(/calcMode="linear"/.test(scena), `${nazev}: posuv je rovnoměrný`);
ok(/<g>[\s\S]*?<text[^>]*>20 N<\/text>[\s\S]*?<animateTransform[^>]+type="translate"[\s\S]*?<\/g>/.test(sceny.get('vozik') ?? ''), 'vozík: šipka síly a 20 N jedou společně s vozíkem');
ok(/M205 245V175/.test(sceny.get('nakup') ?? '') && /m205 160-15 22h30z/.test(sceny.get('nakup') ?? ''), 'nákup: šipka síly vede od levého okraje tašky a hrot má mimo ucho');
ok(/<text x="28" y="225"[^>]*>20 N<\/text>/.test(sceny.get('vozik') ?? ''), 'vozík: nápis 20 N má účaří 10 px nad horní hranou vozíku');
ok(/A:\s*\{\s*popis:\s*'TVRZENÍ SEDÍ'/.test(zdroj) && /B:\s*\{\s*popis:\s*'TVRZENÍ NESEDÍ'/.test(zdroj) && !/^Výpočet/.test(karty.find((k) => k.id === 'k3-draha')?.proc ?? ''), 'k3-draha: volby i vysvětlení odpovídají tvrzení');

// g) Regrese skrývání scén a odhalování odpovědi.
ok(/<div class="scena skryta" data-karta=\{k\.id\}/.test(zdroj) && !/<div class="scena[^"]*"[^>]*\shidden(?:\s|>)/.test(zdroj), 'scény začínají třídou skryta a nemají atribut hidden');
const cssSkryta = zdroj.match(/\.scena\.skryta\s*\{([^}]*)\}/)?.[1] ?? '';
ok(/visibility\s*:\s*hidden/.test(cssSkryta), 'CSS .scena.skryta obsahuje visibility: hidden');
ok(/classList\.toggle\('skryta',[\s\S]*?setCurrentTime\?\.\(0\)/.test(zdroj), 'po přepnutí scény se volá setCurrentTime(0)');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(zdroj), 'odhalení nastaví opacity na 1');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '0'\)\)/.test(zdroj), 'nová karta vrátí opacity na 0');
ok(/classList\.toggle\('spravna',\s*el\.dataset\.m\s*===\s*c\.spravne\)[\s\S]*?classList\.toggle\('spatna',\s*el\.dataset\.m\s*!==\s*c\.spravne\)/.test(zdroj), 'po odhalení je správná právě jedna volba a druhá je označena jako špatná');
for (const [id, napis] of napisy) ok(napis.length * 25 * 0.55 <= 480, `${id}: nápis se vejde do rámečku 480 px (odhad ${Math.ceil(napis.length * 25 * 0.55)} px)`);

// h) Omezení pohybu a čitelnost po odhalení.
ok(/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(zdroj), 'CSS obsahuje prefers-reduced-motion: reduce');
ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/.test(zdroj), 'JS sleduje prefers-reduced-motion');
ok(/omezeniPohybu\.matches[\s\S]*?pauseAnimations/.test(zdroj), 'JS při omezení pohybu zastaví SVG animace');
ok(/#odpocet-vypln\s*\{\s*transition:\s*none\s*!important/.test(zdroj), 'pruh odpočtu nemá při omezení pohybu přechod');
ok(/if\s*\(!omezeniPohybu\.matches\)\s*requestAnimationFrame/.test(zdroj) && !/if\s*\(omezeniPohybu\.matches\)\s*vypln\.style\.width\s*=\s*'0%'/.test(zdroj), 'při omezení pohybu zůstává pruh během odpočtu plný');
ok(!/\.moznost\.spatna\s*\{[^}]*opacity\s*:/.test(zdroj), 'špatná odpověď se nezeslabuje opacity');

// i) Zapojení hry a žádné cizí adresy.
const stranka = readFileSync(join(koren, 'src/pages/hry/mechanicka-prace.astro'), 'utf8');
const seznam = readFileSync(join(koren, 'src/pages/hry/index.astro'), 'utf8');
const podtema = readFileSync(join(koren, 'src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro'), 'utf8');
ok(/HraMechanickaPrace\.astro/.test(stranka) && /mechanicka-prace-a-vykon\/mechanicka-prace\//.test(stranka), 'stránka importuje komponentu a má správné drobky');
ok(/href="\/hry\/mechanicka-prace"[\s\S]*?Mechanická práce/.test(seznam), 'hra je v seznamu her');
ok(/fyzika\/8-rocnik\/mechanicka-prace-a-vykon\/mechanicka-prace[\s\S]*?href="\/hry\/mechanicka-prace"/.test(podtema), 'podtéma odkazuje na hru');
ok(!/https?:\/\/(?!lab\.wonderly)/.test(zdroj.replace(/xmlns="[^"]+"/g, '')), 'komponenta nenačítá nic z cizích adres');

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
