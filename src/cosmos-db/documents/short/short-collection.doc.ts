import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

export class ShortCollectionDoc extends PickType(CollectionProfileDoc, [
  'name',
  'isVerified',
  'isVisible',
  'profile',
  'banner',
  'description',
  'chain',
  'pinnedAtDrops',
  'collectionSize',
  'followCount',
  'holdersCount',
  'socials',
  'owner',
]) {}
