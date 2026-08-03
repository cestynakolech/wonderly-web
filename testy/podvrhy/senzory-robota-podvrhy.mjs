#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/senzory-robota.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá
// (git checkout nad necommitnutou prací už jednou stál celou dávku oprav).
//
// Každá mutace je skutečný nález kontrolora: 8 z 2. 8. 2026 (texty vzorců),
// 5 z 3. 8. (přístupnost a chybové kódy) a 11 z druhého kola (naučné texty).
// Spuštění:  node testy/podvrhy/funkce-tabulky-podvrhy.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/SenzoryRobotaSimulace.astro');
const TEST = join(REPO, 'testy/simulace/senzory-robota.mjs');
const KOPIE = join(tmpdir(), 'senzory-robota-podvrh.astro');

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— naučné texty: co prošlo prvnímu testu (122 kontrol) ——
	['poznámka u šikmé stěny tvrdí, že senzor měří přesně', (s) => s.replace("proc: 'ozvěna se odrazí stranou a nevrátí se'", "proc: 'ozvěna se vrátí rovnou zpátky a senzor měří přesně'")],
	['hláška chválí zastavení i po nárazu', (s) => s.replace('robot stojí přesně tam, kde má.', 'robot do zdi naboural a rozbil se.')],
	['hláška u programu bez opakování tvrdí, že měřil pořád', (s) => s.replace('Program se rozhodl jen jednou ', 'Program měřil pořád dokola ')],
	['tlačítko slibuje, že robot nikdy nezastaví', (s) => s.replace('>opakuj: měř a jeď<', '>opakuj: měř a jeď (a nikdy nezastav)<')],
	['poznámka tvrdí, že robot skutečnou vzdálenost vidí', (s) => s.replace('tohle robot nikdy nevidí', 'tohle robot vidí taky')],
	['hláška u dotyku svádí náraz na ultrazvuk i tam, kde měřil dobře', (s) => s.replace('? `Robot narazil ${PREKAZKY[prekazka].doCeho} — ultrazvuk ji přitom <strong>viděl správně</strong>, `\n\t\t\t\t\t+ `jenže program se zeptal jen jednou na začátku a pak jel naslepo. ${konec}`', '? `Robot narazil ${PREKAZKY[prekazka].doCeho} — ultrazvuk ji <strong>neviděl</strong>. ${konec}`')],
	['zácloně se říká zeď', (s) => s.replace("doCeho: 'do záclony'", "doCeho: 'do zdi'")],
	['tabulka dopočítává rozhodnutí i tam, kde se program neptá', (s) => s.replace("rozhodnutiEl.textContent = !rozhoduje && ujel > 0\n\t\t\t? 'už se neptá'\n\t\t\t: stoji", "rozhodnutiEl.textContent = false\n\t\t\t? 'už se neptá'\n\t\t\t: stoji")],
	// —— scéna: svislé uspořádání a směr paprsku ——
	['robot lítá vzduchem nad podlahou', (s) => s.replace('id="sr-robot" x="40" y="110"', 'id="sr-robot" x="40" y="10"')],
	['podlaha je nahoře', (s) => s.replace('<rect x="0" y="170" width="640" height="50"', '<rect x="0" y="0" width="640" height="50"')],
	['zeď visí ve vzduchu', (s) => s.replace('id="sr-zed" x="560" y="40" width="40" height="130"', 'id="sr-zed" x="560" y="10" width="40" height="60"')],
	['paprsek míří dozadu', (s) => s.replace("paprsekEl.setAttribute('x2', String(KONEC_PAPRSKU[prekazka][0]));", "paprsekEl.setAttribute('x2', '0');")],
	['od šikmé stěny se paprsek neodrazí', (s) => s.replace('sikma: [620, 55]', 'sikma: [560, 130]')],
	['popis obrázku mluví o teplotě', (s) => s.replace('Robot jede zleva k překážce a ultrazvukem měří, jak je daleko', 'Robot jede shora dolů a měří teplotu zdi')],
	['popis obrázku se přestal aktualizovat', (s) => s.replace('popisEl.textContent = `Robot jede zleva ${PREKAZKY[prekazka].doCeho}. Ujel ${cz(ujel)} cm, `', 'popisEl.textContent = `Robot jede zleva. Ujel nějakou dráhu, `')],
	// —— přístupnost a věcné hodnoty ——
	['obrys zdi je skoro bílý', (s) => s.replace('id="sr-zed" x="560" y="40" width="40" height="130" fill="#adb5bd" stroke="#2b2a26"', 'id="sr-zed" x="560" y="40" width="40" height="130" fill="#adb5bd" stroke="#fafafa"')],
	['senzor bez ozvěny hlásí nulu místo největšího dosahu', (s) => s.replace('const MAX_DOSAH = 200;', 'const MAX_DOSAH = 0;')],
	['dotyk sepne už metr před překážkou', (s) => s.replace('const dotykSepnul = (ujel) => skutecnaVzdalenost(ujel) === 0;', 'const dotykSepnul = (ujel) => skutecnaVzdalenost(ujel) <= 100;')],
	['program se ptá i bez opakování', (s) => s.replace('const rozhodujeSe = opakovat === 1 || ujel === 0;', 'const rozhodujeSe = true;')],
	['výchozí program je ten bez opakování', (s) => s.replace('let opakovat = 1;', 'let opakovat = 0;')],
	['záclona vypadá jako zeď', (s) => s.replace("zaclona: { nazev: 'záclona', doCeho: 'do záclony', ozvenaSeVrati: false,\n\t\t\tproc: 'měkká látka zvuk pohltí', sirka: 14, barva: '#b197fc', sklon: '' }", "zaclona: { nazev: 'záclona', doCeho: 'do záclony', ozvenaSeVrati: false,\n\t\t\tproc: 'měkká látka zvuk pohltí', sirka: 40, barva: '#adb5bd', sklon: '' }")],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const pocet = (zdravy.stdout.match(/všech (\d+) kontrol/) ?? [])[1];
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${pocet} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) { console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n')); process.exit(1); }

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const padlo = (v.stdout.match(/^❌ ★?.*/gm) ?? []).filter((r) => !r.startsWith('❌ ') || true);
	const kolik = (v.stdout.match(/^❌ /gm) ?? []).length;
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${kolik} kontrol spadlo): ${nazev}\n     ↳ ${padlo[0]?.slice(0, 110) ?? v.stderr.split('\n')[0]}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);
