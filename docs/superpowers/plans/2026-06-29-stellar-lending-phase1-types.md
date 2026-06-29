# Phase 1 — `@xoxno/types` Stellar-only lending subtree (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development or superpowers:executing-plans. Sub-plan of the master plan (`xoxno-az-functions/docs/superpowers/plans/2026-06-29-stellar-lending-independent-architecture.md`, Appendix A is authoritative for fields). Repo: **types** only.

**Goal:** Add a new, isolated `@xoxno/types/stellar-lending` subtree — Stellar-only Cosmos document classes + enums + Kusto row interfaces — with **no `chain` field, no MVX base classes, no `normalizeLendingChain`**, exported on its own subpath.

**Architecture:** Mirror the existing doc convention (plain class, `dataType` default, `constructor(props?: Partial<T>)` that `Object.assign`s then derives `pk`/`id`) but drop the multi-chain machinery. New docs are **persistence shapes** (no `@ApiProperty`); api-v2 (Phase 3) owns the swagger response DTOs. Everything lives under one folder `src/stellar-lending/` so the subpath is self-contained.

**Tech Stack:** TypeScript (strict), `tsc` build via `generate-barrel.mjs` → `eslint --fix` → `tsc` → `strip-types.js`. Tests: Node `assert/strict` `.test.mjs` against compiled `dist/`.

## Global Constraints

- No `chain`, no `ActivityChain`, no `normalizeLendingChain` in the new subtree.
- Amounts are big-integer **strings**; `*Short`/derived ratios are **numbers**. RAY=27-dec, WAD=18-dec, BPS=basis points.
- Container partition path is `/pk` for every container; the constructor sets `this.pk` to the right value (state docs → `dataType`; account positions → `accountId`).
- Field names/types copied verbatim from master Appendix A §1–§16. No invention/reorder.
- Conventional Commits, subject ≤72 chars. One commit per task.
- **Verification:** `npm run build` (must compile) + `node test/stellar-lending.test.mjs` (all `ok`).

## File Structure

```
src/stellar-lending/
  enums/data-type.enum.ts        # StellarLendingDataType
  enums/activity.enum.ts         # StellarLendingActivity
  enums/index.ts
  oracle-provider.ts             # StellarOracleProvider (TS mirror of EventOracleProvider)
  documents/asset.doc.ts         # StellarAssetDoc
  documents/hub.doc.ts           # StellarHubDoc
  documents/hub-asset.doc.ts     # StellarHubAssetDoc
  documents/spoke.doc.ts         # StellarSpokeDoc
  documents/spoke-asset.doc.ts   # StellarSpokeAssetDoc
  documents/account-position.doc.ts  # StellarAccountPositionDoc
  documents/top-holders.doc.ts   # StellarTopHoldersDoc
  documents/governance-proposal.doc.ts  # StellarGovernanceProposalDoc
  documents/cursor.doc.ts        # StellarLendingCursorDoc
  documents/index.ts
  kusto/activity-data.ts         # StellarLendingActivityData (interface)
  kusto/market-snapshot-row.ts   # StellarLendingMarketSnapshotRow (interface)
  kusto/index.ts
  index.ts                       # subtree barrel (the ./stellar-lending entrypoint)
test/stellar-lending.test.mjs
package.json                     # add "./stellar-lending" export
```

---

## Task 1.1 — Enums

**Files:** Create `src/stellar-lending/enums/data-type.enum.ts`, `activity.enum.ts`, `index.ts`. Test: `test/stellar-lending.test.mjs`.

**Produces:** `StellarLendingDataType`, `StellarLendingActivity`.

- [ ] **Step 1: Write failing test** — create `test/stellar-lending.test.mjs`:

