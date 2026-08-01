#!/usr/bin/env node
// Kontrolní brána webu (verifier) — spouštěj PŘED buildem: node zkontroluj.mjs
// Hlídá nejčastější chybu při přidávání simulace: zapojení musí být na VŠECH místech.
// Nic nemění, jen čte a hlásí. Konec s kódem 1 = něco je špatně.

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { nactiData, maDelkovouNapovedu } from './testy/data.mjs';
import { zkontrolujPopiskyMap } from './testy/mapa-popisky.mjs';
import { zkontrolujCislaVeVykladu } from './testy/cisla-ve-vykladu.mjs';
import { zkontrolujNazvyBloku } from './testy/nazvy-bloku.mjs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = dirname(fileURLToPath(import.meta.url));
const cestaTemata = join(koren, 'src/data/temata.ts');
const cestaKvizy = join(koren, 'src/data/kvizy.ts');
const cestaKomponenty = join(koren, 'src/components/skola2');
const cestaStranka = join(koren, 'src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro');

const chyby = [];
const varovani = [];

// SKUTEČNÁ DATA (ne regulární výrazy nad textem — viz komentář v testy/data.mjs).
// Do 31. 7. 2026 se počítalo regexem a brána tvrdila 2084 otázek místo skutečných 2436:
// 14 bloků shrnutí se skládá programově, takže je žádný vzor nad textem nevidí.
const { kvizy: dataKvizy, temata: dataTemata } = await nactiData();

const temata = readFileSync(cestaTemata, 'utf8');
const stranka = readFileSync(cestaStranka, 'utf8');
const kvizy = readFileSync(cestaKvizy, 'utf8');

// 1) Které interakce se v temata.ts opravdu používají u podtémat
// (interakce = první simulace na stránce, interakce2 = druhá — kontrolují se obě)
const pouzite = [...temata.matchAll(/^\s*interakce:\s*'([^']+)'/gm)].map((m) => m[1]);
const unikatni = [...new Set(pouzite)];
const pouzite2 = [...temata.matchAll(/^\s*interakce2:\s*'([^']+)'/gm)].map((m) => m[1]);
const unikatni2 = [...new Set(pouzite2)];

// 2) Union typ na začátku souboru musí každou z nich obsahovat
const union = temata.match(/interakce\?:\s*([^;]+);/);
for (const i of unikatni) {
	if (!union || !union[1].includes(`'${i}'`)) {
		chyby.push(`interakce '${i}' se používá u podtématu, ale CHYBÍ v seznamu povolených typů (interakce?: … v temata.ts)`);
	}
}
const union2 = temata.match(/interakce2\?:\s*([^;]+);/);
for (const i of unikatni2) {
	if (!union2 || !union2[1].includes(`'${i}'`)) {
		chyby.push(`interakce2 '${i}' se používá u podtématu, ale CHYBÍ v seznamu povolených typů (interakce2?: … v temata.ts)`);
	}
}

// 3) Každá použitá interakce musí být vykreslená na stránce podtématu
for (const i of unikatni) {
	if (!stranka.includes(`interakce === '${i}'`)) {
		chyby.push(`interakce '${i}' se používá v temata.ts, ale NENÍ vykreslená v [podtema]/index.astro (chybí řádek {podtema.interakce === '${i}' && <…Simulace />})`);
	}
}
for (const i of unikatni2) {
	if (!stranka.includes(`interakce2 === '${i}'`)) {
		chyby.push(`interakce2 '${i}' se používá v temata.ts, ale NENÍ vykreslená v [podtema]/index.astro (chybí řádek {podtema.interakce2 === '${i}' && <…Simulace />})`);
	}
}

// 4) Každý import na stránce musí ukazovat na existující komponentu
for (const m of stranka.matchAll(/import\s+(\w+)\s+from\s+'([^']*components\/skola2\/([\w.]+))'/g)) {
	const soubor = join(cestaKomponenty, m[3]);
	if (!existsSync(soubor)) chyby.push(`stránka importuje ${m[1]}, ale soubor ${m[3]} NEEXISTUJE`);
}

// 5) Komponenta simulace, která existuje, ale nikde se nepoužívá (jen varování)
const komponenty = readdirSync(cestaKomponenty).filter((f) => /Simulace\.astro$/.test(f));
for (const k of komponenty) {
	const nazev = k.replace('.astro', '');
	if (!stranka.includes(nazev)) varovani.push(`komponenta ${k} existuje, ale není zapojená na stránce podtématu`);
}

// 6) KVÍZY nad skutečnými daty. Dřív se počítaly vzory nad textem souboru, takže
// jednořádkové otázky ani programově skládaná shrnutí do kontroly vůbec nespadly.
let pocetOtazek = 0;
const bloky = new Map();
for (const [klic, otazky] of Object.entries(dataKvizy)) {
	if (!Array.isArray(otazky)) continue;
	const stat = { celkem: 0, nejdelsi: 0 };
	for (const o of otazky) {
		pocetOtazek++;
		stat.celkem++;
		if (!Array.isArray(o.odpovedi) || o.odpovedi.length !== 3) {
			chyby.push(`${klic}: otázka „${String(o.text).slice(0, 40)}…" nemá tři odpovědi`);
		}
		if (!o.text || !String(o.text).trim()) chyby.push(`${klic}: otázka bez znění`);
		if (maDelkovouNapovedu(o)) stat.nejdelsi++;
	}
	bloky.set(klic, stat);
}

