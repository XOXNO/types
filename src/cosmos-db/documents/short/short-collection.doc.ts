import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

export class ShortCollectionDoc extends PickType(CollectionProfileDoc, [
  'name',
  'isVerified',
  'isVisible',
  'profile',
  'description',
  'chain',
  'collectionSize',
  'followCount',
  'holdersCount',
] as const) {}