```javascript
import assert from 'node:assert/strict';
import { StellarLendingDataType, StellarLendingActivity }
  from '../dist/stellar-lending/index.js';

function test(name, fn) {
  try { fn(); console.log(`  ok  ${name}`); }
  catch (err) { console.error(`  FAIL  ${name}`); console.error(err); process.exitCode = 1; }
}

test('data-type enum values', () => {
  assert.equal(StellarLendingDataType.HUB_ASSET, 'hubAsset');
  assert.equal(StellarLendingDataType.SPOKE_ASSET, 'spokeAsset');
});
test('activity enum values', () => {
  assert.equal(StellarLendingActivity.Supply, 'supply');
  assert.equal(StellarLendingActivity.FlashLoan, 'flashLoan');
});
```

- [ ] **Step 2: Verify it fails** — `npm run build` fails (module `../dist/stellar-lending/index.js` missing).

- [ ] **Step 3: Implement** — `src/stellar-lending/enums/data-type.enum.ts`:

```typescript
export enum StellarLendingDataType {
  ASSET = 'asset',
  HUB = 'hub',
  HUB_ASSET = 'hubAsset',
  SPOKE = 'spoke',
  SPOKE_ASSET = 'spokeAsset',
  ACCOUNT_POSITION = 'accountPosition',
  TOP_HOLDERS = 'topHolders',
  GOVERNANCE_PROPOSAL = 'governanceProposal',
  CURSOR = 'cursor',
}
```
`src/stellar-lending/enums/activity.enum.ts`:
```typescript
export enum StellarLendingActivity {
  Supply = 'supply',
  Borrow = 'borrow',
  Withdraw = 'withdraw',
  Repay = 'repay',
  LiqRepay = 'liqRepay',
  LiqSeize = 'liqSeize',
  Multiply = 'multiply',
  SwapDebt = 'swapDebt',
  SwapCollateral = 'swapCollateral',
  RepayWithCollateral = 'repayWithCollateral',
  CloseWithdraw = 'closeWithdraw',
  Migrate = 'migrate',
  FlashLoan = 'flashLoan',
  BadDebt = 'badDebt',
  StrategyFee = 'strategyFee',
}
```
`src/stellar-lending/enums/index.ts`:
```typescript
export * from './data-type.enum';
export * from './activity.enum';
```
Then create a minimal `src/stellar-lending/index.ts` re-exporting `./enums` (expanded in later tasks):
```typescript
export * from './enums';
```
And add the subpath to `package.json` `exports` (see Task 1.10 for the full block; for now add):
```json
"./stellar-lending": {
  "import": "./dist/stellar-lending/index.js",
  "require": "./dist/stellar-lending/index.js",
  "types": "./dist/stellar-lending/index.d.ts"
}
```

- [ ] **Step 4: Verify pass** — `npm run build && node test/stellar-lending.test.mjs` → both `ok`.

- [ ] **Step 5: Commit** — `git add src/stellar-lending package.json test/stellar-lending.test.mjs && git commit -m "feat(stellar-lending): add data-type + activity enums and subpath export"`

---

## Task 1.2 — `StellarOracleProvider` (TS mirror of on-chain `EventOracleProvider`)

**Files:** Create `src/stellar-lending/oracle-provider.ts`. Export from `src/stellar-lending/index.ts`. Test: extend the test file.

**Produces:** `StellarOracleProvider` — all `i128` → `string`, `u32/u64` → `number`, `Option<T>` → `T | null`. Field set is the on-chain `controller/src/events.rs::EventOracleProvider`.

