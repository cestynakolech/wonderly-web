#!/usr/bin/env node
// node podtema.mjs ROOT get predmet/rocnik/tema/podtema
// node podtema.mjs ROOT set predmet/rocnik/tema/podtema FIELD value.json
// Trusted project source only: nactiData executes the project's data modules.
// Requires the installed @babel/parser and esbuild (currently Astro transitive deps).
// Does not install packages, print the whole source, or format unrelated bytes.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { parse } from '@babel/parser';
import { build } from 'esbuild';

function fail(message) { throw new Error(message); }
function ast(text) { return parse(text, { sourceType: 'module', plugins: ['typescript'] }); }
function propName(p) {
	if (p.type !== 'ObjectProperty' || p.computed || p.shorthand) fail('Unsupported property/spread/computed key');
	if (!['Identifier', 'StringLiteral'].includes(p.key.type)) fail('Unsupported property key');
	return p.key.name ?? p.key.value;
}
function properties(obj) {
	if (obj?.type !== 'ObjectExpression') fail('Expected literal object');
	const m = new Map();
	for (const p of obj.properties) {
		const k = propName(p);
		if (m.has(k)) fail('Duplicate property: ' + k);
		m.set(k, p);
	}
	return m;
}
function namedElement(array, slug) {
	if (array?.type !== 'ArrayExpression') fail('Expected literal array');
	const matches = array.elements.filter(o => properties(o).get('slug')?.value?.value === slug);
	if (matches.length !== 1) fail('Missing or ambiguous slug');
	return matches[0];
}
function locate(tree, parts) {
	const declarations = tree.program.body.flatMap(s => s.type === 'ExportNamedDeclaration' && s.declaration?.type === 'VariableDeclaration' ? s.declaration.declarations : []);
	const vars = declarations.filter(d => d.id.name === 'temata');
	if (vars.length !== 1) fail('Missing or ambiguous temata declaration');
	const year = properties(vars[0].init).get(parts.slice(0, 2).join('/'));
	const topic = namedElement(year?.value, parts[2]);
	return namedElement(properties(topic).get('podtemata')?.value, parts[3]);
}
function validate(field, value) {
	if (['nazev', 'obsah', 'interakce', 'interakce2'].includes(field)) {
		if (typeof value !== 'string') fail('Expected string');
	} else if (['materialy', 'odkazy'].includes(field)) {
		if (!Array.isArray(value) || value.some(v => !v || typeof v !== 'object' || Array.isArray(v))) fail('Expected array of objects');
	} else if (field === 'zapis') {
		if (!value || typeof value !== 'object' || Array.isArray(value) || !Array.isArray(value.body) || value.body.some(v => typeof v !== 'string')) fail('Expected zapis with string body[]');
		if (Object.keys(value).some(k => !['body','zakon','vzorec','vzorecSlovy','jednotky'].includes(k))) fail('Unknown zapis key');
		for (const k of ['zakon','vzorec','vzorecSlovy']) if (k in value && typeof value[k] !== 'string') fail('Expected string');
		if ('jednotky' in value && (!Array.isArray(value.jednotky) || value.jednotky.some(v => typeof v !== 'string'))) fail('Expected string jednotky[]');
	} else fail('Unsupported field; slug is immutable, laborka/polemika belong elsewhere');
}
async function main() {
	const [rootArg, command, key, field, jsonFile, ...extra] = process.argv.slice(2);
	if (!rootArg || !key || extra.length || !['get','set'].includes(command) || (command === 'get' ? field !== undefined : !jsonFile)) fail('Usage: podtema.mjs ROOT get KEY | ROOT set KEY FIELD JSON_FILE');
	const parts = key.split('/');
	if (parts.length !== 4 || parts.some(p => !/^[a-z0-9-]+$/.test(p))) fail('Expected predmet/rocnik/tema/podtema');
	const root = fs.realpathSync(rootArg), file = path.join(root, 'src/data/temata.ts');
	if (fs.lstatSync(file).isSymbolicLink()) fail('Refusing symlink target');
	const before = fs.readFileSync(file), text = before.toString('utf8');
	if (!Buffer.from(text).equals(before)) fail('Source is not lossless UTF-8');
	const { nactiData, vsechnaPodtemata } = await import(pathToFileURL(path.join(root, 'testy/data.mjs')).href);
	const data = await nactiData();
	const found = vsechnaPodtemata(data.temata).filter(p => p.klic === key);
	if (found.length !== 1) fail('Missing or ambiguous data key');
	if (command === 'get') { console.log(JSON.stringify(found[0], null, 2)); return; }
	const value = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
	validate(field, value);
	const tree = ast(text), target = locate(tree, parts), props = properties(target);
	if (isDeepStrictEqual(found[0][field], value)) {
		console.log(JSON.stringify({ key, field, changed: false })); return;
	}
	const encoded = JSON.stringify(value); // JSON literal: apostrophes, backticks, ${} cannot execute.
	let start, end, replacement;
	if (props.has(field)) {
		const v = props.get(field).value;
		start = v.start; end = v.end; replacement = encoded;
	} else {
		// Insert immediately after '{'; leaves every existing property/comment byte intact.
		const first = target.properties[0];
		if (!first) fail('Empty target');
		const lineStart = text.lastIndexOf('\n', first.start - 1) + 1;
		const indent = text.slice(lineStart, first.start);
		if (!/^[\t ]*$/.test(indent)) fail('Insertion requires multiline literal object');
		start = end = target.start + 1;
		replacement = (text.includes('\r\n') ? '\r\n' : '\n') + indent + field + ': ' + encoded + ',';
	}
	const candidate = text.slice(0, start) + replacement + text.slice(end);
	ast(candidate);
	// Validate the exact runtime data before touching disk. Existing reader remains authoritative.
	const output = await build({ stdin: { contents: candidate, sourcefile: file, resolveDir: path.dirname(file), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' });
	const next = await import('data:text/javascript;base64,' + Buffer.from(output.outputFiles[0].text).toString('base64'));
	const expected = structuredClone(data.temata);
	const expectedTarget = expected[parts.slice(0,2).join('/')].find(t => t.slug === parts[2]).podtemata.find(p => p.slug === parts[3]);
	expectedTarget[field] = value;
	if (!isDeepStrictEqual(next.temata, expected)) fail('Runtime change exceeds requested field');
	const bytes = Buffer.from(candidate);
	const prefix = Buffer.from(text.slice(0,start)), suffix = Buffer.from(text.slice(end));
	if (!bytes.subarray(0,prefix.length).equals(before.subarray(0,prefix.length)) || !bytes.subarray(bytes.length-suffix.length).equals(before.subarray(before.length-suffix.length))) fail('Outside-range bytes changed');
	if (!fs.readFileSync(file).equals(before)) fail('Concurrent modification; refusing write');
	// Optimistic check is NOT a cross-process lock. Caller must hold exclusive ownership.
	const stat = fs.statSync(file);
	const temporary = file + '.podtema-' + process.pid + '-' + Date.now();
	const fd = fs.openSync(temporary, 'wx', stat.mode & 0o777);
	try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
	if (!fs.readFileSync(file).equals(before)) fail('Concurrent modification; candidate retained: ' + temporary);
	fs.renameSync(temporary, file);
	if (!fs.readFileSync(file).equals(bytes)) fail('Read-back mismatch');
	console.log(JSON.stringify({ key, field, changed: true, start, end, outsideRangeUnchanged: true }));
}
if (process.env.PODTEMA_LOCK_FD === undefined) {
	const root = process.argv[2];
	if (!root) { console.error('Missing ROOT'); process.exitCode = 1; }
	else {
		const result = spawnSync('python3', [fileURLToPath(new URL('./podtema-lock.py', import.meta.url)), process.execPath, root, ...process.argv.slice(1)], { stdio: 'inherit' });
		if (result.error) console.error(result.error.message);
		process.exitCode = result.status ?? 1;
	}
} else {
	try { fs.fstatSync(Number(process.env.PODTEMA_LOCK_FD)); }
	catch { console.error('Missing inherited lock descriptor'); process.exit(1); }
	main().catch(e => { console.error(e.message); process.exitCode = 1; });
}
