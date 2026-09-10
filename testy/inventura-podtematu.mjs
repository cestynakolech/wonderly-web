#!/usr/bin/env node
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const KOREN = dirname(dirname(fileURLToPath(import.meta.url)))
const SKRIPT = process.env.INVENTURA_SCRIPT ?? 'inventura-podtematu.mjs'

function spust(dotaz) {
	return execFileSync(process.execPath, [SKRIPT, dotaz], {
		cwd: KOREN,
		encoding: 'utf8',
	})
}

function tabulka(vystup) {
	const radky = new Map()
	for (const radek of vystup.split('\n')) {
		const m = radek.match(/^\s{2}(.+?)\s{2,}(ANO|NEJISTÉ|NE)\s{2,}(.*)$/)
		if (m) radky.set(m[1], { stav: m[2], dukaz: m[3] })
	}
	return radky
}

const klidVystup = spust('Klid a pohyb tělesa')
const klid = tabulka(klidVystup)
assert.deepEqual(
	Object.fromEntries([...klid].map(([k, v]) => [k, v.stav])),
	{
		video: 'NE',
		polemika: 'NE',
		infografika: 'ANO',
		kvíz: 'ANO',
		písnička: 'NE',
		'laboratorní práce': 'ANO',
	},
	'Klid a pohyb tělesa se musí shodovat s ručně ověřenou tabulkou',
)
assert.match(
	klidVystup,
	/stránka: https:\/\/lab\.wonderly\.cz\/fyzika\/7-rocnik\/pohyb-a-rychlost\/klid-a-pohyb-telesa\//,
	'veřejná URL nesmí obsahovat interní prefix /skola2',
)
assert.match(klid.get('infografika').dukaz, /HEAD:/, 'ANO musí být doloženo commitnutým stavem')

const cocka = tabulka(spust('opticka-cocka'))
assert.equal(cocka.get('písnička').stav, 'ANO', 'MP4 pojmenované jako píseň je písnička')
assert.doesNotMatch(
	cocka.get('video').dukaz,
	/pisen-opticka-jizda/,
	'písnička v MP4 nesmí být použita jako důkaz výukového videa',
)

const souhrn = tabulka(spust('fyzika/7-rocnik/shrnuti/pololetni-shrnuti'))
assert.equal(souhrn.get('kvíz').stav, 'ANO', "kvíz přiřazený přes kvizy['klíč'] musí být nalezen")

const elektrina = spust('vznik-elektrickeho-proudu')
assert.match(elektrina, /fyzika\/8-rocnik\/elektrina\/vznik-elektrickeho-proudu/)

console.log('OK: inventura podtématu — ruční tabulka, píseň vs. video, souhrnný kvíz, F8 elektřina a HEAD')
