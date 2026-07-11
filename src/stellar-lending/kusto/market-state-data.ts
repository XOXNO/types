/**
 * ActivityType for Stellar-lending market-state activity rows. Deliberately
 * DISTINCT from the MVX `lendingUpdateMarketState` so the existing MVX Kusto
 * update policies (which filter only on `Source=='xoxnoLending'`) never ingest
 * Stellar rows. The new Stellar Kusto functions filter on this + `Chain=='STELLAR'`.
 */
export const STELLAR_LENDING_MARKET_STATE_ACTIVITY =
  'stellarLendingUpdateMarketState';

/**
 * Dynamic JSON written into `NftActivityData.ActivityData` for a Stellar
 * market-state update (emitted on every `market:batch_state_update`). One row
 * per `(hub, asset)`; carries the point-in-time market metrics + price so all
 * market time-series (TVL, APY, utilization, protocol revenue) are derived
 * on-the-fly via Kusto — no snapshot table.
 *
 * Amounts are ACTUAL token units, denominated (display numbers); `*Ray` are
 * 27-dec RAY big-int strings.
 */
export interface StellarLendingMarketStateData {
  hubId: number;
  spokeId: number | null;
  token: string;
  symbol: string;
  decimals: number;
  supplyAmount: number;
  borrowAmount: number;
  availableLiquidity: number;
  revenue: number;
  supplyApy: number;
  borrowApy: number;
  utilizationRate: number;
  supplyIndexRay: string;
  borrowIndexRay: string;
  oraclePrice: number | null;
  seq: number;
  /** Raw asset-native cash (base units), big-int string. */
  cash?: string;
  /** Raw scaled totals (27-dec RAY shares), big-int strings from the event. */
  suppliedScaled?: string;
  borrowedScaled?: string;
  revenueScaled?: string;
  /** Ledger close time (seconds) carried on the on-chain snapshot leg. */
  chainTimestamp?: string;
}
