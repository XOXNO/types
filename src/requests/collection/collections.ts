import { PickType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

export class CollectionProfileUpdateDto extends PickType(CollectionProfileDoc, [
  'socials',
  'description',
  'profile',
]) {}
