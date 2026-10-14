import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novyPrvek = (id) => { const p = { id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {}, value: '', classList: { add() {}, remove() {} }, setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; }, appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } }; prvky.set(id, p); return p; };
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: () => [],
	createElementNS: () => novyPrvek('x'),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
const krokSlider = novyPrvek('rr-b-krok'); krokSlider.value = '1';
vm.runInContext(skript, sandbox);

const bSvg = prvky.get('rr-b-svg');
const aSvg = prvky.get('rr-a-svg');
const bKrokOut = prvky.get('rr-b-krok-out');
const bCelkem = prvky.get('rr-b-celkem');
const bVzorec = prvky.get('rr-b-vzorec');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

console.log('— scéna A: štěpení jednoho jádra, krok po kroku —');
ok(typeof aSvg.__stavStepeni === 'function', 'pure funkce __stavStepeni existuje na svg');
ok(aSvg.__stavStepeni(0).rozstepeno === false, 'krok 0: jádro ještě celé');
ok(aSvg.__stavStepeni(1).rozstepeno === false, 'krok 1: zásah, ale ještě nerozštěpeno');
ok(aSvg.__stavStepeni(2).rozstepeno === true, 'krok 2: jádro se štěpí');
ok(aSvg.__stavStepeni(3).rozstepeno === true && aSvg.__stavStepeni(3).neutronyVen === 3, 'krok 3: hotovo, uvolní se 3 neutrony');
ok(aSvg.__stavStepeni(0).neutronyVen === 0 && aSvg.__stavStepeni(2).neutronyVen === 0, 'neutrony vyletí až v posledním kroku, ne dřív');

console.log('\n— scéna A: vykreslení jednotlivých kroků (klikání na „Další krok") —');
const aDalsi = prvky.get('rr-a-dalsi');
const aReset = prvky.get('rr-a-reset');
const aNeutronVstup = prvky.get('rr-a-neutron-vstup');
const aJadro = prvky.get('rr-a-jadro');
const aFragmenty = prvky.get('rr-a-fragmenty');
const aNeutronyVen = prvky.get('rr-a-neutrony-ven');
const aPopis = prvky.get('rr-a-popis');
const aEnergie = prvky.get('rr-a-energie');
const klikDalsi = () => aDalsi.posluchaci.click.forEach((f) => f());
const klikReset = () => aReset.posluchaci.click.forEach((f) => f());

ok(aNeutronVstup.innerHTML.includes('<circle cx="150" cy="130"') && aJadro.innerHTML.includes('U-235'), 'po načtení stránky (bez kliku) je scéna A v kroku 0: neutron letí, jádro celé');
ok(aJadro.innerHTML.includes('cx="310" cy="130" r="42"') && aJadro.innerHTML.includes('x="310" y="135"'), 'jádro U-235 uprostřed (310, 130), popisek pod středem y = 135');
klikReset();
ok(aNeutronVstup.innerHTML.includes('circle'), 'krok 0: neutron je vidět, jak letí k jádru');
ok(aJadro.innerHTML.includes('circle') && aFragmenty.innerHTML === '', 'krok 0: jádro je celé, fragmenty ještě nejsou');
klikDalsi();
ok(aNeutronVstup.innerHTML === '', 'krok 1: neutron už doletěl, nekreslí se letící');
ok(aJadro.innerHTML.includes('circle') && aFragmenty.innerHTML === '', 'krok 1: jádro pořád celé (jen zasažené)');
klikDalsi();
ok(aFragmenty.innerHTML.includes('circle') && aJadro.innerHTML === '', 'krok 2: jádro se už štěpí na fragmenty');
ok(aNeutronyVen.innerHTML === '', 'krok 2: nové neutrony ještě neletí ven');
ok(['cx="276"', 'cx="344"', 'x="276" y="135"', 'x="344" y="135"', '>Kr<', '>Ba<'].every((k) => aFragmenty.innerHTML.includes(k)), 'krok 2: fragmenty Kr a Ba se začínají rozjíždět (310 ∓ 34)');
klikDalsi();
ok(aNeutronyVen.innerHTML.split('circle').length - 1 === 3, 'krok 3: ven letí přesně 3 nové neutrony');
ok(['cx="250"', 'cx="370"', 'x="250" y="135"', 'x="370" y="135"', '>Kr<', '>Ba<'].every((k) => aFragmenty.innerHTML.includes(k)), 'krok 3: fragmenty Kr a Ba rozjeté dál od sebe (310 ∓ 60)');
ok(['cx="220" cy="60"', 'cx="400" cy="60"', 'cx="310" cy="42"'].every((k) => aNeutronyVen.innerHTML.includes(k)), 'krok 3: 3 neutrony vyletí do tří směrů');
ok(aEnergie.textContent.includes('TEPLO'), 'krok 3: je vidět, že se energie uvolní jako teplo');
ok(aPopis.textContent.includes('2 fragmenty'), 'krok 3: text popisuje 2 fragmenty');
klikDalsi();
ok(aNeutronVstup.innerHTML.includes('circle'), 'po kroku 3 se tlačítko „Další krok" vrátí na začátek (krok 0)');

