#!/usr/bin/env node
// TEST HRY „Magnetická výzva“ (Magnety a magnetické pole, F9).
// Data karet a scény se nečtou regexy, ale skutečně se spustí frontmatter komponenty (esbuild),
// takže test kontroluje to, co se opravdu vykreslí. Kontroly jsou OBECNÉ (z dat karet),
// ne seznamy ušité na současné karty:
//  - každá karta má právě jednu oporu doslova ve výkladu; žádné dvě opory nejsou ze stejného
//    odstavce/odrážky výkladu a žádné dvě otázky ani opory nejsou zrcadlové (podobnost kmenů),
//  - klíčové výrazy otázky = kmeny slov, které nemá žádná jiná otázka; každá otázka aspoň jeden,
//    žádné odhalení (nápis + vysvětlení) ani scéna jiné karty je neobsahuje, ani oporu jiné karty,
//  - scéna před odhalením neobsahuje text odpovědi ani obrys pole,
//  - geometrie SVG: texty uvnitř plátna, odstup ≥ 8 px od ostatních textů a tvarů, kontrast
//    ≥ 4,5 proti skutečnému tvaru pod textem; kontrast CSS proti #f7f4ec a bílým kartám,
//  - A/B právě jedna odpověď, nikdy 3× stejně za sebou ani přes hranici kol; reduced-motion.
// Podvrh komponenty lze předat přes HRA_KOMPONENTA=<cesta>. Mutační podvrhy se zapisují do
// HRA_MUTACE_DIR (výchozí dočasná složka systému) a každý musí shodit konkrétní kontrolu.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaKomponenty = process.env.HRA_KOMPONENTA || join(koren, 'src/components/hry/HraMagnetyOpakovani.astro');
const cestaPdf = '/tmp/codex-hry/pdf-text/9-magnety-opakovani.txt';
// Citace zdroje (krátké úryvky z PDF 9) jsou v repu; celý text PDF se nezveřejňuje.
const cestaZdroju = join(koren, 'testy/zdroje/magnety-opakovani-zdroj.json');
const zdroj = readFileSync(cestaKomponenty, 'utf8');
let pdf = null;
try { pdf = readFileSync(cestaPdf, 'utf8'); } catch { /* PDF text mimo repo nemusí být k dispozici (Cloudflare) */ }
const zdroje = JSON.parse(readFileSync(cestaZdroju, 'utf8'));

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

// ---------- 1. Skutečná data komponenty ----------
const frontmatter = zdroj.split(/^---$/m)[1] ?? '';
const js = transformSync(`${frontmatter}\nexport { KOLA, scenyHtml };`, { loader: 'ts', format: 'esm', logLevel: 'silent' }).code;
const { KOLA: kola, scenyHtml } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const karty = kola.flatMap((k) => k.karty);

ok(kola.length === 3, `3 kola (jsou ${kola.length})`);
ok(karty.length === 15, `celkem 15 karet (je ${karty.length})`);
for (const kolo of kola) ok(kolo.karty.length === 5, `kolo ${kolo.cislo}: 5 karet (je ${kolo.karty.length})`);
ok(kola[0]?.body === 1 && kola[1]?.body === 1 && kola[2]?.body === 2, 'kola 1 a 2 za 1 bod, finále za 2 body');
ok(new Set(karty.map((k) => k.id)).size === karty.length, 'id karet jsou jedinečná');
ok(new Set(karty.map((k) => k.scena)).size === karty.length, 'každá karta má vlastní scénu');
ok(!karty.some((k) => /spravn|-(?:ano|ne|a|b)(?:-|$)/i.test(k.id)),'vnitřní id neprozrazují správnou odpověď');

// ---------- 2. Právě jedna správná odpověď, A/B rozložení ----------
const blokKol = zdroj.slice(zdroj.indexOf('const KOLA'), zdroj.indexOf('const karty'));
const pocetKlicu = (klic) => (blokKol.match(new RegExp(`\\b${klic}:`, 'g')) ?? []).length;
ok(pocetKlicu('spravne') === karty.length, `právě jedna správná odpověď: u každé karty právě jeden údaj spravne (${pocetKlicu('spravne')} na ${karty.length} karet)`);
ok(pocetKlicu('opora') === karty.length, `každá karta má právě jednu oporu (${pocetKlicu('opora')} na ${karty.length} karet)`);
for (const k of karty) {
	ok(k.spravne === 'A' || k.spravne === 'B', `${k.id}: správná odpověď je A, nebo B`);
	const ano = k.spravne === 'A';
	ok(k.napis.startsWith(ano ? 'ANO · ' : 'NE · ') && k.proc.startsWith(ano ? 'Ano. ' : 'Ne. '), `${k.id}: nápis i vysvětlení odpovídají právě jedné správné možnosti (${ano ? 'ANO' : 'NE'})`);
}
for (const kolo of kola) {
	ok(kolo.moznosti.A.popis === 'ANO' && kolo.moznosti.B.popis === 'NE', `kolo ${kolo.cislo}: A = ANO, B = NE`);
	const a = kolo.karty.filter((k) => k.spravne === 'A').length;
	const b = kolo.karty.length - a;
	ok(a >= 2 && b >= 2, `kolo ${kolo.cislo}: A i B aspoň 2× (A ${a}, B ${b})`);
}
const rada = karty.map((k) => k.spravne).join('');
ok(!/(AAA|BBB)/.test(rada), `nikde ani přes hranici kol nejsou tři stejné správné odpovědi za sebou (${rada})`);
const nejdelsiStridani = [...rada].reduce((s, x, i) => { const d = i && x !== rada[i - 1] ? s.d + 1 : 1; return { d, max: Math.max(s.max, d) }; }, { d: 0, max: 0 }).max;
ok(nejdelsiStridani < 5, `odpovědi nemají pravidelné střídání ABAB… delší než 4 karty ani přes hranici kol (nejdelší ${nejdelsiStridani})`);
ok(kola.reduce((s, k) => s + k.karty.length * k.body, 0) === 20, 'maximum bodů je 20');

