import { ApiProperty, PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

export class ShortNftCollectionInfoDoc extends PickType(CollectionProfileDoc, [
  'name',
  'isVerified',
  'isVisible',
  'profile',
  'banner',
  'collectionSize',
  'description',
  'holdersCount',
  'followCount',
  'customConfig',
  'roles',
  'chain',
]) {}
