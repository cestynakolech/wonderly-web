#!/usr/bin/env node
// Kontrolní brána webu (verifier) — spouštěj PŘED buildem: node zkontroluj.mjs
// Hlídá nejčastější chybu při přidávání simulace: zapojení musí být na VŠECH místech.
// Nic nemění, jen čte a hlásí. Konec s kódem 1 = něco je špatně.

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { nactiData, maDelkovouNapovedu, vsechnaPodtemata, neznameDruhy } from './testy/data.mjs';
import { zkontrolujPopiskyMap } from './testy/mapa-popisky.mjs';
import { zkontrolujPolohyMist } from './testy/cesty-poloha.mjs';
import { zkontrolujCislaVeVykladu } from './testy/cisla-ve-vykladu.mjs';
import { zkontrolujNazvyBloku } from './testy/nazvy-bloku.mjs';
import { zkontrolujUniky } from './testy/uniky.mjs';
import { zkontrolujSablony } from './testy/sablony.mjs';
import { zkontrolujRejstrik } from './testy/obousmerne.mjs';
import { zkontrolujCiziVidea } from './testy/cizi-videa.mjs';
import { zkontrolujZavislosti } from './testy/zavislosti.mjs';
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

// 1) Které interakce se opravdu používají u podtémat
// (interakce = první simulace na stránce, interakce2 = druhá — kontrolují se obě)
//
// ⚠️ Do 2. 8. 2026 se tenhle seznam bral REGEXEM Z TEXTU souboru, ačkoli skutečná data
// jsou načtená o pár řádků výš a stačilo je použít. Byla to tichá díra: podtéma vzniklé
// programově nebo zapsané s jiným odsazením by vzor minul, a tím by se pro takovou
// simulaci PŘESKOČILY všechny tři kontroly zapojení níž — brána by zůstala zelená.
// Že se dnes oba seznamy shodují, nic nedokazuje; přesně takhle už jednou vypadl blok
// `elektrina`, kde je odsazení o tabulátor jiné (22 podtémat místo 37).
//
// Kontroly NÍŽE (union typ, vykreslení v .astro, import komponenty) čtou text dál —
// a je to tak správně, protože tam je předmětem kontroly opravdu zdrojový kód.
const podtemataZDat = vsechnaPodtemata(dataTemata);
const unikatni = [...new Set(podtemataZDat.map((p) => p.interakce).filter(Boolean))];
const unikatni2 = [...new Set(podtemataZDat.map((p) => p.interakce2).filter(Boolean))];

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
// POČÍTÁ SE KAŽDÁ OTÁZKA JEN JEDNOU. Shrnutí se skládají programově z TÝCHŽ objektů
// otázek, takže součet přes bloky je počítal dvakrát. Ukázalo se to 1. 8. 2026, když
// přibylo roční opakování pracovních činností: rohatka ohlásila „zhoršení" o 12 otázek,
// ačkoli se nenapsala jediná nová — jen se 33 starých začalo počítat podruhé.
// Rohatka má hlídat kvalitu otázek, ne to, do kolika shrnutí je která zařazená.
const unikatniOtazky = new Set();
for (const otazky of Object.values(dataKvizy)) {
	if (Array.isArray(otazky)) for (const o of otazky) unikatniOtazky.add(o);
}
const celkemOtazek = unikatniOtazky.size;
const celkemNejdelsi = [...unikatniOtazky].filter((o) => maDelkovouNapovedu(o)).length;
const podilNejdelsi = celkemOtazek ? Math.round((celkemNejdelsi / celkemOtazek) * 100) : 0;
// Rohatka porovnávala ZAOKROUHLENÁ celá procenta, takže se do jednoho procenta vešlo
// ~12 nových vadných otázek beze změny čísla (nález nezávislého auditu 1. 8. 2026).
// Hlídá se proto POČET otázek s nápovědou — ten mrtvou zónu nemá.
const pocetNejdelsi = celkemNejdelsi;
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

