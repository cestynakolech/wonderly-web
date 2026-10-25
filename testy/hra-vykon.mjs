#!/usr/bin/env node
// TEST HRY „Kdo má větší výkon?“ (Výkon, F8).
// Podvrh komponenty lze předat přes HRA_KOMPONENTA=<cesta>.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { nactiData } from './data.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const cestaKomponenty = process.env.HRA_KOMPONENTA || join(koren, 'src/components/hry/HraVykon.astro');
const zdroj = readFileSync(cestaKomponenty, 'utf8');
const pdfCesta = '/tmp/codex-hry/pdf-text/8-vykon.txt';
// Citace zdroje (15 krátkých úryvků z PDF 8) jsou v repu; celý text PDF se nezveřejňuje.
const cestaZdroju = join(koren, 'testy/zdroje/vykon-zdroj.json');
let pdf = null;
try { pdf = readFileSync(pdfCesta, 'utf8'); } catch { /* PDF text mimo repo nemusí být k dispozici (Cloudflare) */ }
const zdrojeKaret = JSON.parse(readFileSync(cestaZdroju, 'utf8'));

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

const retezec = String.raw`((?:\\.|[^'])*)`;
const rozbal = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
const opory = [...zdroj.matchAll(new RegExp(`\\bopora:\\s*'${retezec}'`, 'g'))].map((m) => rozbal(m[1]));
const kola = [...zdroj.matchAll(/\{\s*cislo:\s*(\d+),[\s\S]*?body:\s*(\d+),\s*karty:\s*\[([\s\S]*?)\n\t\t\],\s*\n\t\},/g)].map((m) => ({
	cislo: Number(m[1]), body: Number(m[2]), blok: m[3], karty: [],
}));
const kartaRe = new RegExp(
	`\\{\\s*id:\\s*'${retezec}',\\s*scena:\\s*'${retezec}',\\s*otazka:\\s*'${retezec}',\\s*spravne:\\s*'([AB])',\\s*` +
	`proc:\\s*'${retezec}',\\s*opora:\\s*'${retezec}',\\s*zdroj:\\s*'${retezec}'\\s*\\}`,
	'g',
);
for (const kolo of kola) {
	for (const m of kolo.blok.matchAll(kartaRe)) {
		kolo.karty.push({
			id: rozbal(m[1]), scena: rozbal(m[2]), otazka: rozbal(m[3]), spravne: m[4],
			proc: rozbal(m[5]), opora: rozbal(m[6]), zdroj: rozbal(m[7]),
		});
	}
}
const napisy = new Map(
	[...(zdroj.match(/const NAPIS:[^{]+\{([\s\S]*?)\n\};/)?.[1] ?? '').matchAll(/'([^']+)':\s*'([^']+)'/g)]
		.map((m) => [m[1], m[2]]),
);

const { temata } = await nactiData();
let obsah = '';
for (const tema of temata['fyzika/8-rocnik'] ?? []) {
	for (const p of tema.podtemata ?? []) if (p.slug === 'vykon') obsah = p.obsah;
}
ok(obsah.length > 1000, 'výklad podtématu Výkon nalezen v temata.ts');
const text = obsah
	.replace(/alt="([^"]*)"/g, ' $1 ')
	.replace(/<\/?(strong|em|b|i)>/g, '')
	.replace(/<[^>]+>/g, ' ')
	.replace(/\s+/g, ' ');
const vyklad = (s) => text.includes(s.replace(/\s+/g, ' '));

// a) Opory jsou doslovné úryvky výkladu.
ok(opory.length === 18, `18 opor: 3 kola a 15 karet (je ${opory.length})`);
for (const opora of opory) ok(opora.length >= 8 && vyklad(opora), `opora ve výkladu („${opora.slice(0, 55)}“)`);

// b) Citace karet (z testy/zdroje/) sedí na kartu a všechna čísla karty jsou v citovaném úryvku.
//    Je-li k dispozici text PDF, ověří se navíc, že strana existuje a úryvek je na ní doslova.
const strany = new Map([...(pdf ?? '').matchAll(/=== STRANA (\d+) ===\n([\s\S]*?)(?=\n\f?=== STRANA |$)/g)].map((m) => [Number(m[1]), m[2]]));
const cisla = (s) => s.match(/\d+/g) ?? [];
ok(Array.isArray(zdrojeKaret) && zdrojeKaret.length === 15, `zdrojový záznam má 15 položek (má ${zdrojeKaret.length})`);
for (const kolo of kola) for (const karta of kolo.karty) {
	const n = Number(karta.zdroj.match(/^s\. (\d+)$/)?.[1]);
	const zaznam = zdrojeKaret.find((z) => z.id === karta.id);
	ok(Boolean(n), `${karta.id}: neprázdný zdroj ve tvaru s. N (${karta.zdroj})`);
	ok(Boolean(zaznam) && zaznam.otazka === karta.otazka && zaznam.spravne === karta.spravne && zaznam.zdroj_strana === n, `${karta.id}: zdrojový záznam odpovídá kartě a straně`);
	ok(typeof zaznam?.zdroj_uryvek === 'string' && zaznam.zdroj_uryvek.length >= 12, `${karta.id}: citace zdroje má úryvek aspoň 12 znaků`);
	const cislaUryvku = new Set(cisla(zaznam?.zdroj_uryvek ?? ''));
	for (const c of cisla(`${karta.otazka} ${karta.proc}`)) ok(cislaUryvku.has(c), `${karta.id}: číslo ${c} je v citovaném úryvku s. ${n}`);
	if (pdf) {
		ok(strany.has(n), `${karta.id}: zdroj odkazuje na existující stranu PDF (${karta.zdroj})`);
		ok(Boolean(zaznam) && (strany.get(n) ?? '').replace(/\s+/g, ' ').includes(zaznam.zdroj_uryvek.replace(/\s+/g, ' ')), `${karta.id}: doslovný úryvek je na uvedené straně PDF`);
		const cislaStrany = new Set(cisla(strany.get(n) ?? ''));
		for (const c of cisla(`${karta.otazka} ${karta.proc}`)) ok(cislaStrany.has(c), `${karta.id}: číslo ${c} je na s. ${n}`);
	}
}
if (!pdf) console.log('PŘESKOČENO: PDF text není k dispozici (kontrola stran a úryvků proti PDF; hlavní kontrola citací z testy/zdroje/ proběhla)');

