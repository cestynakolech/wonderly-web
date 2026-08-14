#!/usr/bin/env node
// Ověření VznikElektrickehoProuduSimulace.astro — vznik proudu ve vodiči.
//
// Nejtišeji by lhalo právě to, co má scéna naučit: že proud je USPOŘÁDANÝ
// pohyb. Kdyby při 0 V částice ztuhly, učila by stránka přesně ten omyl,
// který kvíz zkouší chytit („bez napětí se částice vůbec nehýbou").
// A kdyby proud protekl izolantem, popřela by druhou půlku výkladu.
//
// Očekávaná čísla jsou v testu napsaná NAPEVNO (8 elektronů, 6 iontů, 4 kroky
// při 12 V, 32 průchodů) — kdyby se braly z komponenty, test by odkýval
// jakoukoli hodnotu, kterou si komponenta vymyslí.
//
// Mutační test: 24 z 25 mutací padne. Jediná, která projde, mění text uvnitř
// KOMENTÁŘE ve zdroji („…míří doprava (ke svorce + vpravo)") — na chování
// scény nemá vliv a hlídat komentáře testem nedává smysl.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('vep-svg');
const { __stav: stav, __kroky: krokyF, __rozmisteni: rozmisteni, __castic: castic,
	__kroku: kroku, __projdeRezem: projdeRezem, __MATERIALY: MATERIALY, __OKAMZIKY: OKAMZIKY } = svg;

const KOV = 0, ROZTOK = 1, IZOLANT = 2;
const DC = 0, AC = 1;
const NAPETI = [0, 3, 6, 9, 12];

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (u, m, d = DC, o = 0) => {
	prvky.get('vep-napeti').value = String(u);
	prvky.get('vep-material').value = String(m);
	prvky.get('vep-druh').value = String(d);
	prvky.get('vep-okamzik').value = String(o);
	for (const f of prvky.get('vep-napeti').posluchaci.input) f();
};
// všechny kombinace posuvníků — smyčka má pevný strop 5 × 3 × 2 × 4
const KOMBINACE = [];
for (const u of NAPETI) for (const m of [0, 1, 2]) for (const d of [0, 1]) for (const o of [0, 1, 2, 3]) KOMBINACE.push([u, m, d, o]);

console.log('— kdo v čem nese náboj (jádro učiva) —');
{
	ok(MATERIALY[KOV].kladnych === 0 && MATERIALY[KOV].zapornych === 8,
		`kov: ${MATERIALY[KOV].zapornych} volných elektronů a žádný kladný nosič (${MATERIALY[KOV].kladnych})`);
	ok(MATERIALY[ROZTOK].kladnych === 3 && MATERIALY[ROZTOK].zapornych === 3,
		`roztok: ${MATERIALY[ROZTOK].kladnych} kladné + ${MATERIALY[ROZTOK].zapornych} záporné ionty — obojí`);
	ok(MATERIALY[IZOLANT].kladnych === 0 && MATERIALY[IZOLANT].zapornych === 0,
		'izolant nemá ani jednu volnou nabitou částici');
	ok(/kov/.test(MATERIALY[KOV].nazev) && /roztok/.test(MATERIALY[ROZTOK].nazev) && /izolant/.test(MATERIALY[IZOLANT].nazev),
		`materiály jsou pojmenované: ${MATERIALY.map((m) => m.nazev).join(' · ')}`);
}

console.log('\n— napětí je příčinou proudu —');
{
	const ocekavane = { 0: 0, 3: 1, 6: 2, 9: 3, 12: 4 };
	let sedi = true;
	for (const [u, k] of Object.entries(ocekavane)) if (krokyF(+u) !== k) sedi = false;
	ok(sedi, `kroky za sekundu: ${NAPETI.map((u) => `${u} V→${krokyF(u)}`).join(', ')}`);
	ok(krokyF(0) === 0, 'bez napětí neudělá částice ani jeden uspořádaný krok');
	ok(stav(12, KOV, DC, 0).prochazi === 32, `kov při 12 V: řezem projde ${stav(12, KOV, DC, 0).prochazi} částic za sekundu (8 × 4)`);
	ok(stav(12, ROZTOK, DC, 0).prochazi === 24, `roztok při 12 V: ${stav(12, ROZTOK, DC, 0).prochazi} částic (6 × 4)`);
	ok(stav(12, IZOLANT, DC, 0).prochazi === 0, `izolant ani při 12 V nepustí nic (${stav(12, IZOLANT, DC, 0).prochazi})`);
	ok(stav(0, KOV, DC, 0).prochazi === 0, 'kov bez napětí: výsledný přesun řezem je nulový');
	ok(stav(12, ROZTOK, DC, 0).prochazi < stav(12, KOV, DC, 0).prochazi,
		'roztok vede hůř než kov — má míň volných nosičů');
	let roste = true;
	for (let i = 1; i < NAPETI.length; i++) {
		if (stav(NAPETI[i], KOV, DC, 0).prochazi <= stav(NAPETI[i - 1], KOV, DC, 0).prochazi) roste = false;
	}
	ok(roste, `s napětím proud roste: ${NAPETI.map((u) => stav(u, KOV, DC, 0).prochazi).join(' → ')}`);
	let nula = true;
	for (const u of NAPETI) if (stav(u, IZOLANT, DC, 0).prochazi !== 0) nula = false;
	ok(nula, 'a izolantem neteče proud při žádném napětí — ani při největším');
}

console.log('\n— čísla, která žák uvidí, jsou celá a nezáporná —');
{
	let cela = true, zaporne = false, divne = false;
	for (const [u, m, d, o] of KOMBINACE) {
		const s = stav(u, m, d, o);
		if (!Number.isInteger(s.prochazi) || !Number.isInteger(s.kroky) || !Number.isInteger(s.volnych)) cela = false;
		if (s.prochazi < 0 || s.kroky < 0 || s.volnych < 0) zaporne = true;
		if (!Number.isFinite(s.prochazi)) divne = true;
	}
	ok(cela, `ve všech ${KOMBINACE.length} nastaveních vyjdou celá čísla`);
	ok(!zaporne, 'a nikde nevyjde záporný počet');
	ok(!divne, 'ani nekonečno či NaN (nesmyslná hodnota = pád testu)');
}

