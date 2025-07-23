import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

export class PinnedCollectionDto extends PickType(CollectionProfileDoc, [
  'collection',
  'name',
  'isVerified',
  'profile',
  'banner',
  'description',
  'creator',
  'isMintable',
  'chain',
] as const) {}
