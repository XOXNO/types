import assert from 'node:assert/strict';

import {
  StellarLendingDataType,
  StellarLendingActivity,
  StellarGovernanceProposalKind,
  StellarAssetDoc,
  StellarHubDoc,
  StellarHubAssetDoc,
  StellarSpokeDoc,
  StellarSpokeAssetDoc,
  StellarAccountPositionDoc,
  StellarGovernanceProposalDoc,
  StellarLendingCursorDoc,
  stellarReserveKey,
} from '../dist/stellar-lending/index.js';
import { CacheKeys } from '../dist/cache/cache-keys.js';

function test(name, fn) {
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    console.error(`  FAIL  ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

test('data-type enum values', () => {
  assert.equal(StellarLendingDataType.HUB_ASSET, 'hubAsset');
  assert.equal(StellarLendingDataType.SPOKE_ASSET, 'spokeAsset');
  // SNAPSHOT/ACTIVITY are Kusto-only, never a Cosmos dataType.
  assert.equal(StellarLendingDataType.SNAPSHOT, undefined);
});

test('activity enum values', () => {
  assert.equal(StellarLendingActivity.Supply, 'supply');
  assert.equal(StellarLendingActivity.FlashLoan, 'flashLoan');
});

test('governance kind enum self-contained', () => {
  assert.equal(StellarGovernanceProposalKind.EditAssetConfig, 'EditAssetConfig');
});

test('shared api cache keys match stellar lending route keys', () => {
  assert.equal(
    stellarReserveKey({ spokeId: 2, hubId: 1, asset: 'CUSDC' }),
    '2:1:CUSDC',
  );
  assert.equal(CacheKeys.StellarLendingContext().key, 'sl:context');
  assert.equal(
    CacheKeys.StellarLendingReservesList(undefined, undefined, undefined).key,
    'sl:list:reserves:::',
  );
  assert.equal(
    CacheKeys.StellarLendingReserve(2, 1, 'CUSDC').key,
    'sl:reserve:2:1:CUSDC',
  );
});

test('asset doc derives id + pk', () => {
  const d = new StellarAssetDoc({
    asset: 'CUSDC',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 7,
  });
  assert.equal(d.id, 'asset:CUSDC');
  assert.equal(d.pk, StellarLendingDataType.ASSET);
  assert.equal(d.dataType, StellarLendingDataType.ASSET);
});

test('hub doc derives id + pk', () => {
  const d = new StellarHubDoc({ hubId: 1 });
  assert.equal(d.id, 'hub:1');
  assert.equal(d.pk, StellarLendingDataType.HUB);
});

test('hub-asset doc derives id + pk', () => {
  const d = new StellarHubAssetDoc({ hubId: 1, asset: 'CUSDC' });
  assert.equal(d.id, 'hubAsset:1:CUSDC');
  assert.equal(d.pk, StellarLendingDataType.HUB_ASSET);
});

test('spoke doc derives id + pk', () => {
  const d = new StellarSpokeDoc({ spokeId: 2 });
  assert.equal(d.id, 'spoke:2');
  assert.equal(d.pk, StellarLendingDataType.SPOKE);
});

test('spoke-asset doc derives id + pk', () => {
  const d = new StellarSpokeAssetDoc({ spokeId: 2, hubId: 1, asset: 'CUSDC' });
  assert.equal(d.id, 'spokeAsset:2:1:CUSDC');
  assert.equal(d.pk, StellarLendingDataType.SPOKE_ASSET);
});

test('account-position doc partitions by accountId', () => {
  const d = new StellarAccountPositionDoc({
    accountId: 'G123',
    owner: 'G123',
    hubId: 1,
    asset: 'CUSDC',
  });
  assert.equal(d.id, 'account:G123:1:CUSDC');
  assert.equal(d.pk, 'G123');
});

test('governance proposal doc id = operationId', () => {
  const d = new StellarGovernanceProposalDoc({ operationId: 'abc123' });
  assert.equal(d.id, 'abc123');
  assert.equal(d.pk, StellarLendingDataType.GOVERNANCE_PROPOSAL);
});

test('cursor doc fixed id + pk', () => {
  const d = new StellarLendingCursorDoc({ lastLedger: 42 });
  assert.equal(d.id, 'cursor:stellar-lending');
  assert.equal(d.pk, StellarLendingDataType.CURSOR);
  assert.equal(d.lastLedger, 42);
});