console.log('\n— stejnosměrný a střídavý proud —');
{
	const dcSmery = [0, 1, 2, 3].map((o) => stav(12, KOV, DC, o).smer);
	ok(dcSmery.every((x) => x === 1), `stejnosměrný proud drží směr ve všech okamžicích (${dcSmery.join(', ')})`);
	const acSmery = [0, 1, 2, 3].map((o) => stav(12, KOV, AC, o).smer);
	ok(acSmery[0] === 1 && acSmery[1] === 1, `střídavý v čase ${OKAMZIKY[0]} a ${OKAMZIKY[1]} ms teče jedním směrem`);
	ok(acSmery[2] === -1 && acSmery[3] === -1, `a v čase ${OKAMZIKY[2]} a ${OKAMZIKY[3]} ms opačným (${acSmery.join(', ')})`);
	ok(OKAMZIKY.length === 4 && OKAMZIKY[0] === 2 && OKAMZIKY[3] === 17,
		`okamžiky ${OKAMZIKY.join(', ')} ms padnou dovnitř půlperiod, ne přesně na obrat`);
	let stejna = true;
	for (const o of [0, 1, 2, 3]) if (stav(12, KOV, AC, o).prochazi !== stav(12, KOV, DC, 0).prochazi) stejna = false;
	ok(stejna, 'u střídavého proudu se mění jen SMĚR, velikost zůstává stejná');
	let jenDvojka = true;
	for (const [u, m, d, o] of KOMBINACE) if (![1, -1].includes(stav(u, m, d, o).smer)) jenDvojka = false;
	ok(jenDvojka, 'směr je vždycky jen doprava, nebo doleva');
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const castice = prvky.get('vep-castice');
const pocty = prvky.get('vep-pocty');
const tokG = prvky.get('vep-tok');
const svorky = prvky.get('vep-svorky');
const usek = prvky.get('vep-usek');
const casG = prvky.get('vep-cas');
const popisG = prvky.get('vep-material-popis');

// směry šipek částic ve scéně: z <line x1 y1 x2 y2> se čte, kam šipka míří
const smeryZeSceny = () => [...castice.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)]
	.map((m) => ({ dx: +m[3] - +m[1], dy: +m[4] - +m[2] }));

console.log('— každý posuvník opravdu překresluje scénu —');
{
	// Nález kontrolora: nastav() spouští jen posluchač vep-napeti, takže kdyby
	// komponenta zapomněla posluchače na zbylých třech posuvnících, žák by jimi
	// hýbal naprázdno — a testu by to prošlo.
	for (const id of ['vep-napeti', 'vep-material', 'vep-druh', 'vep-okamzik']) {
		ok((prvky.get(id)?.posluchaci.input ?? []).length >= 1,
			`posuvník ${id} má zaregistrovaný posluchač „input"`);
	}
	// a nejen zaregistrovaný — jeho spuštění musí scénu opravdu změnit.
	// Registrace sama nestačí: mrtvý posluchač `() => {}` by jí prošel
	// (důkaz kontrolora), proto se u KAŽDÉHO posuvníku měří účinek
	// spuštěním JEN jeho vlastních posluchačů.
	const spust = (id) => { for (const f of prvky.get(id).posluchaci.input ?? []) f(); };
	nastav(12, KOV);
	const pred = castice.innerHTML;
	prvky.get('vep-material').value = String(IZOLANT);
	spust('vep-material');
	ok(castice.innerHTML !== pred, 'posluchač materiálu po spuštění překreslí částice');

	nastav(12, KOV, DC, 2);   // okamžik 2 = druhá půlperioda, u AC se svorky prohodí
	const svorkyPred = svorky.innerHTML;
	prvky.get('vep-druh').value = String(AC);
	spust('vep-druh');
	ok(svorky.innerHTML !== svorkyPred, 'posluchač druhu proudu po přepnutí DC→AC prohodí svorky');

	nastav(12, KOV, AC, 0);
	const smerPred = smeryZeSceny()[0]?.dx ?? 0;
	prvky.get('vep-okamzik').value = '2';
	spust('vep-okamzik');
	const smerPo = smeryZeSceny()[0]?.dx ?? 0;
	ok(smerPred > 0 && smerPo === -smerPred,
		`posluchač okamžiku u AC obrátí směr šipek (dx ${smerPred} → ${smerPo})`);

	const zdrojPred = prvky.get('vep-zdroj').innerHTML;
	prvky.get('vep-napeti').value = '3';
	spust('vep-napeti');
	ok(prvky.get('vep-zdroj').innerHTML !== zdrojPred, 'a posluchač napětí překreslí zdroj');
}


console.log('\n— scéna bez napětí: částice se hýbou, ale každá jinam —');
{
	nastav(0, KOV);
	const s = smeryZeSceny();
	ok(s.length === 8, `všech osm elektronů má šipku i při 0 V (${s.length}) — nezmrzly`);
	const uhly = new Set(s.map((d) => Math.round(Math.atan2(d.dy, d.dx) * 100)));
	ok(uhly.size >= 6, `a míří do ${uhly.size} různých směrů — pohyb je neuspořádaný`);
	ok(!/doprava|doleva/.test(pocty.innerHTML), 'počitadlo neuvádí žádný výsledný směr');
	ok(pocty.innerHTML.includes('vyruší'), 'a rovnou říká, že se přesun vyruší');
	ok(tokG.innerHTML.includes('neuspořádaný') && !tokG.innerHTML.includes('<line'),
		'pod vodičem není šipka toku, jen vysvětlení');
	ok(prvky.get('vep-stav').textContent.includes('přesto se hýbou')
		|| prvky.get('vep-stav').textContent.includes('a částice se přesto hýbou'),
		`hláška to říká rovnou: „${prvky.get('vep-stav').textContent.slice(0, 60)}…"`);
}

