import { execFileSync } from 'node:child_process';
import { chmodSync } from 'node:fs';
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {encoding:'utf8'}).trim();
let existing = '';
try { existing = execFileSync('git', ['config', '--get', 'core.hooksPath'], {cwd:root, encoding:'utf8'}).trim(); } catch (e) { if (e.status !== 1) throw e; }
if (existing && existing !== '.githooks') throw new Error('Existující hooksPath se nepřepisuje; spojení musí posoudit správce.');
chmodSync(root + '/.githooks/pre-commit', 0o755);
execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], {cwd:root});
console.log('Pojistka pre-commit nainstalována.');
