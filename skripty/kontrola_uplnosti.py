#!/usr/bin/env python3
"""
Kontrola úplnosti materiálů u podtémat fyziky.

ČTE (nic nezapisuje do temata.ts ani kvizy.ts):
  - src/data/temata.ts  — podtémata, jejich materiály a interakce (hry/simulace)
  - src/data/kvizy.ts   — kvízy podle klíče "fyzika/<rocnik>/<tema-slug>/<podtema-slug>"

PRAVIDLA ROZPOZNÁNÍ (odvozená z dat, ne odhadnutá):
  - druh == 'infografika'                                   -> INFOGRAFIKA
  - druh in ('video','youtube') a nazev začíná "Polemika"    -> PODKÁST (polemika)
  - druh == 'video' a nazev začíná "Píseň"                   -> PÍSNIČKA (ze Suno)
  - druh in ('video','youtube') jinak                        -> VIDEO
  - (druh 'pdf'/'audio' se do těchto 4 kategorií nepočítají — nejsou to
    video/podkást/infografika/písnička; typicky doplňkové poslechy/PDF)
  - KVÍZ = existuje záznam v kvizy.ts pro klíč fyzika/<rocnik>/<tema>/<podtema>,
    počet = počet bloků "text:" v daném poli otázek
  - HRA/SIMULACE = existuje pole interakce nebo interakce2 u podtématu

Výstup: markdown tabulka do kontrola-uplnosti.md v kořeni repa.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMATA = ROOT / 'src' / 'data' / 'temata.ts'
KVIZY = ROOT / 'src' / 'data' / 'kvizy.ts'
OUT = ROOT / 'kontrola-uplnosti.md'


def nacti_kvizy():
    """Vrátí dict klíč -> počet otázek, klíč parsovaný z 'fyzika/...': [ ... ]."""
    txt = KVIZY.read_text(encoding='utf-8')
    pocty = {}
    # najdi všechny bloky 'klic': [ ... ] na top úrovni (klíč začíná uvozovkou, odsazení 1 tab)
    for m in re.finditer(r"^\t'([^']+)':\s*\[\n", txt, re.M):
        klic = m.group(1)
        start = m.end()
        # najdi konec pole počítáním závorek [ ]
        depth = 1
        i = start
        while depth > 0 and i < len(txt):
            if txt[i] == '[':
                depth += 1
            elif txt[i] == ']':
                depth -= 1
            i += 1
        blok = txt[start:i]
        pocet = len(re.findall(r"\btext:\s*'", blok))
        pocty[klic] = pocet
    return pocty


def klasifikuj_material(druh, nazev):
    if druh == 'infografika':
        return 'infografika'
    if druh in ('video', 'youtube'):
        if nazev.startswith('Polemika'):
            return 'podkast'
        if druh == 'video' and nazev.startswith('Píseň'):
            return 'pisnicka'
        return 'video'
    return None  # pdf, audio-poslech apod. se nepočítají


def nacti_temata():
    """Vrátí list řádků: dict s rocnik, tema_slug, tema_nazev, podtema_slug, podtema_nazev,
    ma_video, ma_podkast, ma_infografika, ma_pisnicka, ma_hra."""
    txt = TEMATA.read_text(encoding='utf-8')
    radky = []

    top_key_re = re.compile(r"^\t'([^']+)':\s*\[$")
    rocnik_re = re.compile(r"^\t'fyzika/(\d+)-rocnik':\s*\[$")
    tema_slug_re = re.compile(r"^\t\t\tslug:\s*'([^']+)',$")
    tema_nazev_re = re.compile(r"^\t\t\tnazev:\s*'((?:[^'\\]|\\.)*)',$")
    podtema_slug_re = re.compile(r"^\t{5,6}slug:\s*'([^']+)',$")
    podtema_nazev_re = re.compile(r"^\t{5,6}nazev:\s*'((?:[^'\\]|\\.)*)',$")
    interakce_re = re.compile(r"^\t{5,6}interakce2?:\s*'")
    material_re = re.compile(r"druh:\s*'(\w+)',\s*\n?\s*nazev:\s*'((?:[^'\\]|\\.)*)'")

    rocnik = None
    tema_slug = tema_nazev = None
    podtema = None  # aktuální dict rozpracovaného podtématu

    lines = txt.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        m = top_key_re.match(line)
        if m:
            if podtema:
                radky.append(podtema)
                podtema = None
            mr = rocnik_re.match(line)
            rocnik = mr.group(1) if mr else None
            tema_slug = tema_nazev = None
            i += 1
            continue
        m = tema_slug_re.match(line)
        if m and rocnik:
            if podtema:
                radky.append(podtema)
                podtema = None
            tema_slug = m.group(1)
            # nazev tématu bývá na dalším řádku
            i += 1
            if i < len(lines):
                mn = tema_nazev_re.match(lines[i])
                tema_nazev = mn.group(1) if mn else tema_slug
            continue
        m = podtema_slug_re.match(line)
        if m and rocnik and tema_slug:
            if podtema:
                radky.append(podtema)
            podtema = {
                'rocnik': rocnik, 'tema_slug': tema_slug, 'tema_nazev': tema_nazev,
                'podtema_slug': m.group(1), 'podtema_nazev': m.group(1),
                'video': False, 'podkast': False, 'infografika': False, 'pisnicka': False,
                'hra': False,
            }
            i += 1
            if i < len(lines):
                mn = podtema_nazev_re.match(lines[i])
                if mn:
                    podtema['podtema_nazev'] = mn.group(1)
            continue
        if podtema:
            if interakce_re.match(line):
                podtema['hra'] = True
            mm = material_re.search(line)
            if not mm and 'druh:' in line and i + 1 < len(lines):
                mm = material_re.search(line + '\n' + lines[i + 1])
            if mm:
                kat = klasifikuj_material(mm.group(1), mm.group(2))
                if kat:
                    podtema[kat] = True
        i += 1
    if podtema:
        radky.append(podtema)
    return radky


def main():
    kvizy = nacti_kvizy()
    podtemata = nacti_temata()

    ano_ne = lambda b: 'ANO' if b else 'NE'

    hlavicka = ['ročník', 'téma', 'podtéma', 'video', 'podkást', 'infografika', 'písnička', 'kvíz', 'hra']
    radky_md = ['| ' + ' | '.join(hlavicka) + ' |', '|' + '---|' * len(hlavicka)]

    souhrn = {}  # rocnik -> dict chybejicich poctu
    sparovane_klice = set()  # klíče z kvizy.ts, které se podařilo spárovat s podtématem

    for p in podtemata:
        klic_kvizu = f"fyzika/{p['rocnik']}-rocnik/{p['tema_slug']}/{p['podtema_slug']}"
        pocet_otazek = kvizy.get(klic_kvizu, 0)
        if klic_kvizu in kvizy:
            sparovane_klice.add(klic_kvizu)
        radky_md.append('| ' + ' | '.join([
            p['rocnik'], p['tema_nazev'], p['podtema_nazev'],
            ano_ne(p['video']), ano_ne(p['podkast']), ano_ne(p['infografika']),
            ano_ne(p['pisnicka']), (f'ANO ({pocet_otazek})' if pocet_otazek else 'NE'),
            ano_ne(p['hra']),
        ]) + ' |')

        s = souhrn.setdefault(p['rocnik'], {
            'celkem': 0, 'video': 0, 'podkast': 0, 'infografika': 0, 'pisnicka': 0, 'kviz': 0, 'hra': 0,
        })
        s['celkem'] += 1
        if not p['video']:
            s['video'] += 1
        if not p['podkast']:
            s['podkast'] += 1
        if not p['infografika']:
            s['infografika'] += 1
        if not p['pisnicka']:
            s['pisnicka'] += 1
        if not pocet_otazek:
            s['kviz'] += 1
        if not p['hra']:
            s['hra'] += 1

    souhrn_md = ['', '## Souhrn chybějících položek podle ročníku', '',
                 '| ročník | podtémat celkem | chybí video | chybí podkást | chybí infografika | chybí písnička | chybí kvíz | chybí hra |',
                 '|---|---|---|---|---|---|---|---|']
    for r in sorted(souhrn):
        s = souhrn[r]
        souhrn_md.append(
            f"| {r} | {s['celkem']} | {s['video']} | {s['podkast']} | {s['infografika']} | {s['pisnicka']} | {s['kviz']} | {s['hra']} |"
        )

    # KOTVA: kolik kvízových klíčů fyziky v kvizy.ts existuje pro daný ročník
    # a kolik jich skript spároval s reálným podtématem z temata.ts.
    kotva_md = ['', '## Kotva: párování kvízových klíčů', '',
                '| ročník | klíčů v kvizy.ts | spárováno s podtématem | nespárováno |',
                '|---|---|---|---|']
    varovani = []
    for r in sorted(souhrn):
        klice_rocniku = {k for k in kvizy if k.startswith(f'fyzika/{r}-rocnik/')}
        sparovano_rocniku = {k for k in sparovane_klice if k.startswith(f'fyzika/{r}-rocnik/')}
        nespar = klice_rocniku - sparovano_rocniku
        kotva_md.append(f"| {r} | {len(klice_rocniku)} | {len(sparovano_rocniku)} | {len(nespar)} |")
        if nespar:
            varovani.append((r, sorted(nespar)))

    if varovani:
        kotva_md.append('')
        kotva_md.append('### VAROVÁNÍ — nespárované klíče (existují v kvizy.ts, ale nenašlo se k nim podtéma)')
        for r, klice in varovani:
            kotva_md.append(f'- ročník {r}:')
            for k in klice:
                kotva_md.append(f'  - `{k}`')

    out_text = '\n'.join(radky_md + souhrn_md + kotva_md) + '\n'
    OUT.write_text(out_text, encoding='utf-8')
    print(f"Zapsáno: {OUT}  ({len(podtemata)} podtémat)")
    for r in sorted(souhrn):
        print(r, souhrn[r])
    print('--- KOTVA (klíčů v kvizy.ts / spárováno / nespárováno) ---')
    for r in sorted(souhrn):
        klice_rocniku = {k for k in kvizy if k.startswith(f'fyzika/{r}-rocnik/')}
        sparovano_rocniku = {k for k in sparovane_klice if k.startswith(f'fyzika/{r}-rocnik/')}
        stav = 'OK' if len(klice_rocniku) == len(sparovano_rocniku) else 'VAROVANI'
        print(r, len(klice_rocniku), len(sparovano_rocniku), stav)


if __name__ == '__main__':
    main()
