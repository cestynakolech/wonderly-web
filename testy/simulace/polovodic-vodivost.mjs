#!/usr/bin/env node
// Ověření PolovodicVodivostSimulace.astro (F9, vlastní vodivost polovodiče):
// spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM a proměří, co
// scéna žákovi ukazuje ve všech 7 polohách posuvníku (−20 … 100 °C po 20 °C).
//
// SMYSL scény podle výkladu a PDF „13. Polovodiče…“:
//   · „Nízká teplota – polovodič je spíše izolant“ → při nízké teplotě
//     minimum (žádný nakreslený pár), text jen „skoro nevznikají“ /
//     „téměř neteče“ — žádná přesná hranice ve °C,
//   · „Za běžných teplot je to velmi vzácné“ → při 20 °C jediný pár,
//   · „S rostoucí teplotou PRUDCE roste počet volných elektronů a děr“
//     → počet párů roste zrychleně (0, 0, 1, 2, 3, 5, 7), jen názorně,
//   · „stejný počet volných elektronů a děr“, elektrony k +, díry k −,
//   · proud se NEvyčísluje — výklad žádnou hodnotu (µA) nemá,
//   · žárovka a zdroj jsou v JEDNOM obvodu s polovodičem.
// Značky jako v obrázcích výkladu obr-03/04: elektron = modrý kroužek „−“,
// díra = zelený ČÁRKOVANÝ kroužek „+“.
// Historie: kontrola T3c (nálezy 22, 23) — µA, svit při 0 °C, červené „d“,
// díra zakrývala elektron; kontrola oprav (nálezy 5–10) — tvrdá hranice
// 0 °C, lineární růst, žárovka mimo obvod, „-20“ se spojovníkem, drobné
// písmo na mobilu, chybějící aria-live.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const svgZdroj = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '', posluchaci: {},
		classList: { add() {}, remove() {}, contains() { return false; } },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
// posuvník má ve zdroji value="20" — v náhradním DOM ho nastavíme stejně
const vychozi = Number(zdroj.match(/id="pol-slider"[^>]*value="(-?\d+)"/)[1]);
novyPrvek('pol-slider').value = String(vychozi);
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (t) => { prvky.get('pol-slider').value = String(t); (prvky.get('pol-slider').posluchaci.input || []).forEach((f) => f()); };
const svg = prvky.get('pol-svg');
const stav = svg.__stavPolovodice, poz = svg.__pozicePartice, svit = svg.__svitZarovky, tt = svg.__teplotaText;
const castice = () => prvky.get('pol-castice').innerHTML;
const t = (id) => prvky.get(id).textContent;
const TEPLOTY = [-20, 0, 20, 40, 60, 80, 100];
// ČEKANÉ hodnoty natvrdo (ne odvozené z komponenty)
const PARU = { '-20': 0, 0: 0, 20: 1, 40: 2, 60: 3, 80: 5, 100: 7 };
const PROUD = { 0: 'téměř neteče', 1: 'velmi slabý', 2: 'slabý', 3: 'slabý', 5: 'větší', 7: 'větší' };
const TEXT_T = { '-20': '−20 °C', 0: '0 °C', 20: '20 °C', 40: '40 °C', 60: '60 °C', 80: '80 °C', 100: '100 °C' };
const RADKY = [114, 136, 158, 180, 202, 224, 246];
const ELEKTRON = /<circle cx="([\d.]+)" cy="(\d+)" r="10" fill="#1864ab" stroke="#2b2a26" stroke-width="2" \/>/g;
const DIRA = /<circle cx="([\d.]+)" cy="(\d+)" r="10" fill="#ebfbee" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" \/>/g;
const kolecka = (re) => [...castice().matchAll(re)].map((m) => [Number(m[1]), Number(m[2])]);

console.log('— počet párů podle teploty: nízká = minimum, pak zrychleně —');
for (const tep of TEPLOTY) ok(stav(tep).pocetParu === PARU[tep], `${tep} °C → ${PARU[tep]} párů (je ${stav(tep).pocetParu})`);
ok(TEPLOTY.every((tep) => Number.isInteger(stav(tep).pocetParu)), 've všech polohách posuvníku je počet párů celé číslo');
{
	const n = TEPLOTY.map((tep) => stav(tep).pocetParu);
	const prirustky = n.slice(1).map((x, i) => x - n[i]);
	ok(prirustky.every((d) => d >= 0), `páry s teplotou nikdy neubývají (přírůstky ${prirustky.join(', ')})`);
	ok(prirustky.every((d, i) => i === 0 || d >= prirustky[i - 1]) && prirustky[prirustky.length - 1] > prirustky[2],
		`růst je ZRYCHLENÝ, ne lineární — přírůstky se zvětšují (${prirustky.join(', ')})`);
}