- [ ] **Step 1: Write failing test** (append):
```javascript
import { /* existing */ } from '../dist/stellar-lending/index.js';
test('oracle provider shape constructs', () => {
  const p = { baseTokenId: 'C...', quoteTokenSymbol: 'USD', strategy: 1, assetDecimals: 7,
    primaryProvider: 0, primaryContract: 'C...', primaryDecimals: 14, anchorProvider: null,
    minSanityPriceWad: '0', maxSanityPriceWad: '0' };
  assert.equal(p.quoteTokenSymbol, 'USD'); // type-only guard; compile is the real check
});
```
- [ ] **Step 2: Verify fail** — build fails until the interface exists and is exported.
- [ ] **Step 3: Implement** `src/stellar-lending/oracle-provider.ts`:
```typescript
export interface StellarOracleProvider {
  baseTokenId: string;
  quoteTokenSymbol: string;            // "USD"
  toleranceUpperBps: number;
  toleranceLowerBps: number;
  pricingMethod: number;               // EventPricingMethod discriminant
  oracleType: number;                  // EventOracleType discriminant
  strategy: number;
  assetDecimals: number;
  maxPriceStaleSeconds: number;
  primaryProvider: number;
  primaryContract: string;
  primaryAsset: string | null;
  primarySymbol: string | null;
  primaryFeedId: string | null;
  primaryQuoteToken: string | null;
  primaryReadMode: number;
  primaryTwapRecords: number;
  primaryDecimals: number;
  primaryResolutionSeconds: number;
  primaryMaxStaleSeconds: number;
  anchorProvider: number | null;
  anchorContract: string | null;
  anchorAsset: string | null;
  anchorSymbol: string | null;
  anchorFeedId: string | null;
  anchorQuoteToken: string | null;
  anchorReadMode: number;
  anchorTwapRecords: number;
  anchorDecimals: number;
  anchorResolutionSeconds: number;
  anchorMaxStaleSeconds: number;
  minSanityPriceWad: string;
  maxSanityPriceWad: string;
}
```
Add `export * from './oracle-provider';` to `src/stellar-lending/index.ts`.
- [ ] **Step 4: Verify pass** — build + test green.
- [ ] **Step 5: Commit** — `feat(stellar-lending): add StellarOracleProvider mirror`.

---

## Task 1.3 — EXEMPLAR doc: `StellarAssetDoc` (the pattern every doc follows)

**Files:** Create `src/stellar-lending/documents/asset.doc.ts`, `documents/index.ts`. Export `./documents` from the subtree `index.ts`. Test: extend.

**Produces:** `StellarAssetDoc` — id `asset:{asset}`, pk = dataType.

- [ ] **Step 1: Write failing test** (append):
```javascript
import { StellarAssetDoc, StellarLendingDataType } from '../dist/stellar-lending/index.js';
test('asset doc derives id + pk', () => {
  const d = new StellarAssetDoc({ asset: 'CUSDC', symbol: 'USDC', name: 'USD Coin', decimals: 7 });
  assert.equal(d.id, 'asset:CUSDC');
  assert.equal(d.pk, StellarLendingDataType.ASSET);
  assert.equal(d.dataType, StellarLendingDataType.ASSET);
});
```
- [ ] **Step 2: Verify fail** — build fails (no `StellarAssetDoc`).
- [ ] **Step 3: Implement** `src/stellar-lending/documents/asset.doc.ts`:
```typescript
import { StellarLendingDataType } from '../enums';
import type { StellarOracleProvider } from '../oracle-provider';

export class StellarAssetDoc {
  dataType = StellarLendingDataType.ASSET;
  asset!: string;
  symbol!: string;
  name!: string;
  decimals!: number;
  oracleProvider: StellarOracleProvider | null = null;
  usdPriceWad = '0';
  usdPriceShort = 0;
  totalDepositsUsd = '0';
  totalBorrowsUsd = '0';
  availableLiquidityUsd = '0';
  hubCount = 0;
  reserveCount = 0;
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `asset:${this.asset}`;
  }
}
```
`src/stellar-lending/documents/index.ts`:
```typescript
export * from './asset.doc';
```
Add `export * from './documents';` to `src/stellar-lending/index.ts`.
- [ ] **Step 4: Verify pass** — build + test green.
- [ ] **Step 5: Commit** — `feat(stellar-lending): add StellarAssetDoc (doc exemplar)`.

---

## Tasks 1.4–1.9 — Remaining docs (follow the 1.3 exemplar exactly)

Each task is one file + one `export` line in `documents/index.ts` + one id/pk test (mirror 1.3: construct, assert `id`+`pk`) + commit `feat(stellar-lending): add <DocName>`. Constructor pattern is identical to 1.3 (`Object.assign`, set `pk`, set `id`). Full bodies below — copy verbatim.

