#!/usr/bin/env python3
"""
🎵 Organizátor Suno MP3 — Automaticky přesunuje a zařazuje MP3 z Downloads
do správné fyziky struktury.

Použití:
  ./suno-organize.py                    # Interaktivní režim
  ./suno-organize.py --auto             # Automaticky všechno
  ./suno-organize.py --dry-run          # Jen náhled
"""

import os
import shutil
import re
import sys
from pathlib import Path
from collections import defaultdict

# Fyzika root
FYZIKA_ROOT = Path.home() / "Desktop/wonderly-web/public/materialy/fyzika"

# Mapování: (ročník, téma) → seznam skladeb (klíčová slova)
# Hledáme tyto klíčové slova v názvech MP3
SKLADBY_MAP = {
    # 6. ročník
    ("6-rocnik", "uvod-do-fyziky"): [
        "energie", "fyzika", "priroda", "pojmy", "sila", "pohyb",
        "teplo", "teplota", "zvuk", "sluch", "svetlo", "viden",
        "elektricita", "magnet", "pole", "kosmos", "voda", "vzduch",
        "masa", "vaha", "treni", "odpor", "prenos", "sezamitost"
    ],
    
    # 7. ročník
    ("7-rocnik", "sily-kolem-nas"): [
        "sila", "skladani", "pravaidelnost", "gravitace", "hmotnost",
        "hybnost", "impuls", "paka", "kladka", "energie", "prace",
        "vykon", "stroj", "pevnost", "tuhost", "elasticita", "plasticnost"
    ],
    ("7-rocnik", "pohyb-a-sily"): [
        "pohyb", "rychlost", "zrychleni", "inercni", "zakon",
        "newtonuv", "pohybove"
    ],
    ("7-rocnik", "tekutiny-a-tlak"): [
        "kapala", "kapalina", "tlak", "atmosfera", "archimedes",
        "vztlak", "plynny", "stavy", "hmota", "roztaznost",
        "tepelna", "kapacita", "premena"
    ],
    ("7-rocnik", "treni-a-odpor"): [
        "treni", "odpor", "prostredku", "viskozita", "toreny"
    ],
    
    # 8. ročník
    ("8-rocnik", "prace-a-energie"): [
        "prace", "vykon", "ucinnost", "kineticka", "potencialní",
        "energia", "zachovani", "slunecni", "fosilni", "paliva",
        "jaderna"
    ],
    ("8-rocnik", "elektricita-magnetizmus"): [
        "elektricka", "pole", "napeti", "proud", "odpor", "ohmuv",
        "obvod", "magneticke", "elektromegnet", "indukcí", "transformator",
        "motor", "generator"
    ],
    
    # 9. ročník
    ("9-rocnik", "elektrina-detaily"): [
        "elektricka", "nabjatost", "pole", "vodiče", "izolant",
        "kondenzator", "baterie", "clanek", "elektrolyza"
    ],
    ("9-rocnik", "magnetizmus-detaily"): [
        "magneticke", "spektrum", "permanentní", "magnet",
        "elektromegnetizmus", "transformator", "indukcí", "faraday",
        "vlastní", "vzajemna", "alternator"
    ],
    ("9-rocnik", "optika"): [
        "svetlo", "vlna", "pritomnost", "odraz", "zrcadlo",
        "kulata", "lomena", "hranol", "disperze", "cocka",
        "tenka", "oko", "opticky", "pristroj", "vada",
        "korekce", "zrak", "dalekohled", "mikroskop", "spektralní"
    ],
}

def setup_dirs():
    """Vytvoř všechny potřebné adresáře"""
    for rocnik in ["6-rocnik", "7-rocnik", "8-rocnik", "9-rocnik"]:
        rocnik_dir = FYZIKA_ROOT / rocnik
        rocnik_dir.mkdir(parents=True, exist_ok=True)
    print(f"✓ Adresáře fyziky připraveny v {FYZIKA_ROOT}")

def find_best_category(filename: str) -> tuple:
    """Hledej nejlepší (ročník, téma) pro daný soubor"""
    fname_lower = filename.lower()
    
    # Odeber příponu a speciální znaky
    fname_clean = re.sub(r'[_\-\.]', ' ', fname_lower)
    words = fname_clean.split()
    
    best_match = None
    best_score = 0
    
    for (rocnik, tema), keywords in SKLADBY_MAP.items():
        # Počet matchů
        matches = sum(1 for kw in keywords if any(kw in w for w in words))
        if matches > best_score:
            best_score = matches
            best_match = (rocnik, tema)
    
    return best_match, best_score

def organize_mp3(auto=False, dry_run=False):
    """Organizuj MP3 soubory z Downloads"""
    downloads = Path.home() / "Downloads"
    
    if not downloads.exists():
        print(f"❌ Downloads adresář neexistuje: {downloads}")
        return 0
    
    mp3_files = list(downloads.glob("*.mp3"))
    
    if not mp3_files:
        print("⚠️  V Downloads nejsou žádné MP3 soubory")
        return 0
    
    print(f"📁 Nalezeno {len(mp3_files)} MP3 souborů v Downloads\n")
    
    organized = 0
    skipped = 0
    
    for mp3_file in mp3_files:
        category, score = find_best_category(mp3_file.name)
        
        if category is None:
            print(f"⚠️  {mp3_file.name} — kategorie nezjistěna (přeskoč)")
            skipped += 1
            continue
        
        rocnik, tema = category
        dest_dir = FYZIKA_ROOT / rocnik / tema
        dest_dir.mkdir(parents=True, exist_ok=True)
        
        dest_file = dest_dir / mp3_file.name
        
        # Zkontroluj duplicitu
        if dest_file.exists():
            print(f"✓ {mp3_file.name} — již existuje ({rocnik}/{tema}/)")
            skipped += 1
            continue
        
        # Přesuň nebo udělej dry-run
        if not dry_run:
            shutil.move(str(mp3_file), str(dest_file))
            print(f"✓ {mp3_file.name}")
            print(f"  ↳ {rocnik}/{tema}/")
            organized += 1
        else:
            print(f"[DRY] {mp3_file.name}")
            print(f"  ↳ {rocnik}/{tema}/")
            organized += 1
    
    print(f"\n📊 Výsledek:")
    print(f"  Organizováno: {organized}")
    print(f"  Přeskočeno:   {skipped}")
    return organized

def count_existing():
    """Spočítej existující MP3"""
    total = 0
    by_rocnik = defaultdict(int)
    
    for rocnik_dir in FYZIKA_ROOT.glob("*-rocnik"):
        rocnik = rocnik_dir.name
        count = len(list(rocnik_dir.rglob("*.mp3")))
        by_rocnik[rocnik] = count
        total += count
    
    print("\n📊 Stav MP3:")
    for rocnik in ["6-rocnik", "7-rocnik", "8-rocnik", "9-rocnik"]:
        count = by_rocnik.get(rocnik, 0)
        print(f"  {rocnik}: {count}")
    print(f"  CELKEM: {total}")
    
    return total

if __name__ == "__main__":
    setup_dirs()
    
    # Parse argumenty
    auto_mode = "--auto" in sys.argv
    dry_run = "--dry-run" in sys.argv
    
    if dry_run:
        print("🔍 DRY RUN mód (bez přesunů)\n")
    
    count_before = count_existing()
    
    organized = organize_mp3(auto=auto_mode, dry_run=dry_run)
    
    if not dry_run and organized > 0:
        count_after = count_existing()
        print(f"\n✅ Přidáno: {organized} nových MP3 (celkem: {count_after})")
    elif dry_run:
        print(f"\n📋 Dry run hotov (0 přesunů)")
