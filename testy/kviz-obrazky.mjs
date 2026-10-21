// Kontrola skutečně importovaných otázek; vlastní podvrhy dokazují obě strany brány.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFragment } from 'parse5';
import { parse as parseCss, ident } from 'css-tree';
import { nactiData, vsechnaPodtemata } from './data.mjs';

const koren = fileURLToPath(new URL('../', import.meta.url));
const publicDir = resolve(koren, 'public');
const normalizuj = (s) => String(s).normalize('NFKC').toLocaleLowerCase('cs').replace(/\s+/g, ' ').trim();
const nevykreslovaneTagy = new Set(['template', 'script', 'style', 'noscript', 'textarea', 'title', 'iframe', 'object']);
const skrytyInlineStylem = (style) => {
	// Tolerantní seznam deklarací zachová platné styly před i za vadnou deklarací.
	return parseCss(style, { context: 'declarationList' }).children.toArray().some((node) => {
		if (node.type !== 'Declaration') return false;
		const hodnoty = node.value.children?.toArray() ?? [];
		if (hodnoty.length !== 1 || hodnoty[0].type !== 'Identifier') return false;
		const vlastnost = ident.decode(node.property).toLowerCase();
		const hodnota = ident.decode(hodnoty[0].name).toLowerCase();
		return (vlastnost === 'display' && hodnota === 'none') || (vlastnost === 'visibility' && hodnota === 'hidden');
	});
};
const vykreslovaneObrazky = (html) => {
	const src = new Set();
	const projdi = (node) => {
		// Přeskočením celého podstromu dědí podmínky také všichni potomci.
		if (nevykreslovaneTagy.has(node.tagName)) return;
		const atributy = new Map((node.attrs ?? []).filter((a) => !a.namespace && !a.prefix).map((a) => [a.name, a.value]));
		if (atributy.has('hidden') || atributy.get('aria-hidden')?.toLowerCase() === 'true' ||
			(atributy.has('style') && skrytyInlineStylem(atributy.get('style')))) return;
		if (node.tagName === 'img' && atributy.has('src')) src.add(atributy.get('src'));
		for (const potomek of node.childNodes ?? []) projdi(potomek);
	};
	projdi(parseFragment(html));
	return src;
};

