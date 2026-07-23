import type { StellarLendingActivity } from '../enums';

/**
 * Dynamic JSON written into the existing `NftActivityData.ActivityData` column
 * for Stellar-lending activity (`Source='xoxnoLending'`, `Chain='STELLAR'`).
 * Not a Cosmos document — rides the existing activity → Kusto change-feed.
 */
export interface StellarLendingActivityData {
  action: StellarLendingActivity;
  hubId: number;
  spokeId: number | null;
  reserveKey: string | null;
  accountId: string | null;
  owner: string | null;
  token: string;
  /** Action delta amount (this tx), big-int string. */
  amount: string;
  /**
   * Display-unit delta. `null` when the asset header decimals are not yet
   * known — never fabricated from a default (append-only activity).
   */
  amountShort: number | null;
  oraclePrice: number | null;
  usd: number | null;
  feeShort?: number;
  /**
   * Which side of the position this row mutated (`null` for non-position
   * events: flash loan, strategy fee, bad-debt header).
   */
  side: 'supply' | 'borrow' | null;
  /**
   * Position's RESULTING scaled balance (27-dec RAY) on `side` AFTER the
   * action — `'0'` when the position is closed. `null` for non-position events.
   * Source of truth for current/historical holders via `arg_max(seq)`.
   */
  balanceScaledRay: string | null;
  /**
   * Denominated resulting balance (display units) — numeric so Kusto can rank
   * holders directly (within a reserve, amount order == scaled order). `null`
   * for non-position events.
   */
  balanceShort: number | null;
  /**
   * Monotonic event ordinal `ledger * 1e6 + indexInLedger`, derived from the
   * Soroban `getEvents` id `"<ledger>-<index>"`. Use as the `arg_max` key to
   * pick each holder's latest balance deterministically.
   */
  seq: number;
  /**
   * Pool index (27-dec RAY) on `side` at event time — supply index for supply
   * legs, borrow index for borrow legs. With `balanceShort` (scaled, denominated)
   * the actual balance is `balanceShort * index / 1e27`; interval growth across
   * events yields realized PnL. `null` for non-position events.
   */
  index: string | null;
  /**
   * Entry risk params for a collateral (supply) leg, in basis points — carried
   * to Kusto so health factor is computed there (collateral-weighted), matching
   * the MVX `LiquidationThreshold`-in-activity pattern. `null` on borrow and
   * non-position rows.
   */
  liquidationThresholdBps: number | null;
  liquidationBonusBps: number | null;
  loanToValueBps: number | null;
  liquidationFeesBps: number | null;
  /**
   * Liquidator (caller) address on liquidation legs (`liqRepay`/`liqSeize`),
   * correlated by tx from the on-chain `LiquidationEvent`. `null` on all other
   * rows. Enables a top-liquidators leaderboard (the legs' `accountId`/`owner`
   * are the liquidatee).
   */
  liquidator: string | null;
  /**
   * Aggregate debt repaid (USD WAD string) from `position:liquidation`, stamped
   * onto same-tx `liqRepay`/`liqSeize` legs. `null` on non-liquidation rows.
   */
  repaidUsdWad?: string | null;
  /**
   * Applied liquidation bonus (bps string) from `position:liquidation`, stamped
   * onto same-tx `liqRepay`/`liqSeize` legs. Total seized USD ≈
   * repaid * (1 + bonus / 10_000). `null` on non-liquidation rows.
   */
  bonusBps?: string | null;
  /**
   * Raw on-chain `PositionAction` discriminant (u32) for position legs — kept
   * verbatim so Kusto can distinguish codes that collapse to one
   * `StellarLendingActivity` (e.g. RepayCollateralWithdraw vs
   * RepayCollateralRepay) and never loses an unmapped code.
   */
  actionCode?: number;
  /** Position mode (e-mode) of the account batch this leg belongs to. */
  positionMode?: number;
  /** Raw fee in token base units (flash loan / strategy fee), big-int string. */
  fee?: string;
  /** Raw amount forwarded after the strategy fee, big-int string. */
  amountSent?: string;
  /** Flash-loan receiver contract address. */
  receiver?: string;
  /**
   * Scaled balance (27-dec RAY) written off by a bad-debt zeroing row —
   * the position's pre-wipe balance on `side`.
   */
  writtenOffScaledRay?: string;
  /** Total seized collateral (USD, 18-dec WAD string) on the bad-debt header. */
  collateralUsdWad?: string;
  /** Blend-migration position counts. */
  collateralCount?: number;
  supplyCount?: number;
  debtCount?: number;
}
