import { ActivityChain } from '../../../enums/common.enum';

/**
 * Normalizes a raw `chain` value read off a lending document.
 *
 * Legacy MultiversX lending documents (written before the multi-chain
 * rollout) have no `chain` field. Both API hydration and UI deserialization
 * should funnel through this helper so they apply the same default
 * (`ActivityChain.MVX`) and the document shape stays stable across chains.
 *
 * - `undefined` / `null` / empty string => `ActivityChain.MVX`
 * - any non-empty string               => cast as `ActivityChain`
 *
 * The cast is intentional: Cosmos stores strings, and any value we did not
 * mint ourselves will still surface so downstream code (filters, SQL
 * `c.chain IN (...)`) can match it. Add an explicit allow-list here only
 * if a caller needs strict validation.
 */
export function normalizeLendingChain(raw?: string | null): ActivityChain {
  if (raw === undefined || raw === null || raw === '') {
    return ActivityChain.MVX;
  }
  return raw as ActivityChain;
}
