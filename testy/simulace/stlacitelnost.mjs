// Test simulace „Stříkačka: stlačitelnost plynu a kapaliny" (7. ročník, Pascalův zákon).
// Spuštění: node testy/simulace/stlacitelnost.mjs src/components/skola2/StlacitelnostSimulace.astro
//
// Co se hlídá:
//  - vzduch: s větší silou píst klesá níž, 12 kuliček zůstává, nahustí se, nepřekrývají se
//    a nevylezou z prostoru pod pístem; voda: píst stojí na místě při každé síle,
//    171 kuliček těsně u sebe v celém válci,
//  - kresba (y, height, opacity, cx, cy, points) přesně podle očekávaných pixelů zapsaných
//    natvrdo zde — ne podle téhož vzorce, jaký má komponenta,
//  - žádné číslo v textech (výklad žádný číselný vztah síla–objem neuvádí),
//  - texty opírající se o výklad („téměř dokonale nestlačitelná", „blízko u sebe", …).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2] || 'src/components/skola2/StlacitelnostSimulace.astro', 'utf8');
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
const posuvnik = novyPrvek('st-sila');
posuvnik.value = '0';
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const a = (id, k) => prvky.get(id)?.atributy[k];
const n = (id, k) => Number(a(id, k));
const txt = (id) => prvky.get(id)?.textContent ?? '';
const nastavSilu = (k) => { posuvnik.value = String(k); posuvnik.posluchaci.input.forEach((f) => f()); };
const klik = (id) => prvky.get(id).posluchaci.click.forEach((f) => f());

// ---------- očekávané hodnoty (natvrdo) ----------
const DNO = 404;
const VYSKY_VZDUCH = [200, 160, 133, 114, 100]; // 800 : (4 + stupeň), zaokrouhleno na px
const SILY = ['žádná', 'malá', 'střední', 'velká', 'největší'];
const CASTICE = [
	[4, 2], [50, 4], [98, 0],
	[24, 33], [72, 29], [104, 36],
	[10, 64], [58, 68], [96, 62],
	[30, 97], [78, 100], [106, 95],
];
const ocek = (rezim, k) => {
	const vyska = rezim === 'vzduch' ? VYSKY_VZDUCH[k] : 200;
	const spodek = DNO - vyska;
	const pistY = spodek - 12;
	return {
		vyska, spodek, pistY, tahloY: pistY - 112, rukojetY: pistY - 120,
		castice: CASTICE.map(([dx, v]) => [66 + dx, spodek + 6 + Math.round(((vyska - 12) * v) / 100)]),
	};
};
const celeVsechno = () => [...prvky.values()].every((p) =>
	Object.entries(p.atributy).every(([k, v]) => !['x', 'y', 'cx', 'cy', 'x1', 'x2', 'y1', 'y2', 'height', 'width', 'opacity'].includes(k) || Number.isInteger(Number(v))),
);

// ---------- šablona ----------
console.log('— šablona —');
ok(/<section class="ramecek simulace">/.test(zdroj), 'obal <section class="ramecek simulace">');
ok(!/\bimport\s/.test(skript) && !/https?:\/\//.test(skript), 'skript bez importů a externích knihoven');
for (let i = 0; i < 12; i++) ok(new RegExp(`<circle id="st-c${i}" [^>]*r="6"`).test(svgText), `kulička vzduchu st-c${i} je v SVG (r = 6)`);
ok(!/id="st-c12"/.test(svgText), 'kuliček vzduchu je přesně 12');
for (const id of ['st-obsah', 'st-hrdlo', 'st-voda', 'st-pist', 'st-tahlo', 'st-rukojet', 'st-sipka', 'st-hrot', 'st-latka', 'st-sila-svg', 'st-pist-t', 'st-castice-t', 'st-pocet-t']) {
	ok(new RegExp(`id="${id}"`).test(svgText), `prvek ${id} je uvnitř <svg>`);
}
const vodaD = svgText.match(/id="st-voda"[^>]*d="([^"]+)"/)[1];
const tecky = [...vodaD.matchAll(/M(\d+) (\d+)h0/g)].map((m) => [+m[1], +m[2]]);
ok(tecky.length === 171, `kuliček vody je 171 (${tecky.length})`);
ok(/id="st-voda"[^>]*stroke-width="12"[^>]*stroke-linecap="round"/.test(svgText), 'kulička vody má průměr 12 jako kulička vzduchu');
ok(tecky.every(([x, y]) => x - 6 >= 60 && x + 6 <= 180 && y - 6 >= 204 && y + 6 <= DNO), 'všechny kuličky vody leží uvnitř válce pod pístem');
const nejblizsi = tecky.map(([x, y], i) => Math.min(...tecky.filter((_, j) => j !== i).map(([u, w]) => Math.hypot(x - u, y - w))));
ok(nejblizsi.every((d) => d >= 12 && d <= 12.6), `kuličky vody jsou těsně u sebe a nepřekrývají se (nejbližší soused ${Math.min(...nejblizsi).toFixed(1)}–${Math.max(...nejblizsi).toFixed(1)} px)`);
ok(Math.min(...tecky.map((t) => t[1])) - 6 === 204 && Math.max(...tecky.map((t) => t[1])) + 6 >= DNO - 2, 'voda vyplní celý prostor od pístu po dno');
ok(/<input id="st-sila" type="range" min="0" max="4" step="1" value="0"/.test(zdroj), 'posuvník síly 0–4 po 1, výchozí žádná síla');

