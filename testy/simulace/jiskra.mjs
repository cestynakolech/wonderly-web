#!/usr/bin/env node
// Ověření JiskraSimulace.astro (F9, vedení proudu v plynech): spustí SKUTEČNÝ
// skript komponenty v Node s náhradním DOM a proměří všechny kombinace ovládání.
//
// SMYSL scény podle výkladu (slug vedeni-proudu-v-plynech):
//   · obvod jako obr-02: zdroj, žárovka a dvě elektrody se vzduchem — vzduch je
//     „velice špatný vodič“ (žárovka nesvítí); se svíčkou se vzduch ionizuje a proud
//     prochází (žárovka svítí); „napětí roste, až vzduch ztratí izolační schopnost“
//     → jiskra jen při nejvyšším stupni napětí bez svíčky (i pak žárovka svítí),
//   · napětí jen SLOVNĚ — výklad ani PDF nemají kV ani mm pro jiskru,
//   · bouřka jako obr-03: v mraku záporný náboj dole, kladný nahoře, kladný náboj na
//     zemi pod mrakem; bleskosvod = kovová tyč na střeše spojená kovovým vodičem se
//     zemí; hrom je zvuk vzniklý rychlým rozpínáním ohřátého vzduchu; „čím delší je
//     pauza mezi bleskem a hromem, tím dál je bouřka“ — bez „sekundy ÷ 3 = km“,
//   · jediná čísla: 2 až 3 km, 20 000–30 000 °C (popisek jede s bleskem), 18. století.
// Mobil: skutečná šířka scény na telefonu 360 px je ~235 px → písmo ≥ 12 px;
// kontrast všech textů ≥ 4,5 : 1 (WCAG) proti pozadí, na kterém leží.
// Historie: T3d nález 5; blesk přes zem; kontrola simulací J1–J6.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const svgZdroj = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];