// ---------- 3. Opory doslova ve výkladu, každá z jiného odstavce/odrážky ----------
const { temata } = await nactiData();
let obsah = '';
for (const tema of temata['fyzika/9-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'magnety-magneticke-pole-opakovani') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Magnety a magnetické pole nalezen v temata.ts');
const nahtml = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/ ([.,;:!?)])/g, '$1').replace(/\( /g, '(').trim();
const bloky = [...obsah.matchAll(/<(p|li|figcaption|h2|h3)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => nahtml(m[2]));
const textVykladu = bloky.join(' ');
const bezDiakritiky = (s) => s.toLocaleLowerCase('cs').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['jsou', 'nebo', 'jaky', 'jaka', 'jake', 'kdyz', 'bude', 'budou', 'mezi', 'pred', 'ktery', 'ktera', 'ktere',
	'proto', 'take', 'neni', 'jeho', 'jeji', 'jejich', 'tato', 'tento', 'toto', 'nimi', 'nich', 'jako', 'tedy', 'vsak', 'takze',
	'podle', 'proti', 'muze', 'mohou', 'maji', 'mit', 'jsme', 'byla', 'bylo', 'byly', 'tady', 'zde', 'tam', 'jine', 'jiny', 'velke', 'velka', 'mire']);
const kmeny = (s) => new Set(bezDiakritiky(s).split(' ').filter((w) => w.length >= 4 && !STOP.has(w)).map((w) => w.slice(0, 5)));
const jaccard = (a, b) => { const u = new Set([...a, ...b]); return u.size ? [...a].filter((x) => b.has(x)).length / u.size : 0; };

const blokyOpory = new Map();
for (const k of karty) {
	const opora = String(k.opora ?? '');
	const kde = bloky.map((b, i) => (b.includes(opora) ? i : -1)).filter((i) => i >= 0);
	blokyOpory.set(k.id, kde);
	ok(typeof k.opora === 'string' && opora.length >= 12 && kde.length > 0, `${k.id}: opora doslova ve výkladu („${opora.slice(0, 60)}“)`);
}
const stejnyBlok = [];
const zrcadla = [];
for (let i = 0; i < karty.length; i++) for (let j = i + 1; j < karty.length; j++) {
	const [x, y] = [karty[i], karty[j]];
	const spolecne = blokyOpory.get(x.id).filter((b) => blokyOpory.get(y.id).includes(b));
	if (spolecne.length) stejnyBlok.push(`${x.id} × ${y.id}`);
	const jo = jaccard(kmeny(x.otazka), kmeny(y.otazka));
	const jp = jaccard(kmeny(x.opora), kmeny(y.opora));
	if (jo >= 0.6 || jp >= 0.5) zrcadla.push(`${x.id} × ${y.id} (otázky ${jo.toFixed(2)}, opory ${jp.toFixed(2)})`);
}
ok(stejnyBlok.length === 0, `žádné dvě karty nemají oporu ze stejného odstavce/odrážky výkladu${stejnyBlok.length ? ` (${stejnyBlok.join('; ')})` : ''}`);
ok(zrcadla.length === 0, `žádné dvě karty nejsou zrcadlové (podobnost kmenů otázek < 0,6 a opor < 0,5)${zrcadla.length ? ` (${zrcadla.join('; ')})` : ''}`);
ok(new Set(karty.map((k) => bezDiakritiky(k.opora))).size === karty.length, 'žádné dvě karty nemají stejnou oporu');

const cislaPovolena = new Set([...(textVykladu.match(/\d+/g) ?? [])]);
for (const k of karty) for (const n of `${k.otazka} ${k.napis} ${k.proc}`.match(/\d+/g) ?? []) ok(cislaPovolena.has(n), `${k.id}: číslo ${n} je ve výkladu`);

// ---------- 4. Klíčové výrazy a úniky mezi kartami ----------
const kmenyOtazek = karty.map((k) => kmeny(k.otazka));
const klicove = new Map(karty.map((k, i) => [k.id, [...kmenyOtazek[i]].filter((s) => kmenyOtazek.every((m, j) => j === i || !m.has(s)))]));
for (const k of karty) ok(klicove.get(k.id).length > 0, `${k.id}: otázka má aspoň jeden klíčový výraz (${klicove.get(k.id).join(', ') || 'žádný'})`);

// Vrstvy odhalení (<g data-odhal …>) obsahují jen tvary bez vnořených skupin; „před“ = scéna bez nich.
const vrstvaOdhaleni = /<g data-odhal="1"[^>]*>[\s\S]*?<\/g>/g;
const casti = new Map(karty.map((k) => {
	const svg = scenyHtml[k.id] ?? '';
	return [k.id, { pred: svg.replace(vrstvaOdhaleni, ''), po: (svg.match(vrstvaOdhaleni) ?? []).join('') }];
}));
const textyVSvg = (svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ');
const uniky = [];
const unikyScen = [];
for (const x of karty) {
	const odhaleni = `${x.napis} ${x.proc} ${textyVSvg(casti.get(x.id).po)}`;
	const kmenyOdhaleni = kmeny(odhaleni);
	const kmenySceny = kmeny(textyVSvg(casti.get(x.id).pred));
	for (const y of karty) {
		if (y.id === x.id) continue;
		for (const s of klicove.get(y.id)) {
			if (kmenyOdhaleni.has(s)) uniky.push(`${x.id} → ${y.id}: „${s}…“`);
			if (kmenySceny.has(s)) unikyScen.push(`scéna ${x.id} → ${y.id}: „${s}…“`);
		}
		if (bezDiakritiky(odhaleni).includes(bezDiakritiky(y.opora))) uniky.push(`${x.id} → ${y.id}: opora`);
	}
}
ok(uniky.length === 0, `žádné odhalení neobsahuje oporu ani klíčový výraz otázky jiné karty${uniky.length ? ` (${uniky.join('; ')})` : ''}`);
ok(unikyScen.length === 0, `žádná scéna neobsahuje klíčový výraz otázky jiné karty${unikyScen.length ? ` (${unikyScen.join('; ')})` : ''}`);
for (const kolo of kola) {
	const verejne = bezDiakritiky(`${kolo.nazev} ${kolo.pravidlo}`);
	ok(!karty.some((k) => verejne.includes(bezDiakritiky(k.opora))), `kolo ${kolo.cislo}: název ani pravidlo neobsahují oporu karty`);
}

// ---------- 5. Scény před odhalením ukazují jen zadání ----------
const bigramy = (s) => { const w = bezDiakritiky(s).split(' ').filter(Boolean); return w.length === 1 ? w : w.slice(1).map((x, i) => `${w[i]} ${x}`); };
for (const k of karty) {
	const { pred, po } = casti.get(k.id);
	ok(pred.length > 200 && po.includes(k.napis), `${k.id}: scéna existuje a nápis odpovědi je až ve skryté vrstvě`);
	ok(/<animate(?:Transform)?\b/.test(pred), `${k.id}: scéna obsahuje inline SMIL animaci`);
	const textPred = textyVSvg(pred);
	const odpoved = k.napis.split(' · ')[1] ?? '';
	const bigramyOtazky = new Set(bigramy(k.otazka));
	const prozrazene = bigramy(odpoved).filter((b) => !bigramyOtazky.has(b) && ` ${bezDiakritiky(textPred)} `.includes(` ${b} `));
	ok(!/(?:^|\s)(?:ANO|NE)(?:\s|$)/.test(textPred) && prozrazene.length === 0, `${k.id}: scéna před odhalením neobsahuje text odpovědi${prozrazene.length ? ` (${prozrazene.join(', ')})` : ''}`);
	ok(!/<ellipse\b[^>]*fill="none"/.test(pred) && !/<animateMotion\b/.test(pred), `${k.id}: scéna před odhalením nekreslí obrys pole ani pohyb po dráze`);
}
const vsechnySceny = Object.values(scenyHtml).join('\n');
const odhaly = [...vsechnySceny.matchAll(/<g\s+data-odhal="1"[^>]*>/g)].map((m) => m[0]);
const vrstvyOdhaleni = vsechnySceny.match(vrstvaOdhaleni) ?? [];
ok(odhaly.length >= karty.length && odhaly.every((tag) => /opacity="0"/.test(tag) && /aria-hidden="true"/.test(tag)), `všechny vrstvy odpovědi (data-odhal, ${odhaly.length}) mají do odhalení opacity 0 a jsou skryté čtečce`);
ok(vrstvyOdhaleni.length === odhaly.length && vrstvyOdhaleni.every((v) => !/<g\b/.test(v.slice(3))), 'vrstvy odpovědi nemají vnořené skupiny (celý obsah se skrývá a odhaluje najednou)');
const predy = [...vsechnySceny.matchAll(/<g\s+data-pred="1"[^>]*>/g)].map((m) => m[0]);
ok(predy.every((tag) => /opacity="1"/.test(tag)) && /\[data-pred\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '0'\)\)/.test(zdroj) && /\[data-pred\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(zdroj), `vrstvy zadání (data-pred, ${predy.length}) se při odhalení skryjí a u nové karty znovu ukážou`);
for (const k of karty) {
	const animacePo = [...casti.get(k.id).po.matchAll(/<animate(?:Transform)?\b[^>]*attributeName="(?:transform|opacity|fill-opacity)"[^>]*values="([^"]*)"/g)].map((m) => m[1].split(';'));
	ok(animacePo.every((v) => v[0].trim() === v[v.length - 1].trim()), `${k.id}: animace po odhalení začínají konečným stavem (reduced-motion ukáže výsledek)`);
}
ok(/setAttribute\('opacity', '1'\)[\s\S]{0,100}setAttribute\('aria-hidden', 'false'\)/.test(zdroj), 'při odhalení se nápis ukáže i čtečce');
ok(/setAttribute\('opacity', '0'\)[\s\S]{0,100}setAttribute\('aria-hidden', 'true'\)/.test(zdroj), 'při nové kartě se nápis skryje i čtečce');
ok(!/attributeName="(?:display|visibility)"/.test(zdroj), 'tělesa se během animace neskrývají');

// ---------- 6. Geometrie a kontrast SVG ----------
const rgb = (hex) => {
	const h = hex.replace('#', '').toLowerCase();
	const plna = h.length === 3 ? [...h].map((x) => x + x).join('') : h;
	return plna.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16) / 255);
};
const JMENA = { white: '#ffffff', black: '#000000' };
const hexBarva = (b) => (JMENA[b] ?? b);
const jas = (hex) => rgb(hexBarva(hex)).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)).reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
const kontrast = (a, b) => { const [s, t] = [jas(a), jas(b)].sort((x, y) => y - x); return (s + 0.05) / (t + 0.05); };
const atributy = (s) => Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const cislo = (a, k, v = 0) => (a[k] === undefined ? v : Number(a[k]));
const ODSTUP = 8;