// c) Tři kola, patnáct jedinečných karet a vyvážené odpovědi.
ok(kola.length === 3, `3 kola (jsou ${kola.length})`);
const karty = kola.flatMap((k) => k.karty);
ok(karty.length === 15, `celkem 15 karet (je ${karty.length})`);
ok(new Set(karty.map((k) => k.id)).size === karty.length, 'id karet jsou jedinečná');
ok(new Set(karty.map((k) => k.scena)).size === karty.length, 'každá karta má vlastní scénu');
for (const kolo of kola) {
	ok(kolo.karty.length === 5, `kolo ${kolo.cislo}: 5 karet (je ${kolo.karty.length})`);
	const a = kolo.karty.filter((k) => k.spravne === 'A').length;
	const b = kolo.karty.filter((k) => k.spravne === 'B').length;
	ok(a + b === kolo.karty.length, `kolo ${kolo.cislo}: každá odpověď je A, nebo B`);
	ok(a >= 2 && b >= 2, `kolo ${kolo.cislo}: A i B aspoň 2× (A ${a}, B ${b})`);
}

// d) Bodování.
ok(kola[0]?.body === 1 && kola[1]?.body === 1, 'kola 1 a 2 jsou za 1 bod');
ok(kola[2]?.body === 2, 'finále je za 2 body');
const maximum = kola.reduce((s, k) => s + k.karty.length * k.body, 0);
ok(maximum === 20, `maximum bodů je 20 (je ${maximum})`);

