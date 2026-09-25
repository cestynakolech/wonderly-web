#!/usr/bin/env node
// Test simulace KVARKY (fyzika/9-rocnik/jaderna-fyzika/kvarky).
//
// Co hlídá:
//   1) VÝKLAD NAVÍC: v simulaci nesmí být nic, co ve výkladu není — tedy žádné
//      typy kvarků (u, d), žádný náboj ani zlomky (2/3, 1/3).
//   2) TEXT vs KRESBA ve VŠECH stavech: pro každou kombinaci ovládání se
//      porovná, co text tvrdí, s tím, co je opravdu nakreslené (a viditelné —
//      počítají se jen prvky, jejichž skupina nemá display="none").
//   3) VIDITELNOST: nic nepřetéká scénu, popisky na podkladu se nepřekrývají
//      s kresbou, částice se nepřekrývají, kvarky leží uvnitř své částice.
//   4) CELÁ ČÍSLA: všechny počty i souřadnice jsou celá čísla, součet
//      3 × počet částic vychází přesně (žádné zaokrouhlování).
//   5) JEDNOTKY V SOUČINU: věta scény B musí být rozměrově správná —
//      „N částic × 3 kvarky = M kvarků". („3 × 8 částic = 24 kvarků" je vada:
//      trojnásobek osmi ČÁSTIC je 24 částic, ne 24 kvarků.)
//   6) ŽÁDNÉ PROTICHŮDNÉ HLÁŠKY: pokyn „přibliž se až ke kvarkům (krok 3)"
//      a shrnutí „Rozdělit kvark se nepodařilo ani jednou" se nikdy
//      neukazují v jedné hlášce.
//
// Spuštění: node testy/simulace/kvarky.mjs src/components/skola2/KvarkySimulace.astro
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2];
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

// ───────────────────────────── atrapa DOMu ──────────────────────────────
const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {}, value: '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		querySelectorAll: () => [],
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: () => [],
	createElementNS: () => novyPrvek('x'),
};
// posuvníky musí mít výchozí hodnotu ze zdroje, jinak by skript počítal s ''
const hodnotaZeZdroje = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
for (const id of ['kv-a-zoom', 'kv-b-protony', 'kv-b-neutrony']) novyPrvek(id).value = hodnotaZeZdroje(id) ?? '';

const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ─────────────────── parsování statické scény ze zdroje ─────────────────
function parsujScenu(svgId) {
	const start = zdroj.indexOf(`<svg id="${svgId}"`);
	const konec = zdroj.indexOf('</svg>', start);
	const blok = zdroj.slice(start, konec);
	const seznam = [];
	const skupiny = new Map();
	const zasobnik = [];
	for (const m of blok.matchAll(/<(\/?)([\w-]+)([^>]*?)(\/?)>/g)) {
		const [, zaviraci, tag, textAtributu, samostatna] = m;
		if (zaviraci) { if (tag === 'g') zasobnik.pop(); continue; }
		const atributy = {};
		for (const a of textAtributu.matchAll(/([\w:-]+)="([^"]*)"/g)) atributy[a[1]] = a[2];
		if (tag === 'g' && !samostatna) { skupiny.set(atributy.id, atributy); zasobnik.push(atributy.id); continue; }
		if (tag === 'svg') continue;
		seznam.push({ tag, atributy, skupiny: [...zasobnik] });
	}
	return { seznam, skupiny };
}
const scenaA = parsujScenu('kv-a-svg');

/** platná hodnota atributu = to, co nastavil skript, jinak to ze zdroje */
function atr(id, jmeno, zeZdroje) {
	const zeSkriptu = prvky.get(id)?.atributy?.[jmeno];
	return zeSkriptu !== undefined ? zeSkriptu : zeZdroje;
}
/** je prvek vidět? (žádná jeho skupina ani on sám nemá display none) */
function jeVidet(prvek) {
	for (const gid of prvek.skupiny) {
		const g = scenaA.skupiny.get(gid);
		if (atr(gid, 'display', g?.display) === 'none') return false;
	}
	if (prvek.atributy.id && atr(prvek.atributy.id, 'display', prvek.atributy.display) === 'none') return false;
	return true;
}
const viditelne = () => scenaA.seznam.filter(jeVidet);
const viditelneKvarky = () => viditelne().filter((p) => /^kv-a-kvark\d$/.test(p.atributy.id ?? ''));

// ───────────────────── geometrie: obálky a překryvy ─────────────────────
function obalka(p) {
	const c = (k) => Number(atr(p.atributy.id, k, p.atributy[k]));
	const tah = Number(p.atributy['stroke-width'] ?? 0) / 2;
	if (p.tag === 'circle') return { x1: c('cx') - c('r') - tah, x2: c('cx') + c('r') + tah, y1: c('cy') - c('r') - tah, y2: c('cy') + c('r') + tah };
	if (p.tag === 'rect') return { x1: c('x') - tah, x2: c('x') + c('width') + tah, y1: c('y') - tah, y2: c('y') + c('height') + tah };
	if (p.tag === 'polygon') {
		const body = p.atributy.points.trim().split(/\s+/).map((b) => b.split(',').map(Number));
		return { x1: Math.min(...body.map((b) => b[0])), x2: Math.max(...body.map((b) => b[0])), y1: Math.min(...body.map((b) => b[1])), y2: Math.max(...body.map((b) => b[1])) };
	}
	return null; // text se poměřuje zvlášť (šířku písma neznáme přesně)
}
const prekryv = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