// Křivka <path>: příkazy M/L/H/V/C/S/Q/T/A/Z (absolutní i relativní) → lomené čáry (Bézierovy křivky
// navzorkované po 24 krocích, oblouk A jako úsečka ke koncovému bodu). Vrací seznam podcest (pole bodů).
function lomeneCary(d) {
	const tok = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) ?? [];
	const podcesty = [];
	let body = [];
	let [x, y, sx, sy] = [0, 0, 0, 0];
	let prikaz = '';
	let i = 0;
	const n = () => Number(tok[i++]);
	const bez = (b) => { for (let t = 1; t <= 24; t++) { const u = t / 24; const v = 1 - u; body.push(b.length === 3 ? [v * v * b[0][0] + 2 * v * u * b[1][0] + u * u * b[2][0], v * v * b[0][1] + 2 * v * u * b[1][1] + u * u * b[2][1]] : [v ** 3 * b[0][0] + 3 * v * v * u * b[1][0] + 3 * v * u * u * b[2][0] + u ** 3 * b[3][0], v ** 3 * b[0][1] + 3 * v * v * u * b[1][1] + 3 * v * u * u * b[2][1] + u ** 3 * b[3][1]]); } };
	while (i < tok.length) {
		if (/[a-z]/i.test(tok[i])) prikaz = tok[i++];
		const rel = prikaz === prikaz.toLowerCase();
		const [ox, oy] = rel ? [x, y] : [0, 0];
		switch (prikaz.toUpperCase()) {
			case 'M': if (body.length > 1) podcesty.push(body); x = ox + n(); y = oy + n(); [sx, sy] = [x, y]; body = [[x, y]]; prikaz = rel ? 'l' : 'L'; break;
			case 'L': case 'T': x = ox + n(); y = oy + n(); body.push([x, y]); break;
			case 'H': x = (rel ? x : 0) + n(); body.push([x, y]); break;
			case 'V': y = (rel ? y : 0) + n(); body.push([x, y]); break;
			case 'C': { const b = [[x, y], [ox + n(), oy + n()], [ox + n(), oy + n()], [ox + n(), oy + n()]]; bez(b); [x, y] = b[3]; break; }
			case 'S': case 'Q': { const b = [[x, y], [ox + n(), oy + n()], [ox + n(), oy + n()]]; bez(b); [x, y] = b[2]; break; }
			case 'A': i += 5; x = ox + n(); y = oy + n(); body.push([x, y]); break;
			case 'Z': body.push([sx, sy]); [x, y] = [sx, sy]; break;
			default: i++;
		}
	}
	if (body.length > 1) podcesty.push(body);
	return podcesty;
}
const vzdalenostUsecky = (a, b, box) => { let d = Infinity; for (let t = 0; t <= 1.0001; t += 0.05) d = Math.min(d, vzdalenostBodu(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, box)); return d; };
const uvnitrMnohouhelniku = ([px, py], body) => { let v = false; for (let i = 0, j = body.length - 1; i < body.length; j = i++) { const [xi, yi] = body[i]; const [xj, yj] = body[j]; if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) v = !v; } return v; };