// e) Správnost se odvozuje z fyziky a významu jednotek, ne z opsané mapy odpovědí.
const bezMezer = (s) => s.replace(/\s+/g, '').replace(/⋅/g, '·');
const promenne = (s) => [...s.matchAll(/(?<![\p{L}\p{N}])([PWtFv])(?![\p{L}\p{N}])/gu)].map((m) => m[1]);
const druhaStrana = (strana) => strana === 'A' ? 'B' : 'A';
const dvojiceZeZadani = (q) => {
	const shoda = q.match(/^([\p{L}-]+) a ([\p{L}-]+) (?:vykonají|pracují)/iu);
	return shoda ? [shoda[1].toLowerCase(), shoda[2].toLowerCase()] : null;
};
const stranaSubjektu = (subjekt, q = '') => {
	if (/^první$/i.test(subjekt)) return 'A';
	if (/^druhý$/i.test(subjekt)) return 'B';
	const dvojice = dvojiceZeZadani(q);
	if (dvojice?.[0] === subjekt.toLowerCase()) return 'A';
	if (dvojice?.[1] === subjekt.toLowerCase()) return 'B';
	return null;
};
const vzorecZOpory = (karta) => {
	const normalni = bezMezer(karta.opora);
	const vzorec = normalni.match(/([PWtFv])=([PWtFv])([:·])([PWtFv])/);
	if (vzorec) return { cil: vzorec[1], vstupy: [vzorec[2], vzorec[4]].sort(), operace: vzorec[3], zapis: vzorec[0] };
	if (/práciWvydělímečasemt/i.test(normalni)) return { cil: 'P', vstupy: ['W', 't'].sort(), operace: ':', zapis: 'P=W:t' };
	return null;
};
const fyzikalniOdpoved = (karta, cisloKola) => {
	const q = karta.otazka;
	if (cisloKola === 1) {
		const cas = q.match(/(Bagr|Dělník|První|Druhý)[^.]*?(kratší|delší) čas/i);
		if (cas) {
			const popsana = stranaSubjektu(cas[1], q);
			return cas[2].toLowerCase() === 'kratší' ? popsana : druhaStrana(popsana);
		}
		const prace = q.match(/(První|Druhý)[^.]*?(větší|menší) práci/i);
		if (prace) {
			const popsana = stranaSubjektu(prace[1], q);
			return prace[2].toLowerCase() === 'větší' ? popsana : druhaStrana(popsana);
		}
	}
	if (cisloKola === 2) {
		const vztah = vzorecZOpory(karta);
		const cil = q.match(/vypočítáš (?:jeho )?(?:výkon|práci|čas|rychlost|sílu) ([PWtFv])/i)?.[1];
		if (vztah && cil === vztah.cil) return vztah.operace === '·' ? 'A' : 'B';
	}
	if (cisloKola === 3) {
		const hodnota = (s) => Number(s.replace(/\s/g, ''));
		const nasobek = (predpona = '') => ({ '': 1, k: 1_000, M: 1_000_000 })[predpona] ?? NaN;
		const vykonZPrace = q.match(/práci ([\d ]+) ([kM]?)J (?:vykonanou )?za ([\d ]+) s.+výkon ([\d ]+) ([kM]?)W/i);
		if (vykonZPrace) {
			const [, prace, predponaPrace, cas, vykon, predponaVykonu] = vykonZPrace;
			return hodnota(prace) * nasobek(predponaPrace) / hodnota(cas) === hodnota(vykon) * nasobek(predponaVykonu) ? 'A' : 'B';
		}
		const praceZVykonu = q.match(/Výkon ([\d ]+) ([kM]?)W znamená práci ([\d ]+) ([kM]?)J vykonanou za ([\d ]+) s/i);
		if (praceZVykonu) {
			const [, vykon, predponaVykonu, prace, predponaPrace, cas] = praceZVykonu;
			return hodnota(vykon) * nasobek(predponaVykonu) === hodnota(prace) * nasobek(predponaPrace) / hodnota(cas) ? 'A' : 'B';
		}
		const prevod = q.match(/([\d ]+) ([kM]?)W se rovná ([\d ]+) ([kM]?)W/i);
		if (prevod) {
			const [, leva, predponaLeva, prava, predponaPrava] = prevod;
			return hodnota(leva) * nasobek(predponaLeva) === hodnota(prava) * nasobek(predponaPrava) ? 'A' : 'B';
		}
		const tvrzeniJednotky = q.match(/Výrok:\s*([\d ]+\s*kWh) je (výkon|práce)/i);
		const vyznamVOpore = karta.opora.match(/^([\d ]+\s*kWh) je (výkon|práce)/i);
		if (tvrzeniJednotky && vyznamVOpore) return tvrzeniJednotky[2].toLowerCase() === vyznamVOpore[2].toLowerCase() ? 'A' : 'B';
	}
	return null;
};
for (const kolo of kola) for (const karta of kolo.karty) {
	const vypocet = fyzikalniOdpoved(karta, kolo.cislo);
	ok(vypocet !== null, `${karta.id}: test umí odpověď odvodit z fyzikálního zadání`);
	ok(karta.spravne === vypocet, `${karta.id}: odpověď ${karta.spravne} souhlasí s odvozením (${vypocet})`);
	const nap = napisy.get(karta.id) ?? '';
	if (kolo.cislo === 1) {
		const dvojice = dvojiceZeZadani(karta.otazka)?.map((s) => s.toLocaleUpperCase('cs-CZ')) ?? ['PRVNÍ', 'DRUHÝ'];
		const cil = dvojice[vypocet === 'A' ? 0 : 1];
		ok(nap.includes(cil), `${karta.id}: nápis po odhalení ukazuje vypočteného vítěze (${cil})`);
	} else if (kolo.cislo === 2) {
		const operace = vypocet === 'A' ? 'NÁSOBIT' : 'DĚLIT';
		ok(nap.startsWith(operace), `${karta.id}: nápis po odhalení ukazuje operaci ${operace}`);
		const vztahNapisu = vzorecZOpory(karta)?.zapis ?? '';
		ok(bezMezer(nap).includes(vztahNapisu), `${karta.id}: nápis po odhalení obsahuje správný výpočet ${vztahNapisu}`);
	} else {
		const platnost = vypocet === 'A' ? 'PLATÍ' : 'NEPLATÍ';
		ok(nap.startsWith(platnost), `${karta.id}: nápis po odhalení ukazuje ${platnost}`);
	}
}

for (const karta of kola[1]?.karty ?? []) {
	const vztah = vzorecZOpory(karta);
	ok(Boolean(vztah), `${karta.id}: opora obsahuje vztah pro samostatné odvození operace`);
	const vstupyOtazky = [...new Set(promenne(karta.otazka.split(/Jakou operací/i)[0]))].sort();
	ok(Boolean(vztah) && vstupyOtazky.join(',') === vztah.vstupy.join(','), `${karta.id}: vstupy otázky ${vstupyOtazky.join(',')} odpovídají pravé straně vztahu ${vztah?.vstupy.join(',')}`);
}

