import { ApiProperty, PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';

export class ShortCollectionInfoDoc extends PickType(CollectionProfileDoc, [
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
  'owner',
  'banner',
  'socials',
] as const) {
  @ApiProperty({ example: 1230.34 })
  volume!: number;
}