function prvkySvg(svg) {
	const bezDefs = svg.replace(/<defs>[\s\S]*?<\/defs>/g, '');
	const prvky = [];
	const skupiny = [];
	for (const m of bezDefs.matchAll(/<(\/?)(g|rect|circle|ellipse|line|path|text)\b([^>]*?)(\/?)>(?:([^<]*)<\/text>)?/g)) {
		const [, zav, tag, attr, samo, obsahTextu] = m;
		if (tag === 'g') { if (zav) skupiny.pop(); else if (!samo) skupiny.push(atributy(attr)); continue; }
		if (zav) continue;
		const a = { ...Object.assign({}, ...skupiny.map((g) => ({ fill: g.fill, stroke: g.stroke, 'stroke-width': g['stroke-width'] }))), ...atributy(attr) };
		for (const k of Object.keys(a)) if (a[k] === undefined) delete a[k];
		const za = bezDefs.slice(m.index + m[0].length, m.index + m[0].length + 160);
		const animujeKryti = !samo && tag !== 'text' && /^\s*<animate\b[^>]*attributeName="(?:opacity|fill-opacity)"/.test(za);
		// Vrstva: „pred“ = vidět jen do odhalení, „po“ = jen po odhalení, „obe“ = stále.
		const vrstva = skupiny.some((g) => g['data-odhal']) ? 'po' : skupiny.some((g) => g['data-pred']) ? 'pred' : 'obe';
		prvky.push({ tag, a, text: obsahTextu, animujeKryti, vrstva });
	}
	return prvky;
}
function obdelnik(p) {
	const a = p.a;
	if (p.tag === 'text') {
		const fs = cislo(a, 'font-size', 16);
		const sirka = [...p.text].length * fs * (Number(a['font-weight'] ?? 400) >= 600 ? 0.62 : 0.56);
		const x = cislo(a, 'x');
		const x1 = a['text-anchor'] === 'middle' ? x - sirka / 2 : a['text-anchor'] === 'end' ? x - sirka : x;
		return { x1, y1: cislo(a, 'y') - fs * 0.8, x2: x1 + sirka, y2: cislo(a, 'y') + fs * 0.22 };
	}
	if (p.tag === 'rect') return { x1: cislo(a, 'x'), y1: cislo(a, 'y'), x2: cislo(a, 'x') + cislo(a, 'width'), y2: cislo(a, 'y') + cislo(a, 'height') };
	if (p.tag === 'circle') { const r = cislo(a, 'r'); return { x1: cislo(a, 'cx') - r, y1: cislo(a, 'cy') - r, x2: cislo(a, 'cx') + r, y2: cislo(a, 'cy') + r }; }
	if (p.tag === 'path') { const b = lomeneCary(a.d ?? '').flat(); return { x1: Math.min(...b.map((q) => q[0])), y1: Math.min(...b.map((q) => q[1])), x2: Math.max(...b.map((q) => q[0])), y2: Math.max(...b.map((q) => q[1])) }; }
	if (p.tag === 'ellipse') return { x1: cislo(a, 'cx') - cislo(a, 'rx'), y1: cislo(a, 'cy') - cislo(a, 'ry'), x2: cislo(a, 'cx') + cislo(a, 'rx'), y2: cislo(a, 'cy') + cislo(a, 'ry') };
	return { x1: Math.min(cislo(a, 'x1'), cislo(a, 'x2')), y1: Math.min(cislo(a, 'y1'), cislo(a, 'y2')), x2: Math.max(cislo(a, 'x1'), cislo(a, 'x2')), y2: Math.max(cislo(a, 'y1'), cislo(a, 'y2')) };
}
const rohy = (b) => [[b.x1, b.y1], [b.x2, b.y1], [b.x1, b.y2], [b.x2, b.y2]];
const vyplneny = (p) => p.tag !== 'line' && (p.a.fill ?? '#000') !== 'none';
function obsahuje(tvar, box) {
	if (tvar.tag === 'circle') { const [cx, cy, r] = [cislo(tvar.a, 'cx'), cislo(tvar.a, 'cy'), cislo(tvar.a, 'r')]; return rohy(box).every(([x, y]) => Math.hypot(x - cx, y - cy) <= r); }
	if (tvar.tag === 'rect') { const o = obdelnik(tvar); return box.x1 >= o.x1 && box.x2 <= o.x2 && box.y1 >= o.y1 && box.y2 <= o.y2; }
	return false;
}
const vzdalenostBodu = (x, y, b) => Math.hypot(Math.max(b.x1 - x, 0, x - b.x2), Math.max(b.y1 - y, 0, y - b.y2));
function mezera(box, tvar) {
	const sw = tvar.tag === 'text' ? 0 : cislo(tvar.a, 'stroke-width', tvar.a.stroke ? 1 : 0) / 2;
	if (tvar.tag === 'text') { const o = obdelnik(tvar); return Math.max(o.x1 - box.x2, box.x1 - o.x2, o.y1 - box.y2, box.y1 - o.y2); }
	if (tvar.tag === 'circle') {
		const [cx, cy, r] = [cislo(tvar.a, 'cx'), cislo(tvar.a, 'cy'), cislo(tvar.a, 'r')];
		const dmin = vzdalenostBodu(cx, cy, box);
		const dmax = Math.max(...rohy(box).map(([x, y]) => Math.hypot(x - cx, y - cy)));
		if (vyplneny(tvar)) return dmin - r - sw;
		return dmax < r ? r - dmax - sw : dmin > r ? dmin - r - sw : -1;
	}
	if (tvar.tag === 'path') {
		const podcesty = lomeneCary(tvar.a.d ?? '');
		let d = Infinity;
		for (const body of podcesty) for (let i = 1; i < body.length; i++) d = Math.min(d, vzdalenostUsecky(body[i - 1], body[i], box));
		const plocha = (tvar.a.fill ?? '#000') !== 'none';
		if (plocha && podcesty.some((body) => rohy(box).some((r) => uvnitrMnohouhelniku(r, body)))) return -1;
		return d - sw;
	}
	if (tvar.tag === 'line') {
		const [x1, y1, x2, y2] = ['x1', 'y1', 'x2', 'y2'].map((k) => cislo(tvar.a, k));
		let d = Infinity;
		for (let t = 0; t <= 1.0001; t += 0.02) d = Math.min(d, vzdalenostBodu(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, box));
		return d - sw;
	}
	const o = obdelnik(tvar);
	const venku = Math.max(o.x1 - box.x2, box.x1 - o.x2, o.y1 - box.y2, box.y1 - o.y2);
	if (vyplneny(tvar) || venku > 0) return venku - sw;
	const uvnitr = Math.min(box.x1 - o.x1, o.x2 - box.x2, box.y1 - o.y1, o.y2 - box.y2);
	return uvnitr - sw;
}
const vadyGeometrie = [];
const vadyKontrastu = [];
const textyKontrastu = [];
// Dva prvky jsou vidět současně, pokud nejsou jeden jen „před“ a druhý jen „po“ odhalení.
const spolu = (p, q) => !((p.vrstva === 'pred' && q.vrstva === 'po') || (p.vrstva === 'po' && q.vrstva === 'pred'));
const otaznikyPo = [];
const bezVysledku = [];
for (const k of karty) {
	const prvky = prvkySvg(scenyHtml[k.id] ?? '');
	// Po odhalení: žádný „?“ ani značka „?“ nesmí zůstat vidět; scéna musí mít vrstvu výsledku mimo nápis odpovědi.
	for (const p of prvky) if (p.vrstva !== 'pred' && ((p.tag === 'text' && p.text.includes('?') && !/\p{L}/u.test(p.text)) || (p.tag === 'circle' && p.a.stroke === '#6741d9'))) otaznikyPo.push(`${k.id} ${p.tag}`);
	const vysledek = prvky.filter((p) => p.vrstva === 'po' && !(p.tag === 'text' && p.text === k.napis) && !(p.tag === 'rect' && p.a.x === '90' && p.a.y === '2'));
	if (vysledek.length === 0) bezVysledku.push(k.id);
	prvky.forEach((p, i) => {
		if (p.tag !== 'text') return;
		const box = obdelnik(p);
		const jmeno = `${k.id} „${p.text}“`;
		if (box.x1 < 0 || box.x2 > 640 || box.y1 < 0 || box.y2 > 400) vadyGeometrie.push(`${jmeno} přesahuje plátno`);
		let iPozadi = -1;
		for (let j = i - 1; j >= 0; j--) if (spolu(p, prvky[j]) && vyplneny(prvky[j]) && prvky[j].tag !== 'text' && obsahuje(prvky[j], box)) { iPozadi = j; break; }
		if (iPozadi < 0) { vadyGeometrie.push(`${jmeno} nemá pod sebou celý jeden tvar`); return; }
		const pozadi = prvky[iPozadi];
		if (pozadi.animujeKryti) vadyKontrastu.push(`${jmeno}: krytí pozadí se animuje`);
		const barva = p.a.fill ?? '#000000';
		textyKontrastu.push(barva);
		const kr = kontrast(barva, pozadi.a.fill);
		if (kr < 4.5) vadyKontrastu.push(`${jmeno}: ${barva} na ${pozadi.a.fill} = ${kr.toFixed(2)}`);
		prvky.forEach((q, j) => {
			if (j === i || j <= iPozadi && q.tag !== 'text' || !spolu(p, q)) return;
			const m = mezera(box, q);
			if (m < ODSTUP) vadyGeometrie.push(`${jmeno} × ${q.tag}${q.text ? ` „${q.text}“` : ''} odstup ${m.toFixed(1)} px`);
		});
	});
	// Značka „?“ (kruh s fialovým obrysem) nesmí zasahovat do jiného tvaru scény (kromě pozadí, které ji celou obsahuje).
	prvky.forEach((p) => {
		if (p.tag !== 'circle' || p.a.stroke !== '#6741d9') return;
		const [cx, cy, r] = [cislo(p.a, 'cx'), cislo(p.a, 'cy'), cislo(p.a, 'r') + cislo(p.a, 'stroke-width') / 2];
		const bod = { x1: cx, y1: cy, x2: cx, y2: cy };
		for (const q of prvky) {
			if (q === p || q.tag === 'text' || q.tag === 'line' || !spolu(p, q)) continue;
			const o = obdelnik(q);
			if (q.tag === 'rect' && o.x1 <= cx - r && o.x2 >= cx + r && o.y1 <= cy - r && o.y2 >= cy + r && vyplneny(q)) continue;
			const m = mezera(bod, q) - r;
			if (m < ODSTUP) vadyGeometrie.push(`${k.id} značka „?“ × ${q.tag} odstup ${m.toFixed(1)} px`);
		}
	});
}
ok(otaznikyPo.length === 0, `po odhalení není vidět žádný „?“ (otazníky jsou ve vrstvě zadání)${otaznikyPo.length ? ` (${otaznikyPo.join('; ')})` : ''}`);
ok(bezVysledku.length === 0, `každá scéna po odhalení ukáže výsledek – prvek, který byl před odhalením skrytý, kromě nápisu${bezVysledku.length ? ` (chybí: ${bezVysledku.join(', ')})` : ''}`);
const unikatni = (pole) => [...new Set(pole)];
ok(vadyGeometrie.length === 0, `texty scén leží na plátně a mají odstup ≥ ${ODSTUP} px od ostatních textů a tvarů${vadyGeometrie.length ? ` (${unikatni(vadyGeometrie).join('; ')})` : ''}`);
ok(textyKontrastu.length >= karty.length * 2 && vadyKontrastu.length === 0, `všechny texty scén (${textyKontrastu.length}) mají proti tvaru pod sebou kontrast ≥ 4,5 : 1${vadyKontrastu.length ? ` (${unikatni(vadyKontrastu).join('; ')})` : ''}`);
ok(!/<text\b[^>]*>[^<]*<animate\b/.test(zdroj) && [...zdroj.matchAll(/<g\b[^>]*>((?:(?!<g\b|<\/g>)[\s\S])*)<\/g>/g)].every((m) => !(/<text\b/.test(m[1]) && /attributeName="(?:opacity|fill-opacity)"/.test(m[1]))), 'krytí textu se neanimuje (ani přes skupinu)');
ok((zdroj.match(/<text\b/g) ?? []).length === (zdroj.match(/<\/text>/g) ?? []).length, 'SVG má stejný počet otevíracích a uzavíracích značek text');

