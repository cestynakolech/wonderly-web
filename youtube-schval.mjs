#!/usr/bin/env node
// SCHVALOVÁNÍ YOUTUBE VIDEÍ PRO ŠKOLNÍ WEB — jediná cesta, jak se ID dostane na seznam.
//
// Spouští se RUČNĚ a S INTERNETEM:
//     node youtube-schval.mjs              … projde školní data, u každého neznámého ID
//                                            se zeptá YouTube oembed na autora a učitelova
//                                            zapíše do testy/youtube-vlastni.json
//     node youtube-schval.mjs <ID> [<ID>…] … ověří a schválí konkrétní ID
//
// Proč to není součást buildu: build musí projít i bez internetu. Ověření autora se
// tedy dělá jednou, tady, a jeho VÝSLEDEK se uloží do repa. Build pak jen porovnává
// proti uloženému seznamu — offline projde, ale neznámé ID nepustí.
//
// Skript nikdy nic nepovolí sám od sebe: co YouTube neoznačí jako kanál učitele,
// se nezapíše a vypíše se jako odmítnuté. Když YouTube neodpoví, ID se NEZAPÍŠE
// (mlčení sítě není doklad autorství).
//
// Záměrně žije v KOŘENI repa, ne v testy/ — testy/*.mjs jsou měřidla a rejstřík
// testy/obousmerne.json po každém z nich žádá obousměrný doklad. Tenhle skript ale nic
// o stavu webu netvrdí, jen zapisuje ověřený údaj, a bez sítě se spustit nedá. Zapsat ho
// do výjimek NENI_MERIDLO by znamenalo rozšiřovat seznam výjimek — a to je přesně ta
// obchvatná cesta, kterou projekt zakázal (viz komentář u `uniky-krizove.mjs`).
import { readFileSync, writeFileSync } from 'node:fs';
import { nactiData } from './testy/data.mjs';
import { posbirejVidea, nactiSeznam, CESTA_SEZNAM, KANAL_UCITELE, JMENO_UCITELE } from './testy/cizi-videa.mjs';

/** Zeptá se YouTube oembed na autora videa. Vrací { author_name, author_url, title } nebo null. */
async function autorVidea(id) {
	const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
	try {
		const odpoved = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (!odpoved.ok) return { chyba: `HTTP ${odpoved.status}` };
		return await odpoved.json();
	} catch (e) {
		return { chyba: String(e.message ?? e) };
	}
}

const rucni = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const seznam = nactiSeznam();
seznam.videa ??= {};

let kOvereni;
if (rucni.length) {
	kOvereni = rucni.map((id) => ({ id, klic: '(zadáno ručně)', nazev: '' }));
} else {
	const { temata } = await nactiData();
	kOvereni = posbirejVidea(temata).filter((v) => !seznam.videa[v.id]);
	// každé ID jen jednou, i když je použité u víc podtémat
	const videna = new Set();
	kOvereni = kOvereni.filter((v) => (videna.has(v.id) ? false : videna.add(v.id)));
}

if (!kOvereni.length) {
	console.log('✅ Ve školních datech není žádné neschválené YouTube ID — není co ověřovat.');
	process.exit(0);
}

console.log(`Ověřuji ${kOvereni.length} ID přes YouTube oembed (potřebuje internet)…\n`);
let pridano = 0;
const odmitnuta = [];
const nedostupna = [];
for (const v of kOvereni) {
	const a = await autorVidea(v.id);
	if (!a || a.chyba) {
		nedostupna.push(`${v.id} (${a?.chyba ?? 'bez odpovědi'})`);
		console.log(`⏸️  ${v.id} — YouTube neodpověděl, NEZAPISUJI (mlčení sítě není doklad)`);
		continue;
	}
	if (a.author_url !== KANAL_UCITELE) {
		odmitnuta.push(`${v.id} — kanál „${a.author_name}" (${a.author_url}), použito u ${v.klic}`);
		console.log(`❌ ${v.id} — CIZÍ kanál „${a.author_name}" (${a.author_url}) → nezapsáno`);
		continue;
	}
	seznam.videa[v.id] = {
		nazev: a.title ?? v.nazev ?? '',
		kanal: a.author_url,
		autor: a.author_name,
		overeno: new Date().toISOString().slice(0, 10),
	};
	pridano++;
	console.log(`✅ ${v.id} — ${JMENO_UCITELE}: „${a.title}"`);
}

if (pridano) {
	const serazeno = Object.fromEntries(Object.entries(seznam.videa).sort(([a], [b]) => a.localeCompare(b)));
	writeFileSync(CESTA_SEZNAM, `${JSON.stringify({ ...seznam, videa: serazeno }, null, '\t')}\n`);
	console.log(`\n💾 zapsáno ${pridano} nových ID do ${CESTA_SEZNAM} (celkem ${Object.keys(serazeno).length})`);
} else {
	console.log('\nℹ️  nic nového k zápisu.');
}
if (odmitnuta.length) {
	console.log(`\n⛔ ODMÍTNUTO ${odmitnuta.length} videí z cizích kanálů — na školní web nepatří, odstraň je ze src/data/temata.ts:`);
	for (const o of odmitnuta) console.log(`   • ${o}`);
}
if (nedostupna.length) {
	console.log(`\n⏸️  ${nedostupna.length} ID se nepodařilo ověřit (síť): ${nedostupna.join(', ')} — spusť skript znovu.`);
}
process.exit(odmitnuta.length ? 1 : 0);
