import { PickType } from '@nestjs/swagger';
import { NftDoc } from '../token/nft-details.doc';

/**
 * Slim NFT row for marketplace list endpoints. Keep Cosmos selectFields in
 * sync with MARKETPLACE_NFT_LIST_SELECT_FIELDS so L1/Redis do not hold a
 * full NftDoc.
 */
export class MarketplaceNftListItem extends PickType(NftDoc, [
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