// ---------- 7. Kontrast CSS proti skutečnému pozadí ----------
const styl = zdroj.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? '';
const pravidloCss = (znacka) => {
	const zacatek = styl.indexOf(znacka);
	if (zacatek < 0) return '';
	const otevrena = styl.indexOf('{', zacatek);
	return styl.slice(otevrena + 1, styl.indexOf('}', otevrena));
};
const cssHex = (znacka, vlastnost) => pravidloCss(znacka).match(new RegExp(`(?:^|[;\\s])${vlastnost}\\s*:\\s*(#[0-9a-fA-F]{3,6})`))?.[1];
const papir = '#f7f4ec';
const cssTexty = [
	['.podnadpis', papir], ['.pozn', papir], ['.cislo-kola', papir], ['.lista-body', papir],
	['.odpocet-cislo', papir], ['.proc', papir], ['.citace', papir], ['.pokyn', papir],
].map(([selektor, pozadi]) => [cssHex(selektor, 'color'), pozadi, selektor]);
for (const pozadi of ['#ffffff', '#f1f3f5', '#d3f9d8']) cssTexty.push([cssHex('.moznost small', 'color'), pozadi, `malý text možnosti na ${pozadi}`]);
cssTexty.push([cssHex('.moznost > b', 'color'), cssHex('.moznost-A > b', 'background'), 'písmeno A']);
cssTexty.push([cssHex('.moznost > b', 'color'), cssHex('.moznost-B > b', 'background'), 'písmeno B']);
cssTexty.push([cssHex('.tym.oznaceny .tym-body::after', 'color'), cssHex('.tym.oznaceny)', 'background'), 'fajfka bodu']);
const vadneCss = cssTexty.filter(([barva, pozadi]) => !barva || !pozadi || kontrast(barva, pozadi) < 4.5);
ok(vadneCss.length === 0, `všechny CSS barvy textu mají proti svému pozadí kontrast ≥ 4,5 : 1${vadneCss.length ? ` (${vadneCss.map(([a, b, kde]) => `${kde}: ${a}/${b}`).join(', ')})` : ''}`);
const cssSpatna = pravidloCss('.moznost.spatna');
ok(!/\bopacity\s*:/.test(cssSpatna) && /background\s*:/.test(cssSpatna), 'nesprávná možnost tlumí jen pozadí a rámeček, ne text');

