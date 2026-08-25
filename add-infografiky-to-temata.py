#!/usr/bin/env python3
"""
Přidá infografiky do temata.ts
"""

import re

# Infografiky ke vložení
INFOGRAFIKY_K_PRIDANI = [
    ("6", "cas", "cas-a-jeho-mereni", "Čas a jeho měření — přehled"),
    ("6", "latka-a-teleso", "atomy-a-molekuly", "Atomy a molekuly"),
    ("6", "latka-a-teleso", "telesa-a-latky", "Tělesa a látky — přehled"),
    ("6", "teplota", "teplota-a-jeji-mereni", "Teplota a její měření"),
    ("6", "elektrina-a-magnetismus", "magneticke-vlastnosti-latek", "Magnetické vlastnosti látek"),
    ("6", "sila", "vzajemne-pusobeni-teles-sila", "Vzájemné působení těles — síla"),
    ("6", "fyzikalni-veliciny", "delka", "Délka — měření"),
    ("8", "energie", "energie-a-jeji-premeny", "Energie a její přeměny"),
    ("8", "teplo-a-zmeny-skupenstvi", "teplo-a-premeny-skupenstvi", "Teplo a přeměny skupenství"),
    ("8", "zvuk", "zvuk-vznik-a-sireni", "Zvuk — vznik a šíření"),
    ("8", "mechanicka-prace-a-vykon", "mechanicka-prace", "Mechanická práce"),
    ("8", "tepelne-motory", "tepelny-motor-parni-stroj", "Tepelný motor — parní stroj"),
    ("8", "elektrina", "ohmuv-zakon", "Ohmův zákon"),
    ("8", "elektrina", "elektricka-sila", "Elektrická síla"),
    ("9", "elektricky-proud-a-naboj", "elektricky-naboj", "Elektrický náboj"),
]

# Načti temata.ts
with open("/Users/radek_soukromy/Desktop/wonderly-web/src/data/temata.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Pro každou infografiku - přidej ji do materiálů
for rocnik, tema, podtema, nazev in INFOGRAFIKY_K_PRIDANI:
    # Hledaj podtéma a jeho materiály
    # Vzor: `slug: 'PODTEMA', ... materialy: [...]`
    
    pattern = rf"(slug: ['\"]{{0,10}}{podtema}['\"].*?materialy:\s*\[)"
    
    # Najdi místo kde vložit infografiku
    match = re.search(pattern, content, re.DOTALL)
    if match:
        pos = match.end()
        
        # Vytvoř řádek infografiky
        cesta = f"/materialy/fyzika/{rocnik}-rocnik/{tema}/{podtema}/infografika-prehled.jpg"
        nova_infografika = f"\n\t\t\t\t\t\t{{ druh: 'infografika', nazev: '{nazev}', cesta: '{cesta}' }},"
        
        # Vložit na správné místo
        if f"druh: 'infografika'" not in content[pos:pos+500]:  # Ujisti se, že tam už není
            content = content[:pos] + nova_infografika + content[pos:]
            print(f"✅ Přidána infografika: F{rocnik} {tema}/{podtema}")
        else:
            print(f"⏭️  Infografika už existuje: F{rocnik} {tema}/{podtema}")
    else:
        print(f"❌ Nenalezeno podtéma: F{rocnik} {tema}/{podtema}")

# Ulož zpátky
with open("/Users/radek_soukromy/Desktop/wonderly-web/src/data/temata.ts", 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✨ Všechny infografiky přidány do temata.ts")
