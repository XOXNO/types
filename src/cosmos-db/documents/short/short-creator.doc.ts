import { PickType } from '@nestjs/swagger';
import { CreatorProfileDoc } from '../user/user-creator-profile.doc';

export class ShortCreatorDoc extends PickType(CreatorProfileDoc, [
  'name',
  'contractAddress',
  'profile',
] as const) {}