// ---------- 8. Zdrojový záznam PDF ----------
const strany = new Map([...(pdf ?? '').matchAll(/=== STRANA (\d+) ===([\s\S]*?)(?==== STRANA \d+ ===|$)/g)].map((m) => [Number(m[1]), m[2].replace(/\s+/g, ' ')]));
ok(Array.isArray(zdroje) && zdroje.length === karty.length, `zdrojový záznam má položku pro každou kartu (${zdroje.length})`);
const podleId = new Map(zdroje.map((z) => [z.id, z]));
for (const k of karty) {
	const z = podleId.get(k.id);
	const strana = Number(k.zdroj.match(/^s\. (\d+)$/)?.[1]);
	ok(Number.isInteger(strana) && Boolean(z) && z.otazka === k.otazka && z.spravne === k.spravne && z.zdroj_strana === strana, `${k.id}: komponenta souhlasí se zdrojovým záznamem (otázka, odpověď, s. ${strana})`);
	ok(typeof z?.zdroj_uryvek === 'string' && z.zdroj_uryvek.length >= 12, `${k.id}: citace PDF má úryvek aspoň 12 znaků`);
	if (pdf) ok(strany.get(strana)?.includes(z?.zdroj_uryvek.replace(/\s+/g, ' ')), `${k.id}: doslovný úryvek je na uvedené straně PDF`);
}
if (!pdf) console.log('PŘESKOČENO: PDF text není k dispozici (kontrola úryvků proti straně PDF)');

