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
  assert.equal(StellarLendingActivity.ParamUpdate, 'paramUpdate');
});

test('governance kind enum self-contained', () => {
  assert.equal(
    StellarGovernanceProposalKind.ConfigureAssetOracle,
    'ConfigureAssetOracle',
  );
  assert.equal(
    StellarGovernanceProposalKind.SetSwapAggregator,
    'SetSwapAggregator',
  );
});

test('shared api cache keys are network scoped', () => {
  assert.equal(
    stellarReserveKey({ spokeId: 2, hubId: 1, asset: 'CUSDC' }),
    '2:1:CUSDC',
  );
  assert.equal(
    CacheKeys.StellarLendingContext('testnet').key,
    'sl:testnet:context',
  );
  assert.equal(
    CacheKeys.StellarLendingReservesList(
      'testnet',
      undefined,
      undefined,
      undefined,
    ).key,
    'sl:testnet:list:reserves:::',
  );
  assert.equal(
    CacheKeys.StellarLendingReserve('testnet', 2, 1, 'CUSDC').key,
    'sl:testnet:reserve:2:1:CUSDC',
  );
});

test('asset doc derives id + pk', () => {
  const d = new StellarAssetDoc({
    network: 'testnet',
    asset: 'CUSDC',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 7,
  });
  assert.equal(d.id, 'asset:CUSDC');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.ASSET}`);
  assert.equal(d.dataType, StellarLendingDataType.ASSET);
});

test('hub doc derives id + pk', () => {
  const d = new StellarHubDoc({ network: 'testnet', hubId: 1 });
  assert.equal(d.id, 'hub:1');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.HUB}`);
});

test('hub-asset doc derives id + pk', () => {
  const d = new StellarHubAssetDoc({
    network: 'testnet',
    hubId: 1,
    asset: 'CUSDC',
  });
  assert.equal(d.id, 'hubAsset:1:CUSDC');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.HUB_ASSET}`);
});

test('spoke doc derives id + pk', () => {
  const d = new StellarSpokeDoc({ network: 'testnet', spokeId: 2 });
  assert.equal(d.id, 'spoke:2');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.SPOKE}`);
});

test('spoke-asset doc derives id + pk', () => {
  const d = new StellarSpokeAssetDoc({
    network: 'testnet',
    spokeId: 2,
    hubId: 1,
    asset: 'CUSDC',
  });
  assert.equal(d.id, 'spokeAsset:2:1:CUSDC');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.SPOKE_ASSET}`);
});

test('account-position doc partitions by accountId', () => {
  const d = new StellarAccountPositionDoc({
    network: 'testnet',
    accountId: 'G123',
    owner: 'G123',
    hubId: 1,
    asset: 'CUSDC',
  });
  assert.equal(d.id, 'account:G123:1:CUSDC');
  assert.equal(d.pk, 'testnet:G123');
});

test('governance proposal doc id = operationId', () => {
  const d = new StellarGovernanceProposalDoc({
    network: 'testnet',
    operationId: 'abc123',
  });
  assert.equal(d.id, 'abc123');
  assert.equal(
    d.pk,
    `testnet:${StellarLendingDataType.GOVERNANCE_PROPOSAL}`,
  );
});

test('cursor doc fixed id + pk', () => {
  const d = new StellarLendingCursorDoc({ network: 'testnet', lastLedger: 42 });
  assert.equal(d.id, 'cursor:stellar-lending');
  assert.equal(d.pk, `testnet:${StellarLendingDataType.CURSOR}`);
  assert.equal(d.lastLedger, 42);
});
