import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

/**
 * Slim collection row for explore/list endpoints. Keep Cosmos selectFields in
 * sync with MARKETPLACE_COLLECTION_LIST_SELECT_FIELDS.
 */
export class MarketplaceCollectionListItem extends PickType(
  CollectionProfileDoc,
  [
    'collection',
    'name',
    'description',
    'isVisible',
    'isVerified',
    'profile',
    'banner',
    'type',
    'chain',
    'collectionSize',
    'holdersCount',
    'followCount',
  ] as const,
) {}

export const MARKETPLACE_COLLECTION_LIST_SELECT_FIELDS: readonly string[] = [
  'collection',
  'name',
  'description',
  'isVisible',
  'isVerified',
  'profile',
  'banner',
  'type',
  'chain',
  'collectionSize',
  'holdersCount',
  'followCount',
];