console.log('\n— scéna s napětím: šipky se srovnají do jednoho směru —');
{
	nastav(12, KOV);
	const s = smeryZeSceny();
	ok(s.length === 8, `osm elektronů (${s.length})`);
	ok(s.every((d) => d.dy === 0 && d.dx > 0), 'všechny šipky míří vodorovně doprava — ke svorce +');
	nastav(3, KOV);
	const kratke = smeryZeSceny()[0].dx;
	nastav(12, KOV);
	const dlouhe = smeryZeSceny()[0].dx;
	ok(dlouhe > kratke, `s větším napětím jsou šipky delší (${kratke} → ${dlouhe} px)`);
}

console.log('\n— v roztoku jdou ionty proti sobě —');
{
	nastav(12, ROZTOK);
	const s = smeryZeSceny();
	ok(s.length === 6, `šest iontů má šipku (${s.length})`);
	const doprava = s.filter((d) => d.dx > 0).length;
	const doleva = s.filter((d) => d.dx < 0).length;
	ok(doprava === 3 && doleva === 3, `tři míří doprava a tři doleva (${doprava} : ${doleva}) — kladné a záporné proti sobě`);
	const znamenka = [...castice.innerHTML.matchAll(/>([+−])<\/text>/g)].map((m) => m[1]);
	ok(znamenka.filter((z) => z === '+').length === 3 && znamenka.filter((z) => z === '−').length === 3,
		'a jsou popsané znaménky: 3 kladné, 3 záporné');
	ok(tokG.innerHTML.includes('záporné ionty') && tokG.innerHTML.includes('kladné ionty'),
		'pod vodičem jsou popsané obě šipky');
}

console.log('\n— šipky opravdu vypadají jako šipky —');
{
	// Mutační test ukázal, že celá geometrie šipky se dala rozbít, aniž by si
	// toho kterákoli kontrola všimla: šipka vycházející ze STŘEDU kolečka
	// (částice pak vypadá jako ciferník s ručičkou — nález už u vnitřní energie),
	// hrot složený do úsečky, nebo hrot odhozený na druhou stranu částice.
	// Souřadnice se čtou volně (i desetinné), aby se rozsypané kolečko nedalo
	// „schovat" před regexem — mutace, po které ionty skončily na 150,006 px
	// jeden na druhém, se přesně takhle protáhla.
	const kolecka = () => [...castice.innerHTML.matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/g)]
		.map((m) => ({ x: +m[1], y: +m[2], r: +m[3] }));
	const cary = () => [...castice.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)]
		.map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
	const hroty = () => [...castice.innerHTML.matchAll(/<polygon points="([^"]*)"/g)]
		.map((m) => m[1].trim().split(/\s+/).map((b) => b.split(',').map(Number)));
	const vzdal = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);

	let odStredu = null, delkaHrotu = null, plocha = null, necislo = null, mimoKonec = null;
	for (const [u, m] of [[0, KOV], [3, KOV], [12, KOV], [12, ROZTOK], [6, ROZTOK]]) {
		nastav(u, m);
		const k = kolecka();
		for (const c of cary()) {
			const nejbliz = k.reduce((a, b) => (vzdal(c.x1, c.y1, a.x, a.y) < vzdal(c.x1, c.y1, b.x, b.y) ? a : b));
			const d = vzdal(c.x1, c.y1, nejbliz.x, nejbliz.y);
			if (d < nejbliz.r + 1 || d > nejbliz.r + 4) odStredu = `${d.toFixed(1)} px od středu (kolečko má r=${nejbliz.r}) při ${u} V`;
		}
		for (const h of hroty()) {
			if (h.flat().some((x) => !Number.isFinite(x))) { necislo = `${JSON.stringify(h)} při ${u} V`; continue; }
			if (h.length !== 3) { necislo = `hrot nemá tři body (${h.length}) při ${u} V`; continue; }
			const [A, B, C] = h;
			const strany = [vzdal(...A, ...B), vzdal(...B, ...C), vzdal(...C, ...A)];
			if (Math.max(...strany) > 22) delkaHrotu = `nejdelší strana ${Math.max(...strany).toFixed(1)} px při ${u} V`;
			const S = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2;
			if (S < 20) plocha = `plocha hrotu jen ${S.toFixed(1)} px² při ${u} V — trojúhelník se složil do čáry`;
			// vrchol hrotu musí sedět na konci některé čáry
			const cara = cary().find((c) => vzdal(A[0], A[1], c.x2, c.y2) < 1);
			if (!cara) { mimoKonec = `hrot ${A} nesedí na konci čáry při ${u} V`; continue; }
			// a základna hrotu leží 5 px ZA vrcholem, na ose šipky — mutace,
			// která ji zrcadlí na druhou stranu, dělá z hrotu motýlka
			const dl = Math.hypot(cara.x2 - cara.x1, cara.y2 - cara.y1);
			const ux = (cara.x2 - cara.x1) / dl, uy = (cara.y2 - cara.y1) / dl;
			const stredZakladny = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
			if (vzdal(stredZakladny[0], stredZakladny[1], A[0] - ux * 5, A[1] - uy * 5) > 2) {
				mimoKonec = `základna hrotu ${stredZakladny} neleží za vrcholem ${A} při ${u} V`;
			}
		}
	}
	ok(odStredu === null, odStredu ? `šipka nezačíná na okraji částice — ${odStredu}` : 'každá šipka začíná těsně za okrajem kolečka, ne v jeho středu');
	ok(necislo === null, necislo ? `v hrotu není číslo — ${necislo}` : 'všechny body hrotů jsou konečná čísla');
	ok(delkaHrotu === null, delkaHrotu ? `hrot je přerostlý — ${delkaHrotu}` : 'hroty mají rozumnou velikost (do 22 px)');
	ok(plocha === null, plocha ? plocha : 'a jsou to skutečné trojúhelníky, ne slepené úsečky');
	ok(mimoKonec === null, mimoKonec ? mimoKonec : 'každý hrot sedí přesně na konci své čáry');

	nastav(0, KOV);
	const d0 = cary().map((c) => Math.round(Math.hypot(c.x2 - c.x1, c.y2 - c.y1)));
	ok(d0.every((d) => d >= 7 && d <= 9), `bez napětí měří šipka 8 px (naměřeno ${[...new Set(d0)].join(', ')})`);
	nastav(12, KOV);
	const d12 = cary().map((c) => Math.round(Math.hypot(c.x2 - c.x1, c.y2 - c.y1)));
	ok(d12.every((d) => d === 24), `při 12 V přesně 24 px (naměřeno ${[...new Set(d12)].join(', ')})`);

	// znaménko musí zůstat uvnitř svého kolečka
	let znamenkoMimo = null;
	for (const m of [KOV, ROZTOK, IZOLANT]) {
		nastav(6, m);
		const k = kolecka();
		for (const t of castice.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
			const nejbliz = k.reduce((a, b) => (vzdal(+t[1], +t[2], a.x, a.y) < vzdal(+t[1], +t[2], b.x, b.y) ? a : b));
			// Text má účaří (baseline) DOLE, takže opticky uprostřed kolečka sedí
			// jen tehdy, když je y o pár pixelů POD středem. Posun nahoru vysadí
			// znaménko z kolečka ven.
			const posun = +t[2] - nejbliz.y;
			if (+t[1] !== nejbliz.x || posun < 3 || posun > 7) znamenkoMimo = `znaménko ${t[1]},${t[2]} vs. střed ${nejbliz.x},${nejbliz.y}`;
		}
	}
	ok(znamenkoMimo === null, znamenkoMimo ? `znaménko není uprostřed částice — ${znamenkoMimo}` : 'znaménka sedí uprostřed svých koleček');

	// bez napětí musí šipky mířit na všechny světové strany, ne skoro stejně
	nastav(0, KOV);
	const s0 = cary().map((c) => ({ dx: c.x2 - c.x1, dy: c.y2 - c.y1 }));
	ok(s0.some((d) => d.dx > 2) && s0.some((d) => d.dx < -2) && s0.some((d) => d.dy > 2) && s0.some((d) => d.dy < -2),
		'bez napětí míří šipky doprava, doleva, nahoru i dolů — tepelný pohyb je opravdu do všech stran');

	// žádné dvě částice se nesmí překrývat
	let prekryv = null;
	for (const m of [KOV, ROZTOK, IZOLANT]) {
		nastav(6, m);
		const k = kolecka().filter((c) => c.r > 10);   // vázané náboje uvnitř atomu tam patřit MAJÍ
		for (let i = 0; i < k.length; i++) {
			for (let j = i + 1; j < k.length; j++) {
				const d = vzdal(k[i].x, k[i].y, k[j].x, k[j].y);
				if (d < k[i].r + k[j].r + 4) prekryv = `dvě částice ${d.toFixed(0)} px od sebe (materiál ${m})`;
			}
		}
	}
	ok(prekryv === null, prekryv ? `částice se překrývají — ${prekryv}` : 'žádné dvě částice se nepřekrývají');
}