// 6b) DÉLKOVÁ NÁPOVĚDA. Správná odpověď je v datech vždy první a web ji zamíchá — jenže
// míchání mění POŘADÍ, ne DÉLKU. Když je správná odpověď nejdelší, žák ji uhodne bez
// znalosti látky. Náhoda dává ~33 %. Neblokuje build (staré kvízy by zhasly naráz),
// ale ukáže nejhorší bloky, aby se daly dorovnávat po dávkách.
const celkemOtazek = [...bloky.values()].reduce((s, b) => s + b.celkem, 0);
const celkemNejdelsi = [...bloky.values()].reduce((s, b) => s + b.nejdelsi, 0);
const podilNejdelsi = celkemOtazek ? Math.round((celkemNejdelsi / celkemOtazek) * 100) : 0;
const nejhorsi = [...bloky.entries()]
	.filter(([, b]) => b.celkem >= 8 && b.nejdelsi / b.celkem >= 0.75)
	.sort((a, b) => b[1].nejdelsi / b[1].celkem - a[1].nejdelsi / a[1].celkem)
	.slice(0, 5);
if (podilNejdelsi > 45) {
	varovani.push(
		`u ${podilNejdelsi} % otázek je správná odpověď JASNĚ nejdelší (náhoda je 33 %) — jde uhodnout bez znalosti látky. ` +
			`Nejhorší bloky: ${nejhorsi.map(([k, b]) => `${k.split('/').slice(2).join('/')} (${b.nejdelsi}/${b.celkem})`).join(', ')}`,
	);
}

// 6b-ROHATKA. Samotné varování nestačilo: 31. 7. 2026 se podíl za jediný den zhoršil
// ze 64 % na 66 %, protože bodové opravy drží, ale NOVÉ bloky vznikají se stejnou vadou
// rychleji, než se staré dorovnávají. Rohatka hlídá jen SMĚR: staré dluhy nikoho
// neblokují, ale zhoršit se to už nesmí. Zlepšení laťku rovnou utáhne.
const cestaRohatka = join(koren, 'testy/rohatka.json');
const strop = existsSync(cestaRohatka) ? JSON.parse(readFileSync(cestaRohatka, 'utf8')) : null;
if (strop && podilNejdelsi > strop.podilNejdelsi) {
	chyby.push(
		`kvízy se zhoršily: správná odpověď je nejdelší u ${podilNejdelsi} % otázek, ` +
			`naposledy ${strop.podilNejdelsi} %. Dorovnej délky odpovědí v NOVÝCH otázkách ` +
			`(rozdíl pod 10 znaků). Laťku v testy/rohatka.json povoluj jen vědomě.`,
	);
} else if (strop && podilNejdelsi < strop.podilNejdelsi) {
	writeFileSync(cestaRohatka, `${JSON.stringify(
		{ ...strop, podilNejdelsi, zmeneno: new Date().toISOString().slice(0, 10) }, null, '\t')}\n`);
	varovani.push(`kvízy se zlepšily na ${podilNejdelsi} % — laťka utažena (testy/rohatka.json).`);
}

// 6c) Každé podtéma s kvízem musí být zastoupené v ROČNÍM opakování svého ročníku.
// Souhrnný kvíz bere otázky po kolech do stropu — když je strop menší než počet
// podtémat, poslední témata se do opakování NIKDY nedostanou (fyzika 8 měla 35 podtémat
// a strop 30, takže vypadával celý celek zvuk). Stejně tak stačí zapomenout celek
// v seznamu (informatice takhle chybělo vex-iq a hry-ve-scratchi — 144 otázek).
for (const [klic, otazky] of Object.entries(dataKvizy)) {
	if (!Array.isArray(otazky) || !otazky.length) continue;
	const [predmet, rocnik, tema] = klic.split('/');
	if (tema === 'shrnuti') continue;
	const rocni = dataKvizy[`${predmet}/${rocnik}/shrnuti/rocni-shrnuti`];
	if (!Array.isArray(rocni)) continue;
	if (!otazky.some((o) => rocni.includes(o))) {
		chyby.push(`${klic} se NIKDY nedostane do ročního opakování (zvyš strop nebo doplň celek do seznamu)`);
	}
}

