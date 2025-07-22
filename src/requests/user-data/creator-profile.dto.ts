import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

export class CreatorProfileDto extends CreatorProfileDoc {
  @ApiProperty({ example: 0 })
  followCount!: number;
}

export class CreatorUpdateProfileDTO extends PickType(CreatorProfileDto, [
  'socials',
  'description',
  'profile',
] as const) {}