console.log('— 1. nic navíc proti výkladu (žádné u/d kvarky, náboje ani zlomky) —');
const textSimulace = zdroj.replace(/^---[\s\S]*?---/, ''); // bez komentáře v hlavičce
ok(!/2\/3|1\/3|třetin/i.test(textSimulace), 'v simulaci nejsou zlomky náboje (2/3, 1/3, třetiny) — výklad je neučí');
ok(!/náboj/i.test(textSimulace), 'v simulaci není ani slovo „náboj" — ve výkladu kvarků není');
ok(!/kvark u\b|kvark d\b|„u"|„d"/i.test(textSimulace), 'v simulaci nejsou typy kvarků u a d');
ok(/velmi silná jaderná síla/.test(textSimulace), 'je tam „velmi silná jaderná síla" — bod z výkladu');
ok(/nepodařilo/.test(textSimulace), 'je tam, že kvark se nepodařilo rozdělit — bod z výkladu');

// ───────────────────────────── scéna A ──────────────────────────────────
const zoomSlider = prvky.get('kv-a-zoom');
const nastavZoom = (v) => { zoomSlider.value = String(v); zoomSlider.posluchaci.input.forEach((f) => f()); };
const klik = (id) => prvky.get(id).posluchaci.click.forEach((f) => f());
const titul = () => prvky.get('kv-a-titul').textContent;
const pocet = () => prvky.get('kv-a-pocet').textContent;
const popis = () => prvky.get('kv-a-popis').innerHTML;
const vysledek = () => prvky.get('kv-a-vysledek').innerHTML;
const bezTagu = (html) => html.replace(/<[^>]*>/g, '');

const CASTICE = [
	{ druh: 'proton', tlacitko: 'kv-a-proton', nazev: 'PROTON', barva: '#ffa8a8', vyberY: '150' },
	{ druh: 'neutron', tlacitko: 'kv-a-neutron', nazev: 'NEUTRON', barva: '#dee2e6', vyberY: '250' },
];

console.log('\n— 2. scéna A: text proti kresbě ve všech 6 kombinacích (3 kroky × 2 částice) —');
let rozporu = 0;
let kombinaci = 0;
for (const c of CASTICE) {
	klik(c.tlacitko);
	for (const zoom of [0, 1, 2]) {
		nastavZoom(zoom);
		kombinaci++;
		const videtKvarku = viditelneKvarky().length;
		const cekanoKvarku = zoom === 2 ? 3 : 0;
		const stavy = [0, 1, 2].map((i) => atr('kv-a-st' + i, 'display', undefined));
		const videtStavu = stavy.filter((d) => d !== 'none').length;
		// text se musí shodovat s kresbou
		if (videtKvarku !== cekanoKvarku) rozporu++;
		if (pocet() !== 'kvarků na obrázku: ' + videtKvarku) rozporu++;
		if (videtStavu !== 1 || stavy[zoom] === 'none') rozporu++;
		if (zoom === 0 && !/JÁDRO ATOMU/.test(titul())) rozporu++;
		if (zoom === 1 && titul() !== '2. ' + c.nazev + ' zvětšený') rozporu++;
		if (zoom === 2 && titul() !== '3. UVNITŘ ' + c.nazev + 'U — 3 kvarky') rozporu++;
		if (!popis().includes(c.druh)) rozporu++;
		// barva zvětšené částice i obalu kvarků patří k vybrané částici
		if (atr('kv-a-nukleon-velky', 'fill', undefined) !== c.barva) rozporu++;
		if (prvky.get('kv-a-nukleon-nazev').textContent !== c.nazev) rozporu++;
		if (atr('kv-a-vyber', 'cy', undefined) !== c.vyberY) rozporu++;
	}
}
ok(kombinaci === 6, `projito všech ${kombinaci} kombinací krok × částice`);
ok(rozporu === 0, `text ani jednou neodporuje kresbě (rozporů: ${rozporu})`);

