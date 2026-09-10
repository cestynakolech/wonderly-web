#!/usr/bin/env node
// Vypíše zápisy do sešitu, které ještě neprošly nezávislou věcnou kontrolou.
// Bez modelu — jen porovná data proti seznamu v KONTROLA-ZAPISU.md.
// Použití:  node nezkontrolovane-zapisy.mjs [--kolik=3]
//
// Proč to existuje: `zkontroluj.mjs` je strukturální brána — pozná, že blok
// `zapis` má správný tvar a je zapojený, ale NEPOZNÁ, že je ve vzorci chyba
// nebo že zákon je špatně znějící. Věcnou správnost musí ověřit někdo, kdo
// zápis nepsal. Tenhle skript jen říká, na koho ještě nedošlo.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const KOREN = dirname(fileURLToPath(import.meta.url))
const cti = (p) => {
	try {
		return readFileSync(join(KOREN, p), 'utf8')
	} catch {
		return ''
	}
}

const args = process.argv.slice(2)
const kolik = Number(args.find((a) => a.startsWith('--kolik'))?.split('=')[1] ?? 3)

// Stejné čtení temata.ts jako v soupis-der.mjs: podtéma nemá vlastní klíč,
// skládá se z ročníku, slugu tématu a slugu podtématu; úroveň rozliší odsazení.
let rocnik = null
let tema = null
let ted = null
const podtemata = []

for (const radek of cti('src/data/temata.ts').split('\n')) {
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

	// {5,6} kvůli tématu „elektřina" v 8. ročníku — viz komentář v soupis-der.mjs.
	const mPod = radek.match(/^\t{5,6}slug:\s*'([^']+)'/)
	if (mPod) {
		ted = { klic: `fyzika/${rocnik}-rocnik/${tema}/${mPod[1]}`, rocnik, blok: '' }
		podtemata.push(ted)
		continue
	}
	if (ted) ted.blok += radek + '\n'
}

const seZapisem = podtemata.filter((p) => /^\t+zapis\s*:/m.test(p.blok))

// V KONTROLA-ZAPISU.md je za každým hotovým ověřením řádek s klíčem podtématu.
// Stačí, že se klíč v souboru vyskytuje — formát řádku si kontrolor volí sám.
const evidence = cti('KONTROLA-ZAPISU.md')
const zbyva = seZapisem.filter((p) => !evidence.includes(p.klic))

// Pořadí kontroly kopíruje pořadí výroby: první u 7, první u 8, první u 9, …
const kurzory = ['7', '8', '9'].map((r) => zbyva.filter((p) => p.rocnik === r))
const fronta = []
for (let i = 0; i < Math.max(0, ...kurzory.map((k) => k.length)); i++) {
	for (const k of kurzory) if (k[i]) fronta.push(k[i])
}

console.log(`Zápisů celkem ${seZapisem.length}, ověřeno ${seZapisem.length - zbyva.length}, čeká ${zbyva.length}.`)
if (!fronta.length) {
	console.log('\nHOTOVO: všechny zápisy prošly nezávislou věcnou kontrolou.')
	process.exit(0)
}
console.log(`\nNa řadě je ${Math.min(kolik, fronta.length)}:`)
for (const p of fronta.slice(0, kolik)) console.log(`   ${p.klic}`)
