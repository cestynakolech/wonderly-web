## OBSAH
<h2>Polovodiče typu N a P, dioda</h2>
<p>Polovodič vede elektrický proud líp, když do něj přidáme <strong>příměs</strong> — trošku jiného prvku než křemík. Příměsi stačí opravdu málo. Takovému vylepšenému polovodiči se říká <strong>nevlastní polovodič</strong>.</p>
<p>Podle toho, jaký prvek přidáme, vznikají dva druhy nevlastních polovodičů: <strong>typ N</strong> a <strong>typ P</strong>. Liší se tím, co mají navíc — buď volné elektrony, nebo volná místa po nich.</p>

<h3>Typ N — elektrony navíc</h3>
<p>Do křemíku přidáme prvek, který má o jeden elektron víc, třeba fosfor, arsen nebo antimon. Tenhle elektron zůstane volný a může se v krystalu pohybovat.</p>
<p>Volné elektrony nesou záporný náboj, proto se polovodič jmenuje <strong>typ N</strong> — negativní. Proud jím vedou hlavně volné elektrony. Říká se tomu <strong>elektronová vodivost</strong>, protože proud nesou elektrony.</p>

<h3>Typ P — díry navíc</h3>
<p>Do křemíku přidáme jiný prvek, kterému naopak jeden elektron chybí, třeba bor, hliník, galium nebo indium. Tam, kde elektron chybí, zůstane prázdné místo — říká se mu <strong>díra</strong>.</p>
<p>Díra se chová jako kladný náboj, proto se polovodič jmenuje <strong>typ P</strong> — pozitivní. Elektrony z okolí do děr přeskakují, a tak se díra jakoby posouvá dál. Říká se tomu <strong>děrová vodivost</strong>, protože proud nesou díry.</p>

<h3>Přechod PN: proud jen jedním směrem</h3>
<p>Když v jednom krystalu spojíme typ N s typem P, vznikne mezi nimi <strong>přechod PN</strong>. Podle toho, jak polovodič zapojíme do obvodu, se chová úplně jinak.</p>
<p>V <strong>propustném směru</strong> proud prochází. V <strong>závěrném směru</strong> proud neprochází vůbec — polovodič se chová jako vypnutý spínač.</p>

<h3>Dioda a její příbuzní</h3>
<p><strong>Dioda</strong> je součástka s přechodem PN, která propouští proud jen jedním směrem. Šipka ve značce diody ukazuje směr, kterým proud smí procházet.</p>
<p>Diody se používají jako <strong>usměrňovač</strong> — mění střídavý proud na stejnosměrný. Najdeš je v úplně každém elektronickém zařízení.</p>
<p>Zvláštní diody umí i další věci. <strong>Fotodioda</strong> mění dopadající světlo na elektřinu. <strong>LED</strong> (svítivá dioda) naopak mění elektřinu na světlo — svítí jen v propustném zapojení, spotřebuje málo energie a vydrží dlouho.</p>

<h3>Tranzistor a čip</h3>
<p><strong>Tranzistor</strong> má dva přechody PN a funguje jako moc rychlý spínač — buď proud propustí, nebo ne. Tímhle způsobem počítač zpracovává nuly a jedničky.</p>
<p>Na jedné malé destičce křemíku, které se říká <strong>čip</strong>, je spojeno miliony tranzistorů. Čipy řídí mobily, počítače i auta.</p>

## ZAPIS
```json
{
  "body": [
    "příměs do křemíku → nevlastní polovodič, vyšší vodivost",
    "typ N: elektrony navíc (příměs fosfor, arsen, antimon) → elektronová vodivost",
    "typ P: díry navíc (příměs bor, hliník, galium, indium) → děrová vodivost",
    "přechod PN = styk typu N a typu P",
    "propustný směr: proud prochází",
    "závěrný směr: proud neprochází",
    "dioda: proud jen jedním směrem, usměrňovač",
    "LED (propustný směr): elektřina → světlo"
  ]
}
```

## ZDROJE
- Definice příměsi a nevlastního polovodiče (přidáním prvku do křemíku vznikne nevlastní polovodič s vyšší vodivostí) → PDF str. 1, dnešní blok temata.ts:4378
- Typ N: N = negativní, příměs z V. skupiny (fosfor, arsen, antimon), o 1 elektron víc, volné elektrony navíc → PDF str. 1–3, dnešní blok temata.ts:4380
- Elektronová vodivost — „převládá elektronová vodivost nad vlastní vodivostí křemíku" → PDF str. 3, dnešní blok temata.ts:4380 (v novém OBSAH doplněno zpět, dětsky vysvětleno)
- Typ P: P = pozitivní, příměs z III. skupiny (bor, hliník, galium, indium), o 1 elektron míň, díry navíc → PDF str. 3–5, dnešní blok temata.ts:4381
- Děrová vodivost — „převládá děrová vodivost nad vlastní vodivostí křemíku" → PDF str. 5, dnešní blok temata.ts:4381 (v novém OBSAH doplněno zpět, dětsky vysvětleno)
- Přechod PN vzniká spojením typu N a P v jednom krystalu → PDF str. 6
- Propustný směr — proud prochází (N k zápornému pólu, P ke kladnému) → PDF str. 6, dnešní blok temata.ts:4385
- Závěrný směr — proud neprochází, polovodič se chová jako vypnutý spínač → PDF str. 7–8, dnešní blok temata.ts:4386
- Dioda: součástka s přechodem PN, propouští proud jen jedním směrem, šipka ve značce udává směr → PDF str. 9–10, prezentace Elektřina 9 snímek 55 („Dioda je součástka s jedním PN přechodem, která propouští elektrický proud v jednom směru."), dnešní blok temata.ts:4390
- Usměrňovač — dioda mění střídavý proud na stejnosměrný, součást všech elektronických zařízení → PDF str. 10, dnešní blok temata.ts:4390
- Fotodioda mění světlo na elektřinu, základ fotovoltaiky → PDF str. 10–11, prezentace snímek 56, dnešní blok temata.ts:4391
- LED mění elektřinu na světlo, jen v propustném zapojení, nízká spotřeba, dlouhá životnost → PDF str. 11, prezentace snímek 56, dnešní blok temata.ts:4392
- Tranzistor: dva přechody PN, funguje jako rychlý spínač, zpracovává data jako nuly a jedničky, základ čipů → PDF str. 13, prezentace snímek 56, dnešní blok temata.ts:4393 (doplněno o „nuly a jedničky" z PDF str. 13)
- DOPLNĚNO (v PDF podtématu je, na webu dosud chybělo): čip = miniaturní integrovaný obvod s miliony tranzistorů na destičce křemíku, řídí mobily, počítače, auta → PDF str. 14–15
- MIMO SCOPE (nepatří sem, jiné podtéma): fotorezistor a termistor — vlastní vodivost polovodičů, patří k podtématu „Polovodiče, vlastní vodivost polovodičů" (prezentace Elektřina 9 snímky 49–50)