console.log('\n— popisky pod vodičem sedí se svorkami —');
{
	nastav(12, KOV, DC, 0);
	ok(tokG.innerHTML.includes('elektrony míří ke svorce + vpravo'),
		`kov: „${tokG.innerHTML.match(/>([^<]*elektrony[^<]*)</)[1]}"`);
	ok(!/ionty/.test(tokG.innerHTML), 'a nemluví se tu o iontech — v kovu je nenajdeš');
	ok(prvky.get('vep-stav').textContent.includes('elektrony') && !prvky.get('vep-stav').textContent.includes('ionty'),
		'i hláška mluví u kovu o elektronech');
	nastav(12, KOV, AC, 2);
	ok(tokG.innerHTML.includes('elektrony míří ke svorce + vlevo'),
		`po prohození svorek: „${tokG.innerHTML.match(/>([^<]*elektrony[^<]*)</)[1]}"`);
	nastav(12, ROZTOK, DC, 0);
	ok(tokG.innerHTML.includes('záporné ionty míří ke svorce + vpravo'), 'roztok: záporné ionty ke svorce + vpravo');
	ok(tokG.innerHTML.includes('kladné ionty míří ke svorce − vlevo'), 'a kladné ionty ke svorce − vlevo — přesně opačně');
	ok(prvky.get('vep-stav').textContent.includes('ionty') && !prvky.get('vep-stav').textContent.includes('elektrony'),
		'hláška u roztoku mluví o iontech');
	nastav(12, ROZTOK, AC, 2);
	ok(tokG.innerHTML.includes('záporné ionty míří ke svorce + vlevo')
		&& tokG.innerHTML.includes('kladné ionty míří ke svorce − vpravo'),
		'a po prohození svorek se otočí obojí naráz');
}

