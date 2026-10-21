// Bez prohlížeče spouští skutečný skript tisknutelného testu nad importovanými daty.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import postcss from 'postcss';
import { nactiData } from './data.mjs';
const zdroj = readFileSync(new URL('../src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/test/index.astro', import.meta.url), 'utf8');
const skript = zdroj.match(/<script is:inline define:vars=\{\{ otazky, POCET_V_TESTU, nazevTestu: podtema.nazev \}\}>([\s\S]*?)<\/script>/)[1];
const { kvizy } = await nactiData();
const original = kvizy['fyzika/8-rocnik/elektrina/elektricke-obvody'];
function spust(kod = skript, otazky = original) {
	const prvky = new Map();
	const tridy = new Map();
	const document = { getElementById(id) {
		if (!prvky.has(id)) prvky.set(id, { innerHTML: '', textContent: '', value: '1', udalosti: {}, addEventListener(typ, fn) { this.udalosti[typ] = fn; } });
		return prvky.get(id);
	}, body: { classList: { toggle(jmeno, zapnuto) { tridy.set(jmeno, zapnuto); } } } };
	let seminko = 1847;
	const math = Object.create(Math);
	math.random = () => ((seminko = (Math.imul(seminko, 1664525) + 1013904223) >>> 0) / 4294967296);
	const ctx = vm.createContext({ Math: math, otazky, POCET_V_TESTU: 7, nazevTestu: 'Test', document, window: { print() {} } });
	vm.runInContext(kod, ctx);
	const stav = () => JSON.parse(vm.runInContext('JSON.stringify({vybrane, verzeA, verzeB, zbytekPoolu})', ctx));
	return { ctx, stav, document, tridy, run: (js) => vm.runInContext(js, ctx) };
}
// Čteme skutečně vykreslený klíč, nikoli pouze pole spravne ve stavu.
function overVykreslenyKlic(t, data = original) {
	const html = t.document.getElementById('arch-klic').innerHTML;
	const skupiny = [...html.matchAll(/<h3>Skupina ([AB])<\/h3>\s*<ol>([\s\S]*?)<\/ol>/g)];
	assert.deepEqual(skupiny.map((m) => m[1]), ['A', 'B'], 'vykreslený klíč má obě skupiny');
	const stav = t.stav();
	for (const [, skupina, seznam] of skupiny) {
		const polozky = [...seznam.matchAll(/<li><strong>([abc])\)<\/strong> — ([\s\S]*?)<\/li>/g)].map((m) => ({ pismeno: m[1], text: m[2] }));
		const ocekavane = stav['verze' + skupina].map((o) => ({
			pismeno: 'abc'[o.odpovedi.indexOf(data[o.id].odpovedi[0])],
			text: data[o.id].text,
		}));
		assert.deepEqual(polozky, ocekavane, `vykreslený klíč skupiny ${skupina} odpovídá aktuálním otázkám a pořadí odpovědí`);
	}
}
function dokaz(kod = skript) {
	const t = spust(kod);
	overVykreslenyKlic(t);
	let pred = t.stav();
	assert.equal(pred.verzeA.length, 7);
	assert.equal(new Set(pred.vybrane).size, 7);
	const id = pred.verzeA[2].id;
	t.run(`vymenOtazku(${id})`);
	let po = t.stav();
	overVykreslenyKlic(t);
	assert.ok(!po.vybrane.includes(id));
	assert.equal(po.zbytekPoolu.length, pred.zbytekPoolu.length - 1);
	for (const verze of ['verzeA', 'verzeB']) {
		const index = pred[verze].findIndex((o) => o.id === id);
		assert.notEqual(po[verze][index].id, id);
		for (let i = 0; i < 7; i++) if (i !== index) assert.deepEqual(po[verze][i], pred[verze][i], 'ostatní otázky i odpovědi zůstaly');
		for (const o of po[verze]) assert.equal(o.odpovedi['abc'.indexOf(o.spravne)], original[o.id].odpovedi[0]);
	}
	assert.equal(po.verzeA[2].id, po.verzeB[pred.verzeB.findIndex((o) => o.id === id)].id);
	const pouzite = new Set([...pred.vybrane, po.verzeA[2].id]);
	while (t.stav().zbytekPoolu.length) {
		pred = t.stav();
		const bez = pred.zbytekPoolu.filter((id) => !t.run(`maDelkovouNapovedu(otazky[${id}])`));
		t.run('vymenOtazku(verzeA[0].id)');
		po = t.stav();
		overVykreslenyKlic(t);
		const nove = po.verzeA[0].id;
		assert.ok(!pouzite.has(nove), 'náhrada dosud nebyla použita');
		if (bez.length) assert.ok(bez.includes(nove), 'preferuje bez délkové nápovědy');
		pouzite.add(nove);
	}
	pred = t.stav();
	t.run('vymenOtazku(verzeA[0].id)');
	assert.deepEqual(t.stav(), pred);
	assert.equal(t.document.getElementById('vymena-stav').textContent, 'Žádná další otázka k výměně');
	t.run('vygeneruj()');
	overVykreslenyKlic(t);
	assert.equal(t.stav().zbytekPoolu.length, original.length - 7, 'Přeházet obnoví celé losování');
	// Ovládání číslem skutečně používá pořadí A, tlačítka delegují identitu otázky z B.
	pred = t.stav();
	t.document.getElementById('vymena-cislo').value = '2';
	t.document.getElementById('vymenit').udalosti.click();
	overVykreslenyKlic(t);
	assert.notEqual(t.stav().verzeA[1].id, pred.verzeA[1].id);
	pred = t.stav();
	t.document.getElementById('arch-zadni').udalosti.click({ target: { closest() { return { dataset: { vymenit: String(pred.verzeB[6].id) } }; } } });
	assert.notEqual(t.stav().verzeB[6].id, pred.verzeB[6].id);
	overVykreslenyKlic(t);
}
dokaz();
for (const [z, na] of [
	['verzeB = verzeB.map((o) => o.id === id ? pripravOtazku(novyId) : o);', ''],
	['verzeA = verzeA.map((o) => o.id === id ? pripravOtazku(novyId) : o);', 'verzeA = pripravVerzi(vybrane);'],
	['const novyId = zbytekPoolu.shift();', 'const novyId = zbytekPoolu[0];'],
	["document.getElementById('arch-klic').innerHTML =", "document.getElementById('arch-klic').innerHTML ||="],
]) {
	assert.ok(skript.includes(z), 'mutace musí zasáhnout skutečný zdroj');
	assert.throws(() => dokaz(skript.replace(z, na)), 'podvrh musí selhat');
}
const obrazkove = original.map((o) => ({ ...o, obrazek: { src: '/obr-01.svg', alt: 'Schéma & <popis>' } }));
const t = spust(skript, obrazkove);
assert.match(t.document.getElementById('arch-predni').innerHTML, /class="test-obrazek"/);
assert.match(t.document.getElementById('arch-predni').innerHTML, /Schéma &amp; &lt;popis&gt;/);
assert.match(zdroj, /\.no-print,[\s\S]*?display: none !important/);
const kratky = spust(skript, original.slice(0, 3));
kratky.run('vymenOtazku(verzeA[0].id)');
assert.equal(kratky.document.getElementById('vymena-stav').textContent, 'Žádná další otázka k výměně');
console.log('Výměna otázky: skutečný skript, pořadí A/B, odpovědi, klíč, preference, vyčerpání, obě ovládání a 4 mutace v pořádku.');

