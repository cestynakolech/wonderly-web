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

klikReset();
ok(aNeutronVstup.innerHTML.includes('circle'), 'krok 0: neutron je vidět, jak letí k jádru');
ok(aJadro.innerHTML.includes('circle') && aFragmenty.innerHTML === '', 'krok 0: jádro je celé, fragmenty ještě nejsou');
klikDalsi();
ok(aNeutronVstup.innerHTML === '', 'krok 1: neutron už doletěl, nekreslí se letící');
ok(aJadro.innerHTML.includes('circle') && aFragmenty.innerHTML === '', 'krok 1: jádro pořád celé (jen zasažené)');
klikDalsi();
ok(aFragmenty.innerHTML.includes('circle') && aJadro.innerHTML === '', 'krok 2: jádro se už štěpí na fragmenty');
ok(aNeutronyVen.innerHTML === '', 'krok 2: nové neutrony ještě neletí ven');
klikDalsi();
ok(aNeutronyVen.innerHTML.split('circle').length - 1 === 3, 'krok 3: ven letí přesně 3 nové neutrony');
ok(aEnergie.textContent.includes('TEPLO'), 'krok 3: je vidět, že se energie uvolní jako teplo');
ok(aPopis.textContent.includes('2 fragmenty'), 'krok 3: text popisuje 2 fragmenty');
klikDalsi();
ok(aNeutronVstup.innerHTML.includes('circle'), 'po kroku 3 se tlačítko „Další krok" vrátí na začátek (krok 0)');

console.log('\n— scéna B: čistá funkce __stavRetezovky musí existovat —');
ok(typeof bSvg.__stavRetezovky === 'function', 'pure funkce __stavRetezovky existuje na svg');

console.log('\n— řízená reakce: počet štěpení zůstává STEJNÝ (nejvýš lineární růst) —');
const r1 = bSvg.__stavRetezovky('rizena', 1);
const r5 = bSvg.__stavRetezovky('rizena', 5);
const r6 = bSvg.__stavRetezovky('rizena', 6);
ok(r1.posledni === 1, 'generace 1: přesně 1 štěpení');
ok(r5.posledni === 1, 'generace 5: pořád jen 1 štěpení (konstanta)');
ok(r5.pocty.every((n) => n === 1), 'řízená: v KAŽDÉ generaci je počet štěpení 1 — žádný nárůst');
const pomerRizena = r5.posledni / r1.posledni;
ok(pomerRizena === 1, `poměr generace 5 / generace 1 u řízené je ${pomerRizena} (≤ 1, nejvýš lineární)`);
ok(r6.celkem === 6, `řízená: celkem od začátku roste LINEÁRNĚ (po 6 generacích: ${r6.celkem} = 6)`);

console.log('\n— neřízená reakce: počet štěpení roste EXPONENCIÁLNĚ —');
const n1 = bSvg.__stavRetezovky('nerizena', 1);
const n5 = bSvg.__stavRetezovky('nerizena', 5);
const n6 = bSvg.__stavRetezovky('nerizena', 6);
ok(n1.posledni === 1, 'generace 1: přesně 1 štěpení (stejný start jako řízená)');
ok(n5.posledni === 16, `generace 5 u neřízené: ${n5.posledni} (2^4 = 16, zdvojnásobení každou generaci)`);
ok(n6.pocty.join(',') === '1,2,4,8,16,32', `neřízená posloupnost je geometrická (2×): ${n6.pocty.join(',')}`);
const pomerNerizena = n5.posledni / n1.posledni;
ok(pomerNerizena === 16, `poměr generace 5 / generace 1 u neřízené je ${pomerNerizena}`);
ok(n6.celkem === 63, `neřízená: celkem od začátku roste exponenciálně (po 6 generacích: ${n6.celkem} = 2^6 - 1)`);

console.log('\n— KLÍČOVÝ ROZDÍL: poměr růstu u neřízené musí být řádově větší než u řízené —');
ok(pomerNerizena > pomerRizena * 10, `neřízená (${pomerNerizena}×) roste přes 10× rychleji než řízená (${pomerRizena}×) mezi generací 1 a 5`);

console.log('\n— všechna čísla musí být celá (pravidlo webu pro děti) —');
let neceleB = 0;
for (const mode of ['rizena', 'nerizena']) for (let k = 1; k <= 6; k++) {
	const s = bSvg.__stavRetezovky(mode, k);
	if (!s.pocty.every((n) => Number.isInteger(n)) || !Number.isInteger(s.celkem)) neceleB++;
}
ok(neceleB === 0, `všechny počty štěpení i celkové součty jsou celá čísla (necelých případů: ${neceleB})`);

console.log('\n— zobrazené texty na displeji musí sedět s výpočtem —');
const nastavKrok = (k) => { krokSlider.value = String(k); krokSlider.posluchaci.input.forEach((f) => f()); };
const klikMode = (mode) => prvky.get('rr-b-' + mode).posluchaci.click.forEach((f) => f());
klikMode('rizena'); nastavKrok(5);
ok(bKrokOut.textContent === '5', `posuvník generace ukazuje „${bKrokOut.textContent}"`);
ok(bCelkem.textContent === 'Celkem rozštěpených jader od začátku: 5', `displej (řízená, 5 generací): „${bCelkem.textContent}"`);
ok(/1 → 1 → 1 → 1 → 1/.test(bVzorec.innerHTML), 'vzorec u řízené ukazuje konstantní posloupnost 1 → 1 → 1 …');
klikMode('nerizena'); nastavKrok(5);
ok(bCelkem.textContent === 'Celkem rozštěpených jader od začátku: 31', `displej (neřízená, 5 generací): „${bCelkem.textContent}" (1+2+4+8+16=31)`);
ok(/1 → 2 → 4 → 8 → 16/.test(bVzorec.innerHTML), 'vzorec u neřízené ukazuje zdvojnásobující posloupnost 1 → 2 → 4 → 8 → 16');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