console.log('— proud jen slovy, žádné µA —');
for (const tep of TEPLOTY) ok(stav(tep).proud === PROUD[PARU[tep]], `${tep} °C → proud „${PROUD[PARU[tep]]}“ (je „${stav(tep).proud}“)`);
{
	const bezKomentaru = zdroj.replace(/^---[\s\S]*?---/, '').replace(/\/\/[^\n]*/g, '');
	ok(!/µA|mA|PROUD_NA_PAR/.test(bezKomentaru), 'v komponentě není žádná hodnota proudu v µA (výklad ji nemá)');
	ok(!/pod 0 °C|0 °C a (níž|méně)|při 0 °C/.test(bezKomentaru), 'scéna netvrdí přesnou teplotní hranici vzniku párů');
}

console.log('— záporná teplota se znaménkem minus —');
for (const tep of TEPLOTY) ok(tt(tep) === TEXT_T[tep], `${tep} → „${tt(tep)}“ (čekáno „${TEXT_T[tep]}“)`);

console.log('— žárovka: při nízké teplotě zhasnutá, pak jasnější s každým párem —');
ok(svit(0).paprsky === 0 && svit(0).banka === '#e9ecef', `bez párů žárovka nesvítí (paprsky ${svit(0).paprsky}, baňka ${svit(0).banka})`);
ok(svit(1).paprsky === 1 / 7 && svit(1).banka === '#ffe066', `jediný pár (20 °C): svítí jen nepatrně (paprsky ${svit(1).paprsky.toFixed(2)})`);
ok(svit(7).paprsky === 1, `7 párů (100 °C): plný jas (paprsky ${svit(7).paprsky})`);
ok([1, 2, 3, 4, 5, 6, 7].every((n) => svit(n).paprsky > svit(n - 1).paprsky), 'každý další pár žárovku zjasní');

console.log('— obvod: zdroj, žárovka a polovodič v sérii —');
ok(svgZdroj.includes('<path d="M60 260 L60 330 L150 330"'), 'vodič vede ze záporné elektrody (vlevo) k záporné desce zdroje (x = 150)');
ok(svgZdroj.includes('<line x1="150" y1="316" x2="150" y2="344" stroke="#2b2a26" stroke-width="7" />') && svgZdroj.includes('<line x1="166" y1="304" x2="166" y2="356" stroke="#2b2a26" stroke-width="3" />'),
	'zdroj: krátká tlustá deska − (x 150), dlouhá tenká + (x 166)');
ok(svgZdroj.includes('<path d="M166 330 L274 330"') && svgZdroj.includes('<circle id="pol-zarovka" cx="290" cy="330" r="16"'), 'vodič od + zdroje končí na levém okraji žárovky (290 − 16 = 274)');
ok(svgZdroj.includes('<path d="M306 330 L380 330 L380 260"'), 'z pravého okraje žárovky (306) vede vodič ke kladné elektrodě (vpravo)');
ok(/<rect x="50" y="100" width="20" height="160"/.test(svgZdroj) && /<rect x="370" y="100" width="20" height="160"/.test(svgZdroj), 'elektrody přiléhají ke vzorku (70–370) a vodiče začínají na jejich spodku (y 260)');

