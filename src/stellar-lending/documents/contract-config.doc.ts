import { StellarLendingDataType } from '../enums';

/**
 * Config and admin state for one deployed contract, event-sourced from that
 * contract's own `config:*`, pause, ownership and admin events.
 *
 * Keyed by contract address rather than being a singleton: the controller,
 * governance and price-aggregator each emit `ownership_transfer` and each owns
 * part of this surface, so one document per contract covers all three with a
 * single materializer. A redeploy writes a new row instead of overwriting the
 * previous deployment's final state.
 *
 * Every field is optional-by-absence: a contract only ever populates the fields
 * its own events carry, so a governance row leaves the controller fields null
 * and vice versa.
 */
export class StellarContractConfigDoc {
  dataType = StellarLendingDataType.CONTRACT_CONFIG;

  /** Contract this row describes. Also the `id` suffix. */
  contractAddress!: string;

  /** Set when the deploy was observed via `governance:deploy_*`. */
  wasmHash: string | null = null;

  // ── Controller (`config:*`, pausable) ──────────────────────────────────
  accumulator: string | null = null;
  swapAggregator: string | null = null;
  priceAggregator: string | null = null;
  maxSupplyPositions: number | null = null;
  maxBorrowPositions: number | null = null;
  /** Raw 18-decimal WAD from `config:min_borrow_collateral`. */
  minBorrowCollateralUsdWad: string | null = null;
  /** `true` between `paused` and `unpaused`; null until either is seen. */
  paused: boolean | null = null;

  // ── Governance (timelock) ──────────────────────────────────────────────
  /** Timelock delay in ledgers, from `min_delay_changed`. */
  minDelayLedgers: number | null = null;

  // ── Ownable / access-control admin (any contract) ──────────────────────
  owner: string | null = null;
  /** Set by `ownership_transfer`, cleared when the transfer completes. */
  pendingOwner: string | null = null;
  admin: string | null = null;
  /** Set by `admin_transfer_initiated`, cleared when the transfer completes. */
  pendingAdmin: string | null = null;
  /** Ledger the pending admin transfer expires at, `0` when cancelled. */
  pendingAdminLiveUntilLedger: number | null = null;

  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarContractConfigDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `contractConfig:${this.contractAddress}`;
  }
}
