import { PartialType, PickType } from '@nestjs/swagger';

import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

export class CreatorProfileEditDto extends PartialType(
  PickType(CreatorProfileDoc, ['name', 'description', 'socials'] as const),
) {}
