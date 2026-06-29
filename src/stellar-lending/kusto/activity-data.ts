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
  amount: string;
  amountShort: number;
  oraclePrice: number | null;
  usd: number | null;
  feeShort?: number;
}
