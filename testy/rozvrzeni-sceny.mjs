#!/usr/bin/env node
// ROZVRŽENÍ SCÉNY: strojová kontrola toho, JAK je scéna simulace rozvržená.
//
// Proč existuje: MagnetyOpakovaniSimulace prošla testem s 84 kontrolami a byla
// nasazená — a přesto měla vady, které našel až člověk pohledem na obrázek:
// rámeček popisku s x="0" seděl na okraji plátna a měl useknutý obrys, obsah
// scény byl natlačený doleva (končil na x=440 z 660, po rozlomení magnetu už
// na x=255) a půlka plátna zela prázdnotou. Táž třída vad se opakuje: useknutá
// kružnice, šipky nakupené v řadě, počitadlo přes oblak. Pravidlo projektu:
// opakovaná třída chyby se převádí na měřidlo v kódu. Tohle je to měřidlo.
//
// Co měří (nad SVG vyrenderovaným přes testy/nahled-simulace.mjs):
//   A) PŘETEČENÍ / DOTYK OKRAJE — tvrdá chyba. Žádný viditelný prvek nesmí
//      zasahovat mimo viewBox. U obrysu se počítá i POLOVINA stroke-width —
//      právě ta se ořízne (přesně případ rámečku s x="0" a stroke-width="2").
//   B) NEVYUŽITÉ PLÁTNO — varování. Ohraničující obdélník obsahu (bez podkladu
//      přes celé plátno) musí zabírat rozumnou část plochy a nesmí být
//      natlačený do rohu.
//
// Přísnost je schválně dvojí: přetečení je vada, kterou vidí každý (useknutý
// obrys), a končí kódem 1. Nevyužité plátno je vkusová věc — hlásí se jako
// varování a bránu nesráží (přepínač --varovani-jsou-chyby to změní).
//
// KALIBRACE (14. 8. 2026, 106 nasazených simulací bez opravovaných magnetů):
// první verze měřidla hlásila 60 tvrdých chyb — to není 60 vad, to je špatně
// nastavené měřidlo. Zavedený styl webu NENÍ chyba, a tak se postupně vyjmuly
// (a v prazích i v kódu zdůvodnily) tyhle vzory: pruhy přes celou šířku (nebe,
// zem, hladina, stůl), úsečky a paprsky končící na okraji, zástupky bez rozměru
// nebo vystředěné na počátek (kreslí je až animace, kterou náhled nespouští)
// a atributy psané astro výrazem `x={…}`, ze kterých vycházela nula. Zůstalo
// 6 tvrdých chyb a 1 varování — všechno skutečné vady (popisky za okrajem).
//
// POZOR na dosah: 21 ze 106 komponent se nezměří vůbec (12 nemá <svg> — kreslí
// se v HTML, 8 spadne v sandboxu náhledu, 1 nemá viewBox). Hlásí se jako
// „nevykresleno" a měřidlo o nich mlčí — mlčení tam není důkaz pořádku.
//
// Spuštění:
//   node testy/rozvrzeni-sceny.mjs                       … všechny simulace, všechny scény
//   node testy/rozvrzeni-sceny.mjs MagnetyOpakovani      … jedna (stačí kus názvu)
//   node testy/rozvrzeni-sceny.mjs src/components/skola2/ReostatSimulace.astro klik=r-krok
//   node testy/rozvrzeni-sceny.mjs --vynech=MagnetyOpakovani   … přeskočí komponentu
//   node testy/rozvrzeni-sceny.mjs --podrobne            … vypíše i změřené obdélníky
// Argumenty jako `svg=`, `klik=` a `id=hodnota` se předávají náhledu (jen když
// se měří JEDNA komponenta — jinak nemají u které scény platit).
import { readdirSync, readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname, basename, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const nahled = join(koren, 'testy', 'nahled-simulace.mjs');
const slozkaKomponent = join(koren, 'src', 'components', 'skola2');

// ───────────────────────── prahy (kalibrované na 106 nasazených simulacích) ──
const PRAHY = {
	// A) přetečení: o kolik smí prvek vyčnívat mimo viewBox, než je to nález.
	// Nula by hlásila i zaokrouhlení; 0,5 px je pod hranicí viditelnosti.
	prekroceni: 0.5,
	// A) dotyk okraje: prvek, který sedí přímo na okraji (blíž než tohle), je
	// tvrdá chyba — přesně případ rámečku popisku s x="0". Kalibrace na 106
	// nasazených simulacích: zavedený styl webu popisky na okraj neposazuje.
	dotykOkraje: 1.5,
	// A) těsno u okraje: 1,5–4 px je jen VAROVÁNÍ. Osmi- až dvanáctipixelový
	// odstup je sice hezčí, ale web má popisky běžně 5–7 px od kraje a měřidlo
	// nemá překreslovat vkus — hlásí se až to, co je opravdu na hraně.
	odstupOdOkraje: 4,
	// Prvek táhnoucí se přes polovinu plátna (podklad, hladina, zem, stůl, osa,
	// rámeček scény) se okraje TÉ OSY dotýká schválně a jeho obrys se ořezává
	// neviditelně — u něj se v dané ose nehlídá dotyk ani useknutý obrys.
	celoplosnyPodil: 0.5,
	// B) obsah musí zabrat aspoň tolik z šířky/výšky plátna.
	vyplneniSirky: 0.55,
	vyplneniVysky: 0.5,
	// B) střed obsahu se smí od středu plátna odchýlit nejvýš o tolik
	// (podíl z rozměru plátna). 0,5 = obsah nacpaný do rohu.
	posunStredu: 0.16,
	// text: šířka se odhaduje z tabulky písmen (viz sirkaTextu). Odhad se nikdy
	// netrefí přesně, proto se u textu hlásí přetečení až od téhle části jeho
	// vlastní šířky — jinak by měřidlo planilo u každého dlouhého popisku.
	rezervaTextu: 0.07,
	fontSizeVychozi: 14, // když se velikost písma nedá zjistit ze SVG
	// B) plátno se posuzuje až od tolika změřených prvků — u skoro prázdné
	// scény (obsah kreslí animace, kterou náhled nespustí) by šlo o falešný nález
	nejmensiScena: 8,
};

/** Odhad šířky textu v px. Průměr „0,55 × font-size" se u krátkých popisků
 *  mýlí o desítky procent (》„Ep" × „mmm"), proto hrubá tabulka šířek. */
function sirkaTextu(text, fs) {
	let s = 0;
	for (const z of Array.from(text)) { // Array.from = po ZNACÍCH, ne po půlkách emoji
		if (z === ' ') s += 0.28;
		else if ('iljItf.,:;!\'|()[]{}-–·'.includes(z)) s += 0.33;
		else if ('r'.includes(z)) s += 0.38;
		else if ('mw'.includes(z)) s += 0.85;
		else if ('MW@'.includes(z)) s += 0.95;
		else if (z >= 'A' && z <= 'Z') s += 0.68;
		else if (z.codePointAt(0) > 0x2000) s += 1.05; // emoji a značky
		else s += 0.55;
	}
	return s * fs;
}

// ───────────────────────────────────────────────────────── argumenty ─────────
const argv = process.argv.slice(2);
const podrobne = argv.includes('--podrobne');
const varovaniJsouChyby = argv.includes('--varovani-jsou-chyby');
const vynechat = argv.filter((a) => a.startsWith('--vynech=')).map((a) => a.slice(9).toLowerCase());
const proNahled = argv.filter((a) => /^(svg|klik)=/.test(a) || (/^[\w-]+=/.test(a) && !a.startsWith('--')));
const cil = argv.find((a) => !a.startsWith('--') && !a.includes('='));

// ───────────────────────────────────────────── parsování SVG ─────────────────
const ZNACKY_TVARU = new Set(['rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'path', 'text', 'image']);
// obsah těchhle značek NENÍ ve scéně — souřadnice v nich žijí v jiném prostoru
const MIMO_SCENU = new Set(['defs', 'clipPath', 'mask', 'symbol', 'pattern', 'marker', 'linearGradient', 'radialGradient', 'filter', 'metadata', 'title', 'desc', 'style']);

function atributy(text) {
	const a = {};
	// Třetí tvar `x={výraz}` je astro/JSX bez uvozovek. Kdyby se nečetl, atribut by
	// v očích měřidla CHYBĚL a dosadila by se nula — displej micro:bitu se pak
	// „našel" nalepený v levém horním rohu, ačkoli je uprostřed desky.
	for (const m of text.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"|([\w:-]+)\s*=\s*'([^']*)'|([\w:-]+)\s*=\s*(\{[^}]*\})/g)) {
		a[(m[1] ?? m[3] ?? m[5]).toLowerCase()] = m[2] ?? m[4] ?? m[6];
	}
	return a;
}
const cislo = (v, vychozi = 0) => {
	if (v === undefined || v === null || v === '') return vychozi;
	// procenta a astro/JSX výrazy (`x={140 + m * 7}`) neumím spolehlivě → prvek vynechám.
	// Bez tohohle by z výrazu vyšla nula a popisek by se „našel" nalepený na levém
	// okraji, i když ve skutečnosti sedí uprostřed (micro:bit rádio).
	if (/%|[{}]/.test(String(v))) return null;
	const n = Number.parseFloat(v);
	return Number.isFinite(n) ? n : vychozi;
};
function styl(a, jmeno) {
	if (a[jmeno] !== undefined) return a[jmeno];
	const m = (a.style ?? '').match(new RegExp(`(?:^|;)\\s*${jmeno}\\s*:\\s*([^;]+)`));
	return m ? m[1].trim() : undefined;
}

/** transform="translate(a,b) scale(s)" → {dx,dy,sx,sy} nebo null, když si nejsem jistý */
function transformace(t) {
	if (!t) return { dx: 0, dy: 0, sx: 1, sy: 1 };
	if (/rotate|matrix|skew/.test(t)) return null; // otočení bych spočítal špatně → prvek radši vynechám
	let dx = 0, dy = 0, sx = 1, sy = 1;
	for (const m of t.matchAll(/translate\(\s*(-?[\d.]+)[\s,]*(-?[\d.]+)?\s*\)/g)) {
		dx += Number(m[1]); dy += Number(m[2] ?? 0);
	}
	for (const m of t.matchAll(/scale\(\s*(-?[\d.]+)[\s,]*(-?[\d.]+)?\s*\)/g)) {
		sx *= Number(m[1]); sy *= Number(m[2] ?? m[1]);
	}
	return { dx, dy, sx, sy };
}
const slozit = (a, b) => (a && b ? { dx: a.dx + a.sx * b.dx, dy: a.dy + a.sy * b.dy, sx: a.sx * b.sx, sy: a.sy * b.sy } : null);

/** body z `d` cesty. Křivky se VZORKUJÍ (ne přes řídicí body — ty leží mimo
 *  křivku a měřidlo by planilo). Oblouk `A` se bere jen koncovým bodem. */
function bodyCesty(d) {
	const body = [];
	let x = 0, y = 0, zx = 0, zy = 0;
	const kus = (mx, my, cesta) => {
		for (let i = 1; i <= 12; i++) body.push(cesta(i / 12));
		body.push([mx, my]);
	};
	const tokeny = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
	let i = 0, prikaz = '';
	const c = () => Number(tokeny[i++]);
	while (i < tokeny.length) {
		if (/[a-zA-Z]/.test(tokeny[i])) prikaz = tokeny[i++];
		if (i > tokeny.length) break;
		const rel = prikaz === prikaz.toLowerCase();
		const P = prikaz.toUpperCase();
		const zx0 = x, zy0 = y;
		if (P === 'M' || P === 'L' || P === 'T') {
			const a = c(), b = c();
			x = rel ? x + a : a; y = rel ? y + b : b;
			if (P === 'M') { zx = x; zy = y; }
			body.push([x, y]);
		} else if (P === 'H') { const a = c(); x = rel ? x + a : a; body.push([x, y]); }
		else if (P === 'V') { const a = c(); y = rel ? y + a : a; body.push([x, y]); }
		else if (P === 'C' || P === 'S') {
			const n = P === 'C' ? 6 : 4, v = [];
			for (let k = 0; k < n; k++) v.push(c());
			const p = [];
			for (let k = 0; k < n; k += 2) p.push([rel ? zx0 + v[k] : v[k], rel ? zy0 + v[k + 1] : v[k + 1]]);
			const [c1, c2, k] = p.length === 3 ? p : [[zx0, zy0], p[0], p[1]];
			kus(k[0], k[1], (t) => {
				const u = 1 - t;
				return [u ** 3 * zx0 + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t ** 3 * k[0],
					u ** 3 * zy0 + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t ** 3 * k[1]];
			});
			x = k[0]; y = k[1];
		} else if (P === 'Q') {
			const v = [c(), c(), c(), c()];
			const c1 = [rel ? zx0 + v[0] : v[0], rel ? zy0 + v[1] : v[1]];
			const k = [rel ? zx0 + v[2] : v[2], rel ? zy0 + v[3] : v[3]];
			kus(k[0], k[1], (t) => {
				const u = 1 - t;
				return [u * u * zx0 + 2 * u * t * c1[0] + t * t * k[0], u * u * zy0 + 2 * u * t * c1[1] + t * t * k[1]];
			});
			x = k[0]; y = k[1];
		} else if (P === 'A') {
			const v = [c(), c(), c(), c(), c(), c(), c()];
			x = rel ? zx0 + v[5] : v[5]; y = rel ? zy0 + v[6] : v[6];
			body.push([x, y]); // jen koncový bod — raději méně než planý poplach
		} else if (P === 'Z') { x = zx; y = zy; body.push([x, y]); }
		else { i++; } // neznámý příkaz — přeskočit číslo, ať se to nezacyklí
	}
	return body.filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b));
}

/** obdélník prvku v souřadnicích scény, nebo null (nedá se změřit / je neviditelný) */
function obdelnikPrvku(znacka, a, obsahTextu, T) {
	const barvaNic = (v) => v === undefined || v === 'none' || v === 'transparent';
	const fill = styl(a, 'fill');
	const stroke = styl(a, 'stroke');
	const sw = cislo(styl(a, 'stroke-width'), stroke && !barvaNic(stroke) ? 1 : 0) ?? 0;
	// neviditelné prvky se nepočítají
	if (styl(a, 'display') === 'none' || styl(a, 'visibility') === 'hidden') return null;
	const op = cislo(styl(a, 'opacity'), 1);
	if (op !== null && op <= 0.02) return null;
	if (barvaNic(fill) && (barvaNic(stroke) || sw === 0) && znacka !== 'image') return null;
	if (znacka === 'text' && (!obsahTextu || !obsahTextu.trim() || obsahTextu.includes('{'))) return null;

	let body = [];
	// Půlka obrysu se ořízne — právě tohle byla vada u magnetů. Počítá se ale
	// jen u UZAVŘENÝCH tvarů (rámeček, kolečko, mnohoúhelník), kde obrys běží
	// podél okraje a useknutí je vidět. U úsečky, lomené čáry a otevřené cesty,
	// která jen KONČÍ na okraji (paprsek světla), se nic viditelného neořízne —
	// tam by obrys dělal jen plané poplachy (Čočka, Zrcadlo, micro:bit rádio).
	let obrysX = 0, obrysY = 0;
	const uzavreny = ['rect', 'circle', 'ellipse', 'polygon'].includes(znacka) || (znacka === 'path' && /[zZ]/.test(a.d ?? ''));
	if (uzavreny) { obrysX = sw / 2; obrysY = sw / 2; }
	if (znacka === 'rect' || znacka === 'image') {
		const x = cislo(a.x), y = cislo(a.y), w = cislo(a.width), h = cislo(a.height);
		if ([x, y, w, h].some((v) => v === null)) return null;
		body = [[x, y], [x + w, y + h]];
	} else if (znacka === 'circle') {
		const cx = cislo(a.cx), cy = cislo(a.cy), r = cislo(a.r);
		if ([cx, cy, r].some((v) => v === null)) return null;
		body = [[cx - r, cy - r], [cx + r, cy + r]];
	} else if (znacka === 'ellipse') {
		const cx = cislo(a.cx), cy = cislo(a.cy), rx = cislo(a.rx), ry = cislo(a.ry);
		if ([cx, cy, rx, ry].some((v) => v === null)) return null;
		body = [[cx - rx, cy - ry], [cx + rx, cy + ry]];
	} else if (znacka === 'line') {
		const x1 = cislo(a.x1), y1 = cislo(a.y1), x2 = cislo(a.x2), y2 = cislo(a.y2);
		if ([x1, y1, x2, y2].some((v) => v === null)) return null;
		body = [[x1, y1], [x2, y2]];
	} else if (znacka === 'polygon' || znacka === 'polyline') {
		const cisla = (a.points ?? '').match(/-?[\d.]+/g)?.map(Number) ?? [];
		for (let i = 0; i + 1 < cisla.length; i += 2) body.push([cisla[i], cisla[i + 1]]);
		if (!body.length) return null;
	} else if (znacka === 'path') {
		body = bodyCesty(a.d ?? '');
		if (!body.length) return null;
	} else if (znacka === 'text') {
		const fs = cislo(styl(a, 'font-size'), PRAHY.fontSizeVychozi) ?? PRAHY.fontSizeVychozi;
		const x = cislo(a.x), y = cislo(a.y);
		if (x === null || y === null) return null;
		const delka = sirkaTextu(obsahTextu.trim(), fs);
		const kotva = styl(a, 'text-anchor') ?? 'start';
		const x0 = kotva === 'middle' ? x - delka / 2 : kotva === 'end' ? x - delka : x;
		body = [[x0, y - fs * 0.78], [x0 + delka, y + fs * 0.24]];
	} else return null;

	if (!T) return null; // rotace/matrix — prvek neumím spolehlivě umístit
	let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
	for (const [bx, by] of body) {
		const X = T.dx + T.sx * bx, Y = T.dy + T.sy * by;
		x1 = Math.min(x1, X); y1 = Math.min(y1, Y); x2 = Math.max(x2, X); y2 = Math.max(y2, Y);
	}
	if (![x1, y1, x2, y2].every(Number.isFinite)) return null;
	// Prvek bez rozměru je NEVYKRESLENÁ zástupka: ve zdroji sedí v počátku a
	// souřadnice mu dopisuje až animace, kterou náhled nespouští (vodítko vlnění,
	// paprsky zrcadla). Měřit ho jako „přetéká vlevo" je planý poplach.
	if (x2 - x1 < 0.01 && y2 - y1 < 0.01) return null;
	// Totéž z druhé strany: tvar VYSTŘEDĚNÝ přesně na počátek [0,0] je zástupka,
	// kterou posouvá až animace (kulička vlnění). Žádné rozvržení nekreslí těleso
	// naschvál středem přesně do rohu plátna, takže se tím nic skutečného nezakryje.
	if (Math.abs(x1 + x2) < 0.01 && Math.abs(y1 + y2) < 0.01) return null;
	return { x1, y1, x2, y2, ox: obrysX * Math.abs(T.sx), oy: obrysY * Math.abs(T.sy), text: znacka === 'text', otevreny: !uzavreny && znacka !== 'text' };
}

/** projde SVG a vrátí { viewBox, prvky[] } */
function zmerScenu(svg) {
	const hlavicka = svg.match(/<svg[^>]*>/)[0];
	const va = atributy(hlavicka);
	let vb;
	const c = (va.viewbox ?? '').trim().split(/[\s,]+/).map(Number);
	if (c.length === 4 && c.every(Number.isFinite)) vb = { x: c[0], y: c[1], w: c[2], h: c[3] };
	else {
		const w = cislo(va.width), h = cislo(va.height);
		if (!w || !h) return null;
		vb = { x: 0, y: 0, w, h };
	}
	const prvky = [];
	const zasobnik = [{ dx: 0, dy: 0, sx: 1, sy: 1 }];
	let mimoScenuHloubka = 0;
	const znacky = /<(\/?)([A-Za-z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
	let m;
	while ((m = znacky.exec(svg)) !== null) {
		const zavirace = m[1] === '/';
		const znacka = m[2];
		const telo = m[3] ?? '';
		const samostatna = /\/\s*$/.test(telo) || /\/[^"']*$/.test(telo.replace(/"[^"]*"|'[^']*'/g, ''));
		if (MIMO_SCENU.has(znacka)) { mimoScenuHloubka += zavirace ? -1 : samostatna ? 0 : 1; continue; }
		if (mimoScenuHloubka > 0) continue;
		if (znacka === 'svg') continue;
		if (znacka === 'g' || znacka === 'a' || znacka === 'switch') {
			if (zavirace) { if (zasobnik.length > 1) zasobnik.pop(); }
			else if (!samostatna) {
				const a = atributy(telo);
				const nadrazeny = zasobnik[zasobnik.length - 1];
				const skryta = styl(a, 'display') === 'none' || styl(a, 'visibility') === 'hidden' || (cislo(styl(a, 'opacity'), 1) ?? 1) <= 0.02;
				zasobnik.push(skryta ? null : slozit(nadrazeny, transformace(a.transform)));
			}
			continue;
		}
		if (zavirace || !ZNACKY_TVARU.has(znacka)) continue;
		const a = atributy(telo);
		let obsah = '';
		if (znacka === 'text') {
			const konec = svg.indexOf('</text>', znacky.lastIndex);
			obsah = konec === -1 ? '' : svg.slice(znacky.lastIndex, konec).replace(/<[^>]*>/g, '').replace(/&[a-z]+;|&#\d+;/g, 'x').trim();
			if (konec !== -1) znacky.lastIndex = konec; // tspany se nepočítají zvlášť
		}
		const T = slozit(zasobnik[zasobnik.length - 1], transformace(a.transform));
		const r = obdelnikPrvku(znacka, a, obsah, T);
		if (r) prvky.push({ znacka, id: a.id, popis: obsah.slice(0, 24), ...r });
	}
	return { vb, prvky };
}

// ───────────────────────────────────────────── vlastní kontroly ──────────────
function zkontroluj(svg, jmenoSceny) {
	const s = zmerScenu(svg);
	// Bez viewBoxu a rozměrů nevím, kde je okraj — to není nález, to je nezměřená scéna.
	if (!s) return { chyby: [], varovani: [], pocet: 0, nezmereno: `${jmenoSceny}: <svg> nemá viewBox ani rozměry — nedá se změřit` };
	const { vb, prvky } = s;
	const chyby = [], varovani = [];
	const podklad = (p) => (p.x2 - p.x1) >= vb.w * 0.95 && (p.y2 - p.y1) >= vb.h * 0.95;
	const jm = (p) => `<${p.znacka}${p.id ? ` id="${p.id}"` : ''}${p.popis ? ` „${p.popis}"` : ''}>`;
	const okr = (n) => Math.round(n * 10) / 10;

	// A) přetečení a dotyk okraje
	for (const p of prvky) {
		// „Táhne se přes půl plátna" se posuzuje po OSÁCH: zem přes celou šířku
		// smí sedět na levém i pravém kraji, ale ne na spodním o nic víc než ostatní.
		const siroky = (p.x2 - p.x1) >= vb.w * PRAHY.celoplosnyPodil;
		const vysoky = (p.y2 - p.y1) >= vb.h * PRAHY.celoplosnyPodil;
		// Pruh přes CELOU šířku (nebo výšku) je podklad scény — nebe, zem, hladina,
		// stůl, podzemí. Ten se okrajů drží schválně ve VŠECH směrech a jeho obrys
		// se ořezává neviditelně (Hydrostatika, Kladka, Tření, Nakloněná rovina…).
		const pruh = (p.x2 - p.x1) >= vb.w * 0.95 || (p.y2 - p.y1) >= vb.h * 0.95;
		const ox = siroky || pruh ? 0 : p.ox, oy = vysoky || pruh ? 0 : p.oy;
		// u textu se rezerva na nepřesnost odhadu šířky odečte z OBOU stran,
		// aby se neshodná čísla nepřelila do měření vzdálenosti od okraje
		const r = p.text ? (p.x2 - p.x1) * PRAHY.rezervaTextu : 0;
		// svislý odhad textu (účaří ± výška písma) je hrubší než vodorovný
		const rv = p.text ? 2 : 0;
		const okraje = [
			['vlevo', vb.x - (p.x1 + r - ox), p.x1 + r - vb.x, siroky || pruh || p.otevreny],
			['vpravo', (p.x2 - r + ox) - (vb.x + vb.w), vb.x + vb.w - (p.x2 - r), siroky || pruh || p.otevreny],
			['nahoře', vb.y - (p.y1 + rv - oy), p.y1 + rv - vb.y, vysoky || pruh || p.otevreny],
			['dole', (p.y2 - rv + oy) - (vb.y + vb.h), vb.y + vb.h - (p.y2 - rv), vysoky || pruh || p.otevreny],
		];
		const ven = okraje.filter(([, o]) => o > PRAHY.prekroceni);
		if (ven.length) {
			chyby.push(`${jmenoSceny}: ${jm(p)} přetéká plátno ${ven.map(([k, o]) => `${k} o ${okr(o)} px`).join(', ')} `
				+ `— obdélník [${okr(p.x1)}, ${okr(p.y1)}]–[${okr(p.x2)}, ${okr(p.y2)}]${p.ox || p.oy ? ` (+ obrys ${okr(Math.max(p.ox, p.oy))} px)` : ''}, viewBox ${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
			continue;
		}
		const uOkraje = okraje.filter(([, , d, vyjimka]) => !vyjimka && d < PRAHY.odstupOdOkraje);
		const sedi = uOkraje.filter(([, , d]) => d < PRAHY.dotykOkraje);
		if (sedi.length) {
			chyby.push(`${jmenoSceny}: ${jm(p)} sedí na okraji plátna (${sedi.map(([k, , d]) => `${k} ${okr(d)} px`).join(', ')}) `
				+ `— obdélník [${okr(p.x1)}, ${okr(p.y1)}]–[${okr(p.x2)}, ${okr(p.y2)}], viewBox ${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
		} else if (uOkraje.length) {
			varovani.push(`${jmenoSceny}: ${jm(p)} je těsně u okraje (${uOkraje.map(([k, , d]) => `${k} ${okr(d)} px`).join(', ')}, doporučený odstup ${PRAHY.odstupOdOkraje}+ px)`);
		}
	}

	// B) nevyužité plátno
	const obsah = prvky.filter((p) => !podklad(p));
	if (obsah.length >= PRAHY.nejmensiScena) {
		const x1 = Math.min(...obsah.map((p) => p.x1)), x2 = Math.max(...obsah.map((p) => p.x2));
		const y1 = Math.min(...obsah.map((p) => p.y1)), y2 = Math.max(...obsah.map((p) => p.y2));
		const sirka = (x2 - x1) / vb.w, vyska = (y2 - y1) / vb.h;
		const posunX = ((x1 + x2) / 2 - (vb.x + vb.w / 2)) / vb.w;
		const posunY = ((y1 + y2) / 2 - (vb.y + vb.h / 2)) / vb.h;
		const p1 = (n) => `${Math.round(n * 100)} %`;
		if (sirka < PRAHY.vyplneniSirky) varovani.push(`${jmenoSceny}: obsah zabírá jen ${p1(sirka)} šířky plátna (x ${okr(x1)}–${okr(x2)} z ${vb.w}) — zbytek zeje prázdnotou`);
		if (vyska < PRAHY.vyplneniVysky) varovani.push(`${jmenoSceny}: obsah zabírá jen ${p1(vyska)} výšky plátna (y ${okr(y1)}–${okr(y2)} z ${vb.h})`);
		if (Math.abs(posunX) > PRAHY.posunStredu) varovani.push(`${jmenoSceny}: obsah je natlačený ${posunX < 0 ? 'doleva' : 'doprava'} — střed obsahu je o ${p1(Math.abs(posunX))} šířky mimo střed plátna (x ${okr(x1)}–${okr(x2)} z ${vb.w})`);
		if (Math.abs(posunY) > PRAHY.posunStredu) varovani.push(`${jmenoSceny}: obsah je natlačený ${posunY < 0 ? 'nahoru' : 'dolů'} — střed obsahu je o ${p1(Math.abs(posunY))} výšky mimo střed plátna (y ${okr(y1)}–${okr(y2)} z ${vb.h})`);
		if (podrobne) console.log(`   ${jmenoSceny}: ${prvky.length} prvků, obsah [${okr(x1)}, ${okr(y1)}]–[${okr(x2)}, ${okr(y2)}], plátno ${vb.w}×${vb.h}`);
	}
	return { chyby, varovani, pocet: prvky.length };
}

// ───────────────────────────────────────────── běh nad komponentami ──────────
function komponenty() {
	// cesta ke konkrétnímu souboru (i mimo repo — tak se měří podvrh ve /tmp)
	if (cil && cil.includes('/') && existsSync(isAbsolute(cil) ? cil : join(process.cwd(), cil))) return null;
	const vse = readdirSync(slozkaKomponent).filter((f) => f.endsWith('Simulace.astro')).sort();
	let vybrane = vse;
	if (cil) {
		const c = basename(cil).toLowerCase();
		vybrane = vse.filter((f) => f.toLowerCase() === c || f.toLowerCase().includes(c.replace(/simulace\.astro$/, '')));
		if (!vybrane.length) {
			console.error(`❌ Komponenta „${cil}" ve složce ${slozkaKomponent} není.`);
			process.exit(1);
		}
	}
	return vybrane.filter((f) => !vynechat.some((v) => f.toLowerCase().includes(v)));
}

const docasna = mkdtempSync(join(tmpdir(), 'rozvrzeni-'));
const zeSlozky = komponenty();
const primaCesta = zeSlozky === null ? (isAbsolute(cil) ? cil : join(process.cwd(), cil)) : null;
const seznam = zeSlozky ?? [basename(primaCesta)];
const jednaKomponenta = seznam.length === 1;
let chyby = [], varovani = [], scen = 0, prvkuCelkem = 0, nevykresleno = [];

for (const soubor of seznam) {
	const cesta = primaCesta ?? join(slozkaKomponent, soubor);
	const zdroj = readFileSync(cesta, 'utf8');
	const pocetScen = (zdroj.match(/<svg[\s\S]*?<\/svg>/g) ?? []).length;
	if (!pocetScen) { nevykresleno.push(`${soubor}: žádná značka <svg>`); continue; }
	const volbaSceny = jednaKomponenta && proNahled.some((a) => a.startsWith('svg='));
	const scenyKMereni = volbaSceny ? [null] : Array.from({ length: pocetScen }, (_, i) => i + 1);
	for (const n of scenyKMereni) {
		const vystup = join(docasna, `${soubor}-${n ?? 'volba'}.svg`);
		const args = [nahled, cesta, vystup, ...(n === null ? [] : [`svg=${n}`]), ...(jednaKomponenta ? proNahled.filter((a) => n === null || !a.startsWith('svg=')) : [])];
		const r = spawnSync(process.execPath, args, { encoding: 'utf8', timeout: 20000 });
		if (r.status !== 0 || r.error) {
			nevykresleno.push(`${soubor} (scéna ${n ?? '?'}): náhled skončil chybou — ${(r.stderr ?? String(r.error ?? '')).split('\n').filter(Boolean).slice(-1)[0] ?? 'bez hlášky'}`);
			continue;
		}
		let svg;
		try { svg = readFileSync(vystup, 'utf8'); } catch { nevykresleno.push(`${soubor} (scéna ${n}): náhled nic nezapsal`); continue; }
		const v = zkontroluj(svg, `${soubor.replace('.astro', '')} scéna ${n ?? proNahled.find((a) => a.startsWith('svg=')) ?? 1}`);
		if (v.nezmereno) { nevykresleno.push(v.nezmereno); continue; }
		scen++; prvkuCelkem += v.pocet;
		chyby.push(...v.chyby); varovani.push(...v.varovani);
	}
}
rmSync(docasna, { recursive: true, force: true });

console.log(`Rozvržení scén: ${seznam.length} komponent, ${scen} scén, ${prvkuCelkem} změřených prvků.`);
for (const n of nevykresleno) console.log(`   ⚠️  nevykresleno — ${n}`);
for (const v of varovani) console.log(`   ⚠️  ${v}`);
for (const c of chyby) console.log(`   ❌ ${c}`);
console.log(`Tvrdých chyb (přetečení/dotyk okraje): ${chyby.length} · varování (nevyužité plátno): ${varovani.length}`);

// Falešná nula: když se nezměřil ani jeden prvek, není to „vše v pořádku".
if (!scen || !prvkuCelkem) {
	console.log('❌ Nezměřil se ANI JEDEN prvek — to není čistý výsledek, to je rozbité měřidlo.');
	process.exit(1);
}
if (chyby.length || (varovaniJsouChyby && varovani.length)) process.exit(1);
console.log('✅ Rozvržení scén v pořádku.');
process.exit(0);