// Brána je ČTECÍ. Utažení laťky je samostatné rozhodnutí, ne vedlejší účinek buildu:
// dřív se rohatka přepisovala rovnou při kontrole, takže `npm run build` tiše měnil
// pracovní strom (nález revize 14. 8. 2026). Nově se navržená laťka jen posbírá
// a zapíše se výhradně s přepínačem --prijmi-latku (`npm run prijmi-latku`).
//
// Sbírá se do JEDNOHO objektu schválně: dřív si dva samostatné zápisy navzájem
// přepisovaly výsledek (druhý zapisoval `...strop` ze staré hodnoty), takže se
// utažení délkové nápovědy ztratilo, kdykoli zároveň ubyly úniky.
const chceUtahnout = process.argv.includes('--prijmi-latku');
let navrzenaLatka = null;
const navrhniLatku = (zmena) => { navrzenaLatka = { ...(navrzenaLatka ?? strop), ...zmena }; };
const stropPocet = strop?.pocetNejdelsi ?? Infinity;
if (strop && (podilNejdelsi > strop.podilNejdelsi || pocetNejdelsi > stropPocet)) {
	chyby.push(
		`kvízy se zhoršily: správná odpověď je nejdelší u ${pocetNejdelsi} otázek (${podilNejdelsi} %), ` +
			`naposledy ${stropPocet === Infinity ? '—' : stropPocet} otázek (${strop.podilNejdelsi} %). ` +
			`Dorovnej délky odpovědí v NOVÝCH otázkách (rozdíl pod 10 znaků). ` +
			`Laťku v testy/rohatka.json povoluj jen vědomě.`,
	);
} else if (strop && (podilNejdelsi < strop.podilNejdelsi || pocetNejdelsi < stropPocet)) {
	navrhniLatku({ podilNejdelsi, pocetNejdelsi });
	varovani.push(`kvízy se zlepšily na ${pocetNejdelsi} otázek (${podilNejdelsi} %) — laťku lze utáhnout: npm run prijmi-latku`);
}

// 6b2) NÁSKOK SPRÁVNÉ ODPOVĚDI (15. 8. 2026, práh zpřísněn na 10 znaků 19. 8. 2026).
// Podíl/počet z 6b schovává NEJHORŠÍ případy: otázka s náskokem 2 znaky ("kov" × "koks")
// se počítá stejně jako otázka, kde je správná odpověď o 60 znaků delší než cokoli
// ostatního — a právě u té žák hádá jistě, ne jen s vyšší pravděpodobností. Počítá se
// STRIKTNÍ náskok (délka správné odpovědi, která je v datech vždy odpovedi[0], minus
// nejdelší z distraktorů). Problémová je otázka, kde je správná odpověď striktně
// nejdelší A náskok je ≥10 znaků. Práh 10, ne níž: skok na 1 znak by naráz označil
// 614 otázek (z 2300) za problémové — to by rohatku jen zahltilo šumem místo skutečných
// nálezů; laťka se má snižovat POSTUPNĚ, jak se otázky opravují (viz npm run prijmi-latku).
// Souhrnné kvízy (/shrnuti/) se VYNECHÁVAJÍ — `slozSouhrnnyKviz` je skládá ze STEJNÝCH
// objektů otázek jako mateřské bloky, takže by se každá vadná otázka počítala 2×
// (stejná past jako u úniků v 6g a u délkové nápovědy v 6b výš).
let vynechanoNaskok = 0;
const problemoveNaskok = [];
for (const [klic, otazky] of Object.entries(dataKvizy)) {
	if (!Array.isArray(otazky)) continue;
	if (klic.includes('/shrnuti/')) {
		vynechanoNaskok++;
		continue;
	}
	for (const o of otazky) {
		const delky = (o.odpovedi ?? []).map((a) => String(a).length);
		if (delky.length < 2) continue;
		const naskok = delky[0] - Math.max(...delky.slice(1));
		if (delky[0] > Math.max(...delky.slice(1)) && naskok >= 10) {
			problemoveNaskok.push({ klic, text: o.text, naskok });
		}
	}
}
const pocetNaskok = problemoveNaskok.length;
const stropNaskok = strop?.pocetNaskok10 ?? Infinity;
if (strop && pocetNaskok > stropNaskok) {
	const priklad = [...problemoveNaskok]
		.sort((a, b) => b.naskok - a.naskok)
		.slice(0, 3)
		.map((p) => `${p.klic}: „${String(p.text).slice(0, 40)}…" (náskok ${p.naskok} znaků)`)
		.join('; ');
	chyby.push(
		`přibyly otázky s obřím náskokem správné odpovědi (striktně nejdelší, náskok ≥10 znaků): ${pocetNaskok}, ` +
			`naposledy ${stropNaskok}. Takovou otázku žák uhodne bez znalosti látky prakticky jistě. ` +
			`Zkrať správnou odpověď nebo prodluž distraktory, ať je rozdíl pod 10 znaků. Např. ${priklad}. ` +
			`Laťku v testy/rohatka.json povoluj jen vědomě (npm run prijmi-latku) — ne novou výjimkou, jen skutečným snížením čísla.`,
	);
} else if (strop && pocetNaskok < stropNaskok) {
	navrhniLatku({ pocetNaskok10: pocetNaskok });
	varovani.push(`otázek s obřím náskokem (≥10 znaků) ubylo na ${pocetNaskok} — laťku lze utáhnout: npm run prijmi-latku`);
}