export function zkontrolujObrazky(kvizy, temata, existuje = existsSync) {
	const podtemata = new Map(vsechnaPodtemata(temata).map((p) => [p.klic, p]));
	const nalezy = [];
	for (const [klic, otazky] of Object.entries(kvizy)) {
		for (const [i, otazka] of otazky.entries()) {
			if (otazka.obrazek === undefined) continue;
			const chyba = (text) => nalezy.push(`${klic}, otázka ${i + 1}: ${text}`);
			const obr = otazka.obrazek;
			if (!obr || typeof obr.src !== 'string' || typeof obr.alt !== 'string') { chyba('neplatný obrazek'); continue; }
			if (!obr.alt.trim()) chyba('prázdný alt');
			const soubor = resolve(publicDir, '.' + obr.src);
			if (!obr.src.startsWith('/') || obr.src.startsWith('//') || /[?#\\]|(?:^|\/)\.\.(?:\/|$)/.test(obr.src) || !soubor.startsWith(publicDir + '/')) chyba('src není místní cesta pod public');
			else if (!existuje(soubor)) chyba('soubor v public neexistuje');
			const spravna = normalizuj(otazka.odpovedi[0]);
			if (spravna && [obr.alt, obr.src].some((s) => normalizuj(s).includes(spravna))) chyba('alt nebo src obsahuje správnou odpověď');
			const pod = podtemata.get(klic);
			// Jen skutečné img src ve výkladu a deklarované materiály/panely stránky.
			const povolene = new Set([
				...vykreslovaneObrazky(pod?.obsah ?? ''),
				...(pod?.materialy ?? []).flatMap((m) => [m.cesta, ...(m.panely ?? [])]),
			]);
			if (!/(?:^|-)obr-[^/]+\.(?:svg|png|jpe?g|webp)$/i.test(basename(obr.src)) && !/-panel-[^/]+\.(?:svg|png|jpe?g|webp)$/i.test(basename(obr.src))) chyba('nejde o obr-* ani panel');
			if (!povolene.has(obr.src)) chyba('obrázek není na stránce téhož podtématu');
		}
	}
	return nalezy;
}

const { kvizy, temata } = await nactiData();
const pod = vsechnaPodtemata(temata).find((p) => p.klic === 'fyzika/8-rocnik/elektrina/elektricke-obvody');
assert.ok(pod, 'kalibrační stránka existuje');
const src = [...vykreslovaneObrazky(pod.obsah)][0];
const otazka = { ...kvizy[pod.klic][0], odpovedi: ['kalibrační odpověď', 'druhá možnost', 'třetí možnost'], obrazek: { src, alt: 'Schéma k otázce.' } };
const kontrola = (o, data = temata, ex = existsSync) => zkontrolujObrazky({ [pod.klic]: [o] }, data, ex);
assert.deepEqual(kontrola(otazka), [], 'zdravý existující obr-* stejné stránky');
assert.deepEqual(kontrola({ ...otazka, obrazek: undefined }), [], 'otázka bez obrázku');
for (const [nazev, obrazek, vzor] of [
	['prázdný alt', { src, alt: ' ' }, /prázdný alt/],
	['odpověď v alt', { src, alt: 'Kalibrační odpověď' }, /správnou odpověď/],
	['odpověď v src', { src: '/kalibrační odpověď-obr-01.svg', alt: 'Schéma.' }, /správnou odpověď/],
	['cizí stránka', { src: '/cizi-obr-01.svg', alt: 'Schéma.' }, /téhož podtématu/],
	['únik z public', { src: '/../tajny-obr-01.svg', alt: 'Schéma.' }, /místní cesta/],
	['externí src', { src: 'https://example.cz/obr-01.svg', alt: 'Schéma.' }, /místní cesta/],
	['jiný druh obrázku', { src: '/logo.svg', alt: 'Schéma.' }, /obr-\*/],
	['neplatný objekt', null, /neplatný obrazek/],
]) assert.match(kontrola({ ...otazka, obrazek }).join('\n'), vzor, nazev);
assert.match(kontrola(otazka, temata, () => false).join('\n'), /neexistuje/, 'neexistující soubor');
const panel = pod.materialy.flatMap((m) => m.panely ?? [])[0];
assert.deepEqual(kontrola({ ...otazka, obrazek: { src: panel, alt: 'Panel k otázce.' } }), [], 'zdravý deklarovaný panel');
const reprodukceSrc = '/obrazky/fyzika/8-rocnik/elektrina/elektricke-obvody/elektricke-obvody-obr-01.svg';
const reprodukceOtazka = { ...otazka, odpovedi: ['kalibrační odpověď', 'B', 'C'], obrazek: { src: reprodukceSrc, alt: 'Schéma' } };
const reprodukceImg = `<img src="${reprodukceSrc}">`;
const kontrolaObsahu = (obsah) => {
	const klon = structuredClone(temata);
	for (const [rocnik, celky] of Object.entries(klon)) {
		for (const celek of celky) {
			for (const p of celek.podtemata ?? []) {
				if (`${rocnik}/${celek.slug}/${p.slug}` !== pod.klic) continue;
				p.obsah = obsah;
				p.materialy = [];
			}
		}
	}
	return kontrola(reprodukceOtazka, klon);
};
// Prvních jedenáct vzorků společně pokrývá tabulku nezávislé kontroly kviz-kontrola2.md.
const zdraveObsahy = [
	['zdravý img bez materiálů', reprodukceImg],
	['zdravý img za vnořenou šablonou', `<template><template></template></template>${reprodukceImg}`],
	['velká písmena tagu a atributu', `<IMG SRC="${reprodukceSrc}">`],
	['neuvozený src', `<img src=${reprodukceSrc}>`],
	['jednoduché uvozovky src', `<img src='${reprodukceSrc}'>`],
	['přesný src vedle data-src', `<img data-src="/cizi-obr-01.svg" src="${reprodukceSrc}">`],
	['HTML entity v hodnotě atributu', `<img src="${reprodukceSrc.replaceAll('/', '&#47;')}">`],
	['běžně vnořený obrázek', `<div><section>${reprodukceImg}</section></div>`],
	['aria-hidden false', `<div aria-hidden="false">${reprodukceImg}</div>`],
	['viditelné inline hodnoty', `<div style="display: block; visibility: visible">${reprodukceImg}</div>`],
	['CSS třídy mimo rozsah kontroly', `<div class="hidden">${reprodukceImg}</div>`],
	['text display:none v jiné vlastnosti', `<div style='--text: "display:none"; display: block'>${reprodukceImg}</div>`],
	['text visibility:hidden v jiné vlastnosti', `<div style='content: "visibility:hidden"; visibility: visible'>${reprodukceImg}</div>`],
];
for (const style of ['color:red; broken', 'not a declaration', 'broken; color:blue']) {
	zdraveObsahy.push([`vadná neskrývající deklarace na img: ${style}`, `<img src="${reprodukceSrc}" style="${style}">`]);
	zdraveObsahy.push([`vadná neskrývající deklarace na předkovi: ${style}`, `<div style="${style}">${reprodukceImg}</div>`]);
}
for (const style of [
	String.raw`d\69splay:block`,
	String.raw`display:b\6c ock`,
	String.raw`v\69sibility:visible`,
	String.raw`visibility:v\69sible`,
	String.raw`d\69splay:b\6c ock`,
	String.raw`v\69sibility:v\69sible`,
]) {
	zdraveObsahy.push([`escapovaný viditelný styl na img: ${style}`, `<img src="${reprodukceSrc}" style="${style}">`]);
	zdraveObsahy.push([`escapovaný viditelný styl na předkovi: ${style}`, `<div style="${style}">${reprodukceImg}</div>`]);
}
const skryteObsahy = [
	['HTML komentář – přesná reprodukce', `<!-- ${reprodukceImg} -->`],
	['template', `<template>${reprodukceImg}</template>`],
	['script', `<script>const ukazka = '${reprodukceImg}';</script>`],
	['style', `<style>/* ${reprodukceImg} */</style>`],
	['textarea', `<textarea>${reprodukceImg}</textarea>`],
	['title', `<title>${reprodukceImg}</title>`],
	['obrázek uvnitř hodnoty atributu', `<div data-example='${reprodukceImg}'></div>`],
	['data-src místo src', `<img data-src="${reprodukceSrc}">`],
	['hidden na předkovi', `<div hidden>${reprodukceImg}</div>`],
	['display:none na předkovi', `<div style="display:none">${reprodukceImg}</div>`],
	['neuzavřený HTML komentář', `<!-- ${reprodukceImg}`],
	['vnořený template', `<template><template></template>${reprodukceImg}</template>`],
	['neuzavřený template', `<template><template></template>${reprodukceImg}`],
	['neuzavřený script', `<script>const ukazka = '${reprodukceImg}';`],
	['neuzavřený style', `<style>/* ${reprodukceImg} */`],
	['neuzavřený textarea', `<textarea>${reprodukceImg}`],
	['neuzavřený title', `<title>${reprodukceImg}`],
	['noscript', `<noscript>${reprodukceImg}</noscript>`],
	['neuzavřený noscript', `<noscript>${reprodukceImg}`],
	['iframe', `<iframe>${reprodukceImg}</iframe>`],
	['neuzavřený iframe', `<iframe>${reprodukceImg}`],
	['object', `<object>${reprodukceImg}</object>`],
	['neuzavřený object', `<object>${reprodukceImg}`],
	['x:src místo src', `<img x:src="${reprodukceSrc}">`],
	['velká písmena data-src místo src', `<IMG DATA-SRC="${reprodukceSrc}">`],
	['data-src vedle jiného skutečného src', `<img src="/cizi-obr-01.svg" data-src="${reprodukceSrc}">`],
	['src s dalšími znaky', `<img src="${reprodukceSrc}?ukazka">`],
	['src s koncovou mezerou', `<img src="${reprodukceSrc} ">`],
	['obrázek zapsaný jako text', `&lt;img src="${reprodukceSrc}"&gt;`],
];
// Každé pravidlo skrývá samotný img i libovolně hluboké potomky; sourozenec je znovu viditelný.
for (const [nazev, atribut] of [
	['hidden', 'hidden'],
	['hidden s hodnotou false', 'hidden="false"'],
	['velká písmena HIDDEN', 'HIDDEN'],
	['aria-hidden true', 'aria-hidden="true"'],
	['velká písmena ARIA-HIDDEN TRUE', 'ARIA-HIDDEN="TRUE"'],
	['display none', 'style="display:none"'],
	['display none s komentářem', 'style="display/**/: /**/ none"'],
	['DISPLAY NONE important', 'STYLE="DISPLAY: NONE !important"'],
	['visibility hidden', 'style="visibility:hidden"'],
	['visibility hidden s komentářem', 'style="visibility/**/: /**/ hidden"'],
	['VISIBILITY HIDDEN important', 'STYLE="VISIBILITY: HIDDEN !important"'],
	['display none před vadnou deklarací', 'style="display:none; broken"'],
	['display none za vadnou deklarací', 'style="broken; display:none"'],
	['visibility hidden před vadnou deklarací', 'style="visibility:hidden; broken"'],
	['visibility hidden za vadnou deklarací', 'style="broken; visibility:hidden"'],
	['display none před vadným textem', 'style="display:none; not a declaration"'],
	['display none za vadným textem', 'style="not a declaration; display:none"'],
	['visibility hidden před vadným textem', 'style="visibility:hidden; not a declaration"'],
	['visibility hidden za vadným textem', 'style="not a declaration; visibility:hidden"'],
	['escapovaný název display', String.raw`style="d\69splay:none"`],
	['escapovaná hodnota none', String.raw`style="display:\6e one"`],
	['escapovaný název visibility', String.raw`style="v\69sibility:hidden"`],
	['escapovaná hodnota hidden', String.raw`style="visibility:h\69 dden"`],
	['escapovaný display i none', String.raw`style="d\69splay:\6e one"`],
	['escapovaný visibility i hidden', String.raw`style="v\69sibility:h\69 dden"`],
]) {
	skryteObsahy.push([`${nazev} na img`, `<img src="${reprodukceSrc}" ${atribut}>`]);
	skryteObsahy.push([`${nazev} na vzdáleném předkovi`, `<div ${atribut}><section><span>${reprodukceImg}</span></section></div>`]);
	skryteObsahy.push([`${nazev} nelze zrušit na potomkovi`, `<div ${atribut}><div aria-hidden="false" style="display:block; visibility:visible">${reprodukceImg}</div></div>`]);
	zdraveObsahy.push([`viditelný sourozenec za ${nazev}`, `<div ${atribut}>${reprodukceImg}</div>${reprodukceImg}`]);
}
for (const tag of nevykreslovaneTagy) {
	zdraveObsahy.push([`viditelný sourozenec za ${tag}`, `<${tag}>${reprodukceImg}</${tag}>${reprodukceImg}`]);
}
for (const [nazev, obsah] of zdraveObsahy) assert.deepEqual(kontrolaObsahu(obsah), [], nazev);
for (const [nazev, obsah] of skryteObsahy) assert.match(kontrolaObsahu(obsah).join('\n'), /téhož podtématu/, `img není viditelným elementem: ${nazev}`);
const nalezy = zkontrolujObrazky(kvizy, temata);
assert.deepEqual(nalezy, [], nalezy.join('\n'));
console.log(`Obrázky v kvízu: skutečná data v pořádku (${Object.values(kvizy).flat().filter((o) => o.obrazek).length} obrázkových otázek); ${zdraveObsahy.length} zdravých HTML vzorků a ${skryteObsahy.length + 9} podvrhů ověřeno.`);