// ---------- 9. Přepínání scén a omezený pohyb ----------
ok(/<div class="scena skryta" data-karta=\{k\.id\}/.test(zdroj) && /\.scena\.skryta\s*\{[^}]*visibility\s*:\s*hidden/.test(zdroj), 'scény začínají skryté (visibility: hidden)');
ok(/classList\.toggle\('skryta',[\s\S]*?nastavPohyb\(svg, aktivni\)/.test(zdroj) && /setCurrentTime\?\.\(0\)/.test(zdroj), 'po přepnutí scény se animace vrátí na první snímek');
const cssOmezenyPohyb = zdroj.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)@media\s*\(max-width/)?.[1] ?? '';
ok(/animation:\s*none\s*!important/.test(cssOmezenyPohyb) && /transition:\s*none\s*!important/.test(cssOmezenyPohyb), 'CSS reduced-motion vypíná animace a přechody');
ok(/\.velke-tlacitko:hover\s*\{\s*transform:\s*none/.test(cssOmezenyPohyb), 'reduced-motion vypíná zvětšování tlačítek');
ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/.test(zdroj) && /omezenyPohyb\.matches[\s\S]{0,100}pauseAnimations\?\.\(\)/.test(zdroj), 'JS při reduced-motion zastaví SVG animace');
ok(/if \(!omezenyPohyb\.matches\) for \(let i = 0; i < 40; i\+\+\)/.test(zdroj), 'JS při reduced-motion nevytváří konfety');
ok(!/https?:\/\/(?!lab\.wonderly)/.test(zdroj.replace(/xmlns="[^"]+"/g, '')), 'komponenta nenačítá nic z cizích adres');

// ---------- 10. Mutační podvrhy: každý musí shodit konkrétní kontrolu ----------
if (!process.env.KONTROLA_MUTACE) {
	const vlastniSlozka = process.env.HRA_MUTACE_DIR;
	const slozka = vlastniSlozka || mkdtempSync(join(tmpdir(), 'hra-magnety-mutace-'));
	mkdirSync(slozka, { recursive: true });
	const mutace = [
		['dvě zrcadlové karty', 'zrcadlové|stejného odstavce', [
			["otazka: 'Je magnetit (magnetovec) umělý magnet?'","otazka: 'Je pole mezi dvěma opačnými póly nejsilnější?'"],
			["opora: 'Přírodní magnety jsou nerosty s obsahem železa, například magnetit (magnetovec).'","opora: 'U dvou magnetů natočených opačnými póly k sobě je pole nejsilnější mezi nimi'"]]],
		['odhalení s oporou jiné karty', 'žádné odhalení', [
			["proc: 'Ano. Železo je feromagnetická látka, magnet ji silně přitahuje.'", "proc: 'Ano. Železo je feromagnetická látka. Kolem magnetů vzniká magnetické pole.'"]]],
		['dvě správné odpovědi', 'právě jedna správná', [
			["spravne: 'A',\n\t\t\t\tnapis: 'ANO · feromagnetická látka'", "spravne: 'A', spravne: 'B',\n\t\t\t\tnapis: 'ANO · feromagnetická látka'"]]],
		['nízký kontrast textu scény', 'kontrast ≥ 4,5', [
			["const titulek = (text: string, y: number, barva = '#343a40'", "const titulek = (text: string, y: number, barva = '#adb5bd'"]]],
		['nízký kontrast CSS proti papíru', 'CSS barvy', [
			['.podnadpis { font-size: 1.3rem; color: #495057;', '.podnadpis { font-size: 1.3rem; color: #b7b3ad;']]],
		['odstraněný reduced-motion', 'reduced-motion vypíná animace', [
			['animation: none !important', 'animation: initial !important']]],
		['scéna prozradí odpověď', 'neobsahuje text odpovědi', [
			["titulek('Kde vzniká magnetické pole?', 330)", "titulek('vzniká kolem magnetu', 330)"]]],
		['překryv titulku s magnetem', 'odstup ≥', [
			["titulek('Kde vzniká magnetické pole?', 330)", "titulek('Kde vzniká magnetické pole?', 250)"]]],
		['pravidelné střídání ABABA', 'pravidelné střídání', [
			["otazka: 'Uspořádají se železné piliny nasypané na karton nad magnetem do obrazce?', spravne: 'A'", "otazka: 'Uspořádají se železné piliny nasypané na karton nad magnetem do obrazce?', spravne: 'B'"]]],
		['křivka path přes titulek', 'odstup ≥', [
			['C430 335 210 335 225 240', 'C430 395 210 395 225 240']]],
		['značka „?“ přes obrys Země', 'odstup ≥', [
			['puls(440, 128, 16)', 'puls(372, 118, 16)']]],
		['scéna bez výsledku po odhalení', 'každá scéna po odhalení ukáže výsledek', [
			['<rect x="240" y="195" width="20" height="40" fill="${MODRA}" stroke="#fff" stroke-width="2"/><rect x="260" y="195" width="20" height="40" fill="${CERVENA}" stroke="#fff" stroke-width="2"/>', '']]],
		['otazník viditelný po odhalení', 'po odhalení není vidět žádný', [
			['const puls = (cx = 320, cy = 92, r = 24) => pred(', 'const puls = (cx = 320, cy = 92, r = 24) => (']]],
		['otázka bez klíčového výrazu','aspoň jeden klíčový výraz', [
			["otazka: 'Využívají se magnety v reproduktorech?'", "otazka: 'Přitáhne magnet silně magnety?'"]]],
	];
	try {
		mutace.forEach(([nazev, ocekavana, zmeny], i) => {
			let mutovany = zdroj;
			for (const [pred, po] of zmeny) mutovany = mutovany.replace(pred, po);
			if (mutovany === zdroj || zmeny.some(([pred]) => !zdroj.includes(pred))) { ok(false, `mutační podvrh „${nazev}“ se podařilo vytvořit`); return; }
			const cesta = join(slozka, `mutace-${i + 1}.astro`);
			writeFileSync(cesta, mutovany);
			const beh = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
				cwd: koren, env: { ...process.env, HRA_KOMPONENTA: cesta, KONTROLA_MUTACE: '1' }, encoding: 'utf8', timeout: 120000,
			});
			const shozene = (beh.stdout ?? '').split('\n').filter((r) => r.startsWith('❌'));
			if (vlastniSlozka) writeFileSync(join(slozka, `mutace-${i + 1}.vystup.txt`), `${nazev}\nRC ${beh.status}\n${beh.stdout}\n${beh.stderr}`);
			ok(beh.status !== 0 && shozene.some((r) => new RegExp(ocekavana).test(r)), `mutační podvrh „${nazev}“ test odmítne (RC ${beh.status}, shozená kontrola „${ocekavana}“)`);
		});
	} finally {
		if (!vlastniSlozka) rmSync(slozka, { recursive: true, force: true });
	}
}

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