const prvky = new Map();
const novyPrvek = (id) => {
	const tridy = new Set();
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '', posluchaci: {},
		classList: {
			add: (t) => tridy.add(t), remove: (t) => tridy.delete(t), contains: (t) => tridy.has(t),
			toggle: (t, ano) => { const chci = ano === undefined ? !tridy.has(t) : ano; if (chci) tridy.add(t); else tridy.delete(t); return chci; },
		},
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const vychoziU = zdroj.match(/id="jis-u"[^>]*value="(\d+)"/)[1];
const vychoziP = zdroj.match(/id="jis-p"[^>]*value="(\d+)"/)[1];
novyPrvek('jis-u').value = vychoziU;
novyPrvek('jis-p').value = vychoziP;
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const P = (id) => prvky.get(id);
const klik = (id) => (P(id)?.posluchaci.click || []).forEach((f) => f({ target: P(id), currentTarget: P(id) }));
const posun = (id, v) => { P(id).value = String(v); (P(id).posluchaci.input || []).forEach((f) => f()); };
const vid = (id) => P(id).atributy.visibility;
const svg = P('jis-svg');
const stavJ = svg.__stavJiskry, stavB = svg.__stavBourky;
const SLOVA = ['vypnuto', 'malé', 'střední', 'velké', 'velmi velké'];
const texty = []; // vše, co žák uvidí — kontrola čísel na konci
const blok = (id) => svgZdroj.match(new RegExp(`<g id="${id}"[^>]*>[\\s\\S]*?(?=<!-- REŽIM|</svg>)`))[0];

console.log('— výchozí stav (klid) —');
ok(vychoziU === '2' && vychoziP === '2', `posuvníky začínají na stupni 2 (napětí ${vychoziU}, pauza ${vychoziP})`);
ok(vid('jis-scena-jiskra') === 'visible' && vid('jis-scena-bourka') === 'hidden', 'začíná se scénou jiskry');
ok(P('jis-udaje').textContent === 'proud neprochází', `při středním napětí proud neprochází (je „${P('jis-udaje').textContent}“)`);
ok(vid('jis-jiskra') === 'hidden' && vid('jis-svicka-g') === 'hidden' && vid('jis-paprsky') === 'hidden', 'v klidu žádná jiskra, svíčka ani svit žárovky');

console.log('— jiskra: všechny stupně napětí × svíčka, žárovka ukazuje proud —');
for (const svicka of [false, true]) {
	for (let U = 0; U <= 4; U++) {
		posun('jis-u', U);
		const s = stavJ(U, svicka);
		const preskoci = !svicka && U === 4;
		const horky = svicka && U > 0;
		const vede = preskoci || horky;
		const co = `${svicka ? 'svíčka' : 'bez svíčky'}, ${SLOVA[U]}`;
		ok(s.preskoci === preskoci && s.horkyVzduch === horky && s.vede === vede && s.napeti === SLOVA[U], `${co}: jiskra ${preskoci}, horký vzduch ${horky}`);
		ok(P('jis-out-u').textContent === SLOVA[U] && P('jis-napeti-pop').textContent === `napětí: ${SLOVA[U]}`, `${co}: napětí jen slovy`);
		ok(vid('jis-jiskra') === (preskoci ? 'visible' : 'hidden') && vid('jis-svicka-g') === (svicka ? 'visible' : 'hidden'), `${co}: jiskra ${preskoci ? 'vidět' : 'skrytá'}, svíčka ${svicka ? 'hoří' : 'není'}`);
		ok(vid('jis-paprsky') === (vede ? 'visible' : 'hidden') && P('jis-vlakno').atributy.opacity === (vede ? '1' : '0.06'), `${co}: žárovka ${vede ? 'svítí' : 'nesvítí'}`);
		const cekany = preskoci ? '⚡ jiskra — proud prochází' : horky ? '🔥 proud prochází' : 'proud neprochází';
		ok(P('jis-udaje').textContent === cekany, `${co}: „${cekany}“`);
		const st = P('jis-stav').textContent;
		const cekanyStav = preskoci ? /ztratil izolační schopnost/ : horky ? /ionizace/ : U === 0 ? (svicka ? /bez napětí proud neteče/ : /Bez napětí se nic neděje/) : /zatím izolant/;
		ok(cekanyStav.test(st) && (U === 0 || /žárovka (svítí|nesvítí)/.test(st)), `${co}: vysvětlení odpovídá a zmiňuje žárovku (${cekanyStav})`);
		texty.push(P('jis-udaje').textContent, st, P('jis-vzorec').innerHTML, P('jis-out-u').textContent, P('jis-napeti-pop').textContent);
	}
	klik('jis-svicka');
}
ok(P('jis-svicka').textContent.includes('zapal'), 'po dvou kliknutích svíčka zase zhasnutá, tlačítko nabízí zapálit');
{
	const scena = blok('jis-scena-jiskra');
	const koule = [...scena.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="#868e96"/g)].map((m) => m.slice(1).map(Number));
	const j = svgZdroj.match(/id="jis-jiskra" points="([^"]+)"/)[1].split(' ').map((b) => Number(b.split(',')[0]));
	ok(koule.length === 2 && j[0] === koule[0][0] + koule[0][2] && j[j.length - 1] === koule[1][0] - koule[1][2], `jiskra vede od levé elektrody k pravé (${j[0]} → ${j[j.length - 1]})`);
	ok(/<circle id="jis-vlakno"/.test(scena) && /<path d="M60 190 L60 40 L140 40 M152 40 L246 40 M278 40 L300 40 L300 190"/.test(scena),
		'žárovka (262 ± 16) je zapojená v obvodu se zdrojem a oběma elektrodami (obr-02)');
}

