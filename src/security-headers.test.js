import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

const PATH = 'vercel.json';

function globalHeaders() {
  const config = JSON.parse(readFileSync(PATH, 'utf8'));
  const global = (config.headers ?? []).find((h) => h.source === '/(.*)');
  return global?.headers ?? [];
}

describe('security headers in vercel.json', () => {
  it('ships a vercel.json with a global headers block', () => {
    expect(existsSync(PATH)).toBe(true);
    const config = JSON.parse(readFileSync(PATH, 'utf8'));
    expect(Array.isArray(config.headers)).toBe(true);
    expect(config.headers.some((h) => h.source === '/(.*)')).toBe(true);
  });

  it.each([
    ['Content-Security-Policy', "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'"],
    ['X-Frame-Options', 'SAMEORIGIN'],
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()'],
  ])('sets %s', (key, value) => {
    const headers = globalHeaders();
    const found = headers.find((h) => h.key === key);
    expect(found).toBeDefined();
    expect(found.value).toBe(value);
  });

  it('does not restrict clipboard-write (relies on spec default of self)', () => {
    const headers = globalHeaders();
    const pp = headers.find((h) => h.key === 'Permissions-Policy');
    expect(pp).toBeDefined();
    expect(pp.value).not.toMatch(/clipboard/i);
  });

  it('does not alter the platform-managed HSTS header', () => {
    const lines = readFileSync(PATH, 'utf8');
    expect(lines).not.toMatch(/Strict-Transport-Security/i);
  });
});
