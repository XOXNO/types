import type {
  BridgeDelayReason,
  BridgeProtocol,
  BridgeTransferStatus,
} from '../../enums/bridge-activity.enum';

/**
 * Dynamic JSON written into the existing `NftActivityData.ActivityData` column
 * for bridge transfers (`Source='xoxnoBridge'`, `Chain='STELLAR'`).
 * Not a Cosmos document — rides the existing activity → Kusto change-feed.
 *
 * Every bridge field belongs here rather than on the envelope: the Kusto
 * ingestion mapping is a fixed column list, so a new top-level field is
 * silently dropped, while `ActivityData` is a `dynamic` column that accepts
 * anything.
 */
export interface BridgeTransferActivityData {
  protocol: BridgeProtocol;
  status: BridgeTransferStatus;

  /** Relayer chain name, e.g. `base`, `arbitrum`, `solana`. */
  sourceChain: string;
  sourceDomain: number;
  /** 27 for Stellar. */
  destinationDomain: number;
  sourceTxHash: string;
  /** Log index (EVM) or instruction index (Solana) of the burn. */
  sourceLogIndex: number | null;

  /**
   * Burn-token contract on the source chain. `null` on Solana-sourced
   * transfers — the relayer never records it on that path.
   */
  token: string | null;
  tokenSymbol: string;
  /**
   * Decimals of the burn token on the SOURCE chain. USDC is 6 on EVM and
   * Solana but 7 on Stellar, so this is never a safe constant.
   */
  decimals: number;
  /** Base units, big-int string. */
  amount: string;
  /** Display units. `null` when decimals are unknown — never fabricated. */
  amountShort: number | null;
  usd: number | null;

  /** Burning address on the source chain. */
  sender: string;
  /**
   * The end recipient's Stellar address, decoded from the forwarder hook data.
   * Not the on-chain `mintRecipient`, which is always the forwarder contract
   * and identical for every transfer.
   */
  recipient: string;
  /** CctpForwarder contract the transfer minted through. */
  forwarder: string;
  /** Integrator tag carried in the hook data, e.g. `XOXNO001`. */
  hookTag: string | null;
  /** Resolved integrator label, once third-party traffic is ingested. */
  integrator: string | null;

  /**
   * CCTP V2 nonce. Populated only on Solana-sourced transfers — for EVM
   * sources the V2 nonce comes back from Circle rather than from the burn
   * event, so `eventNonce` is the identity key that works on every source.
   */
  cctpNonce: string | null;
  /** Circle's `eventNonce`. Despite the relayer's field name, not a hash. */
  eventNonce: string | null;
  /** Requested finality: 1000 fast, 2000 standard. */
  minFinalityThreshold: number | null;
  /** Finality Circle actually used. A mismatch means fast was downgraded. */
  finalityThresholdExecuted: number | null;
  delayReason: BridgeDelayReason | null;

  /** Soroban transaction hash — 64 hex characters, with no `0x` prefix. */
  claimTxHash: string | null;
  retryCount: number;
  lastError: string | null;

  /** Unix seconds. */
  burnedAt: number;
  attestedAt: number | null;
  deliveredAt: number | null;

  /** Forwarder hook data as hex. Stored as hex, never as a raw byte array. */
  hookDataHex: string | null;

  /**
   * The relayer's `updatedAt` in unix seconds. Guards out-of-order upserts and
   * is the `arg_max` key that picks a transfer's latest row in Kusto, where
   * every upsert re-emits through the change feed.
   */
  seq: number;
}