console.log('— čitelnost na telefonu (~320 px šířky) —');
{
	const sirka = Number(svgZdroj.match(/viewBox="0 0 (\d+) (\d+)"/)[1]);
	nastav(100);
	const velikosti = [...(svgZdroj + castice()).matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1]));
	const nejmensi = Math.min(...velikosti);
	ok(nejmensi * 320 / sirka >= 12, `nejmenší písmo ${nejmensi} ve scéně široké ${sirka} → na telefonu ${(nejmensi * 320 / sirka).toFixed(1)} px ≥ 12 px`);
	ok(sirka <= 440, `scéna je nejvýš 440 jednotek široká (je ${sirka})`);
	const plaketa = svgZdroj.match(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" rx="10"/).slice(1).map(Number);
	const popisek = svgZdroj.match(/<text x="(\d+)" y="(\d+)" text-anchor="middle" font-size="(\d+)"[^>]*>čistý křemík/).slice(1).map(Number);
	ok(popisek[1] - popisek[2] >= plaketa[1] + plaketa[3] + 4, `„čistý křemík“ (horní hrana ≈ ${popisek[1] - popisek[2]}) nenaléhá na plaketu (spodek ${plaketa[1] + plaketa[3]})`);
	ok(popisek[1] < 100, `„čistý křemík“ leží nad vzorkem (y ${popisek[1]} < 100)`);
	ok(plaketa[0] + plaketa[2] / 2 === 220 && popisek[0] === 220, 'plaketa i popisek jsou vystředěné nad vzorkem (x = 220)');
	ok(/<text id="pol-teplota-text" x="220"/.test(svgZdroj) && /<text id="pol-proud-text" x="220"/.test(svgZdroj), 'řádky plakety jsou vystředěné na x = 220');
}

console.log('— přístupnost —');
ok(/<p class="pol-stav" id="pol-stav" aria-live="polite">/.test(zdroj), 'věta o stavu (#pol-stav) má aria-live="polite"');

console.log('— pohyb: elektron k +, díra k −, nikdy se nepřekryjí —');
{
	const p = poz(0, 0, 1);
	ok(p.xElektron === 232 && p.xDira === 208, `nový pár vzniká u středu S ODSTUPEM: elektron 232, díra 208 (je ${p.xElektron}, ${p.xDira})`);
	const pul = poz(1500, 0, 1);
	ok(pul.xElektron === 294 && pul.xDira === 146, `v půlce cesty: elektron 294 (doprava k +), díra 146 (doleva k −) (je ${pul.xElektron}, ${pul.xDira})`);
	const konec = poz(2999.9, 0, 1);
	ok(Math.round(konec.xElektron) === 356 && Math.round(konec.xDira) === 84, `na konci dojede elektron k 356, díra k 84 (je ${konec.xElektron.toFixed(1)}, ${konec.xDira.toFixed(1)})`);
	ok(poz(1500, 1, 2).xElektron === 232 && poz(0, 1, 2).xElektron === 294, 'dva páry jsou rozfázované o půl periody');
	ok(poz(-1500, 0, 1).xElektron === 294, 'záporný čas nerozbije fázi');
	ok(poz(0, 0, 0) === null, 'bez párů se nic nepočítá');
	ok(JSON.stringify([0, 1, 2, 3, 4, 5, 6].map((i) => poz(0, i, 7).y)) === JSON.stringify(RADKY), `každý pár má svůj řádek ${JSON.stringify(RADKY)}`);
	ok(RADKY.every((y) => y >= 112 && y <= 248), 'všechny řádky leží uvnitř vzorku křemíku (střed 112–248 při obrysu 100–260)');
	let nejblize = Infinity, xMin = Infinity, xMax = -Infinity;
	for (const n of [1, 2, 3, 5, 7]) for (let cas = 0; cas < 3000; cas += 37) {
		const k = [];
		for (let i = 0; i < n; i++) { const q = poz(cas, i, n); k.push([q.xElektron, q.y], [q.xDira, q.y]); }
		for (const [x] of k) { xMin = Math.min(xMin, x); xMax = Math.max(xMax, x); }
		for (let a = 0; a < k.length; a++) for (let b = a + 1; b < k.length; b++) nejblize = Math.min(nejblize, Math.hypot(k[a][0] - k[b][0], k[a][1] - k[b][1]));
	}
	ok(nejblize >= 20, `žádné dva kroužky se nepřekryjí v žádném čase (nejmenší vzdálenost středů ${nejblize.toFixed(1)} px ≥ 20)`);
	ok(xMin >= 82 && xMax <= 358, `částice nevyjedou ze vzorku (x ${xMin.toFixed(1)}–${xMax.toFixed(1)}, vnitřek 72–368 minus poloměr)`);
}

console.log('— výchozí stav (posuvník 20 °C) —');
nastav(vychozi);
ok(vychozi === 20, 'posuvník začíná na pokojových 20 °C');
ok(t('pol-teplota-text') === 'Teplota: 20 °C', `plaketa: ${t('pol-teplota-text')}`);
ok(t('pol-proud-text') === 'Páry: 1 · proud velmi slabý', `plaketa: ${t('pol-proud-text')}`);

