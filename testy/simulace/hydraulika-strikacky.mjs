// Test simulace „Hydraulika ze dvou stříkaček" (7. ročník, Pascalův zákon).
// Spuštění: node testy/simulace/hydraulika-strikacky.mjs src/components/skola2/HydraulikaStrikackySimulace.astro
//
// Co se hlídá (všechny polohy posuvníku 0 / 4 / 8 cm × obě velké stříkačky 2 / 4 cm²):
//  - fyzika: s₂ = s₁ · S₁ : S₂ (8 cm ↔ 2 cm při 1 : 4), odteklý objem = přiteklý (V = S · s),
//    šipka F₂ je S₂ : S₁ krát delší než F₁, velký píst jde NAHORU, malý DOLŮ,
//  - kresba přesně podle pixelů zapsaných natvrdo zde (ne stejným vzorcem jako komponenta),
//    plocha oranžového obrysu „odteklo" = „přiteklo" i v obrázku, šířka válce úměrná ploše,
//  - rozložení: rukojeti nad okrajem válců, šipky a plakety nezalezou do plaket nahoře
//    ani ven ze scény, popisky jen na plaketách,
//  - texty plaket i výsledku slovo od slova, jen celá čísla, žádné číslo mimo {0, 1, 2, 4, 8},
//  - šablona: obal, bez importů, prvky uvnitř <svg>, posuvník jen 0/4/8, aria-pressed.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2] || 'src/components/skola2/HydraulikaStrikackySimulace.astro', 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const svgText = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', value: '', style: {}, dataset: {}, posluchaci: {},
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
const posuvnik = novyPrvek('hs-posun');
posuvnik.value = '0';
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const a = (id, k) => prvky.get(id)?.atributy[k];
const n = (id, k) => Number(a(id, k));
const txt = (id) => prvky.get(id)?.textContent ?? '';
const posun = (s) => { posuvnik.value = String(s); posuvnik.posluchaci.input.forEach((f) => f()); };
const klik = (id) => prvky.get(id).posluchaci.click.forEach((f) => f());

// ---------- očekávané hodnoty (natvrdo) ----------
const DNO = 466;
const SPODEK1 = { 0: 331, 4: 391, 8: 451 }; // spodek malého pístu: 466 − 15 · (9 − s₁)
const POSUN2 = { 4: { 0: 0, 4: 1, 8: 2 }, 2: { 0: 0, 4: 2, 8: 4 } }; // s₂ podle S₂ a s₁
const SPODEK2 = { 0: 421, 1: 406, 2: 391, 4: 361 }; // spodek velkého pístu: 466 − 15 · (3 + s₂)
const VALEC2 = { 4: { x: 272, w: 96 }, 2: { x: 296, w: 48 } }; // šířka 24 px na 1 cm²
const OKRAJ_VALCU = 300; // horní okraj obou válců
const SPODEK_PLAKET = 142;

const celeVsechno = () => [...prvky.values()].every((p) =>
	Object.entries(p.atributy).every(([k, v]) => !['x', 'y', 'x1', 'x2', 'y1', 'y2', 'height', 'width', 'opacity'].includes(k) || Number.isInteger(Number(v))),
);

