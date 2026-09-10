#!/usr/bin/env node
// Vypíše, co kterému podtématu fyziky chybí. Bez modelu — jen čte data.
// Použití:  node soupis-der.mjs [--vse] [--rocniky=7,8,9] [--druh=zápis]
// Není to měřidlo kvality (proto nepatří do testy/) — jen vypisuje stav.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const KOREN = dirname(fileURLToPath(import.meta.url))
const cti = (p) => readFileSync(join(KOREN, p), 'utf8')

const args = process.argv.slice(2)
const vse = args.includes('--vse')
const rocniky = (args.find((a) => a.startsWith('--rocniky'))?.split('=')[1] ?? '7,8,9').split(',')
// Bez --druh vypíše fronta všechny díry dohromady. Automat, který doplňuje JEN
// jeden druh (třeba zápisy), by pak dostal na prvních místech položky, kterým
// chybí něco jiného — a buď by tápal, nebo doplnil, co nemá. S --druh=zápis
// zůstane ve frontě jen to, co tomu automatu opravdu patří.
const druh = args.find((a) => a.startsWith('--druh'))?.split('=')[1] ?? null

// Klíče se v datech zapisují dvěma způsoby: uvnitř literálu jako 'klíč': …
// a u souhrnných kvízů až za ním jako kvizy['klíč'] = slozSouhrnnyKviz(…).
const klice = (text) =>
	new Set([
		...[...text.matchAll(/'(fyzika\/[^']+)'\s*:/g)].map((m) => m[1]),
		...[...text.matchAll(/\[\s*'(fyzika\/[^']+)'\s*\]\s*=/g)].map((m) => m[1]),
	])
const maKviz = klice(cti('src/data/kvizy.ts'))
const maLaborku = klice(cti('src/data/laborky.ts'))

// Podtéma nemá vlastní klíč — skládá se z ročníku, slugu tématu a slugu podtématu.
// Úroveň rozliší odsazení tabulátory: téma 3, podtéma 5.
let rocnik = null
let tema = null
let ted = null
const podtemata = []

for (const radek of cti('src/data/temata.ts').split('\n')) {
	// V temata.ts jsou za fyzikou i informatika a pracovní činnosti. Bez tohohle
	// vynulování by jejich podtémata spadla pod naposledy viděný ročník fyziky.
	const mPredmet = radek.match(/^\t'([a-z-]+)\/(\d)-rocnik'\s*:/)
	if (mPredmet) {
		rocnik = mPredmet[1] === 'fyzika' ? mPredmet[2] : null
		tema = null
		ted = null
		continue
	}
	if (!rocnik) continue

	const mTema = radek.match(/^\t{3}slug:\s*'([^']+)'/)
	if (mTema) { tema = mTema[1]; ted = null; continue }

	// Podtémata mají odsazení 5 tabulátorů — kromě tématu „elektřina" v 8. ročníku,
	// které je celé odsazené o tabulátor hlouběji (formátovací nekonzistence v datech).
	// Než se sem 10. 9. 2026 doplnilo `{5,6}`, bylo těch 15 podtémat elektřiny pro
	// soupis neviditelných a žádný automat o nich nevěděl.
	const mPod = radek.match(/^\t{5,6}slug:\s*'([^']+)'/)
	if (mPod) {
		ted = { klic: `fyzika/${rocnik}-rocnik/${tema}/${mPod[1]}`, rocnik, blok: '' }
		podtemata.push(ted)
		continue
	}
	if (ted) ted.blok += radek + '\n'
}

const chybejici = (p) => {
	const chybi = []
	if (!/^\t+zapis\s*:/m.test(p.blok)) chybi.push('zápis')
	if (!/^\t{5}interakce2?\s*:/m.test(p.blok)) chybi.push('animace')
	if (!/druh:\s*'audio'|nazev:\s*'Pís/i.test(p.blok)) chybi.push('písnička')
	if (!/cesta:\s*'[^']*polemika-/.test(p.blok)) chybi.push('polemika')
	if (!maKviz.has(p.klic)) chybi.push('kvíz')
	if (!maLaborku.has(p.klic)) chybi.push('laborka')
	return chybi
}

const podle = new Map(rocniky.map((r) => [r, []]))
for (const p of podtemata) {
	if (podle.has(p.rocnik)) podle.get(p.rocnik).push({ ...p, chybi: chybejici(p) })
}

let celkem = 0
let hotovych = 0
for (const [r, seznam] of podle) {
	const hotovo = seznam.filter((p) => p.chybi.length === 0).length
	celkem += seznam.length
	hotovych += hotovo
	const pocty = {}
	for (const p of seznam) for (const c of p.chybi) pocty[c] = (pocty[c] ?? 0) + 1
	const souhrn = Object.entries(pocty).map(([k, v]) => `${k} ${v}×`).join(', ')
	console.log(`\n${r}. ročník — ${seznam.length} podtémat, kompletních ${hotovo}`)
	if (souhrn) console.log(`   chybí: ${souhrn}`)
	if (vse) for (const p of seznam) {
		console.log(p.chybi.length ? `   ---  ${p.klic} → ${p.chybi.join(', ')}` : `   OK   ${p.klic}`)
	}
}

// Pořadí práce: první u 7, první u 8, první u 9, druhé u 7 …
const patriDoFronty = (p) => (druh ? p.chybi.includes(druh) : p.chybi.length > 0)
const kurzory = rocniky.map((r) => (podle.get(r) ?? []).filter(patriDoFronty))
const fronta = []
for (let i = 0; i < Math.max(0, ...kurzory.map((k) => k.length)); i++) {
	for (const k of kurzory) if (k[i]) fronta.push(k[i])
}

console.log(
	druh
		? `\nCelkem ${celkem} podtémat; chybí ${druh} u ${fronta.length} z nich.`
		: `\nCelkem ${celkem} podtémat, kompletních ${hotovych}, s dírou ${fronta.length}.`,
)
console.log(`\nPrvních 10 v pořadí 7→8→9${druh ? ` (jen s chybějícím: ${druh})` : ''}:`)
for (const p of fronta.slice(0, 10)) console.log(`   ${p.klic}\n        chybí: ${p.chybi.join(', ')}`)