console.log('\n— scéna B: čistá funkce __stavRetezovky musí existovat —');
ok(typeof bSvg.__stavRetezovky === 'function', 'pure funkce __stavRetezovky existuje na svg');

console.log('\n— posuvník: 4 generace (1, 3, 9, 27 se vejde celé) —');
const posuvnik = zdroj.match(/<input[^>]*id="rr-b-krok"[^>]*>/)[0];
ok(/min="1"/.test(posuvnik) && /max="4"/.test(posuvnik) && /step="1"/.test(posuvnik), `posuvník generací 1–4 po 1: ${posuvnik}`);

console.log('\n— řízená reakce: počet štěpení zůstává STEJNÝ (nejvýš lineární růst) —');
const r1 = bSvg.__stavRetezovky('rizena', 1);
const r4 = bSvg.__stavRetezovky('rizena', 4);
ok(r1.posledni === 1 && r1.pocty.join(',') === '1', 'generace 1: přesně 1 štěpení');
ok(r4.posledni === 1, 'generace 4: pořád jen 1 štěpení (konstanta)');
ok(r4.pocty.join(',') === '1,1,1,1', `řízená: v KAŽDÉ generaci je počet štěpení 1 — žádný nárůst (${r4.pocty.join(',')})`);
const pomerRizena = r4.posledni / r1.posledni;
ok(pomerRizena === 1, `poměr generace 4 / generace 1 u řízené je ${pomerRizena}`);
ok(r4.celkem === 4, `řízená: celkem od začátku roste LINEÁRNĚ (po 4 generacích: ${r4.celkem} = 4)`);
ok(r4.rust === 'stálý', `řízená: popis růstu „${r4.rust}"`);

console.log('\n— neřízená reakce: ze štěpení pokračují všechny 3 neutrony → ×3 (PDF 19 s. 5–7) —');
const n1 = bSvg.__stavRetezovky('nerizena', 1);
const n2 = bSvg.__stavRetezovky('nerizena', 2);
const n3 = bSvg.__stavRetezovky('nerizena', 3);
const n4 = bSvg.__stavRetezovky('nerizena', 4);
ok(n1.posledni === 1 && n1.pocty.join(',') === '1', 'generace 1: přesně 1 štěpení (stejný start jako řízená)');
ok(n2.posledni === 3, `generace 2 u neřízené: ${n2.posledni} (3 neutrony → 3 štěpení)`);
ok(n3.posledni === 9 && n3.celkem === 13, `generace 3 u neřízené: ${n3.posledni}, celkem ${n3.celkem} (1+3+9 = 13)`);
ok(n4.posledni === 27, `generace 4 u neřízené: ${n4.posledni} (3^3 = 27, ztrojnásobení každou generaci)`);
ok(n4.pocty.join(',') === '1,3,9,27', `neřízená posloupnost je geometrická (3×): ${n4.pocty.join(',')}`);
const pomerNerizena = n4.posledni / n1.posledni;
ok(pomerNerizena === 27, `poměr generace 4 / generace 1 u neřízené je ${pomerNerizena}`);
ok(n4.celkem === 40, `neřízená: celkem po 4 generacích ${n4.celkem} = 1+3+9+27 = 40`);
ok(n4.rust === 'lavinový', `neřízená: popis růstu „${n4.rust}"`);