const koloKarty = new Map(kola.flatMap((kolo) => kolo.karty.map((karta) => [karta.id, kolo.cislo])));
const vysledekOdhaleni = (karta) => {
	const napis = napisy.get(karta.id) ?? '';
	const cisloKola = koloKarty.get(karta.id);
	if (cisloKola === 1) {
		const vitez = napis.split(':').at(-1)?.trim() ?? '';
		return /^(PRVNÍ|DRUHÝ)$/.test(vitez) ? '' : vitez;
	}
	if (cisloKola === 2) return napis.split(':').slice(1).join(':').trim();
	return '';
};
for (let i = 0; i < karty.length - 1; i++) {
	const dalsiVysledek = vysledekOdhaleni(karty[i + 1]);
	const aktualniNapis = bezMezer(napisy.get(karty[i].id) ?? '');
	ok(!dalsiVysledek || !aktualniNapis.includes(bezMezer(dalsiVysledek)), `${karty[i].id}: odhalení neobsahuje výsledek ani vztah následující karty ${karty[i + 1].id}`);
}

// Odpovědi A/B se nestřídají mechanicky, ale nikdy nejsou stejné třikrát za sebou.
const posloupnostOdpovedi = karty.map((k) => k.spravne).join('');
ok(!/(A{3}|B{3})/.test(posloupnostOdpovedi), `celá hra včetně hranic kol má nejvýše dvě stejné odpovědi za sebou (${posloupnostOdpovedi})`);
ok(kola[1]?.karty.filter((k) => vzorecZOpory(k)?.zapis === 'W=P·t').length === 1, 'kolo 2 zkouší vztah W = P · t právě jednou');
const podpisVztahu = (karta) => {
	const cil = karta.otazka.match(/vypočítáš (?:jeho )?(?:výkon|práci|čas|rychlost|sílu) ([PWtFv])/i)?.[1] ?? '';
	const vstupy = [...new Set(promenne(karta.otazka.split(/Jakou operací/i)[0]))].sort();
	return cil && vstupy.length === 2 ? `${cil}<-${vstupy.join(',')}` : '';
};
const podpisyVztahu = (kola[1]?.karty ?? []).map(podpisVztahu);
ok(podpisyVztahu.every(Boolean), `kolo 2: u každé karty lze určit cíl a dva vstupy (${podpisyVztahu.join(' | ')})`);
ok(new Set(podpisyVztahu).size === podpisyVztahu.length, 'kolo 2: žádné dvě karty nepočítají tutéž veličinu ze stejných vstupů');
const zamernePomalejsi = kola[0]?.karty.filter((k) => /(První|Druhý).+(delší čas|menší práci)/.test(k.otazka)).length ?? 0;
ok(zamernePomalejsi >= 2, `kolo 1: nejméně dvě zadání jmenují pomalejší/slabší stranu (jsou ${zamernePomalejsi})`);
for (const karta of kola[0]?.karty ?? []) {
	ok(/^k1-srovnani-\d$/.test(karta.id), `${karta.id}: vnitřní id neprozrazuje vítěze ani vlastnost`);
	const dotaz = karta.otazka.split('.').at(-1) || karta.otazka.split('.').at(-2) || '';
	ok(!/(první|druhý|bagr|dělník)/i.test(dotaz), `${karta.id}: závěrečná otázka nejmenuje očekávanou odpověď`);
}
ok(new Set(karty.map((k) => k.otazka)).size === karty.length, 'žádné dvě karty nemají duplicitní otázku');
ok(!/první dělník, nebo druhý bagr|k1-kratsi-prvni|k1-kratsi-druhy/.test(zdroj), 've zdroji nezůstal text ani id staré verze');