console.log('\n— izolantem se nerozjede nic —');
{
	nastav(12, IZOLANT);
	ok(!castice.innerHTML.includes('<line'), 'žádná částice nemá šipku pohybu');
	const atomy = [...castice.innerHTML.matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/g)].map((m) => +m[3]);
	ok(atomy.filter((r) => r > 10).length === 8, `atomy ve scéně zůstanou (${atomy.filter((r) => r > 10).length} koleček)`);
	const znam = [...castice.innerHTML.matchAll(/>([+−])<\/text>/g)].map((m) => m[1]);
	ok(znam.filter((z) => z === '+').length === 8 && znam.filter((z) => z === '−').length === 8,
		`a každý má v sobě vázaný pár nábojů (${znam.filter((z) => z === '+').length}× plus, ${znam.filter((z) => z === '−').length}× minus)`);
	ok(atomy.filter((r) => r <= 10).length === 16, 'ty náboje jsou nakreslené jako dvě kolečka, ne jako slepené „+−" (na obrázku vypadalo jako šipka)');
	ok(pocty.innerHTML.includes('v izolantu nejsou volné nabité částice'),
		'zelená poznámka v počitadle mluví o izolantu, ne o pohybu bez napětí');
	// Nález z obrázku: „volné částice: 0" a vedle „každá udělá 4 kroky" —
	// počitadlo mluvilo o „každé" z nuly částic.
	ok(!pocty.innerHTML.includes('každá udělá') && pocty.innerHTML.includes('nemá je ale co rozpohybovat'),
		`počitadlo netvrdí, že by „každá" z nuly částic někam šla: „${/napětí by dalo [^<]*/.exec(pocty.innerHTML)[0]}"`);
	ok(pocty.innerHTML.includes('není tu co rozpohybovat') && !pocty.innerHTML.includes('pohyb se vyruší'),
		'a nulu nevysvětluje vyrušením pohybu — v izolantu se nemá co vyrušit');
	nastav(0, KOV);
	ok(pocty.innerHTML.includes('každá udělá 0 kroků') && pocty.innerHTML.includes('pohyb se vyruší'),
		'zatímco u kovu bez napětí zůstává vysvětlení vyrušením');
	nastav(12, IZOLANT);   // zpátky k izolantu, na něj se ptají kontroly níž
	ok(popisG.innerHTML.includes('vázané'), `popisek říká, že náboje jsou vázané: „${popisG.innerHTML.replace(/<[^>]*>/g, '')}"`);
	ok(tokG.innerHTML.includes('neprojde'), 'a pod vodičem stojí, že proud neprojde');
	ok(prvky.get('vep-stav').textContent.includes('12 V'), 'hláška připomene, že napětí tam je — a stejně nic');
	// Nález kontrolora: ve výpočtu zůstával generický dovětek „teprve ono
	// srovná pohyb částic do jednoho směru" — jenže v izolantu žádné volné
	// částice nejsou, takže věta neplatila.
	const vypocet = () => prvky.get('vep-vypocet').innerHTML.replace(/<[^>]*>/g, '');
	ok(vypocet().includes('nejsou žádné volné nabité částice'),
		`výpočet končí větou o chybějících částicích: „${vypocet().slice(-100)}"`);
	ok(!vypocet().includes('teprve ono srovná') && !vypocet().includes('hýbou dál'),
		'a generický dovětek o srovnávání pohybu z něj zmizel');
	ok(vypocet().includes('Napětí tu je'),
		's napětím výpočet začíná „Napětí tu je" — 12 V opravdu na svorkách je');
	// Nález kontrolora: při 0 V dovětek tvrdil „Napětí tu je" — jenže žádné
	// není (svorky bez znamének to samy říkají). Věta se větví podle napětí.
	nastav(0, IZOLANT);
	ok(!vypocet().includes('Napětí tu je'),
		`při 0 V výpočet netvrdí, že napětí tu je: „${vypocet().slice(-110)}"`);
	ok(vypocet().includes('nejsou žádné volné nabité částice'),
		'a o chybějících volných částicích mluví i při 0 V');
	ok(!vypocet().includes('teprve ono srovná') && !vypocet().includes('hýbou dál'),
		'generický dovětek se nevrátil ani při 0 V');
	nastav(12, KOV);
	ok(vypocet().includes('teprve ono srovná pohyb částic'),
		'u kovu generické vysvětlení naopak zůstává — tam platí');
	nastav(12, IZOLANT);   // zpátky, kdyby níž přibyly další kontroly izolantu
}

console.log('\n— svorky: baterie je drží, zásuvka je prohazuje —');
{
	nastav(12, KOV, DC, 3);
	const dc = svorky.innerHTML;
	ok(dc.indexOf('svorka −') < dc.indexOf('svorka +'), 'u baterie je vlevo − a vpravo +');
	nastav(12, KOV, AC, 0);
	const ac1 = svorky.innerHTML;
	nastav(12, KOV, AC, 2);
	const ac2 = svorky.innerHTML;
	ok(ac1.indexOf('svorka −') < ac1.indexOf('svorka +'), `střídavý v ${OKAMZIKY[0]} ms: vlevo −`);
	ok(ac2.indexOf('svorka +') < ac2.indexOf('svorka −'), `a v ${OKAMZIKY[2]} ms: vlevo + — svorky se prohodily`);
	nastav(12, KOV, DC, 0);
	const dcTok = smeryZeSceny()[0].dx;
	nastav(12, KOV, AC, 2);
	const acTok = smeryZeSceny()[0].dx;
	ok(dcTok > 0 && acTok < 0, `a s nimi i směr částic ve scéně (${dcTok} → ${acTok})`);
	ok(casG.innerHTML.includes('10 ms'), `u střídavého zdroje stojí, po jaké době se prohodí: „${casG.innerHTML.replace(/<[^>]*>/g, ' ').trim()}"`);
	nastav(12, KOV, DC, 0);
	ok(casG.innerHTML.includes('baterie'), 'u baterie je místo toho poznámka o baterii');
}

