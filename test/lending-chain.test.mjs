// Standalone unit tests for the lending chain discriminator.
//
// This repo currently has no Jest / Vitest infrastructure, so we use a
// tiny node:assert harness that runs against the compiled `dist/` output.
// Run with: `npm run build && node test/lending-chain.test.mjs`.

import assert from 'node:assert/strict';

// Import the lending sub-modules directly to avoid pulling in unrelated
// transitive runtime deps from the main barrel (e.g. ticketing -> nestjs).
import { LendingMarketProfileDoc } from '../dist/cosmos-db/documents/lending/lending-market-profile.doc.js';
import { LendingAccountProfileDoc } from '../dist/cosmos-db/documents/lending/lending-account-profile.js';
import { LendingAccountPnl } from '../dist/cosmos-db/documents/lending/lending-account-pnl.js';
import { LendingNftAttributes } from '../dist/cosmos-db/documents/lending/lending-nft-attributes.js';
import { LendingEModeCategoryProfileDoc } from '../dist/cosmos-db/documents/lending/lending-emode-category-profile.doc.js';
import { LendingTokenEModeProfileDoc } from '../dist/cosmos-db/documents/lending/lending-token-emode-profile.doc.js';
import { LendingAccountSummary } from '../dist/cosmos-db/documents/lending/lending-account-summary.js';
import { normalizeLendingChain } from '../dist/cosmos-db/documents/lending/lending-chain.js';
import { ActivityChain } from '../dist/enums/common.enum.js';

let failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failed++;
    console.error(`  FAIL  ${name}`);
    console.error(err);
  }
}

console.log('lending chain discriminator');

test('new LendingMarketProfileDoc({}) defaults chain to MVX', () => {
  const doc = new LendingMarketProfileDoc({});
  assert.equal(doc.chain, 'MVX');
  assert.equal(doc.chain, ActivityChain.MVX);
});

test('new LendingMarketProfileDoc({ chain: STELLAR }) preserves STELLAR', () => {
  const doc = new LendingMarketProfileDoc({ chain: ActivityChain.STELLAR });
  assert.equal(doc.chain, 'STELLAR');
});

test('new LendingAccountProfileDoc({}) defaults chain to MVX', () => {
  const doc = new LendingAccountProfileDoc({});
  assert.equal(doc.chain, 'MVX');
});

test('new LendingAccountPnl({}) defaults chain to MVX', () => {
  const doc = new LendingAccountPnl({});
  assert.equal(doc.chain, 'MVX');
});

test('new LendingNftAttributes({}) defaults chain to MVX', () => {
  const doc = new LendingNftAttributes({});
  assert.equal(doc.chain, 'MVX');
});

test('new LendingEModeCategoryProfileDoc({}) defaults chain to MVX', () => {
  const doc = new LendingEModeCategoryProfileDoc({});
  assert.equal(doc.chain, 'MVX');
});

test('new LendingTokenEModeProfileDoc({}) defaults chain to MVX', () => {
  const doc = new LendingTokenEModeProfileDoc({});
  assert.equal(doc.chain, 'MVX');
});

test('LendingAccountSummary class field default is MVX', () => {
  // No constructor — instantiate via Object.assign for parity with API hydration.
  const summary = Object.assign(new LendingAccountSummary(), {});
  assert.equal(summary.chain, 'MVX');
});

test('normalizeLendingChain(undefined) -> MVX', () => {
  assert.equal(normalizeLendingChain(undefined), 'MVX');
  assert.equal(normalizeLendingChain(undefined), ActivityChain.MVX);
});

test('normalizeLendingChain(null) -> MVX', () => {
  assert.equal(normalizeLendingChain(null), 'MVX');
});

test('normalizeLendingChain("") -> MVX', () => {
  assert.equal(normalizeLendingChain(''), 'MVX');
});

test('normalizeLendingChain("STELLAR") -> STELLAR', () => {
  assert.equal(normalizeLendingChain('STELLAR'), 'STELLAR');
  assert.equal(normalizeLendingChain('STELLAR'), ActivityChain.STELLAR);
});

test('normalizeLendingChain("MVX") -> MVX', () => {
  assert.equal(normalizeLendingChain('MVX'), 'MVX');
});

test('normalizeLendingChain("SUI") -> SUI', () => {
  assert.equal(normalizeLendingChain('SUI'), 'SUI');
});

if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
}
console.log('\nAll lending chain tests passed.');
