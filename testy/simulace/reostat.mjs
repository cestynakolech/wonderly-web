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
const svg = prvky.get('reo-svg'), stav = prvky.get('reo-stav'), u2 = prvky.get('reo-udaj2');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

console.log('— potenciometr: napětí musí vycházet v CELÝCH voltech —');
let necele = 0;
for (let k = 0; k <= 10; k++) { const U = svg.__potenciometr(k / 10).Uz; if (Math.abs(U - Math.round(U)) > 1e-9) necele++; }
ok(necele === 0, `všech 11 poloh jezdce dá celé volty (necelých: ${necele})`);
ok(svg.__potenciometr(0).Uz === 10, `jezdec vlevo → plných 10 V`);
ok(svg.__potenciometr(1).Uz === 0, `jezdec vpravo → 0 V (žárovka zhasne)`);
ok(svg.__potenciometr(0.5).Uz === 5, `uprostřed → přesně polovina, 5 V`);

console.log('\n— reostat: víc drátu = menší proud —');
const r0 = svg.__reostat(0), r1 = svg.__reostat(1);
ok(r0.R === 10 && Math.abs(r0.I - 1) < 1e-9, `jezdec vlevo: odpor 10 Ω, proud 1 A`);
ok(r1.R === 50 && Math.abs(r1.I - 0.2) < 1e-9, `jezdec vpravo: odpor 50 Ω, proud 0,2 A`);
let klesa = true;
for (let k = 1; k <= 10; k++) if (svg.__reostat(k / 10).I >= svg.__reostat((k - 1) / 10).I) klesa = false;
ok(klesa, 'proud klesá s každým posunem jezdce doprava (monotónní)');
ok(r1.I > 0, 'reostatem proud teče i v krajní poloze — žárovka nikdy nezhasne úplně');

console.log('\n— rozdíl obou zapojení (to je pointa) —');
ok(svg.__potenciometr(1).Uz === 0 && svg.__reostat(1).I > 0,
  'potenciometr umí stáhnout na nulu, reostat ne — simulace ten rozdíl ukáže');

console.log('\n— texty —');
const klik = (r) => tlacitka.find((x) => x.dataset.rezim === r).posluchaci.click.forEach((f) => f());
klik('potenciometr');
ok(stav.textContent.length > 60 && /hlasitost|jas/.test(stav.textContent), 'u potenciometru je uveden příklad z praxe');
klik('reostat');
ok(stav.textContent.length > 60, 'u reostatu je vysvětlení');
console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