console.log('\n— 3. scéna A: jednotlivé kroky zvětšení —');
klik('kv-a-proton');
nastavZoom(0);
ok(atr('kv-a-st0', 'display', undefined) === '' && atr('kv-a-st1', 'display', undefined) === 'none' && atr('kv-a-st2', 'display', undefined) === 'none', 'krok 1: vidět je jen jádro s protony a neutrony');
ok(viditelneKvarky().length === 0, 'krok 1: žádný kvark ještě není vidět');
ok(pocet() === 'kvarků na obrázku: 0', `krok 1 hlásí „${pocet()}"`);
ok(prvky.get('kv-a-zoom-out').textContent === '1. jádro atomu', `čtečka posuvníku: „${prvky.get('kv-a-zoom-out').textContent}"`);
ok(atr('kv-a-vyber', 'cx', undefined) === '250' && atr('kv-a-vyber', 'cy', undefined) === '150', 'krok 1: zakroužkovaný je PROTON (horní řada)');
klik('kv-a-neutron');
ok(atr('kv-a-vyber', 'cy', undefined) === '250', 'po přepnutí na neutron se kroužek posune na neutron (dolní řada)');
ok(/neutron/.test(popis()) && !/zakroužkovaný<\/strong> proton/.test(popis()), 'popis mluví o neutronu, ne o protonu');
klik('kv-a-proton');
nastavZoom(1);
ok(viditelneKvarky().length === 0, 'krok 2: zvětšená částice, kvarky ještě nejsou vidět');
ok(atr('kv-a-st1', 'display', undefined) === '', 'krok 2: vidět je zvětšená částice');
ok(/není nejmenší kousek hmoty/.test(popis()), 'krok 2: text říká, že proton není nejmenší kousek hmoty');
nastavZoom(2);
ok(viditelneKvarky().length === 3, 'krok 3: vidět jsou přesně 3 kvarky');
ok(pocet() === 'kvarků na obrázku: 3', `krok 3 hlásí „${pocet()}"`);
ok(/3 kvarky/.test(popis()) && /velmi silná jaderná síla/.test(popis()), 'krok 3: text mluví o 3 kvarcích a o velmi silné jaderné síle');
ok(prvky.get('kv-a-zoom-out').textContent === '3. kvarky uvnitř', `čtečka posuvníku: „${prvky.get('kv-a-zoom-out').textContent}"`);

console.log('\n— 4. scéna A: pokus rozdělit kvark vždy selže —');
nastavZoom(2);
ok(atr('kv-a-pokus', 'display', undefined) === 'none', 'před pokusem není hlášení „kvark zůstal CELÝ" vidět');
ok(/Pokusů o rozdělení kvarku: <strong>0<\/strong>/.test(vysledek()), `počítadlo před pokusem: „${vysledek()}"`);
ok(!/Rozdělit kvark se nepodařilo ani jednou/.test(vysledek()), 'před prvním pokusem text nemluví o žádných dosavadních pokusech');
klik('kv-a-rozdelit');
ok(atr('kv-a-pokus', 'display', undefined) === '', 'po pokusu je hlášení o neúspěchu vidět');
ok(atr('kv-a-kvark1', 'stroke', undefined) === '#e03131' && atr('kv-a-kvark1', 'stroke-width', undefined) === '6', 'po pokusu má kvark zvýrazněný červený obrys');
ok(viditelneKvarky().length === 3, 'po pokusu jsou pořád 3 kvarky — žádný se nerozdělil');
ok(/Pokusů o rozdělení kvarku: <strong>1<\/strong>/.test(vysledek()), `počítadlo po 1. pokusu: „${vysledek()}"`);
ok(/rozdělených kvarků: <strong>0<\/strong>/.test(vysledek()), 'rozdělených kvarků zůstává 0');
ok(/nepodařilo/.test(vysledek()), 'hlášení vysvětluje, že rozdělit kvark se nikomu nepodařilo');
klik('kv-a-rozdelit');
klik('kv-a-rozdelit');
ok(/Pokusů o rozdělení kvarku: <strong>3<\/strong>/.test(vysledek()), `počítadlo po 3 pokusech: „${vysledek()}"`);
ok(/rozdělených kvarků: <strong>0<\/strong>/.test(vysledek()), 'ani po 3 pokusech není rozdělený žádný kvark');
nastavZoom(0);
ok(atr('kv-a-pokus', 'display', undefined) === 'none', 'po návratu na krok 1 hlášení o pokusu zmizí (nepatří k jádru)');
ok(atr('kv-a-kvark1', 'stroke', undefined) === '#2b2a26' && atr('kv-a-kvark1', 'stroke-width', undefined) === '3', 'obrys kvarku se vrátí do klidu');
ok(/Pokusů o rozdělení kvarku: <strong>3<\/strong>/.test(vysledek()), 'počítadlo pokusů se nemaže');
ok(/rozdělených kvarků: <strong>0<\/strong> · Rozdělit kvark se nepodařilo ani jednou\./.test(vysledek()), `věty jsou oddělené oddělovačem, neslepí se: „${vysledek().replace(/<[^>]*>/g, '')}“`);
ok(!/\d\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/.test(vysledek().replace(/<[^>]*>/g, '')), 'za číslem nikdy nezačíná nová věta bez oddělovače');
ok(!/Zkoušel jsi|Zkoušela jsi|jsi to/.test(textSimulace), 'text neoslovuje rodově („Zkoušel jsi“) — web je pro všechny děti');
ok(!/,\s*a rozdělit/.test(textSimulace), 've větě o pokusech není nadbytečná čárka před spojkou „a“');
nastavZoom(2);
ok(atr('kv-a-pokus', 'display', undefined) === '' && viditelneKvarky().length === 3, 'po návratu ke kvarkům je výsledek posledního pokusu vidět znovu — a kvarky jsou pořád 3');
nastavZoom(1);
ok(atr('kv-a-pokus', 'display', undefined) === 'none', 'u zvětšené částice (krok 2) se hlášení o pokusu nekreslí');
nastavZoom(0);
klik('kv-a-rozdelit');
ok(/nejdřív se posuvníkem přibliž/.test(vysledek()), 'pokus mimo krok 3: text pošle žáka nejdřív ke kvarkům');
ok(/Pokusů o rozdělení kvarku: <strong>3<\/strong>/.test(vysledek()), 'pokus mimo krok 3 se nepočítá (počítadlo zůstává 3)');
ok(atr('kv-a-pokus', 'display', undefined) === 'none', 'pokus mimo krok 3 nic nekreslí');
ok(/ — nejdřív se posuvníkem přibliž až ke kvarkům \(krok 3\)\.$/.test(bezTagu(vysledek())), `hláška o kroku 3 je oddělená a končí pokynem: „${bezTagu(vysledek())}“`);
ok(!/nepodařilo ani jednou/.test(vysledek()), 'u pokynu na krok 3 NESTOJÍ věta „Rozdělit kvark se nepodařilo ani jednou" — protiřečila by mu');
ok(prvky.get('kv-a-zoom-out').textContent === '1. jádro atomu', 'číslo kroku u posuvníku se počítá od 1');

