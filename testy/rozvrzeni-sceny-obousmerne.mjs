// OBOUSMĚRNÉ OVĚŘENÍ měřidla `rozvrzeni-sceny.mjs` — podvrh se musí najít, zdravá scéna musí mlčet.
//
// Proč zvlášť: doklad, který se nedá SPUSTIT, je zase jen tvrzení. Rejstřík
// testy/obousmerne.json u každého měřidla čeká v poli `test` cestu ke spustitelnému
// souboru — tohle je ten soubor pro měřidlo rozvržení scén.
//
// Co se ověřuje (každý bod vypíše ✅/❌, na konci nenulový kód, když cokoli neplatí):
//   1. ZDRAVÁ scéna (kopie nasazené ArchimedesSimulace) → 0 nálezů, kód 0
//      + kotva proti falešné nule: musel se opravdu změřit nenulový počet prvků.
//   2. PODVRH A — rámeček popisku posunutý na x="0" → přetečení vlevo, kód 1.
//   3. PODVRH B — rozšířený viewBox při stejném obsahu → varování „nevyužité plátno".
//   4. ZPĚTNÁ KOTVA na SKUTEČNÉ vadě: nasazená verze MagnetyOpakovaniSimulace
//      z commitu f30767b (přes `git show` do /tmp) — měřidlo musí najít obě vady,
//      které 14. 8. 2026 našel až člověk pohledem na vyrenderovaný obrázek:
//      useknutý obrys rámečku na levém okraji a obsah natlačený doleva.
//      Tohle je nejsilnější část dokladu — kotva na vadě, která se opravdu stala,
//      ne na vymyšleném podvrhu.
//   5. REGRESE falešných poplachů: pět nasazených simulací, které první verze
//      měřidla hlásila neprávem (pruh přes celou šířku, paprsek končící na okraji,
//      atribut psaný astro výrazem `x={…}`, zástupka vystředěná na počátek).
//      Kdyby se prahy povolily zpátky, spadne to tady.
//
// Do repa se NIC nezapisuje — všechny podvrhy vznikají v dočasné složce ve /tmp
// a na konci se mažou. Pracovní verze magnetů v repu se nepoužívá (je opravená);
// kotva bere výhradně historickou verzi z gitu.
//
// Spuštění: node testy/rozvrzeni-sceny-obousmerne.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const zde = dirname(fileURLToPath(import.meta.url));
const koren = join(zde, '..');
const meridlo = join(zde, 'rozvrzeni-sceny.mjs');
const KOMPONENTY = join(koren, 'src', 'components', 'skola2');
const COMMIT_MAGNETY = 'f30767b'; // nasazená verze magnetů PŘED opravou vzhledu

let chyb = 0;
let kontrol = 0;
function tvrdi(popis, podminka, detail = '') {
	kontrol++;
	if (podminka) console.log(`  ✅ ${popis}`);
	else {
		chyb++;
		console.log(`  ❌ ${popis}${detail ? ` — ${detail}` : ''}`);
	}
}

const docasna = mkdtempSync(join(tmpdir(), 'rozvrzeni-obousmerne-'));
const uklid = () => rmSync(docasna, { recursive: true, force: true });

/** Spustí měřidlo nad souborem a vrátí { kod, vypis, tvrde, varovani, scen, prvku }. */
function zmer(soubor, ...argumenty) {
	const r = spawnSync(process.execPath, [meridlo, soubor, ...argumenty], { encoding: 'utf8', cwd: koren, timeout: 120000 });
	const vypis = (r.stdout ?? '') + (r.stderr ?? '');
	const souhrn = vypis.match(/Tvrdých chyb \([^)]*\): (\d+) · varování \([^)]*\): (\d+)/);
	const pocty = vypis.match(/(\d+) scén, (\d+) změřených prvků/);
	return {
		kod: r.status,
		vypis,
		tvrde: souhrn ? Number(souhrn[1]) : null,
		varovani: souhrn ? Number(souhrn[2]) : null,
		scen: pocty ? Number(pocty[1]) : 0,
		prvku: pocty ? Number(pocty[2]) : 0,
	};
}

