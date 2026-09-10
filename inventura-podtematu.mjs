#!/usr/bin/env node
// Inventura JEDNOHO podtématu: video, polemika, infografika, kvíz, písnička a laborka.
// Bez modelu a bez sítě. ANO se opírá pouze o commitnutý stav (HEAD).
//
// Použití:
//   node inventura-podtematu.mjs "Klid a pohyb tělesa"
//   node inventura-podtematu.mjs fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const KOREN = dirname(fileURLToPath(import.meta.url))
const dotaz = process.argv.slice(2).join(' ').trim()
if (!dotaz) {
	console.error('Zadej část názvu nebo slug podtématu, například: node inventura-podtematu.mjs "klid a pohyb"')
	process.exit(2)
}

const zjednodus = (s) =>
	s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const zHEAD = (soubor) => {
	try {
		return execFileSync('git', ['show', `HEAD:${soubor}`], { cwd: KOREN, encoding: 'utf8' })
	} catch {
		return null
	}
}
const zeStromu = (soubor) => {
	try {
		return readFileSync(join(KOREN, soubor), 'utf8')
	} catch {
		return null
	}
}
const souborVHEAD = (cesta) => {
	if (!cesta?.startsWith('/')) return false
	try {
		execFileSync('git', ['cat-file', '-e', `HEAD:public${cesta}`], { cwd: KOREN, stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

// Stejný parser jako soupis-der.mjs: souhrnné kvízy mohou být přiřazené až
// za literálem a podtémata elektřiny v 8. ročníku mají o tabulátor navíc.
const klice = (text = '') =>
	new Set([
		...[...text.matchAll(/'(fyzika\/[^']+)'\s*:/g)].map((m) => m[1]),
		...[...text.matchAll(/\[\s*'(fyzika\/[^']+)'\s*\]\s*=/g)].map((m) => m[1]),
	])

function nactiPodtemata(text = '') {
	let rocnik = null
	let tema = null
	let ted = null
	const podtemata = []
	for (const radek of text.split('\n')) {
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
		const mPod = radek.match(/^\t{5,6}slug:\s*'([^']+)'/)
		if (mPod) {
			ted = { slug: mPod[1], nazev: '', klic: `fyzika/${rocnik}-rocnik/${tema}/${mPod[1]}`, rocnik, blok: '' }
			podtemata.push(ted)
			continue
		}
		if (!ted) continue
		const mNazev = radek.match(/^\t{5,6}nazev:\s*'([^']+)'/)
		if (mNazev && !ted.nazev) ted.nazev = mNazev[1]
		ted.blok += radek + '\n'
	}
	return podtemata
}

function najdi(podtemata) {
	const hledane = zjednodus(dotaz)
	return podtemata.filter((p) => zjednodus(p.klic).includes(hledane) || zjednodus(p.nazev).includes(hledane))
}

const headTemataText = zHEAD('src/data/temata.ts') ?? ''
const stromTemataText = zeStromu('src/data/temata.ts') ?? ''
const headShody = najdi(nactiPodtemata(headTemataText))
const stromShody = najdi(nactiPodtemata(stromTemataText))
const vsechnyKlice = new Set([...headShody, ...stromShody].map((p) => p.klic))
if (!vsechnyKlice.size) {
	console.error(`Nenalezeno: „${dotaz}". Seznam podtémat: node soupis-der.mjs --vse`)
	process.exit(1)
}
if (vsechnyKlice.size > 1) {
	console.error(`Nejednoznačné — „${dotaz}" sedí na ${vsechnyKlice.size} podtémat:`)
	for (const klic of vsechnyKlice) console.error(`   ${klic}`)
	process.exit(1)
}
const klic = [...vsechnyKlice][0]
const pHEAD = headShody.find((p) => p.klic === klic) ?? null
const pStrom = stromShody.find((p) => p.klic === klic) ?? null
const p = pHEAD ?? pStrom

function materialy(blok = '') {
	const vysledek = []
	for (const m of blok.matchAll(/\{([^{}]*\bdruh\s*:\s*'[^']+'[^{}]*)\}/gs)) {
		const telo = m[1]
		const hodnota = (jmeno) => telo.match(new RegExp(`\\b${jmeno}\\s*:\\s*'([^']*)'`))?.[1] ?? ''
		vysledek.push({ druh: hodnota('druh'), nazev: hodnota('nazev'), cesta: hodnota('cesta') || hodnota('url') })
	}
	for (const m of blok.matchAll(/youtubeId\s*:\s*'([^']+)'/g)) {
		vysledek.push({ druh: 'youtube', nazev: 'youtubeId', cesta: m[1] })
	}
	return vysledek
}

const mediaHEAD = materialy(pHEAD?.blok)
const mediaStrom = materialy(pStrom?.blok)
const popisMedia = (m) => zjednodus(`${m.nazev} ${m.cesta}`)
const jePisen = (m) => m.druh === 'audio' || /\bpis(?:en|nicka)\b/.test(popisMedia(m))
const jePolemika = (m) => /\bpolemika\b/.test(popisMedia(m))
const jeVideo = (m) => ['video', 'youtube'].includes(m.druh) && !jePisen(m) && !jePolemika(m)
const jeInfo = (m) => m.druh === 'infografika'

const radky = []
function pridejMedia(nazev, filtr) {
	const commitnute = mediaHEAD.filter(filtr)
	const pracovni = mediaStrom.filter(filtr)
	if (commitnute.length) {
		const zive = commitnute.find((m) => souborVHEAD(m.cesta))
		if (zive) {
			radky.push([nazev, 'ANO', `HEAD:public${zive.cesta} (soubor je commitnutý)`])
		} else {
			const m = commitnute[0]
			radky.push([nazev, 'NEJISTÉ', `HEAD:src/data/temata.ts → ${m.druh}: ${m.cesta || m.nazev} (externí odkaz nebo bez ověřitelného souboru)`])
		}
		return
	}
	if (pracovni.length) {
		const m = pracovni[0]
		radky.push([nazev, 'NEJISTÉ', `jen pracovní strom src/data/temata.ts → ${m.druh}: ${m.cesta || m.nazev}; v HEAD není`])
		return
	}
	radky.push([nazev, 'NE', `HEAD:src/data/temata.ts → u klíče '${klic}' položka není`])
}

pridejMedia('video', jeVideo)
pridejMedia('polemika', jePolemika)
pridejMedia('infografika', jeInfo)

function pridejDatovyKlic(nazev, soubor) {
	const vCommitu = klice(zHEAD(soubor) ?? '').has(klic)
	const veStromu = klice(zeStromu(soubor) ?? '').has(klic)
	if (vCommitu) radky.push([nazev, 'ANO', `HEAD:${soubor} → '${klic}'`])
	else if (veStromu) radky.push([nazev, 'NEJISTÉ', `${soubor} → '${klic}' je jen v pracovním stromě, ne v HEAD`])
	else radky.push([nazev, 'NE', `HEAD:${soubor} → klíč '${klic}' není`])
}

pridejDatovyKlic('kvíz', 'src/data/kvizy.ts')
pridejMedia('písnička', jePisen)
pridejDatovyKlic('laboratorní práce', 'src/data/laborky.ts')

console.log(`\n${p.nazev || p.slug}  (${p.rocnik}. ročník)`)
console.log(`klíč: ${klic}`)
console.log(`stránka: https://lab.wonderly.cz/${klic}/\n`)
const s1 = Math.max(...radky.map((r) => r[0].length))
const s2 = Math.max(...radky.map((r) => r[1].length))
for (const [co, stav, dukaz] of radky) console.log(`  ${co.padEnd(s1)}  ${stav.padEnd(s2)}  ${dukaz}`)
console.log(
	'\nANO = položka i její lokální soubor nebo datový klíč jsou v HEAD.' +
	'\nNEJISTÉ = položka je jen v pracovním stromě, nebo je v HEAD, ale její externí cíl bez sítě neověřuji.' +
	'\nNE = položka u podtématu není ani v HEAD, ani v pracovním stromě.\n',
)
