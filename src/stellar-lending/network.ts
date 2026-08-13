/** Stellar network persisted on every lending document and activity payload. */
export type StellarNetwork = 'mainnet' | 'testnet';

/** Scope a shared Cosmos partition to one Stellar network. */
export function stellarLendingPartitionKey(
  network: StellarNetwork,
  key: string | number,
): string {
  if (network !== 'mainnet' && network !== 'testnet') {
    throw new Error('Invalid Stellar network');
  }
  return `${network}:${key}`;
}