console.log('— bouřka: náboje, bleskosvod se svodem do země, pauza jen slovně —');
klik('jis-r-bourka');
ok(vid('jis-scena-bourka') === 'visible' && vid('jis-scena-jiskra') === 'hidden', 'přepnuto na bouřku');
ok(P('jis-ovladani-bourka').style.display === '' && P('jis-ovladani-jiskra').style.display === 'none', 'ovládání bouřky vidět, jiskry skryté');
ok(P('jis-r-bourka').classList.contains('jis-aktivni') && !P('jis-r-jiskra').classList.contains('jis-aktivni'), 'aktivní tlačítko bouřky');
{
	const skupina = svgZdroj.match(/<g id="jis-bourka-g"[\s\S]*?(?=<text id="jis-bourka-vysledek")/)[0];
	const znaky = [...skupina.matchAll(/<text x="\d+" y="(\d+)"[^>]*>([+−\s]+)<\/text>/g)].map((m) => ({ y: +m[1], z: m[2].trim()[0] }));
	const mrakPlus = znaky.find((z) => z.z === '+' && z.y < 120), mrakMinus = znaky.find((z) => z.z === '−'), zemPlus = znaky.find((z) => z.z === '+' && z.y > 286);
	ok(mrakPlus && mrakMinus && mrakPlus.y < mrakMinus.y, `v mraku kladný náboj nahoře (y ${mrakPlus?.y}), záporný dole (y ${mrakMinus?.y})`);
	ok(!!zemPlus, `kladný náboj na zemi pod mrakem (y ${zemPlus?.y}), posouvá se s bouřkou`);
	const tyc = skupina.match(/<line id="jis-tyc" x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="(\d+)"/).slice(1).map(Number);
	const svod = skupina.match(/id="jis-svod" points="([^"]+)"/)[1].split(' ').map((b) => b.split(',').map(Number));
	const hreben = skupina.match(/<polygon points="[^"]* (\d+),(\d+)" fill="#e8590c"/).slice(1).map(Number);
	ok(tyc[0] === hreben[0] && tyc[1] === hreben[1] && tyc[3] < tyc[1], `tyč bleskosvodu stojí na hřebeni střechy (${hreben}) a míří nahoru`);
	ok(svod[0][0] === tyc[0] && svod[0][1] === tyc[1] && Math.max(...svod.map(([, y]) => y)) > 286, `kovový vodič vede od tyče (${svod[0]}) až pod povrch země (y ${Math.max(...svod.map(([, y]) => y))} > 286)`);
	const b = svgZdroj.match(/id="jis-blesk" points="([^"]+)"/)[1].split(' ').map((x) => x.split(',').map(Number));
	const konec = b[b.length - 1];
	ok(konec[0] === tyc[2] && konec[1] === tyc[3], `blesk končí na hrotu bleskosvodu (${tyc[2]}, ${tyc[3]}), je (${konec})`);
	ok(b.every(([, y], i) => i === 0 || y >= b[i - 1][1] - 6), 'blesk vede shora dolů, nevrací se ze země nahoru');
	ok(/<text id="jis-blesk-info"/.test(skupina), 'popisek teploty je ve skupině bouřky → posouvá se s bleskem');
	const info = skupina.match(/<text id="jis-blesk-info" x="(\d+)" y="(\d+)"/).slice(1).map(Number);
	const bx = b.map(([x]) => x), by = b.map(([, y]) => y);
	ok(info[1] > Math.min(...by) && info[1] < Math.max(...by) + 10 && Math.min(...bx) - info[0] >= 0 && Math.min(...bx) - info[0] <= 30, `popisek teploty stojí těsně vlevo od blesku (konec x ${info[0]}, blesk od x ${Math.min(...bx)})`);
	const prave = [...skupina.matchAll(/cx="(\d+)"[^>]*rx="(\d+)"/g)].map((m) => Number(m[1]) + Number(m[2]))
		.concat([...skupina.matchAll(/points="([^"]+)"/g)].flatMap((m) => m[1].split(' ').map((x) => Number(x.split(',')[0]))));
	const sirka = Number(svgZdroj.match(/viewBox="0 0 (\d+) \d+"/)[1]);
	ok(Math.max(...prave) + stavB(3).posun <= sirka, `i nejvíc odsunutá bouřka se vejde do scény (pravý okraj ${Math.max(...prave) + stavB(3).posun} ≤ ${sirka})`);
}
const PAUZA = ['krátká', 'delší', 'dlouhá'], KDE = ['blízko', 'dál', 'daleko'];
for (const blesk of [false, true]) {
	for (let p = 1; p <= 3; p++) {
		posun('jis-p', p);
		const s = stavB(p);
		ok(s.pauza === PAUZA[p - 1] && s.vzdalenost === KDE[p - 1] && s.posun === (p - 1) * 45, `pauza ${p}: ${PAUZA[p - 1]} → ${KDE[p - 1]}, posun ${(p - 1) * 45}`);
		ok(P('jis-bourka-g').atributy.transform === `translate(${(p - 1) * 45} 0)`, `pauza ${p}: bouřka odsunutá o ${(p - 1) * 45} (je ${P('jis-bourka-g').atributy.transform})`);
		ok(P('jis-bourka-vysledek').textContent === `${PAUZA[p - 1]} pauza → bouřka je ${KDE[p - 1]}` && P('jis-out-p').textContent === PAUZA[p - 1], `pauza ${p}: „${P('jis-bourka-vysledek').textContent}“`);
		ok(vid('jis-blesk') === (blesk ? 'visible' : 'hidden') && P('jis-blesk-info').textContent === (blesk ? '20 000–30 000 °C' : ''), `pauza ${p}: blesk ${blesk ? 'vidět s teplotou' : 'skrytý'}`);
		ok(/Čím delší je pauza mezi bleskem a hromem, tím dál je bouřka/.test(P('jis-vzorec').innerHTML), `pauza ${p}: pravidlo z výkladu slovy`);
		const st = P('jis-stav').textContent;
		ok(blesk
			? /BLESKOSVODU/.test(st) && /2 až 3 km/.test(st) && /spojené kovovým vodičem se zemí/.test(st) && /Hrom je zvuk, který vzniká rychlým rozpínáním ohřátého vzduchu/.test(st)
			: /Zablýskni/.test(st) && /Dole v mraku je záporný náboj, nahoře kladný/.test(st), `pauza ${p}: vysvětlení ${blesk ? 'blesku, bleskosvodu a hromu' : 'nábojů a výzva'}`);
		texty.push(P('jis-bourka-vysledek').textContent, P('jis-vzorec').innerHTML, st, P('jis-blesk-info').textContent);
	}
	klik('jis-zablyskni');
}
ok(vid('jis-blesk') === 'hidden' && P('jis-zablyskni').textContent.includes('zablýskni'), 'po dvou kliknutích blesk zase schovaný');
ok(!/Hrom je rychle se rozpínající|Hrom je rozpínající/.test(zdroj), 'hrom není „vzduch“, ale zvuk');
klik('jis-r-jiskra');
ok(vid('jis-scena-jiskra') === 'visible' && P('jis-r-jiskra').classList.contains('jis-aktivni'), 'zpět na jiskru');