console.log('— všech 7 poloh posuvníku: co je vidět —');
for (const tep of TEPLOTY) {
	nastav(tep);
	const n = PARU[tep];
	const el = kolecka(ELEKTRON), di = kolecka(DIRA);
	ok(el.length === n && di.length === n, `${tep} °C: nakresleno ${el.length} elektronů a ${di.length} děr (čekáno ${n} a ${n})`);
	ok(t('pol-proud-text') === `Páry: ${n} · proud ${PROUD[n]}`, `${tep} °C plaketa: ${t('pol-proud-text')}`);
	ok(t('pol-teplota-text') === `Teplota: ${TEXT_T[tep]}` && t('pol-out-t') === TEXT_T[tep], `${tep} °C: „${TEXT_T[tep]}“ na plaketě i u posuvníku`);
	ok(prvky.get('pol-vzorec').innerHTML === `Volné elektrony: <strong>${n}</strong> · díry: <strong>${n}</strong> — vždy stejně, protože vznikají v párech.`, `${tep} °C: elektronů = děr = ${n}`);
	ok(Number(prvky.get('pol-paprsky').getAttribute('opacity')) === n / 7, `${tep} °C: paprsky žárovky ${prvky.get('pol-paprsky').getAttribute('opacity')} (čekáno ${n}/7)`);
	ok(prvky.get('pol-zarovka').getAttribute('fill') === (n ? '#ffe066' : '#e9ecef'), `${tep} °C: baňka ${prvky.get('pol-zarovka').getAttribute('fill')}`);
	const y = Number(prvky.get('pol-teplomer-sloupec').getAttribute('y')), h = Number(prvky.get('pol-teplomer-sloupec').getAttribute('height'));
	ok(y + h === 250 && h === tep + 30, `${tep} °C: sloupec teploměru y ${y}, výška ${h} (čekáno ${tep + 30}) končí u baňky (250)`);
	ok(!/#e03131|>d<|e⁻/.test(castice()), `${tep} °C: žádná stará značka (červené „d“, „e⁻“)`);
}

console.log('— tvar značek jako v obrázcích výkladu —');
nastav(20);
ok(/<circle cx="232" cy="114" r="10" fill="#1864ab" stroke="#2b2a26" stroke-width="2" \/><text x="232" y="119" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">−<\/text>/.test(castice()),
	`elektron = modrý kroužek s bílým „−“ na (232, 114): ${castice().slice(0, 100)}`);
ok(/<circle cx="208" cy="114" r="10" fill="#ebfbee" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" \/><text x="208" y="119" text-anchor="middle" font-size="17" font-weight="bold" fill="#1b6b2d">\+<\/text>/.test(castice()),
	'díra = zelený čárkovaný kroužek se zeleným „+“ na (208, 114)');
ok(/Teplo uvolnilo 1 pár elektron/.test(t('pol-stav')) && /zelené čárkované/.test(t('pol-stav')) && /Proud je velmi slabý/.test(t('pol-stav')), `věta pod scénou: ${t('pol-stav')}`);
nastav(40); ok(/uvolnilo 2 páry /.test(t('pol-stav')), `40 °C: „2 páry“ (${t('pol-stav').slice(0, 40)})`);
nastav(80); ok(/uvolnilo 5 párů /.test(t('pol-stav')), `80 °C: „5 párů“ (${t('pol-stav').slice(0, 40)})`);
nastav(100);
{
	const el = kolecka(ELEKTRON), di = kolecka(DIRA);
	ok(JSON.stringify(el.map((k) => k[1])) === JSON.stringify(RADKY) && JSON.stringify(di.map((k) => k[1])) === JSON.stringify(RADKY), '100 °C: sedm párů v sedmi řádcích');
	ok(el.every(([x]) => x > 220) && di.every(([x]) => x < 220), '100 °C: elektrony vpravo od středu (k +), díry vlevo (k −)');
}
for (const tep of [-20, 0]) {
	nastav(tep);
	ok(castice().trim() === '', `${tep} °C: ve vzorku není žádná částice`);
	ok(t('pol-stav') === '🥶 Nízká teplota: polovodič je spíše izolant — páry skoro nevznikají, proud téměř neteče.', `${tep} °C: ${t('pol-stav')}`);
}

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);
