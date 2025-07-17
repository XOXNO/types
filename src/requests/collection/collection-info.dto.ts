import { ApiProperty, PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';
import { ShortCollectionDoc } from '../../cosmos-db/documents/short/short-collection.doc';

export class CollectionInfoDto extends ShortCollectionDoc {
  @ApiProperty({ example: 1230.34 })
  volume!: number;
}