// 6c) Každé podtéma s kvízem musí být zastoupené v ROČNÍM opakování svého ročníku.
// Souhrnný kvíz bere otázky po kolech do stropu — když je strop menší než počet
// podtémat, poslední témata se do opakování NIKDY nedostanou (fyzika 8 měla 35 podtémat
// a strop 30, takže vypadával celý celek zvuk). Stejně tak stačí zapomenout celek
// v seznamu (informatice takhle chybělo vex-iq a hry-ve-scratchi — 144 otázek).
const chybiRocni = new Set();
for (const [klic, otazky] of Object.entries(dataKvizy)) {
	if (!Array.isArray(otazky) || !otazky.length) continue;
	const [predmet, rocnik, tema] = klic.split('/');
	if (tema === 'shrnuti') continue;
	const rocni = dataKvizy[`${predmet}/${rocnik}/shrnuti/rocni-shrnuti`];
	// Dřív tu stálo `continue` — ročník BEZ ročního opakování tak kontrolu tiše obešel
	// (nález nezávislého auditu 1. 8. 2026: stačil překlep v klíči a celému ročníku
	// zmizelo roční opakování, aniž by brána cekla).
	if (!Array.isArray(rocni)) {
		if (!chybiRocni.has(`${predmet}/${rocnik}`)) {
			chybiRocni.add(`${predmet}/${rocnik}`);
			// Rozlišujeme dva různé případy. Když podtéma rocni-shrnuti v datech STRÁNEK je,
			// ale kvíz k němu ne, je to překlep v klíči — a přesně tímhle podvrhem prošel
			// audit 1. 8. 2026 celému ročníku bez povšimnutí. Tvrdá chyba.
			// Když ročník žádné roční opakování nemá (malý předmět), je to jen varování.
			const maStranku = vsechnaPodtemata(dataTemata).some((x) => x.klic === `${predmet}/${rocnik}/shrnuti/rocni-shrnuti`);
			const hlaska = `${predmet}/${rocnik} má kvízy, ale žádné z nich se nedostane do ročního opakování`;
			if (maStranku) chyby.push(`${hlaska} — stránka rocni-shrnuti EXISTUJE, ale kvíz k ní ne (překlep v klíči?)`);
			else varovani.push(`${hlaska} (ročník nemá stránku shrnuti/rocni-shrnuti)`);
		}
		continue;
	}
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

// 7b2) POLOHY A POŘADÍ MÍST (9. 8. 2026). Nezávislý kontrolor našel v datech tři
// vady, které tu ležely měsíc: Landshut měl pin 45 km vedle, Geisingen 35 km a
// místo z 25. 7. bylo zapsané ZA místem z 26. 7. (trasa se kreslí v pořadí pole,
// takže vznikla falešná čára 321 km). Špatný pin je tichá vada — na mapě vypadá
// stejně dobře jako správný. Odhalil ho teprve druhý pin téhož města, a přesně
// na tom kontrola stojí: totéž město musí být napříč roky na stejném bodě.
const polohy = await zkontrolujPolohyMist(cestyDir);
for (const n of polohy.nalezy) chyby.push(`deník — ${n}`);

// 7c) KOTVA PROTI TICHÉ LŽI SEKCE 7 (nález nezávislého auditu 1. 8. 2026).
// Sekce 7 výše čte roky REGULÁRNÍMI VÝRAZY citlivými na tabulátory. Audit ukázal,
// že po přeformátování jednoho souboru roku celý rok tiše vypadne ze VŠECH kontrol
// deníku (duplicitní slugy, chybějící souřadnice) a brána zůstane zelená —
// hlásila 163 míst místo 209. Data se proto porovnají s tím, co se opravdu změřilo.
if (mistCelkem !== mapy.mistZDat || rokySoubory.length !== mapy.rokuZDat) {
	chyby.push(
		`kontrola deníku NEVIDÍ celá data: z textu ${mistCelkem} míst v ${rokySoubory.length} souborech, ` +
			`ze skutečných dat ${mapy.mistZDat} míst v ${mapy.rokuZDat} rocích — nejspíš se změnilo odsazení a regulární výrazy přestaly platit`,
	);
}

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

// 6f) NEZNÁMÁ HODNOTA `druh` U MATERIÁLU (2. 8. 2026).
// Dosud se neznámý druh tiše ignoroval — a přesně tak vznikla falešná nula
// u `druh: 'obrazek'` (v datech není ani jednou, správně je 'infografika'),
// takže se infografiky nikdy nepočítaly. Stejně tiše propadávalo 'pdf'.
// Nově je to tvrdá chyba: kdo přidá nový druh, musí v DRUHY_MATERIALU
// rozhodnout, jestli se počítá do názornosti. Ticho už není možnost.
for (const n of neznameDruhy(dataTemata)) {
	chyby.push(
		`${n.klic}: materiál má neznámý druh '${n.druh}' — doplň ho do DRUHY_MATERIALU v testy/data.mjs ` +
			`a rozhodni, jestli se počítá do názornosti (obrazek / video / zvuk / null = nepočítá)`,
	);
}

// 6g) VAZBY MEZI OTÁZKAMI JEDNOHO BLOKU: duplicity a úniky odpovědí (2. 8. 2026).
// Nález dlouhodobého auditu: obě vady se opakují od 29. 7. pořád dokola a hledaly se
// RUČNĚ — pokynem „hledej to v každé dávce", na který se v tempu zapomínalo. Duplicitní
// páry se našly v devíti blocích (3–4 z 10), úniky zanášely i samotné opravy.
// Duplicita je TVRDÁ CHYBA: měřidlo je schválně konzervativní (dnes 0 nálezů), takže
// nikoho neblokuje starý dluh — spadne až nová duplicita. Ověřeno na historických datech:
// nad verzí kvízů z 31. 7. najde 4, mezi nimi dvakrát doslova tutéž otázku.
// Úniky drží rohatka jako u délkové nápovědy: dnešní dluh nevadí, zhoršit se nesmí.
const vazby = await zkontrolujUniky({ kvizy: dataKvizy, temata: dataTemata });
for (const d of vazby.duplicity) {
	chyby.push(`${d.klic}: dvě otázky se ptají na totéž — „${d.a}" × „${d.b}" (${d.duvod})`);
}
const stropUniku = strop?.uniky ?? Infinity;
if (vazby.uniky.length > stropUniku) {
	const nove = vazby.uniky.slice(0, 3).map((u) => `„${u.prozrazuje}" prozrazuje „${u.odpoved}"`).join('; ');
	chyby.push(
		`přibyly úniky odpovědí mezi otázkami: ${vazby.uniky.length}, naposledy ${stropUniku}. ` +
			`Vysvětlení ani zadání jedné otázky nesmí odpovídat na jinou. Např. ${nove}. ` +
			`Seznam: node testy/uniky.mjs`,
	);
} else if (strop && vazby.uniky.length < stropUniku) {
	navrhniLatku({ uniky: vazby.uniky.length });
	varovani.push(`úniků odpovědí ubylo na ${vazby.uniky.length} — laťku lze utáhnout: npm run prijmi-latku`);
}

// 6h) KDO HLÍDÁ HLÍDAČE (2. 8. 2026, dlouhodobý audit).
// Nejčastější vada projektu není v učivu, ale v měřidlech: dvacet výskytů ve čtyřech
// dnech, z toho pět za jedinou noc („falešná nula popáté — a tentokrát u kontroly,
// která vznikla právě proto, aby tuhle třídu chyb hlídala"). Pravidlo „novou kontrolu
// ověř obousměrně" existovalo, ale jen jako text, takže nic nebránilo nasadit měřidlo
// bez důkazu. Nově musí mít každé měřidlo v testy/obousmerne.json zapsáno, čím je
// doloženo, že podvrh najde A nad zdravými daty mlčí.
// Rohatka: dnešní dluh nikoho neblokuje, ale NOVÉ měřidlo bez dokladu build shodí.
const rejstrik = zkontrolujRejstrik();
const rejstrikJson = existsSync(join(koren, 'testy/obousmerne.json'))
	? JSON.parse(readFileSync(join(koren, 'testy/obousmerne.json'), 'utf8'))
	: null;
const stropBezDokladu = rejstrikJson?.bezDokladu ?? Infinity;
if (rejstrik.chybi.length > stropBezDokladu) {
	chyby.push(
		`měřidlo bez obousměrného důkazu: ${rejstrik.chybi.join(', ')} (bez dokladu ${rejstrik.chybi.length}, naposledy ${stropBezDokladu}). ` +
			`Doplň do testy/obousmerne.json záznam s poli 'podvrh' a 'zdravy' — a hlavně ten důkaz opravdu proveď. ` +
			`Kontrola, která se nasadí bez ověření, tiše určuje, na čem se pracuje.`,
	);
} else if (rejstrikJson && rejstrik.chybi.length < stropBezDokladu) {
	writeFileSync(
		join(koren, 'testy/obousmerne.json'),
		`${JSON.stringify({ ...rejstrikJson, bezDokladu: rejstrik.chybi.length }, null, '\t')}\n`,
	);
	varovani.push(`měřidel bez obousměrného důkazu ubylo na ${rejstrik.chybi.length} — laťka utažena (testy/obousmerne.json).`);
}

// 6i) SAHÁ SKRIPT SIMULACE NA PRVEK, KTERÝ V ŠABLONĚ NENÍ? (2. 8. 2026)
// Nález nezávislého kontrolora: testy simulací čtou z komponenty jen <script> a jejich
// atrapa DOM chybějící prvek tiše vyrobí — komponenta se smazanou scénou i všemi tlačítky
// jimi prošla jako ZDRAVÁ. Měření ukázalo tutéž díru v 11 z 12 testů. Opravovat každý test
// zvlášť by nepomohlo (u příští simulace se na to zapomene), proto se to hlídá centrálně
// nad všemi komponentami — i budoucími, bez jediného řádku navíc.
// Je to TVRDÁ chyba: v prohlížeči takový prvek navždy chybí a simulace mlčky nefunguje.
const sablony = zkontrolujSablony();
// Falešná nula: nula nálezů z nula změřených komponent není zdravý stav, ale rozbité měřidlo.
const komponentSimulaci = readdirSync(join(koren, 'src/components/skola2')).filter((f) => f.endsWith('Simulace.astro')).length;
if (sablony.bezDotazu.length) {
	// Komponenta, v níž se nezměřilo ANI JEDNO vyhledání (celý skript třeba v DOMContentLoaded),
	// by prošla mlčky, i kdyby jí chyběly všechny prvky. Souhrnné počty to nezachytí.
	chyby.push(`v těchto simulacích se nezměřilo ani jedno vyhledání prvku: ${sablony.bezDotazu.join(', ')}. To není zdravý stav, to je slepé místo.`);
}
for (const o of sablony.omezene) varovani.push(`šablony — ${o}`);
if (sablony.souboru < komponentSimulaci || sablony.dotazu < 500) {
	chyby.push(
		`kontrola šablon nic nezměřila: prošlo ${sablony.souboru} z ${komponentSimulaci} komponent, ` +
			`${sablony.dotazu} vyhledání prvku. To není zdravý stav, to je rozbité měřidlo.`,
	);
}
if (sablony.nalezy.length) {
	chyby.push(
		`skript simulace sahá na prvek, který v šabloně není: ` +
			sablony.nalezy.map((n) => `${n.jmeno} — ${n.druh} „${n.co}"`).join('; ') +
			`. Seznam: node testy/sablony.mjs`,
	);
}

// Výpis česky
console.log(
	`Mapy deníku: ${mapy.pohledu} pohledů, ${mapy.nalezy.length} překryvů popisků` +
		` (společná mapa: ${mapy.pojmenovanoNaSpolecneMape?.cs ?? '?'} z ${mapy.mistNaSpolecneMape} míst má na mapě jméno,` +
		` piny mají všechna).`,
);
console.log(`Deník: ${rokySoubory.length} roků, ${mistCelkem} míst.`);
console.log(`Kontrola webu — ${unikatni.length} interakcí (+${unikatni2.length} druhých na stránce), ${komponenty.length} komponent simulací, ${pocetOtazek} kvízových otázek v ${bloky.size} blocích.`);
console.log(`Náskok správné odpovědi: ${pocetNaskok} otázek s náskokem ≥10 znaků (${vynechanoNaskok} souhrnných /shrnuti/ vynecháno záměrně — počítaly by se dvakrát).`);
// Počítadlo vstupů (nález auditu: opatření tiše platí jen na část případů — u map se
// takhle celá společná mapa neměřila vůbec, u filtru falešných poplachů se kontrola
// volala jen u fotek). Kontrola, která nic neprošla, musí být poznat na první pohled.
console.log(`Vazby v kvízech: prošlo ${vazby.bloku} bloků / ${vazby.otazek} otázek (${vazby.vynechano} souhrnných /shrnuti/ vynecháno záměrně — skládají se z už zkontrolovaných) — ${vazby.duplicity.length} duplicit, ${vazby.uniky.length} úniků odpovědí.`);
console.log(`Šablony simulací: prošlo ${sablony.souboru} komponent, změřeno ${sablony.dotazu} vyhledání prvku — ${sablony.nalezy.length} nálezů.`);
console.log(`Měřidla: ${rejstrik.dolozeno} z ${rejstrik.meridel} má doložené obousměrné ověření${rejstrik.chybi.length ? ` (bez dokladu: ${rejstrik.chybi.join(', ')})` : ''}.`);

// CIZÍ VIDEA VE ŠKOLNÍ ČÁSTI. Na lab.wonderly.cz smí jen videa z kanálu učitele.
// Do 19. 8. 2026 to bylo jen textové pravidlo — a textové pravidlo nezastavilo nic:
// cizí videa se na web dostala, protože je pokyn ve frontě přímo zadával. Tady je z toho
// brána. Porovnává se proti seznamu ID ověřených JEDNOU (testy/youtube-vlastni.json,
// plní ho `node youtube-schval.mjs` přes YouTube oembed), takže build projde i offline,
// ale neznámé ID neprojde nikdy. Deník cesty.wonderly.cz se netýká — má jiný datový
// strom i jiný tvar záznamu a brána dostává výhradně `temata`.
const ciziVidea = zkontrolujCiziVidea(dataTemata);
console.log(
	`Videa školní části: prošlo ${ciziVidea.podtemat} podtémat, ${ciziVidea.videi} YouTube výskytů ` +
		`(${ciziVidea.vlozenych} vložených, ${ciziVidea.odkazu} odkazů) proti ${ciziVidea.schvalenych} schváleným ID — ${ciziVidea.nalezy.length} nálezů.`,
);
for (const n of ciziVidea.nalezy) chyby.push(n);

// Přiznání umělé inteligence u polemik. Od 2. 8. 2026 platí evropská pravidla
// transparentnosti (článek 50 nařízení 2024/1689) — obsah vytvořený nebo
// upravený AI se má přiznat. Polemiky mají AI hlasy i vygenerovanou úvodní
// ilustraci, takže bez pole `ai` se nesmí nasadit. Kdyby to hlídal jen člověk,
// dopadlo by to jako všechna „opatření platící jen částečně“: u prvních dílů by
// to bylo a u dalších už ne.
let aiVsech = 0;
const aiChybi = [];
for (const p of vsechnaPodtemata(dataTemata)) {
	for (const m of p.materialy ?? []) {
		if (m.druh !== 'video' || !m.cesta.includes('polemika-')) continue;
		aiVsech += 1;
		if (!m.ai || !m.ai.trim()) aiChybi.push(`${p.slug}: ${m.nazev}`);
	}
}
console.log(`Přiznání AI: prošlo ${aiVsech} polemik — ${aiChybi.length} bez přiznání.`);
for (const c of aiChybi) chyby.push(`polemika bez přiznání AI (pole 'ai'): ${c}`);
// ZÁVISLOSTI — je každý importovaný balíček opravdu deklarovaný?
// Bez téhle kontroly prošla brána zeleně i ve chvíli, kdy build na Cloudflare
// padal na chybějící pdfkit (viz testy/zavislosti.mjs). Kontrola obsahu nestačí:
// web se musí dát postavit i jinde než na tomhle Macu.
const zavislosti = zkontrolujZavislosti(koren);
console.log(zavislosti.souhrn);
chyby.push(...zavislosti.chyby);
varovani.push(...zavislosti.varovani);

for (const v of varovani) console.log(`⚠️  ${v}`);

// Zápis laťky až tady a JEN na výslovný pokyn — a jen když je jinak vše v pořádku.
// Utáhnout laťku nad rozbitým webem by zabetonovalo náhodný stav.
if (chceUtahnout) {
	if (chyby.length > 0) {
		console.log('⛔ laťku neutahuji — nejdřív oprav chyby níže.');
	} else if (!navrzenaLatka) {
		console.log('ℹ️  není co utahovat, laťka zůstává beze změny.');
	} else {
		const zapis = { ...navrzenaLatka, zmeneno: new Date().toISOString().slice(0, 10) };
		writeFileSync(cestaRohatka, `${JSON.stringify(zapis, null, '\t')}\n`);
		console.log(`✅ laťka utažena (testy/rohatka.json): ${JSON.stringify(zapis)}`);
	}
} else if (navrzenaLatka) {
	console.log('ℹ️  laťku lze utáhnout příkazem: npm run prijmi-latku (brána sama nic nepřepisuje)');
}

if (chyby.length === 0) {
	console.log('✅ Vše zapojené správně.');
	process.exit(0);
}
for (const c of chyby) console.log(`❌ ${c}`);
console.log(`\nNAŠLO SE ${chyby.length} chyb — oprav je před buildem.`);
process.exit(1);
