/**
 * One row of the Kusto `StellarLendingMarketSnapshot` table, written by the
 * hub-aware snapshot cron. `SpokeId` is null for hub/asset-scoped rows and set
 * for spoke/reserve-scoped rows.
 */
export interface StellarLendingMarketSnapshotRow {
  SnapshotAt: string;
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
