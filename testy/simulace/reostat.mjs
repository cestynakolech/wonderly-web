import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novyPrvek = (id) => { const p = { id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, classList: { add() {}, remove() {} }, setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; }, appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } }; prvky.set(id, p); return p; };
const tlacitka = [];
const tl = (d) => { const t = novyPrvek('tl' + JSON.stringify(d)); Object.assign(t.dataset, d); tlacitka.push(t); return t; };
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: (s) => s === '.reo-z-tl' ? [tl({ rezim: 'reostat' }), tl({ rezim: 'potenciometr' })] : [], createElementNS: () => novyPrvek('x') };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
const pos = novyPrvek('reo-jezdec-vstup'); pos.value = '0';
vm.runInContext(skript, sandbox);
const svg = prvky.get('reo-svg'), stav = prvky.get('reo-stav'), u1 = prvky.get('reo-udaj1'), u2 = prvky.get('reo-udaj2');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

console.log('— potenciometr: dělič NAPRÁZDNO (na výstupu je voltmetr, ne žárovka) —');
let necele = 0;
for (let k = 0; k <= 4; k++) { const U = svg.__potenciometr(k / 4).Uvystup; if (Math.abs(U - Math.round(U)) > 1e-9) necele++; }
ok(necele === 0, `všechny 4 kroky jezdce dají celé volty (necelých: ${necele})`);
ok(svg.__potenciometr(0).Uvystup === 12, 'jezdec vlevo → plných 12 V');
ok(svg.__potenciometr(1).Uvystup === 0, 'jezdec vpravo → 0 V');
ok(svg.__potenciometr(0.5).Uvystup === 6, 'uprostřed → přesně polovina, 6 V');
// NÁLEZ KONTROLORA: obě části drátu musí být zapojené a jejich součet je celý drát
const p5 = svg.__potenciometr(0.5);
ok(p5.R1 + p5.R2 === 40, `R₁ (${p5.R1} Ω) + R₂ (${p5.R2} Ω) = celý drát 40 Ω`);
ok(p5.R1 > 0 && p5.R2 > 0, 'u potenciometru jsou zapojené OBĚ části drátu (výklad to vyžaduje)');

console.log('\n— reostat: víc drátu = menší proud, a všechna čísla celá —');
const r0 = svg.__reostat(0), r1 = svg.__reostat(1);
ok(r0.R === 10 && Math.abs(r0.I * 1000 - 1200) < 1e-6, 'jezdec vlevo: 10 Ω, 1200 mA');
ok(r1.R === 50 && Math.abs(r1.I * 1000 - 240) < 1e-6, 'jezdec vpravo: 50 Ω, 240 mA');
let neceleI = 0;
for (let k = 0; k <= 4; k++) { const mA = svg.__reostat(k / 4).I * 1000; if (Math.abs(mA - Math.round(mA)) > 1e-6) neceleI++; }
ok(neceleI === 0, `proud vychází v celých mA ve všech 5 polohách (necelých: ${neceleI})`);
let klesa = true;
for (let k = 1; k <= 4; k++) if (svg.__reostat(k / 4).I >= svg.__reostat((k - 1) / 4).I) klesa = false;
ok(klesa, 'proud klesá s každým posunem jezdce doprava (monotónní)');
ok(r1.I > 0, 'reostatem proud teče i v krajní poloze — nedokáže ho vypnout na nulu');
// NÁLEZ KONTROLORA: jas se musí řídit VÝKONEM, ne proudem (jinak by 240 mA vypadalo jako 20 % jasu)
ok(Math.abs(r1.jas - 0.04) < 0.001, `v krajní poloze zbyde jen ${(r1.jas * 100).toFixed(0)} % jasu (výkon, ne proud)`);

console.log('\n— rozdíl obou zapojení (to je pointa) —');
ok(svg.__potenciometr(1).Uvystup === 0 && svg.__reostat(1).I > 0,
  'potenciometr umí stáhnout na nulu, reostat ne — simulace ten rozdíl ukáže');

console.log('\n— texty —');
const klik = (r) => tlacitka.find((x) => x.dataset.rezim === r).posluchaci.click.forEach((f) => f());
klik('potenciometr');
ok(stav.textContent.length > 60 && /hlasitost|jas/.test(stav.textContent), 'u potenciometru je uveden příklad z praxe');
ok(!/i vpravo proud pořád teče/.test(stav.textContent), 'není tam nepravdivé tvrzení o proudu v odpojené části');
klik('reostat');
ok(stav.textContent.length > 60, 'u reostatu je vysvětlení');

// NÁLEZ NEZÁVISLÉHO AUDITU 1. 8. 2026: test si načítal prvek `reo-udaj2` a NIKDY ho
// nepoužil — čísla, která žák na displeji doopravdy vidí, se nekontrolovala. Podvrh
// se sedmkrát větším proudem testem prošel. Proto se čte skutečný obsah displeje
// a porovnává s tím, co vyjde z čisté funkce.
console.log('\n— čísla na displeji musí sedět s výpočtem —');
// jezdec je posuvník 0–100 %, ne 0–1 — na tenhle rozdíl test hned napoprvé narazil
const nastavJezdec = (f) => { pos.value = String(Math.round(f * 100)); pos.posluchaci.input.forEach((g) => g()); };
klik('reostat');
for (const f of [0, 0.5, 1]) {
	nastavJezdec(f);
	const v = svg.__reostat(f);
	ok(u1.textContent === `R celkem = ${Math.round(v.R)} Ω`, `jezdec ${f}: displej ukazuje „${u1.textContent}"`);
	ok(u2.textContent === `I = ${Math.round(v.I * 1000)} mA`, `jezdec ${f}: displej ukazuje „${u2.textContent}"`);
}
klik('potenciometr');
for (const f of [0, 0.5, 1]) {
	nastavJezdec(f);
	ok(u2.textContent === `U = ${Math.round(svg.__potenciometr(f).Uvystup)} V z 12 V`, `potenciometr ${f}: displej ukazuje „${u2.textContent}"`);
}
klik('reostat');

console.log('\n— schéma musí být UZAVŘENÝ obvod —');
const svgText = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];
ok(/M460 206 L460 250/.test(svgText), 'od spotřebiče vede vodič zpět na spodní kolejnici');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