// ---------- výchozí stav ----------
console.log('\n— výchozí stav: vzduch, žádná síla —');
ok(a('st-pist', 'y') === '192' && a('st-tahlo', 'y') === '80' && a('st-rukojet', 'y') === '72', 'píst v klidu nahoře (192 / 80 / 72)');
ok(a('st-sipka', 'opacity') === '0' && a('st-hrot', 'opacity') === '0', 'bez síly není šipka vidět');
ok(a('st-voda', 'opacity') === '0', 'kuličky vody skryté');
ok(txt('st-latka') === 'vzduch' && txt('st-sila-t') === 'žádná' && txt('st-pist-t') === 'v klidu', 'popisky výchozího stavu');
ok(a('st-vzduch', 'aria-pressed') === 'true' && a('st-vodu', 'aria-pressed') === 'false', 'tlačítko vzduch je stisknuté');

// ---------- průchod všemi stavy ----------
const model = prvky.get('st-svg').__model;
const vsechnyTexty = [];
for (const rezim of ['vzduch', 'voda']) {
	console.log(`\n— ${rezim} —`);
	klik(rezim === 'vzduch' ? 'st-vzduch' : 'st-vodu');
	let predchoziRozpeti = Infinity;
	let predchoziPist = -Infinity;
	let predchoziSipka = -1;
	for (let k = 0; k <= 4; k++) {
		nastavSilu(k);
		const o = ocek(rezim, k);
		const m = model(rezim, k);
		ok(m.vyska === o.vyska, `${rezim} ${k}: výška obsahu ${m.vyska} px (čekám ${o.vyska})`);
		ok(n('st-obsah', 'y') === o.spodek && n('st-obsah', 'height') === o.vyska, `${rezim} ${k}: obsah pod pístem y=${a('st-obsah', 'y')}, výška ${a('st-obsah', 'height')}`);
		ok(n('st-obsah', 'y') + n('st-obsah', 'height') === DNO, `${rezim} ${k}: obsah sahá až na dno`);
		ok(n('st-pist', 'y') === o.pistY && n('st-pist', 'y') + 12 === n('st-obsah', 'y'), `${rezim} ${k}: těsnění pístu leží přímo na obsahu (y=${a('st-pist', 'y')})`);
		ok(n('st-tahlo', 'y') === o.tahloY && n('st-rukojet', 'y') === o.rukojetY, `${rezim} ${k}: táhlo a rukojeť jdou s pístem`);
		const barva = a('st-obsah', 'fill');
		ok(barva === (rezim === 'voda' ? '#a5d8ff' : '#fff4e6') && a('st-hrdlo', 'fill') === barva, `${rezim} ${k}: barva obsahu i hrdla ${barva}`);

		// šipka síly: délka 16 px na stupeň, hrot 4 px nad rukojetí
		const spicka = o.rukojetY - 4;
		const delka = n('st-sipka', 'y2') - n('st-sipka', 'y1');
		ok(delka === 12 * k && n('st-sipka', 'y2') === spicka - 12, `${rezim} ${k}: šipka dlouhá ${delka} px, končí u hrotu`);
		ok(a('st-hrot', 'points') === `110,${spicka - 12} 130,${spicka - 12} 120,${spicka}`, `${rezim} ${k}: hrot šipky míří dolů na rukojeť`);
		ok(a('st-sipka', 'opacity') === (k > 0 ? '1' : '0') && a('st-hrot', 'opacity') === a('st-sipka', 'opacity'), `${rezim} ${k}: šipka vidět jen při síle`);
		ok(n('st-sipka', 'y1') >= 0, `${rezim} ${k}: šipka se vejde do scény`);
		ok(n('st-rukojet', 'y') + 8 <= 180, `${rezim} ${k}: rukojeť zůstane nad okrajem válce (spodek ${n('st-rukojet', 'y') + 8}, okraj 184)`);
		ok(delka > predchoziSipka, `${rezim} ${k}: větší síla = delší šipka`);
		predchoziSipka = delka;

		// částice
		const vidim = Array.from({ length: 12 }, (_, i) => a(`st-c${i}`, 'opacity'));
		if (rezim === 'vzduch') {
			ok(vidim.every((v) => v === '1') && a('st-voda', 'opacity') === '0', `vzduch ${k}: vidět je všech 12 kuliček vzduchu, voda skrytá`);
			const pol = Array.from({ length: 12 }, (_, i) => [n(`st-c${i}`, 'cx'), n(`st-c${i}`, 'cy')]);
			ok(pol.every(([x, y], i) => x === o.castice[i][0] && y === o.castice[i][1]), `vzduch ${k}: kuličky na očekávaných místech`);
			ok(pol.every(([x, y]) => x - 6 >= 60 && x + 6 <= 180 && y - 6 >= o.spodek && y + 6 <= DNO), `vzduch ${k}: žádná kulička nevylezla z prostoru pod pístem`);
			let min = Infinity;
			for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) min = Math.min(min, Math.hypot(pol[i][0] - pol[j][0], pol[i][1] - pol[j][1]));
			ok(min >= 12, `vzduch ${k}: kuličky se nepřekrývají (nejmenší vzdálenost ${min.toFixed(1)} px)`);
			const rozpeti = Math.max(...pol.map((p) => p[1])) - Math.min(...pol.map((p) => p[1]));
			ok(rozpeti < predchoziRozpeti, `vzduch ${k}: kuličky se nahustily (rozpětí ${rozpeti} px)`);
			predchoziRozpeti = rozpeti;
			ok(n('st-pist', 'y') > predchoziPist, `vzduch ${k}: větší síla = píst níž`);
			predchoziPist = n('st-pist', 'y');
			ok(txt('st-pist-t') === (k ? 'posune se dolů' : 'v klidu') && txt('st-castice-t') === (k ? 'nahustí se k sobě' : 'po celé stříkačce'), `vzduch ${k}: popisky „${txt('st-pist-t')}" / „${txt('st-castice-t')}"`);
			if (k) ok(/stlačit dá/.test(txt('st-vysl')) && /pořád stejně/.test(txt('st-vysl')), `vzduch ${k}: text „vzduch se stlačit dá", počet částic stejný`);
		} else {
			ok(vidim.every((v) => v === '0') && a('st-voda', 'opacity') === '1', `voda ${k}: vidět jsou kuličky vody, kuličky vzduchu skryté`);
			ok(n('st-pist', 'y') === 192, `voda ${k}: píst stojí na místě (y=${a('st-pist', 'y')})`);
			ok(txt('st-pist-t') === (k ? 'téměř se nehne' : 'v klidu') && txt('st-castice-t') === (k ? 'zůstanou u sebe' : 'blízko u sebe'), `voda ${k}: popisky „${txt('st-pist-t')}" / „${txt('st-castice-t')}"`);
			ok(/blízko u sebe/.test(txt('st-vysl')), `voda ${k}: text „částice blízko u sebe" (výklad)`);
			if (k) ok(/téměř dokonale nestlačitelná/.test(txt('st-vysl')) && /odpudivými silami/.test(txt('st-vysl')), `voda ${k}: text o nestlačitelnosti a odpudivých silách (výklad)`);
		}
		ok(txt('st-latka') === rezim, `${rezim} ${k}: plaketa ukazuje „${txt('st-latka')}"`);
		ok(txt('st-sila-t') === SILY[k] && txt('st-sila-svg') === SILY[k], `${rezim} ${k}: síla slovy „${txt('st-sila-t')}"`);
		ok(a('st-vzduch', 'aria-pressed') === String(rezim === 'vzduch') && a('st-vodu', 'aria-pressed') === String(rezim === 'voda'), `${rezim} ${k}: stisknuté správné tlačítko`);
		const mobil = txt('st-mobil');
		ok([txt('st-latka'), txt('st-sila-svg'), txt('st-pist-t'), txt('st-castice-t'), 'pořád stejný'].every((t) => t && mobil.includes(t)), `${rezim} ${k}: HTML obraz pro telefon nese všechny hodnoty plaket`);
		ok(celeVsechno(), `${rezim} ${k}: všechny souřadnice a průhlednosti jsou celá čísla`);
		vsechnyTexty.push(txt('st-mobil'), txt('st-vysl'), txt('st-pist-t'), txt('st-castice-t'), txt('st-sila-t'), txt('st-latka'));
	}
}

console.log('\n— porovnání vzduch × voda —');
ok(VYSKY_VZDUCH[4] === VYSKY_VZDUCH[0] / 2, 'při největší síle má vzduch polovinu místa, voda pořád celé');
ok(vsechnyTexty.every((t) => t.length > 0 && !/\d/.test(t)), 'v žádném textu není číslo (výklad neuvádí číselný vztah)');
ok(txt('st-pocet-t') === '' || !/\d/.test(txt('st-pocet-t')), 'počet částic se nevypisuje číslem');
ok(/>pořád stejný</.test(svgText), 'plaketa „počet částic: pořád stejný"');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
