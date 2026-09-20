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

// Regrese: standardní TypeScript dovoluje jednoduché i dvojité uvozovky.
// Stejná data v HEAD musí dát stejnou inventuru bez ohledu na zápis.
const { mkdtempSync, mkdirSync, writeFileSync, copyFileSync } = await import('node:fs')
const { tmpdir } = await import('node:os')
const fixture = mkdtempSync(join(tmpdir(), 'wonderly-inventura-quotes-'))
copyFileSync(join(KOREN, SKRIPT), join(fixture, 'inventura-podtematu.mjs'))
mkdirSync(join(fixture, 'src/data'), { recursive: true })
mkdirSync(join(fixture, 'public/materialy'), { recursive: true })
writeFileSync(join(fixture, 'public/materialy/pisen.m4a'), 'test-only fixture')
writeFileSync(join(fixture, 'public/materialy/info.jpg'), 'test-only fixture')
const git = (...args) => execFileSync('git', args, {cwd:fixture, encoding:'utf8', stdio:['ignore','pipe','pipe']})
git('init', '-q')
const key = 'fyzika/8-rocnik/test/prace'
for (const quote of ["'", '"']) {
 const q = value => quote + value + quote
 const material = (kind, name, path) => `{ ${q('druh')}: ${q(kind)}, ${q('nazev')}: ${q(name)}, ${q('cesta')}: ${q(path)} }`
 const media = [material('video','Animovaný díl','/media/dil.mp4'),material('video','Píseň','/materialy/pisen.m4a'),material('infografika','Přehled','/materialy/info.jpg')]
 writeFileSync(join(fixture,'src/data/temata.ts'), `export const temata = {\n\t'fyzika/8-rocnik': [\n\t\t{\n\t\t\tslug: 'test',\n\t\t\tpodtemata: [\n\t\t\t\t{\n\t\t\t\t\tslug: 'jine',\n\t\t\t\t\tnazev: 'Jiné',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tmaterialy: [${media.join(',')}],\n\t\t\t\t\tslug: 'prace',\n\t\t\t\t\tnazev: 'Práce',\n\t\t\t\t}],\n\t\t},\n\t],\n};\n`.replaceAll('\n','\n').replaceAll('\t','\t'))
 writeFileSync(join(fixture,'src/data/kvizy.ts'), `export const kvizy = {${q(key)}: []};`)
 writeFileSync(join(fixture,'src/data/laborky.ts'), `export const laborky = {${q(key)}: {nazev: 'Pokus'}};`)
 git('add','--','src/data/temata.ts','src/data/kvizy.ts','src/data/laborky.ts','public/materialy/pisen.m4a','public/materialy/info.jpg')
 git('-c','user.name=Fixture','-c','user.email=fixture@example.invalid','-c','commit.gpgsign=false','commit','-qm','quote fixture')
 const previous=tabulka(execFileSync(process.execPath,[join(fixture,'inventura-podtematu.mjs'),'fyzika/8-rocnik/test/jine'],{encoding:'utf8'}))
 assert.equal(previous.get('video')?.stav,'NE','Médium nesmí přetéct k předchozímu podtématu')
 assert.equal(previous.get('infografika')?.stav,'NE','Infografika nesmí přetéct k předchozímu podtématu')
 const actual=tabulka(execFileSync(process.execPath,[join(fixture,'inventura-podtematu.mjs'),key],{encoding:'utf8'}))
 assert.equal(actual.get('video')?.stav,'NEJISTÉ',`R2 média se nesmějí ztratit: ${quote}`)
 assert.equal(actual.get('písnička')?.stav,'ANO',`Píseň musí být rozpoznána: ${quote}`)
 assert.equal(actual.get('infografika')?.stav,'ANO',`Infografika musí být rozpoznána: ${quote}`)
 assert.equal(actual.get('kvíz')?.stav,'ANO',`Kvízový klíč musí být rozpoznán: ${quote}`)
 assert.equal(actual.get('laboratorní práce')?.stav,'ANO',`Laborkový klíč musí být rozpoznán: ${quote}`)
}
console.log('OK: shodná inventura HEAD při jednoduchých/dvojitých uvozovkách, lokální média vs R2')