// 7) DENÍK (přidáno 31. 7. 2026 po nezávislém auditu): brána hlídala jen školu,
// a tak se na web dostal popis Loketu o anatomickém lokti i „336 dnů na cestě".
// Kontroly jsou schválně hloupé a rychlé — chytají to, co se opravdu stalo.
const cestyDir = new URL('./src/data/cesty/', import.meta.url);
const rokySoubory = readdirSync(cestyDir).filter((f) => /^\d{4}\.ts$/.test(f));
let mistCelkem = 0;
const PODEZRELE = [
	['v textu není popsáno', 'popis vznikl z článku o něčem jiném'],
	['je název dvou', 'popis je z rozcestníku, ne o konkrétním místě'],
	['je název více', 'popis je z rozcestníku, ne o konkrétním místě'],
	['je název několika', 'popis je z rozcestníku, ne o konkrétním místě'],
	['Text se zabývá', 'popis mluví o textu místo o místě'],
];
for (const soubor of rokySoubory) {
	const obsah = readFileSync(new URL(soubor, cestyDir), 'utf8');
	const slugy = [...obsah.matchAll(/^\t\t\tslug: '([^']+)'/gm)].map((m) => m[1]);
	mistCelkem += slugy.length;
	const duplicity = slugy.filter((s, i) => slugy.indexOf(s) !== i);
	if (duplicity.length) {
		chyby.push(`${soubor}: dvě místa mají stejný slug (${[...new Set(duplicity)].join(', ')})`);
	}
	for (const [vzor, proc] of PODEZRELE) {
		if (obsah.includes(vzor)) chyby.push(`${soubor}: ${proc} — hledej „${vzor}"`);
	}
	// videoId musí mít protějšek v seznamu videí roku, jinak karta místa ukáže prázdno
	const videaId = [...obsah.matchAll(/\{ id: '([^']+)'/g)].map((m) => m[1]);
	for (const [, vid] of obsah.matchAll(/videoId: '([^']+)'/g)) {
		if (!videaId.includes(vid)) chyby.push(`${soubor}: videoId ${vid} není v seznamu videí roku`);
	}
	// místo bez souřadnic by se nevykreslilo na mapě
	const pocetX = [...obsah.matchAll(/^\t\t\tx: /gm)].length;
	if (pocetX !== slugy.length) {
		chyby.push(`${soubor}: ${slugy.length} míst, ale ${pocetX} souřadnic x`);
	}
}

// 7b) POPISKY NA MAPÁCH DENÍKU (31. 7. 2026). Jména míst se na mapě roku umísťují
// automaticky a okem se překryv nepozná — pohledů je 182. Kontrola je spočítá:
// obdélník textu proti jinému textu, proti tečkám míst, odznakům shluků, domečku
// a okraji výřezu. Právě tohle odhalilo, že popisek domova („jižní Čechy") ležel
// na cizím pinu v sedmi letech z osmi — kreslil se totiž mimo rozmisťovač.
const mapy = await zkontrolujPopiskyMap();
for (const n of mapy.nalezy) chyby.push(`mapa cest — ${n}`);

// 6d) ČÍSLO VE SPRÁVNÉ ODPOVĚDI, KTERÉ NENÍ VE VÝKLADU (z fronty auditu 31. 7. 2026).
// Žák, který se učil ze stránky, takový údaj nemá odkud vzít. Početní úlohy se
// nepočítají — tam je odpověď výsledek, který si žák spočítá.
const cisla = await zkontrolujCislaVeVykladu();
for (const n of cisla) {
	varovani.push(`${n.klic}: číslo ${n.cislo} není ve výkladu — „${n.otazka}"`);
}

// 6e) NÁZVY BLOKŮ SCRATCHE, KTERÉ V ČESKÉ PALETĚ NEEXISTUJÍ (1. 8. 2026).
// Blok „řekni" se česky jmenuje „bublina", „jdi na" je „skoč na" — žák podle
// stránky scénář nesestaví, protože takový blok v paletě nenajde. Vzory se
// hlídají jen v celcích, kde se opravdu programuje ve Scratchi. Tvrdá chyba:
// všech 15 nálezů bylo hned opraveno, takže žádný starý dluh nikoho neblokuje.
const bloky2 = await zkontrolujNazvyBloku();
for (const n of bloky2) {
	chyby.push(`${n.klic} (${n.kde}): takový blok v české paletě NENÍ — jmenuje se „${n.spravne}" (${n.zdroj})`);
}

// Výpis česky
console.log(`Mapy deníku: ${mapy.pohledu} pohledů, ${mapy.nalezy.length} překryvů popisků.`);
console.log(`Deník: ${rokySoubory.length} roků, ${mistCelkem} míst.`);
console.log(`Kontrola webu — ${unikatni.length} interakcí (+${unikatni2.length} druhých na stránce), ${komponenty.length} komponent simulací, ${pocetOtazek} kvízových otázek v ${bloky.size} blocích.`);
for (const v of varovani) console.log(`⚠️  ${v}`);
if (chyby.length === 0) {
	console.log('✅ Vše zapojené správně.');
	process.exit(0);
}
for (const c of chyby) console.log(`❌ ${c}`);
console.log(`\nNAŠLO SE ${chyby.length} chyb — oprav je před buildem.`);
process.exit(1);