// f) Scény, odhalování a nepřetržitá viditelnost těles.
const sceny = new Set([...zdroj.matchAll(/case '([^']+)'/g)].map((m) => m[1]));
for (const karta of karty) ok(Boolean(karta.scena) && sceny.has(karta.scena), `${karta.id}: scéna „${karta.scena}“ existuje`);
ok(/scenyHtml\[c\.id\]\s*=/.test(zdroj) && /data-karta=\{k\.id\}[^>]*scenyHtml\[k\.id\]/.test(zdroj), 'každá karta dostává klíč ve scenyHtml a prvek data-karta');
ok(/<animate(?:Transform)?\b/.test(zdroj), 'scény používají inline SMIL animace');
const odhaly = [...zdroj.matchAll(/<g\s+data-odhal="1"[^>]*>/g)].map((m) => m[0]);
ok(odhaly.length >= 1 && odhaly.every((tag) => /opacity="0"/.test(tag)), 'prvky data-odhal mají výchozí opacity 0');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '1'\)\)/.test(zdroj), 'odhalení přepíná opacity atributem na 1');
ok(/\[data-odhal\]`\)\.forEach\(\(el\) => el\.setAttribute\('opacity', '0'\)\)/.test(zdroj), 'nová karta vrací opacity atributem na 0');
ok(!/<animate(?:Transform)?\b[^>]*attributeName="(?:opacity|display|visibility)"/.test(zdroj), 'animovaná tělesa během periody nemizí');
ok(/\$\{NAPIS\[c\.id\]\}<\/text><\/g><\/svg>/.test(zdroj), 'nápis s odpovědí je uvnitř prvku data-odhal');
ok(/el\.classList\.toggle\('spravna', el\.dataset\.m === c\.spravne\);/.test(zdroj), 'odhalení označí jako správnou právě jednu možnost shodnou s daty karty');
const blokScen = zdroj.match(/function scenaSvg\(s: string\): string \{[\s\S]*?\n\}/)?.[0] ?? '';
ok(!/(větší výkon:|správně|NÁSOBIT|DĚLIT|NEPLATÍ|PLATÍ|✔)/i.test(blokScen), 'scény před odhalením neobsahují výsledek ani značku správnosti');
const obsahyScen = new Map([...blokScen.matchAll(/case '([^']+)': return ([^;]+);/g)].map((m) => [
	m[1], m[2].replace(/'#[0-9a-f]{3,8}'/gi, "'#barva'").replace(/\s+/g, ''),
]));
const podpisyScenKola2 = (kola[1]?.karty ?? []).map((k) => obsahyScen.get(k.scena) ?? '');
ok(podpisyScenKola2.every(Boolean), 'kolo 2: obsah každé scény byl načten');
ok(new Set(podpisyScenKola2).size === podpisyScenKola2.length, 'kolo 2: scény se liší obsahem, ne jen názvem nebo barvou');
const parametrySrovnani = new Map([...blokScen.matchAll(/case '(srovnani-\d)': return srovnani\('([^']+)', '([^']+)', '[^']*', '[^']*', '([^']+)', '([^']+)', (\d+), (\d+), (true|false), (true|false), (true|false), (true|false),/g)]
	.map((m) => [m[1], {
		leva: m[2], prava: m[3], casA: m[4], casB: m[5], praceA: Number(m[6]), praceB: Number(m[7]),
		lideA: m[8] === 'true', lideB: m[9] === 'true', bagrA: m[10] === 'true', bagrB: m[11] === 'true',
	}]));
const ocekavaniZeZadani = (q) => {
	let casA = 'stejný čas'; let casB = 'stejný čas';
	const cas = q.match(/(Bagr|Dělník|První|Druhý)[^.]*?(kratší|delší) čas/i);
	if (cas) {
		const strana = stranaSubjektu(cas[1], q);
		const popsany = `${cas[2].toLowerCase()} čas`;
		const opacny = cas[2].toLowerCase() === 'kratší' ? 'delší čas' : 'kratší čas';
		if (strana === 'A') [casA, casB] = [popsany, opacny]; else [casA, casB] = [opacny, popsany];
	}
	let vztahPrace = 0;
	const prace = q.match(/(První|Druhý)[^.]*?(větší|menší) práci/i);
	if (prace) {
		const znamenko = prace[2].toLowerCase() === 'větší' ? 1 : -1;
		vztahPrace = stranaSubjektu(prace[1], q) === 'A' ? znamenko : -znamenko;
	}
	const dvojice = dvojiceZeZadani(q);
	if (dvojice) return {
		casA, casB, vztahPrace,
		leva: `první: ${dvojice[0]}`, prava: `druhý: ${dvojice[1]}`,
		lideA: dvojice[0] === 'dělník', lideB: dvojice[1] === 'dělník',
		bagrA: dvojice[0] === 'bagr', bagrB: dvojice[1] === 'bagr',
	};
	if (/^Dva lidé/i.test(q)) return { casA, casB, vztahPrace, leva: 'první: člověk', prava: 'druhý: člověk', lideA: true, lideB: true, bagrA: false, bagrB: false };
	return { casA, casB, vztahPrace, leva: 'první: stroj', prava: 'druhý: stroj', lideA: false, lideB: false, bagrA: false, bagrB: false };
};
for (const karta of kola[0]?.karty ?? []) {
	const p = parametrySrovnani.get(karta.scena);
	const ocekavano = ocekavaniZeZadani(karta.otazka);
	ok(Boolean(p) && p.casA === ocekavano.casA && p.casB === ocekavano.casB, `${karta.scena}: ukazatele času jsou odvozené ze zadání`);
	const vztahPrace = p ? Math.sign(p.praceA - p.praceB) : NaN;
	ok(vztahPrace === ocekavano.vztahPrace, `${karta.scena}: hromádky práce jsou odvozené ze zadání`);
	ok(Boolean(p) && p.leva === ocekavano.leva && p.prava === ocekavano.prava, `${karta.scena}: popisky první/druhý odpovídají pořadí v otázce`);
	ok(Boolean(p) && p.lideA === ocekavano.lideA && p.lideB === ocekavano.lideB, `${karta.scena}: každý člověk je postava a každý stroj není postava`);
	ok(Boolean(p) && p.bagrA === ocekavano.bagrA && p.bagrB === ocekavano.bagrB, `${karta.scena}: bagr je na straně určené textem otázky`);
}
const blokPostavy = zdroj.match(/const postava =[^]*?`;/)?.[0] ?? '';
const blokStroje = zdroj.match(/const stroj =[^]*?`;/)?.[0] ?? '';
const blokBagru = zdroj.match(/const bagr =[^]*?`;/)?.[0] ?? '';
ok(/data-objekt="clovek"/.test(blokPostavy) && /<path d=/.test(blokPostavy) && !/<text\b|data-cast="pas"/.test(blokPostavy), 'postava je jeden člověk bez vedlejšího emoji a bez pásů');
ok(/M\$\{x \+ 75\} 257 V292[^\n]+L\$\{x \+ 48\} 310[^\n]+L\$\{x \+ 102\} 310/.test(blokPostavy), 'trup začíná pod hlavou a chodidla končí na podlaze');
ok(/maKrompac[^]*data-cast="krompac"/.test(blokPostavy) && /\/dělník\/i\.test\(znak\)/.test(zdroj), 'dělník drží kreslený krompáč bez emoji');
ok(/data-objekt="stroj"/.test(blokStroje) && /data-cast="motor"/.test(blokStroje) && /data-cast="kabina"/.test(blokStroje) && /<circle\b/.test(blokStroje) && !/<text\b/.test(blokStroje), 'obecný stroj je kreslený vlastním tvarem bez textu nebo emoji');
const kolaStroje = [...blokStroje.matchAll(/cy="(\d+)" r="(\d+)"/g)].map((m) => Number(m[1]) + Number(m[2]));
ok(kolaStroje.length === 2 && kolaStroje.every((spodek) => spodek <= 318), 'kola obecného stroje neklesají pod podlahu');
ok(!/[⚙🏗🔧]/u.test(blokScen), 'scény nepoužívají emoji místo kresby stroje');
ok(/data-objekt="bagr"/.test(blokBagru) && /data-cast="pas"/.test(blokBagru) && /data-cast="rameno"/.test(blokBagru) && /data-cast="lzice"/.test(blokBagru) && !/<text\b|🚜/.test(blokBagru), 'bagr má pásy, rameno a lžíci a nepoužívá emoji traktoru');
const blokRucicek = zdroj.match(/const rucicky:[^{]+\{([\s\S]*?)\n\};/)?.[1] ?? '';
const tvaryRucicek = [...blokRucicek.matchAll(/'(kratší čas|stejný čas|delší čas)':\s*'([^']+)'/g)].map((m) => m[2]);
ok(tvaryRucicek.length === 3 && new Set(tvaryRucicek).size === 3, 'kratší, stejný a delší čas mají tři různé polohy ručiček');
const blokUkazatelu = zdroj.match(/const ukazatele =[^]*?`;/)?.[0] ?? '';
ok(/data-cas="\$\{cas\}"[^>]*d="\$\{posunRucicky\(x, cas\)\}"/.test(blokUkazatelu), 'každý ciferník používá ručičky pro svůj vlastní čas');
ok(/objekt\(75,[^)]*trvaniPro\(casA\)\)[^]*objekt\(415,[^)]*trvaniPro\(casB\)\)/.test(zdroj), 'každá strana používá tempo pohybu svého času');

// g) Regrese skrývání scén a restartu animace.
ok(/<div class="scena skryta" data-karta=\{k\.id\}/.test(zdroj) && !/<div class="scena[^"]*"[^>]*\shidden(?:\s|>)/.test(zdroj), 'scény začínají třídou skryta a nemají atribut hidden');
const cssSkryta = zdroj.match(/\.scena\.skryta\s*\{([^}]*)\}/)?.[1] ?? '';
ok(/visibility\s*:\s*hidden/.test(cssSkryta), 'CSS .scena.skryta obsahuje visibility: hidden');
ok(/classList\.toggle\('skryta',[\s\S]*?setCurrentTime\?\.\(0\)/.test(zdroj), 'po přepnutí scény se volá setCurrentTime(0)');

// i) Omezení pohybu: CSS vypne dekorace a JS zastaví SMIL i nepřidá konfety.
const reducedCss = zdroj.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\t\}/)?.[0] ?? '';
ok(Boolean(reducedCss), 'existuje CSS blok prefers-reduced-motion: reduce');
ok(/:global\(\.konfeta\)[\s\S]*display:\s*none/.test(reducedCss) && /animation:\s*none/.test(reducedCss), 'omezený pohyb účinným globálním selektorem skryje a zastaví dynamické konfety');
ok(/\.velke-tlacitko:hover\s*\{\s*transform:\s*none/.test(reducedCss), 'omezený pohyb vypne zvětšení tlačítka');
ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/.test(zdroj), 'JS zjišťuje systémovou volbu omezeného pohybu');
ok(/if \(omezenyPohyb\) sv\.pauseAnimations\?\.\(\); else sv\.unpauseAnimations/.test(zdroj), 'JS při omezeném pohybu zastaví SVG animace na úplném snímku');
ok(/if \(!omezenyPohyb\) for \(let i = 0; i < 40; i\+\+\)/.test(zdroj), 'JS při omezeném pohybu nevytváří konfety');

// j) Šířky se počítají ze skutečných textů scén metrikami Helvetica Bold (em/1000).
ok(/const velikostVyroku = \(text: string\) => text\.length > 15 \? 24 : text\.length > 12 \? 26 : 34/.test(zdroj), 'dlouhé výroky používají zmenšené písmo 24/26 px');
ok(/const velikostSymbolu = \(text: string\) => text\.length > 4 \? 34 : 44/.test(zdroj), 'dlouhý symbol kWh ? používá písmo 34 px');
const jednotkyHelveticaBold = (text) => [...text].reduce((s, znak) => s + (
	znak === ' ' ? 278 : /[1Iijl.,:;!?]/.test(znak) ? 278 : /[MWmw]/.test(znak) ? 889 :
	/[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/.test(znak) ? 722 : /[ftř]/.test(znak) ? 389 : 556
), 0);
const sirkaTextu = (text, px) => jednotkyHelveticaBold(text) * px / 1000;
const velikostVyrokuTest = (text) => text.length > 15 ? 24 : text.length > 12 ? 26 : 34;
const velikostSymboluTest = (text) => text.length > 4 ? 34 : 44;
const textyVyroku = [...blokScen.matchAll(/return vyrok\('([^']+)', '([^']+)'/g)].flatMap((m) => [m[1], m[2]]);
ok(textyVyroku.length === 10, `z komponenty načteno 10 textů výroků (je ${textyVyroku.length})`);
for (const popis of textyVyroku) {
	const sirka = sirkaTextu(popis, velikostVyrokuTest(popis));
	ok(sirka <= 199, `„${popis}“: vypočtená šířka ${sirka.toFixed(1)} px se vejde do 199 px`);
}
const symbolyVzorce = [...blokScen.matchAll(/return vzorec\(\[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]));
ok(symbolyVzorce.length === 15, `z komponenty načteno 15 symbolů vztahů (je ${symbolyVzorce.length})`);
for (const popis of symbolyVzorce) {
	const sirka = sirkaTextu(popis, velikostSymboluTest(popis));
	ok(sirka <= 108, `„${popis}“: vypočtená šířka ${sirka.toFixed(1)} px se vejde do kruhu`);
}
for (const [id, popis] of napisy) {
	const limit = 424;
	const sirka = sirkaTextu(popis, 22);
	ok(sirka <= limit, `${id}: nápis po odhalení ${sirka.toFixed(1)} px se vejde do ${limit} px`);
}

// k) Kontrast hlavních textových barev se načítá z CSS komponenty a vůči jejich skutečnému pozadí je nejméně 4,5 : 1.
const rgb = (hex) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
const jas = (hex) => rgb(hex).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
	.reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const kontrast = (a, b) => (Math.max(jas(a), jas(b)) + 0.05) / (Math.min(jas(a), jas(b)) + 0.05);
const styl = zdroj.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? '';
const cssBloky = [...styl.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
	selektory: m[1].trim().split(',').map((s) => s.trim()), deklarace: m[2],
}));
const cssHodnota = (selektor, vlastnost) => {
	let hodnota = '';
	for (const blok of cssBloky) if (blok.selektory.includes(selektor)) {
		const nalez = blok.deklarace.match(new RegExp(`(?:^|;)\\s*${vlastnost.replace('-', '\\-')}\\s*:\\s*([^;]+)`));
		if (nalez) hodnota = nalez[1].trim();
	}
	return hodnota;
};
const barvaCss = (selektor, vlastnost) => {
	const hexy = cssHodnota(selektor, vlastnost).match(/#(?:[0-9a-f]{6}|[0-9a-f]{3})\b/gi) ?? [];
	const hex = hexy.at(-1)?.toLowerCase() ?? '';
	return hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex;
};
const dvojiceKontrastu = [
	['.moznost > b', 'color', '.moznost-A > b', 'background', 'A na barevném kruhu'],
	['.moznost > b', 'color', '.moznost-B > b', 'background', 'B na barevném kruhu'],
	['.cislo-kola', 'color', '#hra-vykon', 'background', 'číslo kola na papíru'],
	['.lista-body', 'color', '#hra-vykon', 'background', 'body na papíru'],
	['.odpocet-cislo', 'color', '#hra-vykon', 'background', 'odpočet na papíru'],
	['.podnadpis', 'color', '#hra-vykon', 'background', 'podnadpis na papíru'],
	['.pozn', 'color', '#hra-vykon', 'background', 'poznámka na papíru'],
	['.proc', 'color', '#hra-vykon', 'background', 'vysvětlení na papíru'],
	['.pokyn', 'color', '#hra-vykon', 'background', 'pokyn na papíru'],
	['.moznost small', 'color', '.moznost', 'background', 'doplněk možnosti na bílé'],
	['.moznost small', 'color', '.moznost.spravna', 'background', 'doplněk správné možnosti'],
];
ok(styl.length > 100, 'blok <style> komponenty byl načten pro měření kontrastu');
for (const [selektorTextu, vlastnostTextu, selektorPozadi, vlastnostPozadi, popis] of dvojiceKontrastu) {
	const barva = barvaCss(selektorTextu, vlastnostTextu);
	const pozadiBarva = barvaCss(selektorPozadi, vlastnostPozadi);
	ok(Boolean(barva && pozadiBarva), `${popis}: obě barvy byly načteny z CSS`);
	const pomer = kontrast(barva, pozadiBarva);
	ok(pomer >= 4.5, `${popis}: ${barva} na ${pozadiBarva} má kontrast ${pomer.toFixed(2)} : 1`);
}

// l) Hra funguje bez cizích adres.
ok(!/https?:\/\/(?!lab\.wonderly)/.test(zdroj.replace(/xmlns="[^"]+"/g, '')), 'komponenta nenačítá nic z cizích adres');

// m) Povinné mutace nad dočasnými kopiemi mimo repo.
if (!process.env.HRA_MUTACNI_BEH) {
	const beh = mkdtempSync(join(tmpdir(), 'hra-vykon-'));
	const mutace = [
		['dvě správné odpovědi', (s) => s.replace(
			"el.classList.toggle('spravna', el.dataset.m === c.spravne);",
			"el.classList.toggle('spravna', el.dataset.m === c.spravne || el.dataset.m === 'A');",
		)],
		['špatný výpočet v nápisu', (s) => s.replace("'k2-vykon': 'DĚLIT: P = W : t'", "'k2-vykon': 'DĚLIT: P = W · t'")],
		['špatné vstupy vztahu', (s) => s.replace(
			"otazka: 'Znáš výkon P a sílu F. Jakou operací vypočítáš rychlost v?'",
			"otazka: 'Znáš výkon P a čas t. Jakou operací vypočítáš rychlost v?'",
		)],
		['únik vztahu následující karty', (s) => s.replace(
			"'k2-vykon': 'DĚLIT: P = W : t'",
			"'k2-vykon': 'DĚLIT: P = W : t; příště W = P · t'",
		)],
		['chodidla pod podlahou', (s) => s.replace('L${x + 48} 310 M${x + 75} 292 L${x + 102} 310', 'L${x + 48} 315 M${x + 75} 292 L${x + 102} 315')],
		['dělník bez krompáče', (s) => s.replace('data-cast="krompac"', 'data-cast="chybi-krompac"')],
		['dvě karty se stejným vztahem', (s) => s
			.replace(
				"otazka: 'Znáš výkon P a sílu F. Jakou operací vypočítáš rychlost v?'",
				"otazka: 'Stroj vykonal práci W za čas t. Jakou operací vypočítáš jeho výkon P?'",
			)
			.replace("opora: 'tedy i v = P : F a F = P : v'", "opora: 'Vykonanou práci W vydělíme časem t.'")
			.replace("'k2-rychlost': 'DĚLIT: v = P : F'", "'k2-rychlost': 'DĚLIT: P = W : t'")],
		['stejný obsah scén pod jinými jmény', (s) => s.replace(
			"case 'vzorec-rychlost': return vzorec(['P', 'F', 'v ?'], '#b197fc');",
			"case 'vzorec-rychlost': return vzorec(['W', 't', 'P ?'], '#b197fc');",
		)],
		['špatný nápis po odhalení', (s) => s.replace("'k3-jeden-watt': 'PLATÍ'", "'k3-jeden-watt': 'NEPLATÍ'")],
		['popisek scény před odhalením', (s) => s.replace("srovnani('první: dělník'", "srovnani('větší výkon: BAGR'")],
		['odstraněný prefers-reduced-motion', (s) => s.replace(/\n\t@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\t\}/, '')],
		['neúčinný scoped selektor konfet', (s) => s.replace(':global(.konfeta) { display: none', '.konfeta { display: none')],
		['BAGR nakreslený jako postava', (s) => s.replace(
			"3, 3, true, false, false, true, '#9c5b20', '#fab005'",
			"3, 3, true, true, false, false, '#9c5b20', '#fab005'",
		)],
		['prohozené strany bagr a člověk', (s) => s.replace(
			"3, 3, true, false, false, true, '#9c5b20', '#fab005'",
			"3, 3, false, true, true, false, '#9c5b20', '#fab005'",
		)],
		['stejné ručičky u obou stran', (s) => s.replace(
			"'delší čas': 'M38 88 L29 101 M38 88 L49 94'",
			"'delší čas': 'M38 88 L49 76 M38 88 L51 94'",
		)],
		['barva textu s nízkým kontrastem', (s) => s.replace('.pozn { color: #5c5f66', '.pozn { color: #d0d0d0')],
	];
	console.log('\n| mutace | výsledek |');
	console.log('|---|---|');
	try {
		for (const [nazev, zmen] of mutace) {
			const mutovany = zmen(zdroj);
			const cesta = join(beh, `${nazev.replace(/[^a-z0-9]+/gi, '-')}.astro`);
			writeFileSync(cesta, mutovany);
			const vysledek = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
				cwd: koren, encoding: 'utf8', env: { ...process.env, HRA_KOMPONENTA: cesta, HRA_MUTACNI_BEH: '1' },
			});
			const chycena = mutovany !== zdroj && vysledek.status !== 0;
			ok(chycena, `mutace „${nazev}“ je zachycena`);
			console.log(`| ${nazev} | ${chycena ? 'CHYCENA' : 'NECHYCENA'} |`);
		}
	} finally {
		rmSync(beh, { recursive: true, force: true });
	}
}

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
process.exit(chyby ? 1 : 0);
