import { PickType } from '@nestjs/swagger';
import { NftDoc } from '../token/nft-details.doc';

/**
 * Slim NFT row for marketplace list endpoints. Keep Cosmos selectFields in
 * sync with MARKETPLACE_NFT_LIST_SELECT_FIELDS so L1/Redis do not hold a
 * full NftDoc.
 *
 * `id` is the listing key clients select and cart on: the identifier for an
 * NFT, `${identifier}-${auctionId}-${marketplace}` for an SFT listing, whose
 * rows share an identifier. Without it every list row looked alike.
 */
export class MarketplaceNftListItem extends PickType(NftDoc, [
  'id',
  'identifier',
  'collection',
  'name',
  'nonce',
  'type',
  'url',
  'wasProcessed',
  'media',
  'royalties',
  'onSale',
  'saleInfo',
  'owner',
  'currentOwner',
  'metadata',
  'chain',
  'supply',
] as const) {}

export const MARKETPLACE_NFT_LIST_SELECT_FIELDS: readonly string[] = [
  'id',
  'identifier',
  'collection',
  'name',
  'nonce',
  'type',
  'url',
  'wasProcessed',
  'media',
  'royalties',
  'onSale',
  'saleInfo',
  'owner',
  'currentOwner',
  'metadata',
  'chain',
  'supply',
];