/** Vyrobí ve /tmp variantu komponenty. Když se vzor NENAJDE, je to tvrdá chyba:
 *  podvrh, který se ve skutečnosti neprovedl, by měřidlu vystavil falešné vysvědčení
 *  („nic nenašlo" na souboru, do kterého se vada nikdy nedostala). */
function vyrob(jmeno, zdrojovyText, vzor, nahrada) {
	const cil = join(docasna, jmeno);
	const novy = zdrojovyText.replace(vzor, nahrada);
	const zmeneno = novy !== zdrojovyText;
	writeFileSync(cil, novy);
	return { cil, zmeneno };
}

// ─────────────────────────────────────────────── 1. ZDRAVÁ SCÉNA ─────────────
console.log('ZDRAVÁ SCÉNA (kopie nasazené ArchimedesSimulace)');
const zdrojZdravy = readFileSync(join(KOMPONENTY, 'ArchimedesSimulace.astro'), 'utf8');
const zdravy = join(docasna, 'ZdravaSimulace.astro');
writeFileSync(zdravy, zdrojZdravy);
const vZdravy = zmer(zdravy);
tvrdi('nad zdravou scénou 0 tvrdých chyb', vZdravy.tvrde === 0, `hlásí ${vZdravy.tvrde}`);
tvrdi('nad zdravou scénou 0 varování', vZdravy.varovani === 0, `hlásí ${vZdravy.varovani}`);
tvrdi('zdravá scéna končí kódem 0', vZdravy.kod === 0, `kód ${vZdravy.kod}`);
tvrdi('hlásí „✅ Rozvržení scén v pořádku"', vZdravy.vypis.includes('✅ Rozvržení scén v pořádku'));
// kotva proti falešné nule: „nic nenašlo" nesmí znamenat „nic neměřilo"
tvrdi('a přitom opravdu něco změřil (falešná nula)', vZdravy.scen >= 1 && vZdravy.prvku >= 10, `${vZdravy.scen} scén, ${vZdravy.prvku} prvků`);

// ─────────────────────────────────────── 2. PODVRH A: rámeček na okraji ──────
console.log('\nPODVRH A — rámeček popisku posunutý z x="300" na x="0"');
const A = vyrob('PodvrhASimulace.astro', zdrojZdravy, '<rect x="300" y="28" width="60" height="64"', '<rect x="0" y="28" width="60" height="64"');
tvrdi('podvrh se do kopie opravdu zapsal', A.zmeneno, 'vzor <rect x="300" y="28" …> se v ArchimedesSimulace nenašel — podvrh je potřeba přepsat podle nového zdroje');
const vA = zmer(A.cil);
tvrdi('podvrh A se najde jako tvrdá chyba', vA.tvrde >= 1, `hlásí ${vA.tvrde}`);
tvrdi('nález mluví o přetečení vlevo', /přetéká plátno vlevo/.test(vA.vypis));
tvrdi('nález ukazuje na <rect> a započítal obrys', /❌.*<rect>.*\+ obrys/.test(vA.vypis));
tvrdi('podvrh A končí kódem 1', vA.kod === 1, `kód ${vA.kod}`);

// ────────────────────────────── 3. PODVRH B: nevyužité plátno ────────────────
console.log('\nPODVRH B — plátno rozšířené na viewBox "0 0 1100 380" při stejném obsahu');
const B = vyrob('PodvrhBSimulace.astro', zdrojZdravy, 'viewBox="0 0 660 380"', 'viewBox="0 0 1100 380"');
tvrdi('podvrh se do kopie opravdu zapsal', B.zmeneno, 'viewBox="0 0 660 380" se v ArchimedesSimulace nenašel');
const vB = zmer(B.cil, '--varovani-jsou-chyby');
tvrdi('podvrh B dá varování o nevyužitém plátně', vB.varovani >= 1, `hlásí ${vB.varovani}`);
tvrdi('varování mluví o zabrané šířce plátna', /obsah zabírá jen \d+ % šířky plátna/.test(vB.vypis));
tvrdi('a NENÍ to zaměněné za přetečení (0 tvrdých chyb)', vB.tvrde === 0, `tvrdých chyb ${vB.tvrde}`);
tvrdi('s přepínačem --varovani-jsou-chyby končí kódem 1', vB.kod === 1, `kód ${vB.kod}`);

