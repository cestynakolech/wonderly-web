// Ověří NÁVRHY přepisů oficiálním měřidlem délkové nápovědy (maDelkovouNapovedu /
// maRemizuODelku z testy/data.mjs) — po dosazení nového textu na místo distraktoru
// nesmí správná odpověď náhodou začít vypadat jako nejdelší/remíza o nejdelší.
//
// Vstup (stdin): JSON pole [{klic, qIndex, distraktorIndex, novyText}, ...]
//   distraktorIndex je pozice v poli odpovedi[] (0 = správná, 1..N = distraktory).
// Výstup (stdout): totéž pole obohacené o {delkovaNapoveda, remiza, ok}.

import { nactiData, maDelkovouNapovedu, maRemizuODelku } from '../data.mjs';

function nactiStdin() {
	return new Promise((resolve, reject) => {
		let data = '';
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', (chunk) => (data += chunk));
		process.stdin.on('end', () => resolve(data));
		process.stdin.on('error', reject);
	});
}

const vstup = JSON.parse(await nactiStdin());
const { kvizy } = await nactiData();

const vystup = vstup.map((item) => {
	const otazky = kvizy[item.klic];
	if (!otazky || !otazky[item.qIndex]) {
		return { ...item, chyba: 'otázka nenalezena', ok: false };
	}
	const original = otazky[item.qIndex];
	const odpovedi = (original.odpovedi ?? []).map(String);
	if (item.distraktorIndex < 0 || item.distraktorIndex >= odpovedi.length) {
		return { ...item, chyba: 'distraktorIndex mimo rozsah', ok: false };
	}
	const nove = odpovedi.slice();
	nove[item.distraktorIndex] = item.novyText;
	const kopie = { ...original, odpovedi: nove };
	const delkovaNapoveda = maDelkovouNapovedu(kopie);
	const remiza = maRemizuODelku(kopie);
	return { ...item, delkovaNapoveda, remiza, ok: !delkovaNapoveda && !remiza };
});

console.log(JSON.stringify(vystup, null, 2));