// Vyhodnocení skutečné CSS kaskády (pořadí, specificita, !important a media), bez layout enginu.
// Dokládá viditelnost a volný tok; pixelové zalomení bez prohlížeče neměří.
function overObrazkovyTisk(cssZdroj = zdroj) {
	const root = postcss.parse(cssZdroj.match(/<style is:global>([\s\S]*?)<\/style>/)[1]);
	const telo = { tag: 'body', classes: ['test-s-obrazky'] };
	const arch = { tag: 'div', id: 'arch-obrazky', parent: telo };
	const kopie = { tag: 'section', classes: ['obrazkovy-test'], parent: arch };
	const otazka = { tag: 'div', classes: ['otazka'], parent: kopie };
	const obr = { tag: 'img', classes: ['test-obrazek'], parent: otazka };
	const tlacitko = { tag: 'button', classes: ['no-print', 'vymena-otazky'], parent: otazka };
	const odpovida = (node, jednoduchy) => {
		if (!node || /[:>+~\[]/.test(jednoduchy)) return false;
		const tag = jednoduchy.match(/^[a-z]+/i)?.[0];
		return (!tag || tag === node.tag) && [...jednoduchy.matchAll(/#([\w-]+)/g)].every((m) => node.id === m[1]) && [...jednoduchy.matchAll(/\.([\w-]+)/g)].every((m) => node.classes?.includes(m[1]));
	};
	const shoda = (node, selektor) => {
		const casti = selektor.trim().split(/\s+/).reverse();
		if (!odpovida(node, casti[0])) return false;
		for (const cast of casti.slice(1)) {
			node = node.parent;
			while (node && !odpovida(node, cast)) node = node.parent;
			if (!node) return false;
		}
		return true;
	};
	const styl = (node, medium, sirka) => {
		const vysledek = {};
		const vahy = {};
		let poradi = 0;
		root.walkRules((rule) => {
			for (let p = rule.parent; p && p !== root; p = p.parent) {
				if (p.type !== 'atrule' || p.name !== 'media') return;
				if (/\bprint\b/.test(p.params) && medium !== 'print') return;
				if (/\bscreen\b/.test(p.params) && medium !== 'screen') return;
				const max = p.params.match(/max-width:\s*([\d.]+)(px|mm)/);
				if (max && sirka > Number(max[1]) * (max[2] === 'mm' ? 96 / 25.4 : 1)) return;
			}
			for (const selector of rule.selectors) {
				if (!shoda(node, selector)) continue;
				const specificita = (selector.match(/#/g)?.length ?? 0) * 10000 + (selector.match(/\./g)?.length ?? 0) * 100 + (selector.match(/(?:^|\s)[a-z]+/gi)?.length ?? 0);
				rule.walkDecls((d) => {
					const vaha = (d.important ? 1e12 : 0) + specificita * 1e6 + poradi++;
					if (!(d.prop in vahy) || vaha >= vahy[d.prop]) { vysledek[d.prop] = d.value; vahy[d.prop] = vaha; }
				});
			}
		});
		return vysledek;
	};
	for (const [medium, sirka] of [['screen', 375], ['screen', 1280], ['print', 794]]) {
		for (let node = obr; node; node = node.parent) {
			const s = styl(node, medium, sirka);
			assert.notEqual(s.display, 'none', `${medium}/${sirka}: obrázek i předci viditelní`);
			assert.ok(!['hidden', 'collapse'].includes(s.visibility));
			assert.notEqual(s.opacity, '0');
			assert.ok(!['hidden', 'clip'].includes(s.overflow), 'žádný ořez předků');
		}
		for (const node of [arch, kopie]) {
			const s = styl(node, medium, sirka);
			assert.ok(!s.height || s.height === 'auto', 'obsah nemá pevnou výšku');
			assert.ok(!s['max-height'] || s['max-height'] === 'none', 'obsah není omezen maximální výškou');
		}
		const obrazek = styl(obr, medium, sirka);
		assert.equal(obrazek['max-height'], '70mm', 'dostatečný prostor pro celý obrázek');
		assert.equal(obrazek['max-width'], '100%');
		assert.equal(obrazek['object-fit'], 'contain');
		for (const id of ['arch-predni', 'arch-zadni']) assert.equal(styl({ tag: 'div', id, classes: ['arch'], parent: telo }, medium, sirka).display, 'none');
		assert.equal(styl(tlacitko, medium, sirka).display === 'none', medium === 'print', '↻ je viditelné jen na obrazovce');
		assert.equal(styl(otazka, medium, sirka)['break-inside'], 'avoid');
		if (medium === 'print') assert.equal(styl(kopie, medium, sirka)['break-before'], 'page');
	}
}
overObrazkovyTisk();
const pridejCSS = (pravidlo) => zdroj.replace('</style>', pravidlo + '\n</style>');
for (const podvrh of [
	'.test-obrazek { display: none !important; }',
	'@media screen { #arch-obrazky { display: none !important; } }',
	'@media print { .obrazkovy-test { height: 148.5mm; overflow: hidden; } }',
	'@media print { .obrazkovy-test { break-before: auto; } }',
	'@media screen and (max-width: 600px) { .obrazkovy-test .test-obrazek { max-height: 0; } }',
	'#arch-obrazky { visibility: hidden; }',
]) assert.throws(() => overObrazkovyTisk(pridejCSS(podvrh)), 'kaskáda musí odmítnout podvrh: ' + podvrh);
assert.equal(t.tridy.get('test-s-obrazky'), true);
const tiskHtml = t.document.getElementById('arch-obrazky').innerHTML;
assert.equal((tiskHtml.match(/class="obrazkovy-test"/g) ?? []).length, 4);
assert.equal((tiskHtml.match(/class="test-obrazek"/g) ?? []).length, 28);
assert.ok(zdroj.indexOf('id="arch-obrazky"') < zdroj.indexOf('id="oznaceni-klice"'));
assert.ok(zdroj.indexOf('id="oznaceni-klice"') < zdroj.indexOf('id="arch-klic"'));
const predVymenou = t.stav();
t.document.getElementById('arch-obrazky').udalosti.click({ target: { closest() { return { dataset: { vymenit: String(predVymenou.verzeB[3].id) } }; } } });
assert.notEqual(t.stav().verzeB[3].id, predVymenou.verzeB[3].id, '↻ v obrázkovém archu funguje');
overVykreslenyKlic(t, obrazkove);
assert.equal(t.document.getElementById('oznaceni-predni').hidden, true);
assert.equal(t.document.getElementById('oznaceni-obrazku').hidden, false);
assert.match(t.document.getElementById('oznaceni-klice').textContent, /po všech kopiích/);
const bezObrazku = spust();
assert.equal(bezObrazku.tridy.get('test-s-obrazky'), false);
assert.equal(bezObrazku.document.getElementById('arch-obrazky').innerHTML, '');
console.log('Obrázková sazba: skutečná CSS kaskáda screen375/1280 a print, 4×7 obrázků, ↻ v novém archu a 6 CSS podvrhů v pořádku.');