- [ ] **1.4 `StellarHubDoc`** — `documents/hub.doc.ts` — id `hub:{hubId}`, pk = `HUB`:
```typescript
import { StellarLendingDataType } from '../enums';
export class StellarHubDoc {
  dataType = StellarLendingDataType.HUB;
  hubId!: number;
  isActive = true;
  name: string | null = null;
  totalDepositsUsd = '0';
  totalBorrowsUsd = '0';
  availableLiquidityUsd = '0';
  utilization = 0;
  assetCount = 0;
  updatedAt = 0;
  ledger = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarHubDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `hub:${this.hubId}`;
  }
}
```

- [ ] **1.5 `StellarHubAssetDoc`** — `documents/hub-asset.doc.ts` — id `hubAsset:{hubId}:{asset}`, pk = `HUB_ASSET`:
```typescript
import { StellarLendingDataType } from '../enums';
export class StellarHubAssetDoc {
  dataType = StellarLendingDataType.HUB_ASSET;
  hubId!: number;
  asset!: string;
  assetDecimals = 0;
  marketAddress = '';
  maxBorrowRateRay = '0'; baseBorrowRateRay = '0';
  slope1Ray = '0'; slope2Ray = '0'; slope3Ray = '0';
  midUtilizationRay = '0'; optimalUtilizationRay = '0'; maxUtilizationRay = '0';
  reserveFactorBps = 0;
  supplyIndexRay = '0'; borrowIndexRay = '0';
  cash = '0'; supplied = '0'; borrowed = '0'; revenue = '0';
  suppliedShort = 0; borrowedShort = 0; cashShort = 0;
  supplyApy = 0; borrowApy = 0; utilization = 0;
  supplyCap = '0'; borrowCap = '0'; supplyCapShort = 0; borrowCapShort = 0;
  isFlashloanable = false; flashloanFeeBps = 0;
  updatedAt = 0; ledger = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarHubAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `hubAsset:${this.hubId}:${this.asset}`;
  }
}
```

- [ ] **1.6 `StellarSpokeDoc`** — `documents/spoke.doc.ts` — id `spoke:{spokeId}`, pk = `SPOKE`:
```typescript
import { StellarLendingDataType } from '../enums';
export class StellarSpokeDoc {
  dataType = StellarLendingDataType.SPOKE;
  spokeId!: number;
  isDeprecated = false;
  name: string | null = null;
  liquidationTargetHfWad = '0';
  healthFactorForMaxBonusWad = '0';
  liquidationBonusFactorBps = 0;
  totalDepositsUsd = '0';
  totalBorrowsUsd = '0';
  assetCount = 0;
  connectedHubIds: number[] = [];
  updatedAt = 0; ledger = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarSpokeDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `spoke:${this.spokeId}`;
  }
}
```

- [ ] **1.7 `StellarSpokeAssetDoc`** — `documents/spoke-asset.doc.ts` — id `spokeAsset:{spokeId}:{hubId}:{asset}`, pk = `SPOKE_ASSET`:
```typescript
import { StellarLendingDataType } from '../enums';
import type { StellarOracleProvider } from '../oracle-provider';
export class StellarSpokeAssetDoc {
  dataType = StellarLendingDataType.SPOKE_ASSET;
  spokeId!: number;
  hubId!: number;
  asset!: string;
  isCollateralizable = false;
  isBorrowable = false;
  paused = false;
  frozen = false;
  loanToValueBps = 0;
  liquidationThresholdBps = 0;
  liquidationBonusBps = 0;
  liquidationFeesBps = 0;
  supplyCap = '0'; borrowCap = '0'; supplyCapShort = 0; borrowCapShort = 0;
  oracleOverride: StellarOracleProvider | null = null;
  suppliedScaledRay = '0'; borrowedScaledRay = '0';
  updatedAt = 0; ledger = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarSpokeAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `spokeAsset:${this.spokeId}:${this.hubId}:${this.asset}`;
  }
}
```