console.log('\n— při 0 V nemají svorky znaménka —');
{
	// Nález kontrolora: svorky měly −/+ i při 0 V — rozpor s výkladem,
	// podle kterého je napětí právě ROZDÍL nábojů mezi svorkami.
	nastav(0, KOV, DC, 0);
	ok(!svorky.innerHTML.includes('svorka +') && !svorky.innerHTML.includes('svorka −'),
		'popisky říkají jen „svorka", bez + a −');
	ok(!/>[+−]</.test(svorky.innerHTML), 'a v kolečkách svorek není žádné znaménko');
	ok((svorky.innerHTML.match(/<circle/g) || []).length === 2, 'obě kolečka svorek přitom zůstala');
	ok(casG.innerHTML.includes('není rozdíl'), `poznámka to vysvětlí: „${casG.innerHTML.replace(/<[^>]*>/g, ' ').trim()}"`);
	ok(!casG.innerHTML.includes('prohodí'), 'a nemluví o prohazování svorek');
	nastav(0, KOV, AC, 2);
	ok(!/>[+−]</.test(svorky.innerHTML) && !casG.innerHTML.includes('prohodí'),
		'platí to i u střídavého zdroje — 0 V je 0 V');
	nastav(3, KOV, DC, 0);
	ok(svorky.innerHTML.includes('svorka −') && svorky.innerHTML.includes('svorka +'),
		'a s napětím se znaménka zase vrátí');
}

console.log('\n— počitadlo ukazuje totéž co model —');
for (const [u, m, d, o] of [[12, KOV, DC, 0], [6, ROZTOK, DC, 0], [9, KOV, AC, 2], [12, IZOLANT, DC, 0], [0, ROZTOK, DC, 0]]) {
	nastav(u, m, d, o);
	const s = stav(u, m, d, o);
	// Chybějící číslo se pojmenuje a test spadne — nesmí se rozsypat výjimkou,
	// protože pak by mutační test hlásil „odhaleno" i tam, kde se nic neměří.
	const cislo = (vzor) => { const v = vzor.exec(pocty.innerHTML); return v ? +v[1] : null; };
	const volne = cislo(/volné částice v úseku: (\d+)/);
	const k = cislo(/(?:každá udělá|napětí by dalo) (\d+) krok/);
	const rez = cislo(/řezem (\d+) částic/);
	if (volne === null || k === null || rez === null) {
		ok(false, `${u} V, ${MATERIALY[m].nazev}: počitadlo neuvádí všechna tři čísla (${volne}, ${k}, ${rez})`);
	} else {
		ok(volne === s.volnych && k === s.kroky && rez === s.prochazi,
			`${u} V, ${MATERIALY[m].nazev}: ${volne} částic, ${k} kroků, ${rez} průchodů řezem`);
		ok(volne * k === rez, 'a ta tři čísla si sedí i mezi sebou');
	}
}

console.log('\n— směrová slova v počitadle sedí s materiálem —');
{
	// Nález kontrolora: počitadlo u roztoku tvrdilo „24 částic doprava",
	// jenže doprava jde jen polovina (záporné ionty) — kladné jdou doleva.
	// Regexy četly jen čísla, směrové slovo nekontroloval nikdo. Teď se u
	// KAŽDÉHO nastavení měří: roztok musí říct oba směry, kov přesně jeden
	// (ten správný podle svorek), izolant a 0 V žádný.
	let spatny = null;
	for (const [u, m, d, o] of KOMBINACE) {
		nastav(u, m, d, o);
		const s = stav(u, m, d, o);
		const doprava = pocty.innerHTML.includes('doprava');
		const doleva = pocty.innerHTML.includes('doleva');
		if (!s.tece) {
			if (doprava || doleva) spatny = `${u} V, materiál ${m}: proud neteče, a počitadlo přesto udává směr`;
		} else if (m === ROZTOK) {
			if (!(doprava && doleva)) spatny = `${u} V roztok: musí zaznít OBA směry (doprava=${doprava}, doleva=${doleva})`;
		} else if (s.smer === 1 ? !(doprava && !doleva) : !(doleva && !doprava)) {
			spatny = `${u} V kov (smer=${s.smer}): má zaznít právě jeden směr (doprava=${doprava}, doleva=${doleva})`;
		}
	}
	ok(spatny === null, spatny ?? `ve všech ${KOMBINACE.length} nastaveních: roztok oba směry, kov jeden, izolant a 0 V žádný`);

	// a u roztoku konkrétně: 24 se rozpadá na 12 + 12 a stojí to tam výslovně
	nastav(12, ROZTOK, DC, 0);
	ok(pocty.innerHTML.includes('12 doprava a 12 doleva'),
		`roztok při 12 V: „${/za sekundu [^<]*/.exec(pocty.innerHTML)[0]}"`);
	ok(pocty.innerHTML.includes('oba pohyby tvoří proud'), 'a připomíná, že oba pohyby tvoří proud');
	nastav(3, ROZTOK, DC, 0);
	ok(pocty.innerHTML.includes('3 doprava a 3 doleva'), 'při 3 V sedí i poloviny: 3 a 3 z šesti průchodů');
	nastav(12, KOV, DC, 0);
	ok(/32 částic doprava/.test(pocty.innerHTML) && !pocty.innerHTML.includes('doleva'),
		'kov při 12 V DC: všech 32 průchodů doprava, o doleva ani slovo');
}

console.log('\n— AC hláška nesmí lhát o polovině iontů —');
{
	// Nález kontrolora: „…v čase 12 ms míří částice doleva" platilo jen pro
	// záporné ionty a popíralo předchozí větu téže hlášky.
	const hlaska = () => prvky.get('vep-stav').textContent;
	nastav(12, ROZTOK, AC, 2);   // 12 ms = druhá půlperioda, smer = −1
	ok(hlaska().includes('míří záporné ionty doleva a kladné doprava'),
		`roztok AC v 12 ms: „${/míří [^.]*/.exec(hlaska())[0]}"`);
	ok(!hlaska().includes('míří částice'), 'a obecné „míří částice" z hlášky zmizelo');
	nastav(12, ROZTOK, AC, 0);   // 2 ms = první půlperioda, smer = +1
	ok(hlaska().includes('míří záporné ionty doprava a kladné doleva'),
		'v první půlperiodě přesně obráceně');
	nastav(12, KOV, AC, 2);
	ok(hlaska().includes('míří elektrony doleva') && !hlaska().includes('ionty'),
		'kov AC: mluví se o elektronech (jeden směr je tu správně — jiné nosiče nejsou)');
}