console.log('\n— 4b. scéna A: pokyn na krok 3 a věta o marných pokusech se NIKDY neukážou spolu —');
// Vada, kterou to hlídá: „…(krok 3). · Rozdělit kvark se nepodařilo ani jednou."
// — pokyn, co udělat, a hned za ním hodnocení dosud marných pokusů. Dvě zprávy,
// které si protiřečí. Projdou se všechny stavy (2 částice × 3 kroky × klikání
// i přejezdy posuvníkem) a hledá se, jestli se ty dvě věty někde sejdou.
const POKYN = /krok 3/;
const SHRNUTI = /nepodařilo ani jednou/;
let spoluStavu = 0;
let videnPokyn = 0;
let videnoShrnuti = 0;
let prohlednutych = 0;
const kolizniUkazky = [];
function zkontrolujHlasku() {
	const t = bezTagu(vysledek());
	prohlednutych++;
	const jePokyn = POKYN.test(t);
	const jeShrnuti = SHRNUTI.test(t);
	if (jePokyn) videnPokyn++;
	if (jeShrnuti) videnoShrnuti++;
	if (jePokyn && jeShrnuti) { spoluStavu++; if (kolizniUkazky.length < 3) kolizniUkazky.push(t); }
}
for (const c of CASTICE) {
	klik(c.tlacitko);
	for (const zoom of [0, 1, 2]) {
		nastavZoom(zoom);
		zkontrolujHlasku();
		klik('kv-a-rozdelit'); // 1. kliknutí z tohoto kroku
		zkontrolujHlasku();
		klik('kv-a-rozdelit'); // 2. kliknutí — počítadlo už není nulové
		zkontrolujHlasku();
		for (const jiny of [0, 1, 2]) { nastavZoom(jiny); zkontrolujHlasku(); } // přejezdy posuvníkem
		nastavZoom(zoom);
		klik('kv-a-rozdelit');
		zkontrolujHlasku();
	}
}
ok(prohlednutych === 42, `prohlédnuto ${prohlednutych} stavů hlášky (2 částice × 3 kroky × 7 stavů)`);
ok(videnPokyn >= 4, `pokyn na krok 3 se v projitých stavech opravdu objevil ${videnPokyn}× (vzor chytá)`);
ok(videnoShrnuti >= 4, `věta o marných pokusech se objevila ${videnoShrnuti}× (vzor chytá)`);
ok(spoluStavu === 0, `pokyn a shrnutí nikdy nestojí v jedné hlášce (kolizí: ${spoluStavu}${kolizniUkazky.length ? ' — např. „' + kolizniUkazky[0] + '“' : ''})`);