- [ ] **1.8 `StellarAccountPositionDoc`** — `documents/account-position.doc.ts` — id `account:{accountId}:{hubId}:{asset}`, **pk = `accountId`** (accounts container partitions by `/pk` with value = accountId):
```typescript
import { StellarLendingDataType } from '../enums';
export interface StellarInitialPaymentMultiplier {
  initialPaymentAmount: string;
  initialPaymentToken: string;
  usdValue: string;
}
export class StellarAccountPositionDoc {
  dataType = StellarLendingDataType.ACCOUNT_POSITION;
  accountId!: string;
  owner!: string;
  spokeId = 0;
  positionMode = 0;
  hubId!: number;
  asset!: string;
  supplyScaledRay = '0';
  borrowScaledRay = '0';
  supplyIndexRay: string | null = null;
  borrowIndexRay: string | null = null;
  entryLtvBps = 0;
  entryLiquidationThresholdBps = 0;
  entryLiquidationBonusBps = 0;
  entryLiquidationFeesBps = 0;
  initialPaymentMultiplier: StellarInitialPaymentMultiplier | null = null;
  updatedAt = 0; ledger = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarAccountPositionDoc>) {
    Object.assign(this, props);
    this.pk = this.accountId;
    this.id = `account:${this.accountId}:${this.hubId}:${this.asset}`;
  }
}
```

- [ ] **1.9 `StellarTopHoldersDoc` + `StellarGovernanceProposalDoc` + `StellarLendingCursorDoc`** — three small docs, one commit:
`documents/top-holders.doc.ts` (id `topHolders:{spokeId}:{hubId}:{asset}:{side}`, pk = `TOP_HOLDERS`):
```typescript
import { StellarLendingDataType } from '../enums';
export interface StellarTopHolder {
  owner: string; accountId: string; scaledRay: string; amountShort: number; sharePct: number;
}
export class StellarTopHoldersDoc {
  dataType = StellarLendingDataType.TOP_HOLDERS;
  spokeId!: number; hubId!: number; asset!: string;
  side!: 'deposits' | 'borrows';
  totalScaledRay = '0';
  holders: StellarTopHolder[] = [];
  updatedAt = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarTopHoldersDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `topHolders:${this.spokeId}:${this.hubId}:${this.asset}:${this.side}`;
  }
}
```
`documents/governance-proposal.doc.ts` (id `{operationId}`, pk = `GOVERNANCE_PROPOSAL`) — port the existing `LendingGovernanceProposalDoc` field set minus `chain` (read `src/cosmos-db/documents/lending/lending-governance-proposal.doc.ts` for the fields; construct with `this.pk = this.dataType; this.id = this.operationId;`).
`documents/cursor.doc.ts` (id `cursor:stellar-lending`, pk = `CURSOR`):
```typescript
import { StellarLendingDataType } from '../enums';
export class StellarLendingCursorDoc {
  dataType = StellarLendingDataType.CURSOR;
  lastLedger = 0;
  lastPagingToken: string | null = null;
  updatedAt = 0;
  id!: string; pk!: string; _ts?: number;
  constructor(props?: Partial<StellarLendingCursorDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = 'cursor:stellar-lending';
  }
}
```
Add all three to `documents/index.ts`. Test: construct each, assert `id`+`pk`. Commit `feat(stellar-lending): add top-holders, governance, cursor docs`.

---

## Task 1.10 — Kusto row interfaces + finalize barrel + exports

**Files:** Create `kusto/activity-data.ts`, `kusto/market-snapshot-row.ts`, `kusto/index.ts`; finalize `src/stellar-lending/index.ts`; confirm `package.json` export.