console.log('\n— popisky u posuvníků říkají, co je nastavené —');
{
	nastav(9, ROZTOK, DC, 1);
	ok(prvky.get('vep-out-u').textContent === '9 V', `napětí: „${prvky.get('vep-out-u').textContent}"`);
	ok(prvky.get('vep-out-m').textContent === MATERIALY[ROZTOK].nazev, `materiál: „${prvky.get('vep-out-m').textContent}"`);
	ok(prvky.get('vep-out-d').textContent.includes('stejnosměrný'), `druh proudu: „${prvky.get('vep-out-d').textContent}"`);
	ok(prvky.get('vep-out-t').textContent === `${OKAMZIKY[1]} ms`, `okamžik: „${prvky.get('vep-out-t').textContent}"`);
	nastav(9, ROZTOK, AC, 3);
	ok(prvky.get('vep-out-d').textContent.includes('střídavý') && !prvky.get('vep-out-d').textContent.includes('stejnosměrný'),
		`po přepnutí: „${prvky.get('vep-out-d').textContent}"`);
	ok(prvky.get('vep-out-t').textContent === `${OKAMZIKY[3]} ms`, `a čas se změnil na „${prvky.get('vep-out-t').textContent}"`);
	nastav(9, ROZTOK, DC, 1);
	ok(prvky.get('vep-zdroj').innerHTML.includes('stejnosměrný') && prvky.get('vep-zdroj').innerHTML.includes('9 V'),
		'i popisek na samotném zdroji sedí s posuvníky');
}

console.log('\n— barva a popisek úseku se mění s materiálem —');
{
	const barvy = new Set();
	const popisky = new Set();
	for (const m of [KOV, ROZTOK, IZOLANT]) {
		nastav(6, m);
		barvy.add(usek.atributy.fill);
		popisky.add(popisG.innerHTML);
	}
	ok(barvy.size === 3, `tři materiály mají tři různé barvy (${[...barvy].join(', ')})`);
	ok(popisky.size === 3, 'a tři různé popisky');
}

