/**
 * Activity kinds emitted by the cross-chain bridge relayer. One member per
 * document shape, not per status — a transfer's status lives in the payload so
 * the document id stays stable across upserts.
 */
export enum BridgeActivity {
  /** A single cross-chain transfer, upserted in place as it advances. */
  CCTP_TRANSFER = 'bridgeCctpTransfer',
}

/** Bridging protocol a transfer travelled over. */
export enum BridgeProtocol {
  CIRCLE_CCTP_V2 = 'cctpV2',
  WORMHOLE = 'wormhole',
  WORMHOLE_CCTP = 'wormholeCctp',
}

/**
 * Lifecycle of a bridge transfer, projected from the relayer's own transfer
 * state. Richer than Circle's attestation status, which cannot express a
 * transfer that was dead-lettered or that expired without an attestation.
 *
 * These do not advance monotonically: re-attestation resets an attested
 * transfer to `BURNED`, so consumers must order by `seq` rather than assume
 * forward-only progress.
 */
export enum BridgeTransferStatus {
  /** Burn observed on the source chain, awaiting Circle's attestation. */
  BURNED = 'burned',
  /** Attestation available, claim not yet submitted. */
  ATTESTED = 'attested',
  /** Claim submitted on the destination chain, awaiting confirmation. */
  CLAIM_SUBMITTED = 'claimSubmitted',
  /** Minted and forwarded to the recipient. */
  DELIVERED = 'delivered',
  /** Claim failed and is scheduled for another attempt. */
  RETRYING = 'retrying',
  /** Claim failed after exhausting retries. */
  DEAD_LETTER = 'deadLetter',
  /** Permanent failure requiring manual intervention. */
  FAILED = 'failed',
  /** Attestation never arrived within the relayer's timeout. */
  EXPIRED = 'expired',
}

/**
 * Why Circle declined to process a transfer at fast finality. Each is an
 * economic rejection rather than a fault — the transfer settles at standard
 * finality instead.
 */
export enum BridgeDelayReason {
  INSUFFICIENT_FEE = 'insufficient_fee',
  AMOUNT_ABOVE_MAX = 'amount_above_max',
  INSUFFICIENT_ALLOWANCE_AVAILABLE = 'insufficient_allowance_available',
}
