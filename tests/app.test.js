import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('page connects the application assets and accessible main landmark', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /<main id="content">/);
  assert.match(html, /src="\/src\/main\.js"/);
  assert.match(html, /id="subscribe-form"/);
});
test('application offers filtering, theme persistence, and newsletter validation', async () => {
  const [html, script] = await Promise.all([readFile('index.html', 'utf8'), readFile('src/main.js', 'utf8')]);
  assert.match(html, /data-filter/);
  assert.match(script, /localStorage\.setItem\('wonblog-theme'/);
  assert.match(script, /input\.validity\.valid/);
});
