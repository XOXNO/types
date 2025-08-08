import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

export class ShortNftCollectionInfoDoc extends PickType(CollectionProfileDoc, [
  'name',
  'isVerified',
  'isVisible',
  'profile',
  'description',
  'chain',
  'collectionSize',
  'followCount',
  'holdersCount',
  //
  'customConfig',
  'roles',
  'banner',
  'features',
] as const) {}
