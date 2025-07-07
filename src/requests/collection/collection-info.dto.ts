import { ApiProperty, PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

export class CollectionInfoDto extends PickType(CollectionProfileDoc, [
  'name',
  'socials',
  'isVerified',
  'isVisible',
  'description',
  'profile',
  'banner',
  'collectionSize',
  'followCount',
  'holdersCount',
  'owner',
] as const) {
  @ApiProperty({ example: 1230.34 })
  volume!: number;
}
