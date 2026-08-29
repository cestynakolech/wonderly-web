import type { APIRoute } from 'astro';
import { kvizy } from '../../../../../../data/kvizy';
import { predmety, rocniky } from '../../../../../../data/predmety';
import { temata } from '../../../../../../data/temata';
import PDFDocument from 'pdfkit';

/**
 * API Endpoint: Generuj PDF test pro podtéma
 * Cesta: /skola2/[predmet]/[rocnik]/[tema]/[podtema]/generate-test.json
 * Query params:
 *  - pocet (default 10): počet otázek v testu
 *  - seed (optional): seed pro reproducible shuffle
 *
 * Vrácí: PDF soubor
 */

export function getStaticPaths() {
	const paths = [];
	for (const [klic, seznamTemat] of Object.entries(temata)) {
		const [predmetSlug, rocnikSlug] = klic.split('/');
		const predmet = predmety.find((p) => p.slug === predmetSlug);
		const rocnik = rocniky.find((r) => r.slug === rocnikSlug);
		for (const tema of seznamTemat) {
			for (const podtema of tema.podtemata ?? []) {
				if (!kvizy[`${predmetSlug}/${rocnikSlug}/${tema.slug}/${podtema.slug}`]) continue;
				paths.push({
					params: { predmet: predmetSlug, rocnik: rocnikSlug, tema: tema.slug, podtema: podtema.slug },
					props: { predmet, rocnik, tema, podtema },
				});
			}
		}
	}
	return paths;
}

export const GET: APIRoute = async ({ params, url }) => {
	const { predmet, rocnik, tema, podtema } = params;

	if (!predmet || !rocnik || !tema || !podtema) {
		return new Response('Chybí parametry', { status: 400 });
	}

	const kvizKey = `${predmet}/${rocnik}/${tema}/${podtema}`;
	const otazky = kvizy[kvizKey];

	if (!otazky || otazky.length === 0) {
		return new Response('Žádné otázky pro toto podtéma', { status: 404 });
	}

	const pocetOtazek = parseInt(url.searchParams.get('pocet') || '10');
	const seed = url.searchParams.get('seed');

	// Vyber náhodné otázky
	const vybrane = selectRandomQuestions(otazky, pocetOtazek, seed);

	// Generuj PDF
	const pdfBuffer = await generatePDF(vybrane, `${tema} - ${podtema}`, rocnik);

	return new Response(pdfBuffer, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="test-${podtema}.pdf"`,
		},
	});
};

/**
 * Vyber N náhodných otázek z pole
 */
function selectRandomQuestions(otazky: any[], pocet: number, seed?: string): any[] {
	const count = Math.min(pocet, otazky.length);

	// Shuffle s opcionálním seedem (pro testování)
	const shuffled = [...otazky];
	const random = seed ? seededRandom(seed) : Math.random;

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled.slice(0, count);
}

/**
 * Seeded random generator (deterministické pro testing)
 */
function seededRandom(seed: string): () => number {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		const char = seed.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}

	return function () {
		hash = (hash * 9301 + 49297) % 233280;
		return hash / 233280;
	};
}

/**
 * Generuj PDF pomocí pdfkit
 */
async function generatePDF(
	otazky: any[],
	titulek: string,
	rocnik: string
): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		try {
			const doc = new PDFDocument({
				size: 'A4',
				margin: 20,
			});

			const chunks: Buffer[] = [];
			doc.on('data', (chunk) => chunks.push(chunk));
			doc.on('end', () => resolve(Buffer.concat(chunks)));
			doc.on('error', reject);

			// Titulní strana
			doc.fontSize(24)
				.font('Helvetica-Bold')
				.text('TEST', { align: 'center' })
				.fontSize(14)
				.font('Helvetica')
				.text(titulek, { align: 'center' })
				.fontSize(12)
				.text(`Fyzika ${rocnik}. ročníku`, { align: 'center' })
				.moveDown(2);

			// Info řádky
			doc.fontSize(10);
			doc.text(`Jméno: ________________________________     Třída: ______________`);
			doc.text(`Datum: ${new Date().toLocaleDateString('cs-CZ')}     Čas: _________ minut`);
			doc.text(`Počet otázek: ${otazky.length}     Maximálně bodů: ${otazky.length * 5}`);
			doc.moveDown(1);

			// Instrukce
			doc.fontSize(10).font('Helvetica-Bold').text('Pokyny:');
			doc.font('Helvetica')
				.fontSize(9)
				.text('1. Pečlivě si přečti každou otázku');
			doc.text('2. Vyber správnou odpověď nebo napiš svou odpověď');
			doc.text('3. Každá otázka je za 5 bodů');
			doc.text('4. Neměň odpovědi po odevzdání');
			doc.moveDown(1.5);

			// Page break
			doc.addPage();

			// Otázky
			otazky.forEach((q, idx) => {
				const question = q.text || 'Otázka bez textu';

				// Check stránky
				if (doc.y > 700) {
					doc.addPage();
				}

				// Číslo a text
				doc.fontSize(11)
					.font('Helvetica-Bold')
					.text(`${idx + 1}. ${question}`, { align: 'left' })
					.moveDown(0.3);

				doc.font('Helvetica').fontSize(9);

				// Odpovědi (odpovedi je pole ze struktur kvízu)
				const options = q.odpovedi || [];
				options.forEach((opt) => {
					doc.text(`☐ ${opt}`);
				});

				doc.moveDown(0.5);
			});

			// Závěr
			doc.moveDown(1)
				.fontSize(11)
				.font('Helvetica-Bold')
				.text('—— KONEC TESTU ——', { align: 'center' });

			// Klíč odpovědí (nová stránka)
			doc.addPage();
			doc.fontSize(14)
				.font('Helvetica-Bold')
				.text('KLÍČ SPRÁVNÝCH ODPOVĚDÍ', { align: 'center' })
				.moveDown(1);

			doc.fontSize(10).font('Helvetica');
			otazky.forEach((q, idx) => {
				const spravna = q.odpovedi?.[0] || 'N/A';
				doc.text(`${idx + 1}. ${spravna}`);
			});

			doc.end();
		} catch (error) {
			reject(error);
		}
	});
}
