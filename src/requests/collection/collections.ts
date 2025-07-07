import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

// Re-export CollectionProfileDoc as CollectionProfileDto for backward compatibility
export class CollectionProfileDto extends CollectionProfileDoc {}

export class CollectionProfileUpdateDto extends PickType(CollectionProfileDto, [
  'socials',
  'description',
  'profile',
]) {}
