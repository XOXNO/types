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
  amountShort: number;
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
}