console.log('\n— nic nevyleze z obrázku a nic se nepřekrývá —');
{
	// viewBox je 660 × 500; do pruhu počitadla (y ≥ 418) nesmí zasahovat vodič
	let mimo = null;
	for (const [u, m, d, o] of KOMBINACE) {
		nastav(u, m, d, o);
		for (const g of [castice, pocty, tokG, svorky, casG, popisG, prvky.get('vep-zdroj')]) {
			for (const t of g.innerHTML.matchAll(/<text x="(-?\d+)" y="(-?\d+)"/g)) {
				if (+t[1] < 10 || +t[1] > 650 || +t[2] < 10 || +t[2] > 494) mimo = `${g.id}: x=${t[1]} y=${t[2]} při ${u} V`;
			}
			for (const c of g.innerHTML.matchAll(/<circle cx="(-?\d+)" cy="(-?\d+)" r="(\d+)"/g)) {
				if (+c[1] - +c[3] < 0 || +c[1] + +c[3] > 660 || +c[2] + +c[3] > 500) mimo = `${g.id}: kolečko ${c[1]},${c[2]} při ${u} V`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'všechny texty i kolečka zůstávají uvnitř obrázku');

	nastav(12, KOV);
	// šipky částic nesmí přesáhnout zkoumaný úsek vodiče (x 100–560, y 240–350)
	let vylezla = null;
	for (const [u, m] of [[12, KOV], [12, ROZTOK], [0, KOV], [0, ROZTOK]]) {
		nastav(u, m);
		for (const l of castice.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)) {
			for (const [x, y] of [[+l[1], +l[2]], [+l[3], +l[4]]]) {
				if (x < 100 || x > 560 || y < 240 || y > 350) vylezla = `${x},${y} při ${u} V a materiálu ${m}`;
			}
		}
	}
	ok(vylezla === null, vylezla ? `šipka vyčnívá z vodiče — ${vylezla}` : 'šipky částic zůstávají uvnitř vodiče');

	nastav(12, ROZTOK);
	const yPocitadla = [...pocty.innerHTML.matchAll(/<text x="\d+" y="(\d+)"/g)].map((m) => +m[1]);
	ok(yPocitadla.every((y) => y >= 418), `počitadlo má vlastní pruh dole (y = ${yPocitadla.join(', ')})`);
	const yToku = [...tokG.innerHTML.matchAll(/<text x="\d+" y="(\d+)"/g)].map((m) => +m[1]);
	ok(yToku.every((y) => y > 350 && y < 418), `popisky toku leží mezi vodičem a počitadlem (y = ${yToku.join(', ')})`);

	// Nález z vyrenderovaného obrázku: delší popisek materiálu („slaná voda
	// (roztok): kladné i záporné ionty") narazil do popisku „řez" a obě slova
	// se slila. Šířka textu se odhaduje ze znaků — přesnou nemá SVG odkud vzít.
	const rezText = /<text x="(\d+)" y="(\d+)"[^>]*>řez<\/text>/.exec(html);
	let kolize = null;
	for (const m of [KOV, ROZTOK, IZOLANT]) {
		nastav(12, m);
		const t = /<text x="(\d+)" y="(\d+)"[^>]*>([^<]+)<\/text>/.exec(popisG.innerHTML);
		const levy = +t[1], yPopis = +t[2], sirka = t[3].length * 7;
		const rezLevy = +rezText[1] - 16, rezPravy = +rezText[1] + 16, yRez = +rezText[2];
		if (levy + sirka > rezLevy && levy < rezPravy && Math.abs(yPopis - yRez) < 14) {
			kolize = `„${t[3]}" (do x≈${levy + sirka}) narazí do popisku „řez" (od x=${rezLevy})`;
		}
	}
	ok(kolize === null, kolize ? `popisky se překrývají — ${kolize}` : 'popisek materiálu se nekříží s popiskem řezu ani u nejdelšího názvu');
}

console.log('\n— žádné desetinné číslo v tom, co žák čte —');
{
	let desetinne = null;
	for (const [u, m, d, o] of KOMBINACE) {
		nastav(u, m, d, o);
		const texty = [pocty, tokG, casG, popisG, prvky.get('vep-zdroj'), svorky]
			.flatMap((g) => [...g.innerHTML.matchAll(/>([^<]+)</g)].map((x) => x[1]))
			.concat(prvky.get('vep-stav').textContent, prvky.get('vep-vypocet').innerHTML.replace(/<[^>]*>/g, ''));
		for (const t of texty) if (/\d+[.,]\d/.test(t)) desetinne = `„${t.trim()}" při ${u} V`;
	}
	ok(desetinne === null, desetinne ? `objevilo se desetinné číslo — ${desetinne}` : 've všech nastaveních jsou čísla ve scéně celá');
}

console.log('\n— kotvy: popisky napsané napevno v HTML —');
{
	for (const slovo of ['zdroj napětí', 'řez', 'Vznik elektrického proudu']) {
		ok(html.includes(slovo), `v HTML části je natvrdo „${slovo}"`);
	}
	ok(/id="vep-napeti"[^>]*min="0"[^>]*max="12"[^>]*step="3"/.test(html),
		'posuvník napětí jde po 3 V od 0 do 12 — jen tak vycházejí celé kroky');
	ok(/id="vep-material"[^>]*max="2"/.test(html) && /id="vep-druh"[^>]*max="1"/.test(html),
		'posuvníky materiálu (3 volby) a druhu proudu (2 volby) sedí s modelem');
	ok(/<line x1="330" y1="240" x2="330" y2="350"[^>]*stroke-dasharray/.test(html),
		'řez je čárkovaná čára uprostřed vodiče, nakreslená natvrdo');
}

console.log('\n— čeština: částice, kroky, projde/projdou —');
{
	const tvary = { 0: '0 částic', 1: '1 částice', 2: '2 částice', 4: '4 částice', 5: '5 částic', 8: '8 částic', 24: '24 částic' };
	for (const [n, t] of Object.entries(tvary)) ok(castic(+n) === t, `${n} → „${castic(+n)}"`);
	const kr = { 0: '0 kroků', 1: '1 krok', 2: '2 kroky', 4: '4 kroky', 5: '5 kroků' };
	for (const [n, t] of Object.entries(kr)) ok(kroku(+n) === t, `${n} → „${kroku(+n)}"`);
	ok(projdeRezem(1) === 'projde řezem 1 částice', `1 → „${projdeRezem(1)}"`);
	ok(projdeRezem(3) === 'projdou řezem 3 částice', `3 → „${projdeRezem(3)}" (sloveso v množném čísle)`);
	ok(projdeRezem(32) === 'projde řezem 32 částic', `32 → „${projdeRezem(32)}"`);
	let spatne = null;
	for (const [u, m, d, o] of KOMBINACE) {
		nastav(u, m, d, o);
		const vse = pocty.innerHTML + prvky.get('vep-stav').textContent + prvky.get('vep-vypocet').innerHTML;
		if (/(?:^|[^\d])[234] částic[^ei]/.test(vse) || /[^\d][05-9]\d* částice/.test(vse)) spatne = `${u} V, materiál ${m}`;
		if (/[234] kroků|[05-9] kroky|[^\d]1 (?:částice projdou|kroky|částic\b)/.test(vse)) spatne = `${u} V, materiál ${m}`;
	}
	ok(spatne === null, spatne ? `špatný tvar při ${spatne}` : 'a v žádném z 120 nastavení nevyjde špatný tvar');
}

console.log('\n— rozmístění částic odpovídá materiálu —');
{
	ok(rozmisteni(KOV).length === 8 && rozmisteni(KOV).every((b) => b.naboj === -1),
		'kov: osm záporných částic (volné elektrony)');
	const r = rozmisteni(ROZTOK);
	ok(r.length === 6 && r.filter((b) => b.naboj === 1).length === 3 && r.filter((b) => b.naboj === -1).length === 3,
		'roztok: tři kladné a tři záporné ionty');
	ok(r.filter((b) => b.naboj === 1).every((b) => b.y < 300) && r.filter((b) => b.naboj === -1).every((b) => b.y > 300),
		'kladné jsou v horní řadě, záporné v dolní — nepřekrývají se');
	ok(rozmisteni(IZOLANT).length === 8 && rozmisteni(IZOLANT).every((b) => b.naboj === 0),
		'izolant: osm atomů bez volného náboje');
	let uvnitr = true, cela = true, blizko = null;
	for (const m of [KOV, ROZTOK, IZOLANT]) {
		const b3 = rozmisteni(m);
		for (const b of b3) {
			if (b.x < 113 || b.x > 547 || b.y < 253 || b.y > 337) uvnitr = false;
			if (!Number.isInteger(b.x) || !Number.isInteger(b.y)) cela = false;
		}
		for (let i = 0; i < b3.length; i++) {
			for (let j = i + 1; j < b3.length; j++) {
				const d = Math.hypot(b3[i].x - b3[j].x, b3[i].y - b3[j].y);
				if (d < 30) blizko = `materiál ${m}: dvě částice ${d.toFixed(1)} px od sebe`;
			}
		}
	}
	ok(uvnitr, 'a všechny leží i s okrajem uvnitř zkoumaného úseku');
	ok(cela, 'souřadnice částic jsou celá čísla — nic se nerozjede o zlomky pixelu');
	ok(blizko === null, blizko ? `částice si lezou do sebe — ${blizko}` : 'a mají od sebe aspoň 30 px');
}

console.log(chyby === 0 ? '\n✅ Vznik elektrického proudu: vše sedí.' : `\n❌ Vznik elektrického proudu: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);