console.log('— simulace netvrdí nic navíc (čísla jen z výkladu) —');
{
	const bezKomentaru = zdroj.replace(/^---[\s\S]*?---/, '').replace(/\/\/[^\n]*/g, '').replace(/<!--[\s\S]*?-->/g, '');
	ok(!/kV|\bmm\b|÷|km daleko|sekundy ÷/.test(bezKomentaru), 'v komponentě není kV, mm ani „÷ 3“');
	const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/, '').replace(/^---[\s\S]*?---/, '').replace(/<!--[\s\S]*?-->/g, '');
	const viditelnyText = html.replace(/<[^>]+>/g, ' ') + ' ' + texty.join(' ').replace(/<[^>]+>/g, ' ');
	const cisla = [...new Set((viditelnyText.match(/\d[\d  ]*\d|\d/g) || []).map((c) => c.replace(/[  ]/g, '')))].sort();
	const POVOLENA = ['2', '3', '18', '20000', '30000'];
	ok(cisla.every((c) => POVOLENA.includes(c)), `viditelná čísla jen z výkladu (${cisla.join(', ')})`);
}

console.log('— mobil: písmo ≥ 12 px při šířce scény 235 px, kontrast ≥ 4,5 : 1 —');
{
	const sirka = Number(svgZdroj.match(/viewBox="0 0 (\d+) \d+"/)[1]);
	const velikosti = [...svgZdroj.matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1]));
	const nejmensi = Math.min(...velikosti);
	ok(nejmensi * 235 / sirka >= 12, `nejmenší písmo ${nejmensi} ve scéně široké ${sirka} → na telefonu ${(nejmensi * 235 / sirka).toFixed(1)} px ≥ 12 px`);
	const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
	const L = (hex) => { let h = hex.slice(1); if (h.length === 3) h = [...h].map((x) => x + x).join(''); const [r, g2, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g2 + 0.0722 * b; };
	const kontrast = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
	// pozadí podle polohy: tráva (y > 286 v bouřce), mrak (náboje v mraku), jinak plátno
	const bourka = blok('jis-scena-bourka');
	const spatne = [];
	for (const [scena, jeBourka] of [[blok('jis-scena-jiskra'), false], [bourka, true]]) {
		for (const m of scena.matchAll(/<text [^>]*y="(\d+)"[^>]*fill="(#\w+)"[^>]*>([^<]*)</g)) {
			const y = +m[1], fill = m[2], obsah = m[3];
			const proti = !jeBourka ? '#f8f9fa' : y > 286 ? '#b2f2bb' : /^[+−\s]+$/.test(obsah) ? '#adb5bd' : '#f8f9fa';
			if (kontrast(fill, proti) < 4.5) spatne.push(`„${obsah || '(dynamický)'}“ ${fill} na ${proti} ${kontrast(fill, proti).toFixed(2)}`);
		}
	}
	ok(!spatne.length, `všechny texty ve scéně mají kontrast ≥ 4,5 (${spatne.join('; ') || 'vše v pořádku'})`);
}

console.log('— přístupnost —');
ok(/id="jis-stav" aria-live="polite"/.test(zdroj), 'věta o stavu má aria-live="polite"');

console.log(chyby ? `\n❌ ${chyby} kontrol neprošlo` : '\n✅ vše v pořádku');
process.exit(chyby ? 1 : 0);