// ──────────────────── 4. ZPĚTNÁ KOTVA: skutečná vada nasazených magnetů ──────
console.log(`\nZPĚTNÁ KOTVA — nasazená verze magnetů z commitu ${COMMIT_MAGNETY} (skutečná vada, kterou našel člověk)`);
const cesta = 'src/components/skola2/MagnetyOpakovaniSimulace.astro';
const g = spawnSync('git', ['show', `${COMMIT_MAGNETY}:${cesta}`], { cwd: koren, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
if (g.status !== 0 || !g.stdout) {
	// Srozumitelný pád místo tichého přeskočení — bez téhle kotvy doklad ztrácí
	// svou nejsilnější část a nikdo si toho jinak nevšimne.
	tvrdi(`historická verze jde vytáhnout z gitu (git show ${COMMIT_MAGNETY}:${cesta})`, false,
		`git skončil kódem ${g.status}: ${(g.stderr ?? String(g.error ?? '')).trim().split('\n')[0] || 'bez hlášky'}`);
} else {
	tvrdi(`historická verze jde vytáhnout z gitu (git show ${COMMIT_MAGNETY})`, true);
	const magnety = join(docasna, 'MagnetyHistorickeSimulace.astro');
	writeFileSync(magnety, g.stdout);
	const vM = zmer(magnety);
	tvrdi('obě scény se změřily', vM.scen === 2, `změřeno ${vM.scen}`);
	tvrdi('vada 1: rámeček popisku přetéká vlevo (useknutý obrys)', vM.tvrde >= 1 && /přetéká plátno vlevo/.test(vM.vypis), `tvrdých chyb ${vM.tvrde}`);
	tvrdi('vada 1 ukazuje na rámeček u levého okraje (x1 = 0)', /❌.*<rect>.*obdélník \[0,/.test(vM.vypis));
	tvrdi('vada 2: obsah natlačený doleva (půlka plátna prázdná)', vM.varovani >= 1 && /natlačený doleva/.test(vM.vypis), `varování ${vM.varovani}`);
	tvrdi('kotva končí kódem 1', vM.kod === 1, `kód ${vM.kod}`);
	// Kdyby se měřidlo někdy „opravilo" tak, že tyhle vady přejde, projde
	// nasazení znovu — proto je tenhle výpis součástí dokladu.
	for (const radek of vM.vypis.split('\n')) if (/[❌⚠️].*Magnety/.test(radek)) console.log(`     ${radek.trim()}`);
}

// ─────────────────── 5. REGRESE: co NESMÍ být nálezem (zavedený styl webu) ───
console.log('\nREGRESE falešných poplachů — nasazené simulace, které první verze měřidla hlásila neprávem');
const nesmiHlasit = [
	['HydrostatikaSimulace.astro', 'pruhy nebe a dna přes celou šířku sedící na okraji'],
	['TreniSimulace.astro', 'podlaha přes celou šířku — obrys se ořezává neviditelně'],
	['ZrcadloSimulace.astro', 'paprsky (úsečky a lomené čáry) končící na okraji plátna'],
	['LedDisplejSimulace.astro', 'atributy psané astro výrazem x={…} (jinak z nich vyjde nula)'],
	['VlneniSimulace.astro', 'zástupka vystředěná na počátek, kterou kreslí až animace'],
];
for (const [soubor, proc] of nesmiHlasit) {
	const c = join(KOMPONENTY, soubor);
	if (!existsSync(c)) { tvrdi(`${soubor} — ${proc}`, false, 'komponenta v repu není'); continue; }
	const v = zmer(c);
	tvrdi(`${soubor}: ${proc}`, v.tvrde === 0 && v.kod === 0, `tvrdých chyb ${v.tvrde}: ${(v.vypis.match(/❌.*/) ?? [''])[0].slice(0, 160)}`);
}

uklid();
console.log(chyb === 0 ? `\n✅ rozvrzeni-sceny.mjs — obousměrně ověřeno, ${kontrol} kontrol.` : `\n❌ ${chyb} z ${kontrol} kontrol selhalo.`);
process.exit(chyb === 0 ? 0 : 1);
