#!/usr/bin/env python3
"""Správně přidá infografiky do temata.ts"""

import re

path = "/Users/radek_soukromy/Desktop/wonderly-web/src/data/temata.ts"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

infografiky = [
    ("6", "cas", "cas-a-jeho-mereni", "Čas a jeho měření — přehled"),
    ("6", "latka-a-teleso", "atomy-a-molekuly", "Atomy a molekuly"),
    ("6", "latka-a-teleso", "telesa-a-latky", "Tělesa a látky — přehled"),
    ("6", "teplota", "teplota-a-jeji-mereni", "Teplota a její měření"),
    ("6", "elektrina-a-magnetismus", "magneticke-vlastnosti-latek", "Magnetické vlastnosti látek"),
    ("6", "sila", "vzajemne-pusobeni-teles-sila", "Vzájemné působení těles — síla"),
    ("6", "fyzikalni-veliciny", "delka", "Délka — měření"),
    ("8", "energie", "energia-a-jeji-premeny", "Energie a její přeměny"),
    ("8", "teplo-a-zmeny-skupenstvi", "teplo-a-premeny-skupenstvi", "Teplo a přeměny skupenství"),
    ("8", "zvuk", "zvuk-vznik-a-sireni", "Zvuk — vznik a šíření"),
    ("8", "mechanicka-prace-a-vykon", "mechanicka-prace", "Mechanická práce"),
    ("8", "tepelne-motory", "tepelny-motor-parni-stroj", "Tepelný motor — parní stroj"),
    ("8", "elektrina", "ohmuv-zakon", "Ohmův zákon"),
    ("9", "elektricky-proud-a-naboj", "elektricky-naboj", "Elektrický náboj"),
]

for rocnik, tema, podtema, nazev in infografiky:
    cesta = f"/materialy/fyzika/{rocnik}-rocnik/{tema}/{podtema}/infografika-prehled.jpg"
    nova_linka = f"\t\t\t\t\t\t{{ druh: 'infografika', nazev: '{nazev}', cesta: '{cesta}' }},\n"
    
    # Hledej `slug: 'PODTEMA'` a pak `materialyte: [`
    # Musíme najít typo ve typu
    pattern = rf"slug: ['\"]{{0,10}}{re.escape(podtema)}['\"].*?materialyte:\s*\["
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        pos = match.end()
        check_text = content[pos:pos+300]
        if f"cesta: '{cesta}'" not in check_text:
            content = content[:pos] + "\n" + nova_linka + content[pos:]
            print(f"✅ F{rocnik} {tema}/{podtema}")
        else:
            print(f"⏭️  F{rocnik} {tema}/{podtema}")
    else:
        # Zkus hledat bez materialyte
        pattern2 = rf"slug: ['\"]{{0,10}}{re.escape(podtema)}['\"].*?materialy:\s*\["
        match2 = re.search(pattern2, content, re.DOTALL)
        if match2:
            pos = match2.end()
            check_text = content[pos:pos+300]
            if f"cesta: '{cesta}'" not in check_text:
                content = content[:pos] + "\n" + nova_linka + content[pos:]
                print(f"✅ F{rocnik} {tema}/{podtema}")
            else:
                print(f"⏭️  F{rocnik} {tema}/{podtema}")
        else:
            print(f"❌ F{rocnik} {tema}/{podtema}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✨ Hotovo")
