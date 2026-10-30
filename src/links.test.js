import { test } from 'node:test';
import assert from 'node:assert/strict';
import { safeUrl, theaterUrl } from './links.js';
test('preserves service paths and hashes through the Theater redirect', () => {
  const target = 'https://example.com:8443/web/#/home?x=1&y=2';
  assert.equal(new URL(theaterUrl(target)).searchParams.get('q'), target);
});
test('rejects malformed, script, insecure and credential-bearing destinations', () => {
  for (const url of ['', 'broken', 'javascript:alert(1)', 'http://example.com', 'https://user:secret@example.com']) {
    assert.equal(safeUrl(url), ''); assert.equal(theaterUrl(url), '');
  }
});