console.log('\n— KLÍČOVÝ ROZDÍL: poměr růstu u neřízené musí být řádově větší než u řízené —');
ok(pomerNerizena > pomerRizena * 10, `neřízená (${pomerNerizena}×) roste přes 10× rychleji než řízená (${pomerRizena}×) mezi generací 1 a 4`);

console.log('\n— všechna čísla musí být celá (pravidlo webu pro děti) — všechny polohy posuvníku —');
let neceleB = 0;
for (const mode of ['rizena', 'nerizena']) for (let k = 1; k <= 4; k++) {
	const s = bSvg.__stavRetezovky(mode, k);
	if (s.pocty.length !== k || !s.pocty.every((n) => Number.isInteger(n)) || !Number.isInteger(s.celkem)) neceleB++;
}
ok(neceleB === 0, `všechny počty štěpení i celkové součty jsou celá čísla (necelých případů: ${neceleB})`);

console.log('\n— zobrazené texty a tečky na displeji musí sedět s výpočtem —');
const bTecky = prvky.get('rr-b-tecky');
const bCisla = prvky.get('rr-b-cisla');
const bSloupce = prvky.get('rr-b-sloupce');
const bStav = prvky.get('rr-b-stav');
const pocetKruhu = (h) => h.split('<circle').length - 1;
const nastavKrok = (k) => { krokSlider.value = String(k); krokSlider.posluchaci.input.forEach((f) => f()); };
const klikMode = (mode) => prvky.get('rr-b-' + mode).posluchaci.click.forEach((f) => f());
klikMode('rizena'); nastavKrok(4);
ok(bKrokOut.textContent === '4', `posuvník generace ukazuje „${bKrokOut.textContent}"`);
ok(bCelkem.textContent === 'Celkem rozštěpených jader od začátku: 4', `displej (řízená, 4 generace): „${bCelkem.textContent}"`);
ok(/1 → 1 → 1 → 1</.test(bVzorec.innerHTML), 'vzorec u řízené ukazuje konstantní posloupnost 1 → 1 → 1 → 1');
ok(pocetKruhu(bTecky.innerHTML) === 4, `řízená, 4 generace: nakreslené 4 tečky (je ${pocetKruhu(bTecky.innerHTML)})`);
ok(bStav.textContent.includes('přesně 1'), 'text řízené: pokračuje přesně 1 neutron');
ok(prvky.get('rr-b-rizena').style.opacity === '1' && prvky.get('rr-b-nerizena').style.opacity === '0.55', 'řízená vybraná: její tlačítko plné, druhé ztlumené na 0.55');
klikMode('nerizena'); nastavKrok(4);
ok(bCelkem.textContent === 'Celkem rozštěpených jader od začátku: 40', `displej (neřízená, 4 generace): „${bCelkem.textContent}" (1+3+9+27=40)`);
ok(/1 → 3 → 9 → 27</.test(bVzorec.innerHTML), 'vzorec u neřízené ukazuje ztrojnásobující posloupnost 1 → 3 → 9 → 27');
ok(pocetKruhu(bTecky.innerHTML) === 40, `neřízená, 4 generace: nakresleno všech 40 teček, nic se nezkracuje (je ${pocetKruhu(bTecky.innerHTML)})`);
ok(pocetKruhu(bSloupce.innerHTML) === 0 && (bSloupce.innerHTML.match(/generace/g) || []).length === 4, 'nadpisy 4 sloupců generací');
const cislaSloupcu = [...bCisla.innerHTML.matchAll(/>([^<]*)<\/text>/g)].map((m) => m[1]).join(',');
ok(cislaSloupcu === '1,3,9,27', `čísla pod sloupci: „${cislaSloupcu}" (bez značky „×")`);
const cyTecek = [...bTecky.innerHTML.matchAll(/cy="(\d+)"/g)].map((m) => +m[1]);
ok(cyTecek.length === 40 && Math.max(...cyTecek) + 6 < 315, `tečky se vejdou nad čísla (nejnižší cy = ${Math.max(...cyTecek)})`);
ok(Math.min(...cyTecek) === 90 && Math.max(...cyTecek) === 210, `27 teček v 7 řadách po 20 px od y = 90 do y = 210 (je ${Math.min(...cyTecek)}–${Math.max(...cyTecek)})`);
const cxTecek = [...bTecky.innerHTML.matchAll(/cx="(\d+)"/g)].map((m) => +m[1]);
const cxSloupec1 = [...new Set(cxTecek.filter((x) => x > 460))].sort((p, q) => p - q).join(',');
ok(cxSloupec1 === '508,526,544,562', `4. sloupec teček: 4 tečky v řadě po 18 px kolem x = 535 (cx ${cxSloupec1})`);
ok(Math.min(...cxTecek) - 6 > 0 && Math.max(...cxTecek) + 6 < 620, `tečky uvnitř scény šířky 620 (cx ${Math.min(...cxTecek)}–${Math.max(...cxTecek)})`);
ok(prvky.get('rr-b-nerizena').style.opacity === '1' && prvky.get('rr-b-rizena').style.opacity === '0.55', 'neřízená vybraná: její tlačítko plné, druhé ztlumené na 0.55');
const xSloupcu = [...bSloupce.innerHTML.matchAll(/x="(\d+)"/g)].map((m) => m[1]).join(',');
ok(xSloupcu === '85,235,385,535', `sloupce generací rozložené po šířce scény: x = ${xSloupcu}`);
ok(bStav.textContent.includes('všechny 3') && bStav.textContent.includes('ZTROJNÁSOBÍ'), 'text neřízené: pokračují všechny 3, počet se ZTROJNÁSOBÍ');
ok(!/ZDVOJ|pokračují 2|miliony/.test(zdroj), 'v komponentě nezůstalo „zdvojnásobí" / „pokračují 2" / „miliony" (bez opory)');
nastavKrok(1);
ok(bCelkem.textContent === 'Celkem rozštěpených jader od začátku: 1' && pocetKruhu(bTecky.innerHTML) === 1, 'posuvník zpět na 1: jedno štěpení, jedna tečka');