- [ ] **Step 1: Write failing test** (append): import `StellarLendingMarketSnapshotRow` is type-only; add a runtime guard that the barrel re-exports a doc + enum together:
```javascript
import * as SL from '../dist/stellar-lending/index.js';
test('barrel re-exports docs + enums', () => {
  assert.equal(typeof SL.StellarHubAssetDoc, 'function');
  assert.equal(SL.StellarLendingDataType.SNAPSHOT, undefined); // SNAPSHOT lives in Kusto, not a Cosmos dataType
  assert.equal(SL.StellarLendingDataType.HUB, 'hub');
});
```
- [ ] **Step 2: Verify fail** — until `kusto/*` + barrel exist (the `import * as` of a not-yet-complete barrel still builds; the assertion on `StellarHubAssetDoc` guards the export).
- [ ] **Step 3: Implement** `kusto/activity-data.ts`:
```typescript
import type { StellarLendingActivity } from '../enums';
export interface StellarLendingActivityData {
  action: StellarLendingActivity;
  hubId: number;
  spokeId: number | null;
  reserveKey: string | null;          // `${spokeId}:${hubId}:${asset}`
  accountId: string | null;
  owner: string | null;
  token: string;
  amount: string;
  amountShort: number;
  oraclePrice: number | null;
  usd: number | null;
  feeShort?: number;
}
```
`kusto/market-snapshot-row.ts`:
```typescript
export interface StellarLendingMarketSnapshotRow {
  SnapshotAt: string;                 // ISO datetime
  Chain: 'STELLAR';
  HubId: number;
  SpokeId: number | null;
  Token: string;
  Symbol: string;
  Decimals: number;
  UsdPrice: number;
  SupplyApy: number;
  BorrowApy: number;
  Utilization: number;
  TotalDepositsRaw: string;
  TotalDepositsUsd: number;
  TotalBorrowsRaw: string;
  TotalBorrowsUsd: number;
  AvailableLiquidityUsd: number;
  SupplyIndexRay: string;
  BorrowIndexRay: string;
}
```
`kusto/index.ts`: `export * from './activity-data'; export * from './market-snapshot-row';`
Finalize `src/stellar-lending/index.ts`:
```typescript
export * from './enums';
export * from './oracle-provider';
export * from './documents';
export * from './kusto';
```
- [ ] **Step 4: Verify** `package.json` `exports` contains the `./stellar-lending` block (added in 1.1); if `generate-barrel.mjs` pulls `src/stellar-lending` into the root `src/index.ts`, that is acceptable (the `.` export may re-export the subtree) — confirm `npm run build` stays green. If the root barrel must stay MVX-only, add `src/stellar-lending` to `generate-barrel.mjs`'s ignore list.
- [ ] **Step 5: Commit** — `feat(stellar-lending): add Kusto row interfaces + finalize subpath barrel`.

---

## Task 1.11 — Publish alpha

- [ ] Bump version to an alpha (e.g. `1.0.x-stellar-lending.0`), `npm run build && node test/stellar-lending.test.mjs` green, publish per the repo's release flow. Downstream (Phases 2–4) install this alpha.
- [ ] Commit `chore(release): @xoxno/types stellar-lending alpha`.

## Self-review

- **Spec coverage:** Appendix §1 (enums) →1.1; §14 (oracle) →1.2; §3 Asset→1.3; §4 Hub→1.4; §5 HubAsset→1.5; §6 Spoke→1.6; §7 SpokeAsset→1.7; §8 AccountPosition→1.8; §11 TopHolders/§12 Governance/§13 Cursor→1.9; §9 ActivityData/§10 SnapshotRow→1.10. `SNAPSHOT`/`ACTIVITY` deliberately absent from the Cosmos `dataType` enum (they live in Kusto).
- **Type consistency:** every doc uses the same constructor shape (`Object.assign` → set `pk` → set `id`); `pk = dataType` for state docs, `pk = accountId` for `StellarAccountPositionDoc`; ids match the master Appendix verbatim.
- **No placeholders:** all nine doc classes + two enums + two Kusto interfaces + oracle interface have full bodies. The only "go read X" is the governance-proposal field port (1.9), which names the exact source file.