console.log('\n— 5. scéna A: viditelnost — nic nepřetéká a popisky nekryjí kresbu —');
nastavZoom(2);
klik('kv-a-rozdelit');
const mimoPlatno = viditelne().map(obalka).filter(Boolean).filter((o) => o.x1 < -0.5 || o.y1 < -0.5 || o.x2 > 640.5 || o.y2 > 400.5);
ok(mimoPlatno.length === 0, `žádný viditelný prvek nepřetéká plátno 640×400 (přetékajících: ${mimoPlatno.length})`);
const podklady = ['kv-a-sila-pozadi'];
let kolize = 0;
for (const pid of podklady) {
	const p = scenaA.seznam.find((x) => x.atributy.id === pid);
	for (const k of viditelneKvarky()) if (prekryv(obalka(p), obalka(k))) kolize++;
}
ok(kolize === 0, `podklad popisku „velmi silná jaderná síla" nepřekrývá žádný kvark (kolizí: ${kolize})`);
const pokusPodklad = { x1: 170, x2: 470, y1: 50, y2: 78 };
ok(viditelneKvarky().every((k) => !prekryv(pokusPodklad, obalka(k))), 'podklad hlášení o neúspěchu nepřekrývá kvarky');
const obal = scenaA.seznam.find((x) => x.atributy.id === 'kv-a-obal');
const R = Number(obal.atributy.r);
const vsechnyUvnitr = viditelneKvarky().every((k) => {
	const dx = Number(k.atributy.cx) - Number(obal.atributy.cx);
	const dy = Number(k.atributy.cy) - Number(obal.atributy.cy);
	return Math.sqrt(dx * dx + dy * dy) + Number(k.atributy.r) <= R;
});
ok(vsechnyUvnitr, 'všechny 3 kvarky leží celé uvnitř částice (nepřetékají ji)');
const kvarkyPary = viditelneKvarky();
let prekryvKvarku = 0;
for (let i = 0; i < kvarkyPary.length; i++) for (let j = i + 1; j < kvarkyPary.length; j++) {
	const a = kvarkyPary[i].atributy, b = kvarkyPary[j].atributy;
	const d = Math.hypot(Number(a.cx) - Number(b.cx), Number(a.cy) - Number(b.cy));
	if (d < Number(a.r) + Number(b.r)) prekryvKvarku++;
}
ok(prekryvKvarku === 0, `kvarky se navzájem nepřekrývají (překryvů: ${prekryvKvarku})`);

console.log('\n— 5b. scéna A: šipky u pokusu TÁHNOU OD SEBE (roztržení, ne stlačení) —');
nastavZoom(2);
klik('kv-a-rozdelit');
const kvark1 = scenaA.seznam.find((x) => x.atributy.id === 'kv-a-kvark1');
const kvarkStred = Number(kvark1.atributy.cx);
const sipky = viditelne().filter((x) => x.tag === 'polygon' && x.skupiny.includes('kv-a-pokus'));
ok(sipky.length === 2, `u pokusu o rozdělení jsou vidět 2 šipky (nalezeno: ${sipky.length})`);
/** hrot = vrchol, jehož x se liší od obou ostatních; násada = zbylá dvojice bodů */
function hrotANasada(polygon) {
	const body = polygon.atributy.points.trim().split(/\s+/).map((b) => b.split(',').map(Number));
	const hrot = body.find((b) => body.filter((o) => o[0] === b[0]).length === 1);
	const nasada = body.filter((b) => b !== hrot);
	return hrot && nasada.length === 2 ? { hrot: hrot[0], nasada: nasada[0][0] } : null;
}
let spatnySmer = 0;
const popisSipek = [];
for (const sip of sipky) {
	const g = hrotANasada(sip);
	if (!g) { spatnySmer++; continue; }
	const dHrot = Math.abs(g.hrot - kvarkStred);
	const dNasada = Math.abs(g.nasada - kvarkStred);
	popisSipek.push(`hrot x=${g.hrot} (${dHrot} px od kvarku) · násada x=${g.nasada} (${dNasada} px)`);
	if (!(dHrot > dNasada)) spatnySmer++;
}
ok(spatnySmer === 0, `každá šipka má hrot DÁL od kvarku než násadu — ${popisSipek.join(' | ')}`);
const smery = sipky.map((sip) => Math.sign((hrotANasada(sip)?.hrot ?? kvarkStred) - kvarkStred));
ok(smery.includes(-1) && smery.includes(1), 'šipky míří opačnými směry (jedna ven doleva, druhá ven doprava) — kvark se trhá, nemačká');
ok(sipky.every((sip) => !prekryv(obalka(sip), obalka(kvark1))), 'žádná šipka nezajíždí do kvarku');

// ───────────────────────────── scéna B ──────────────────────────────────
console.log('\n— 6. scéna B: kvarků v jádře = 3 × počet částic (všech 20 kombinací) —');
const sliderP = prvky.get('kv-b-protony');
const sliderN = prvky.get('kv-b-neutrony');
const nastavB = (p, n) => {
	sliderP.value = String(p); sliderN.value = String(n);
	sliderP.posluchaci.input.forEach((f) => f());
};
const kruhyTridy = (html, trida) => [...html.matchAll(new RegExp(`<circle class="${trida}"([^>]*)>`, 'g'))].map((m) => {
	const a = {};
	for (const x of m[1].matchAll(/([\w-]+)="([^"]*)"/g)) a[x[1]] = x[2];
	return a;
});

const tvarKvarku = (n) => (n === 1 ? '1 kvark' : n >= 2 && n <= 4 ? n + ' kvarky' : n + ' kvarků');
const tvarCastic = (n) => (n === 1 ? '1 částice' : n >= 2 && n <= 4 ? n + ' částice' : n + ' částic');

