import { ApiProperty, PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

// Re-export CollectionProfileDoc as CollectionProfileDto for backward compatibility
export class CollectionProfileDto extends CollectionProfileDoc {}

export class CollectionCosmosResponse {
  @ApiProperty({ type: CollectionProfileDto, isArray: true })
  resources: CollectionProfileDto[] = [];

  @ApiProperty({ example: true, type: Boolean })
  hasMoreResults: boolean = false;

  @ApiProperty({ example: 12, type: Number, required: false })
  count?: number;
}

export class CollectionProfileUpdateDto extends PickType(CollectionProfileDto, [
  'socials',
  'description',
  'profile',
]) {}