// ---------- šablona ----------
console.log('— šablona —');
ok(/<section class="ramecek simulace">/.test(zdroj), 'obal <section class="ramecek simulace">');
ok(!/\bimport\s/.test(skript) && !/https?:\/\//.test(skript), 'skript bez importů a externích knihoven');
for (const id of ['hs-voda1', 'hs-voda2', 'hs-odteklo', 'hs-priteklo', 'hs-stena2', 'hs-okraj2', 'hs-pist1', 'hs-tahlo1', 'hs-rukojet1', 'hs-pist2', 'hs-tahlo2', 'hs-rukojet2', 'hs-sipka1', 'hs-hrot1', 'hs-sipka2', 'hs-hrot2', 'hs-f1-pl', 'hs-f1-l', 'hs-f2-pl', 'hs-f2-l', 'hs-s1-pl', 'hs-s1-l', 'hs-s2-pl', 'hs-s2-l', 'hs-s1-t', 'hs-v1-t', 'hs-f1-t', 'hs-S2-t', 'hs-s2-t', 'hs-v2-t', 'hs-f2-t']) {
	ok(new RegExp(`id="${id}"`).test(svgText), `prvek ${id} je uvnitř <svg>`);
}
ok(/<input id="hs-posun" type="range" min="0" max="8" step="4" value="0"/.test(zdroj), 'posuvník 0–8 cm po 4 cm (jen polohy s celým s₂), výchozí 0');
ok(/id="hs-velka2"[^>]*aria-pressed="false"/.test(zdroj) && /id="hs-velka4"[^>]*aria-pressed="true"/.test(zdroj), 'výchozí velká stříkačka 4 cm² (vzor 1 : 4)');
ok(/<text x="16" y="56"[^>]*>S₁ = 1 cm²<\/text>/.test(svgText), 'plaketa malé: S₁ = 1 cm²');
ok(/id="hs-odteklo"[^>]*fill="none"/.test(svgText) && /id="hs-priteklo"[^>]*fill="none"/.test(svgText), 'obrys „odteklo" i „přiteklo" je jen čárkovaný obrys (prázdno nad pístem nevypadá jako látka)');
ok(svgText.indexOf('id="hs-odteklo"') > svgText.indexOf('id="hs-rukojet2"'), 'obrysy se kreslí nad písty (nejsou pod nimi schované)');
// popisky přes kresbu leží na plaketě (rect se stejnou polohou se kreslí těsně před textem)
ok(!/#d9480f/i.test(svgText) && (svgText.match(/#c2410c/g) ?? []).length === 8, 'oranžová #c2410c (kontrast 5,2 : 1 na bílé), ne světlejší #d9480f (4,3 : 1)');
for (const p of ['f1', 'f2', 's1', 's2']) ok(svgText.indexOf(`id="hs-${p}-pl"`) < svgText.indexOf(`id="hs-${p}-l"`), `popisek hs-${p}-l leží na plaketě`);

// ---------- všechny stavy ----------
const vsechnyTexty = [];
for (const S2 of [4, 2]) {
	klik(S2 === 2 ? 'hs-velka2' : 'hs-velka4');
	for (const s1 of [0, 4, 8]) {
		posun(s1);
		const s2 = POSUN2[S2][s1];
		const st = `S₂ = ${S2}, s₁ = ${s1}`;
		console.log(`\n— ${st} —`);
		const sp1 = SPODEK1[s1];
		const sp2 = SPODEK2[s2];
		const { x: x2, w: w2 } = VALEC2[S2];
		const vid = s1 > 0 ? '1' : '0';

		// fyzika
		ok(s1 * 1 === S2 * s2, `${st}: objem 1 · ${s1} = ${S2} · ${s2}`);
		ok(n('hs-pist1', 'y') === sp1 - 10 && n('hs-voda1', 'y') === sp1 && n('hs-voda1', 'height') === DNO - sp1, `${st}: malý píst sjel o ${s1} cm (spodek y=${a('hs-voda1', 'y')})`);
		ok(n('hs-voda1', 'x') === 98 && n('hs-voda1', 'width') === 24 && n('hs-pist1', 'x') === 98 && n('hs-pist1', 'width') === 24, `${st}: malý válec 24 px = 1 cm²`);
		ok(n('hs-pist2', 'y') === sp2 - 10 && n('hs-voda2', 'y') === sp2 && n('hs-voda2', 'height') === DNO - sp2, `${st}: velký píst vyjel o ${s2} cm (spodek y=${a('hs-voda2', 'y')})`);
		ok(n('hs-voda2', 'x') === x2 && n('hs-voda2', 'width') === w2 && n('hs-pist2', 'x') === x2 && n('hs-pist2', 'width') === w2, `${st}: velký válec ${w2} px = ${S2} cm²`);
		ok(n('hs-stena2', 'x') === x2 - 2 && n('hs-stena2', 'width') === w2 + 4 && n('hs-okraj2', 'x') === x2 - 14 && n('hs-okraj2', 'width') === w2 + 28, `${st}: stěna a okraj velkého válce sedí na vodě`);
		ok((sp1 - SPODEK1[0]) === 15 * s1 && (SPODEK2[0] - sp2) === 15 * s2, `${st}: posuny v měřítku 15 px na 1 cm`);

		// obrysy odteklo / přiteklo
		ok(n('hs-odteklo', 'x') === 98 && n('hs-odteklo', 'width') === 24 && n('hs-odteklo', 'y') === 331 && n('hs-odteklo', 'height') === sp1 - 331, `${st}: obrys „odteklo" od klidové polohy po píst`);
		ok(n('hs-priteklo', 'x') === x2 && n('hs-priteklo', 'width') === w2 && n('hs-priteklo', 'y') === sp2 && n('hs-priteklo', 'height') === 421 - sp2, `${st}: obrys „přiteklo" od klidové polohy po píst`);
		const plochaOdt = n('hs-odteklo', 'width') * n('hs-odteklo', 'height');
		const plochaPri = n('hs-priteklo', 'width') * n('hs-priteklo', 'height');
		ok(plochaOdt === plochaPri && plochaOdt === 360 * s1, `${st}: v obrázku stejná plocha odteklo = přiteklo (${plochaOdt} = ${plochaPri} px²)`);
		ok(a('hs-odteklo', 'opacity') === vid && a('hs-priteklo', 'opacity') === vid, `${st}: obrysy vidět jen po zatlačení`);

		// táhla a rukojeti
		const ruk1 = sp1 - 162;
		const ruk2 = sp2 - 132;
		ok(n('hs-tahlo1', 'y') === sp1 - 154 && n('hs-rukojet1', 'y') === ruk1, `${st}: táhlo a rukojeť malé jdou s pístem`);
		ok(n('hs-tahlo2', 'y') === sp2 - 124 && n('hs-rukojet2', 'y') === ruk2 && n('hs-rukojet2', 'x') === x2 - 10 && n('hs-rukojet2', 'width') === w2 + 20, `${st}: táhlo a rukojeť velké jdou s pístem`);
		ok(ruk1 + 8 < OKRAJ_VALCU && ruk2 + 8 < OKRAJ_VALCU, `${st}: obě rukojeti zůstanou nad okrajem válců`);

		// šipky sil
		const d1 = n('hs-sipka1', 'y2') - n('hs-sipka1', 'y1');
		const d2 = n('hs-sipka2', 'y1') - n('hs-sipka2', 'y2');
		ok(n('hs-sipka1', 'y1') === ruk1 - 40 && n('hs-sipka1', 'y2') === ruk1 - 16 && d1 === 24, `${st}: šipka F₁ dlouhá 24 px míří dolů nad rukojeť malé`);
		ok(a('hs-hrot1', 'points') === `100,${ruk1 - 16} 120,${ruk1 - 16} 110,${ruk1 - 4}`, `${st}: hrot F₁ míří dolů na rukojeť`);
		ok(n('hs-sipka2', 'y1') === ruk2 - 4 && d2 === 24 * S2, `${st}: šipka F₂ dlouhá ${d2} px = ${S2} · F₁, začíná u rukojeti velké`);
		ok(a('hs-hrot2', 'points') === `310,${ruk2 - 4 - 24 * S2} 330,${ruk2 - 4 - 24 * S2} 320,${ruk2 - 16 - 24 * S2}`, `${st}: hrot F₂ míří nahoru`);
		ok(d2 / d1 === S2, `${st}: F₂ : F₁ = S₂ : S₁ = ${S2} : 1`);
		for (const id of ['hs-sipka1', 'hs-hrot1', 'hs-sipka2', 'hs-hrot2', 'hs-f1-pl', 'hs-f1-l', 'hs-f2-pl', 'hs-f2-l', 'hs-s1-pl', 'hs-s1-l', 'hs-s2-pl', 'hs-s2-l']) {
			ok(a(id, 'opacity') === vid, `${st}: ${id} vidět jen po zatlačení (${a(id, 'opacity')})`);
		}
		ok(['F₁', 'F₂', 's₁', 's₂'].every((t, i) => txt(['hs-f1-l', 'hs-f2-l', 'hs-s1-l', 'hs-s2-l'][i]) === (s1 > 0 ? t : '')), `${st}: popisky F₁, F₂, s₁, s₂ jen po zatlačení, skryté jsou prázdné`);
		ok(ruk2 - 16 - 24 * S2 > SPODEK_PLAKET, `${st}: hrot F₂ nezaleze do plaket nahoře`);

		// plakety popisků
		const stF1 = ruk1 - 28;
		const stF2 = ruk2 - 4 - 12 * S2;
		ok(n('hs-f1-pl', 'y') === stF1 - 14 && n('hs-f1-l', 'y') === stF1 + 7, `${st}: popisek F₁ u středu šipky`);
		ok(n('hs-f2-pl', 'x') === 334 && n('hs-f2-l', 'x') === 354 && n('hs-f2-pl', 'y') === stF2 - 14 && n('hs-f2-l', 'y') === stF2 + 7, `${st}: popisek F₂ u středu šipky`);
		ok(n('hs-f2-pl', 'y') + 28 < ruk2, `${st}: popisek F₂ nad rukojetí velké`);
		const stS1 = (331 + sp1) / 2;
		const stS2 = { 421: 421, 406: 414, 391: 406, 361: 391 }[sp2]; // střed obrysu, zaokrouhleno na px
		ok(n('hs-s1-pl', 'y') === stS1 - 14 && n('hs-s1-l', 'y') === stS1 + 7, `${st}: popisek s₁ u středu obrysu`);
		ok(n('hs-s2-pl', 'x') === x2 + w2 + 10 && n('hs-s2-l', 'x') === x2 + w2 + 32 && n('hs-s2-pl', 'y') === stS2 - 14 && n('hs-s2-l', 'y') === stS2 + 7, `${st}: popisek s₂ vpravo od velkého válce u středu obrysu`);
		ok(n('hs-s2-pl', 'x') + 44 <= 440, `${st}: popisek s₂ se vejde do scény`);

		// texty
		ok(txt('hs-posun-t') === `${s1} cm`, `${st}: u posuvníku „${txt('hs-posun-t')}"`);
		ok(txt('hs-s1-t') === `posun s₁ = ${s1} cm`, `${st}: „${txt('hs-s1-t')}"`);
		ok(txt('hs-v1-t') === `odteče 1 · ${s1} = ${s1} cm³`, `${st}: „${txt('hs-v1-t')}"`);
		ok(txt('hs-S2-t') === `S₂ = ${S2} cm²`, `${st}: „${txt('hs-S2-t')}"`);
		ok(txt('hs-s2-t') === `s₂ = ${s1} · 1 : ${S2} = ${s2} cm`, `${st}: „${txt('hs-s2-t')}"`);
		ok(txt('hs-v2-t') === `přiteče ${S2} · ${s2} = ${s1} cm³`, `${st}: „${txt('hs-v2-t')}"`);
		ok(txt('hs-f2-t') === (s1 > 0 ? `síla F₂ = ${S2} · F₁` : `F₂ bude ${S2} · F₁`), `${st}: „${txt('hs-f2-t')}"`);
		ok(txt('hs-f1-t') === (s1 > 0 ? 'síla F₁' : 'F₁ zatím nepůsobí'), `${st}: plaketa síly v klidu netvrdí působení: „${txt('hs-f1-t')}"`);
		ok(a('hs-velka2', 'aria-pressed') === String(S2 === 2) && a('hs-velka4', 'aria-pressed') === String(S2 === 4), `${st}: stisknuté správné tlačítko`);
		const vysl = txt('hs-vysl');
		if (s1 === 0) {
			ok(vysl === `Velká stříkačka má ${S2}krát větší plochu pístu než malá. Zatlač posuvníkem na malý píst a sleduj, o kolik se vysune velký.`, `${st}: výzva k zatlačení`);
		} else {
			ok(vysl === `Z malé stříkačky odteklo 1 · ${s1} = ${s1} cm³ vody a do velké přiteklo ${S2} · ${s2} = ${s1} cm³ — stejně, protože voda je téměř nestlačitelná. `
				+ `Velký píst má ${S2}krát větší plochu, a proto se vysune jen o ${s2} cm místo ${s1} cm, zato tlačí ${S2}krát větší silou. Co se získá na síle, ztratí se na dráze.`, `${st}: výsledek „odteklo = přiteklo, ${S2}krát menší posun, ${S2}krát větší síla"`);
		}
		const mobil = txt('hs-mobil');
		ok(['S₁ = 1 cm²', txt('hs-s1-t'), txt('hs-v1-t'), txt('hs-S2-t'), txt('hs-s2-t'), txt('hs-v2-t'), txt('hs-f2-t')].every((t) => t && mobil.includes(t)), `${st}: HTML obraz pro telefon nese všechny hodnoty plaket`);
		ok(celeVsechno(), `${st}: všechny souřadnice a průhlednosti jsou celá čísla`);
		vsechnyTexty.push(vysl, mobil, txt('hs-posun-t'));
	}
}

console.log('\n— čísla v textech —');
const cisla = new Set(vsechnyTexty.join(' ').match(/\d+([.,]\d+)?/g));
ok([...cisla].every((c) => ['0', '1', '2', '4', '8'].includes(c)), `jen celá čísla 0, 1, 2, 4, 8 (${[...cisla].sort().join(', ')})`);
ok(POSUN2[4][8] === 2 && SPODEK1[8] - SPODEK1[0] === 4 * (SPODEK2[0] - SPODEK2[2]), 'vzor 1 : 4 — malý píst 8 cm, velký 2 cm (4krát kratší dráha)');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