let rozporuB = 0;
let kombinaciB = 0;
let necela = 0;
let mimoB = 0;
let prekryvB = 0;
let mimoCastici = 0;
let spatnePosuny = 0;
for (let p = 1; p <= 4; p++) for (let n = 0; n <= 4; n++) {
	nastavB(p, n);
	kombinaciB++;
	const html = prvky.get('kv-b-nukleony').innerHTML;
	const castice = kruhyTridy(html, 'kv-b-castice');
	const kvarky = kruhyTridy(html, 'kv-b-kvark');
	const cekanoKvarku = 3 * (p + n);
	// text proti kresbě
	if (castice.length !== p + n) rozporuB++;
	if (kvarky.length !== cekanoKvarku) rozporuB++;
	if (castice.filter((c) => c.fill === '#ffa8a8').length !== p) rozporuB++;
	if (castice.filter((c) => c.fill === '#dee2e6').length !== n) rozporuB++;
	if (prvky.get('kv-b-popisek-p').textContent !== 'protonů: ' + p) rozporuB++;
	if (prvky.get('kv-b-popisek-n').textContent !== 'neutronů: ' + n) rozporuB++;
	if (prvky.get('kv-b-soucet').textContent !== `${tvarCastic(p + n)} × 3 kvarky = ${tvarKvarku(cekanoKvarku)}`) rozporuB++;
	if (!prvky.get('kv-b-popis').innerHTML.includes(`3 × ${p + n} = ${cekanoKvarku}`)) rozporuB++;
	if (prvky.get('kv-b-protony-out').textContent !== String(p)) rozporuB++;
	if (prvky.get('kv-b-neutrony-out').textContent !== String(n)) rozporuB++;
	// celá čísla a viditelnost
	for (const c of [...castice, ...kvarky]) {
		const cx = Number(c.cx), cy = Number(c.cy), r = Number(c.r);
		if (!Number.isInteger(cx) || !Number.isInteger(cy) || !Number.isInteger(r)) necela++;
		if (cx - r < 1.5 || cy - r < 1.5 || cx + r > 638.5 || cy + r > 338.5) mimoB++;
	}
	if (!Number.isInteger(cekanoKvarku)) necela++;
	// částice se nesmí překrývat
	for (let i = 0; i < castice.length; i++) for (let j = i + 1; j < castice.length; j++) {
		const d = Math.hypot(Number(castice[i].cx) - Number(castice[j].cx), Number(castice[i].cy) - Number(castice[j].cy));
		if (d < Number(castice[i].r) + Number(castice[j].r)) prekryvB++;
	}
	// kvarky musí sedět na PŘESNÝCH místech uvnitř své částice (v daném pořadí):
	// jeden nahoře, dva dole — ne zrcadlově obráceně
	const POSUNY = [[0, -16], [-15, 10], [15, 10]];
	for (let c = 0; c < castice.length; c++) {
		for (let j = 0; j < POSUNY.length; j++) {
			const k = kvarky[c * POSUNY.length + j];
			if (!k) { spatnePosuny++; continue; }
			const cekaneX = Number(castice[c].cx) + POSUNY[j][0];
			const cekaneY = Number(castice[c].cy) + POSUNY[j][1];
			if (Number(k.cx) !== cekaneX || Number(k.cy) !== cekaneY) spatnePosuny++;
		}
	}
	// každý kvark musí ležet celý uvnitř nějaké částice
	for (const k of kvarky) {
		const uvnitr = castice.some((c) => Math.hypot(Number(k.cx) - Number(c.cx), Number(k.cy) - Number(c.cy)) + Number(k.r) <= Number(c.r));
		if (!uvnitr) mimoCastici++;
	}
	// popisek řady nesmí zasahovat do částic (popisek začíná na x=16, odhad šířky 130 px)
	const nejlevejsi = Math.min(...castice.map((c) => Number(c.cx) - Number(c.r)), 640);
	if (nejlevejsi < 150) rozporuB++;
}
ok(kombinaciB === 20, `projito všech ${kombinaciB} kombinací protonů a neutronů`);
ok(rozporuB === 0, `text ani jednou neodporuje kresbě (rozporů: ${rozporuB})`);
ok(necela === 0, `všechna čísla i souřadnice jsou celá (necelých: ${necela})`);
ok(mimoB === 0, `žádná částice ani kvark nepřetéká plátno 640×340 (přetékajících: ${mimoB})`);
ok(prekryvB === 0, `částice se nikdy nepřekrývají, každá je celá vidět (překryvů: ${prekryvB})`);
ok(mimoCastici === 0, `každý kvark leží celý uvnitř své částice (mimo: ${mimoCastici})`);
ok(spatnePosuny === 0, `kvarky jsou v částici na přesných místech — 1 nahoře, 2 dole (odchylek: ${spatnePosuny})`);