console.log('\n— neutron je šedý jako na obrázcích stránky (obr-02..05: #adb5bd, obrys #212529) —');
for (const id of ['rr-a-neutron-vstup', 'rr-a-neutrony-ven']) {
	const g = zdroj.match(new RegExp(`<g id="${id}"[^>]*>`))[0];
	ok(/fill="#adb5bd"/.test(g) && /stroke="#212529"/.test(g), `${id}: ${g}`);
}
ok(!/#1971c2/.test(zdroj), 'modrá #1971c2 (stará barva neutronu) už v komponentě není');

console.log('\n— texty odpovídají výkladu: moderátor zpomaluje, řízení dělají regulační tyče (pohlcení) —');
const htmlCast = zdroj.split('<script>')[0].replace(/^---[\s\S]*?---/, '');
ok(!/moderátor|nebrzdí|kontrolní tyč/.test(htmlCast + skript), 'žádné „moderátor rozhoduje" / „nebrzdí" / „kontrolní tyče" v textech simulace');
ok(/regulační tyče/.test(htmlCast) && /regulační tyče pohltí/.test(skript), 'řízení počtu neutronů = regulační tyče (pohlcení)');
ok(/se nepohltí/.test(skript), 'neřízená: žádné neutrony se nepohltí');
console.log('\n— popisky jader nedědí obrys skupiny (stroke="none") —');
for (const slovo of ['U-235', 'Kr', 'Ba']) {
	const t = skript.match(new RegExp(`<text[^>]*>${slovo}</text>`));
	ok(t && /stroke="none"/.test(t[0]), `popisek ${slovo}: ${t && t[0]}`);
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