console.log('\n— 6b. scéna B: shoda přísudku s podmětem ve VŠECH 20 větách —');
// české tvary a přísudek si test počítá SÁM, nezávisle na komponentě:
// 1 → „je 1 proton" · 2–4 → „jsou 2 protony" · 0 a 5+ → „je 5 protonů"
const spravnyProton = (n) => (n === 1 ? '1 proton' : n >= 2 && n <= 4 ? n + ' protony' : n + ' protonů');
const spravnyNeutron = (n) => (n === 1 ? '1 neutron' : n >= 2 && n <= 4 ? n + ' neutrony' : n + ' neutronů');
const spravnyPrisudek = (n) => (n >= 2 && n <= 4 ? 'jsou' : 'je');
const cistyText = (html) => html.replace(/<[^>]*>/g, '');
let spatnaShoda = 0;
const vetyB = [];
for (let p = 1; p <= 4; p++) for (let n = 0; n <= 4; n++) {
	nastavB(p, n);
	const veta = cistyText(prvky.get('kv-b-popis').innerHTML);
	vetyB.push(veta);
	const cekano = `V jádře ${spravnyPrisudek(p)} ${spravnyProton(p)} a ${spravnyNeutron(n)}, dohromady ${tvarCastic(p + n)}.`;
	if (!veta.startsWith(cekano)) { spatnaShoda++; console.log(`   ↳ ${p}p+${n}n: „${veta.split('.')[0]}.“ ≠ „${cekano}“`); }
}
ok(vetyB.length === 20, `projito všech ${vetyB.length} vět scény B`);
ok(spatnaShoda === 0, `ve všech 20 větách sedí přísudek i tvar podmětu (vadných: ${spatnaShoda})`);
ok(new Set(vetyB).size === 20, `každá kombinace má svou vlastní větu (různých vět: ${new Set(vetyB).size})`);
// plošná kontrola: nikde v žádném textu nesmí být „je 2 protony" ani „jsou 1 proton"
const VZOR_SHODY = /(^|[\s(·—])(je|jsou) (\d+) [a-záčďéěíňóřšťúůýž]/g;
const vsechnyTexty = [...vetyB];
for (const c of CASTICE) {
	klik(c.tlacitko);
	for (const z of [0, 1, 2]) { nastavZoom(z); vsechnyTexty.push(cistyText(popis()), titul(), pocet(), cistyText(vysledek()), prvky.get('kv-b-soucet').textContent); }
}
let nesouhlas = 0;
const ukazky = [];
let nalezenychShod = 0;
for (const t of vsechnyTexty) for (const m of t.matchAll(VZOR_SHODY)) {
	nalezenychShod++;
	if (m[2] !== spravnyPrisudek(Number(m[3]))) { nesouhlas++; ukazky.push(`${m[2]} ${m[3]}`); }
}
ok(nalezenychShod >= 20, `nalezeno ${nalezenychShod} spojení přísudku s číslem ke kontrole (vzor opravdu chytá)`);
ok(nesouhlas === 0, `nikde není „je 2 protony" ani „jsou 1 proton" (neshod: ${nesouhlas}${ukazky.length ? ': ' + ukazky.join(', ') : ''})`);

console.log('\n— 6c. scéna B: věta o součinu je ROZMĚROVĚ správná ve všech 20 kombinacích —');
// Vada, kterou to hlídá: „3 × 8 částic = 24 kvarků". Trojnásobek osmi ČÁSTIC je
// 24 částic, ne 24 kvarků — jednotky nevycházejí. Správně je
// „8 částic × 3 kvarky = 24 kvarků": počet částic × kvarků na jednu částici.
const VZOR_SOUCINU = /^(\d+) (částice|částic) × (\d+) (kvark|kvarky|kvarků) = (\d+) (kvark|kvarky|kvarků)$/;
let spatneJednotky = 0;
let kombinaciC = 0;
const vetySoucinu = [];
for (let p = 1; p <= 4; p++) for (let n = 0; n <= 4; n++) {
	nastavB(p, n);
	kombinaciC++;
	const veta = prvky.get('kv-b-soucet').textContent;
	vetySoucinu.push(`${p}p+${n}n → ${veta}`);
	const m = veta.match(VZOR_SOUCINU);
	const cekano = `${tvarCastic(p + n)} × 3 kvarky = ${tvarKvarku(3 * (p + n))}`;
	let vada = '';
	if (!m) vada = 'nemá tvar „N částic × 3 kvarky = M kvarků" (jednotky nevycházejí)';
	else if (Number(m[1]) !== p + n) vada = `vlevo má být počet částic (${p + n})`;
	else if (Number(m[3]) !== 3) vada = 'prostřední činitel musí být 3 kvarky na jednu částici';
	else if (Number(m[5]) !== 3 * (p + n)) vada = `výsledek má být ${3 * (p + n)}`;
	else if (veta !== cekano) vada = `české tvary nesedí, čekáno „${cekano}"`;
	if (vada) { spatneJednotky++; console.log(`   ↳ ${p}p+${n}n: „${veta}" — ${vada}`); }
}
ok(kombinaciC === 20, `projito všech ${kombinaciC} kombinací věty o součinu`);
ok(spatneJednotky === 0, `ve všech 20 větách vycházejí jednotky: částice × kvarky = kvarky (vadných: ${spatneJednotky})`);
ok(vetySoucinu.every((v) => !/× \d+ (částice|částic)/.test(v)), 'za znakem × nikdy nestojí částice — násobí se kvarky na částici, ne částice');
ok(new Set(vetySoucinu.map((v) => v.split(' → ')[1])).size === 8, `osm různých vět podle počtu částic (různých: ${new Set(vetySoucinu.map((v) => v.split(' → ')[1])).size})`);

console.log('\n— 7. scéna B: konkrétní výpočty a mezní stavy —');
nastavB(1, 0);
ok(prvky.get('kv-b-soucet').textContent === '1 částice × 3 kvarky = 3 kvarky', `1 proton, 0 neutronů: „${prvky.get('kv-b-soucet').textContent}"`);
ok(kruhyTridy(prvky.get('kv-b-nukleony').innerHTML, 'kv-b-kvark').length === 3, 'nakreslené 3 kvarky u jediné částice');
ok(prvky.get('kv-b-popisek-n').textContent === 'neutronů: 0', 'mezní stav: popisek přiznává 0 neutronů');
ok(kruhyTridy(prvky.get('kv-b-nukleony').innerHTML, 'kv-b-castice').filter((c) => c.fill === '#dee2e6').length === 0, 'mezní stav: při 0 neutronech není nakreslený ani jeden neutron');
ok(/V jádře je 1 proton a 0 neutronů, dohromady 1 částice\./.test(prvky.get('kv-b-popis').innerHTML), `text u mezního stavu: „${prvky.get('kv-b-popis').innerHTML.replace(/<[^>]*>/g, '')}"`);
nastavB(2, 2);
ok(prvky.get('kv-b-soucet').textContent === '4 částice × 3 kvarky = 12 kvarků', `2 protony + 2 neutrony: „${prvky.get('kv-b-soucet').textContent}"`);
ok(/3 × 4 = 12/.test(prvky.get('kv-b-popis').innerHTML), 'text ukazuje výpočet 3 × 4 = 12');
nastavB(4, 4);
ok(prvky.get('kv-b-soucet').textContent === '8 částic × 3 kvarky = 24 kvarků', `4 protony + 4 neutrony: „${prvky.get('kv-b-soucet').textContent}"`);
ok(kruhyTridy(prvky.get('kv-b-nukleony').innerHTML, 'kv-b-kvark').length === 24, 'nakresleno je přesně 24 kvarků');
ok(/3 × 8 = 24/.test(prvky.get('kv-b-popis').innerHTML), 'text ukazuje výpočet 3 × 8 = 24');
nastavB(3, 1);
ok(prvky.get('kv-b-soucet').textContent === '4 částice × 3 kvarky = 12 kvarků', `3 protony + 1 neutron: „${prvky.get('kv-b-soucet').textContent}"`);
ok(/3 protony a 1 neutron,/.test(prvky.get('kv-b-popis').innerHTML), 'české tvary u 3 protonů a 1 neutronu sedí');

console.log('\n— 7b. scéna B: prázdná řada má tlumený popisek, plná plný —');
nastavB(2, 0);
ok(prvky.get('kv-b-popisek-n').getAttribute('opacity') === '0.55', `při 0 neutronech je popisek řady tlumený (opacity ${prvky.get('kv-b-popisek-n').getAttribute('opacity')})`);
nastavB(2, 1);
ok(prvky.get('kv-b-popisek-n').getAttribute('opacity') === '1', `při 1 neutronu je popisek řady plný (opacity ${prvky.get('kv-b-popisek-n').getAttribute('opacity')})`);

console.log('\n— 8. scéna B: rozestupy řad (částice v řadě jsou vystředěné a nelepí se) —');
nastavB(4, 4);
const castice4 = kruhyTridy(prvky.get('kv-b-nukleony').innerHTML, 'kv-b-castice');
const radaP = castice4.filter((c) => c.fill === '#ffa8a8').map((c) => Number(c.cx)).sort((a, b) => a - b);
const radaN = castice4.filter((c) => c.fill === '#dee2e6').map((c) => Number(c.cx)).sort((a, b) => a - b);
ok(radaP.join(',') === '192,304,416,528', `řada protonů má středy ${radaP.join(', ')}`);
ok(radaN.join(',') === radaP.join(','), 'řada neutronů je vystředěná stejně jako řada protonů');
ok(new Set(castice4.filter((c) => c.fill === '#ffa8a8').map((c) => c.cy)).size === 1, 'protony jsou v jedné řadě (stejné cy)');
const cyP = Number(castice4.find((c) => c.fill === '#ffa8a8').cy);
const cyN = Number(castice4.find((c) => c.fill === '#dee2e6').cy);
ok(cyN - cyP >= 2 * 42, `řady protonů a neutronů se nepřekrývají (svislý rozestup ${cyN - cyP} px ≥ 84)`);
nastavB(1, 1);
const castice1 = kruhyTridy(prvky.get('kv-b-nukleony').innerHTML, 'kv-b-castice');
ok(castice1.every((c) => Number(c.cx) === 360), 'jediná částice v řadě stojí přesně ve středu řady (cx = 360)');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
