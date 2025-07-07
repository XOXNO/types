import { ApiProperty, PickType } from '@nestjs/swagger';
import { SocialsDto } from '../../common/socials';

export class CreatorProfileDto {
  @ApiProperty({ example: 'Bananas' })
  name!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqutf9carlkckyn36t5uvp23m9fs877kfsys5s8axpe8',
  })
  contractAddress!: string;

  @ApiProperty({
    example: 'erd1vn9s8uj4e7r6skmqfw5py3hxnluw3ftv6dh47yt449vtvdnn9w2stmwm7l',
  })
  address!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/erd1vn9s8uj4e7r6skmqfw5py3hxnluw3ftv6dh47yt449vtvdnn9w2stmwm7l/creatorProfilePicture.webp?ts=1717019144',
  })
  profile!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/userprofile/erd1vn9s8uj4e7r6skmqfw5py3hxnluw3ftv6dh47yt449vtvdnn9w2stmwm7l/profileBanner.webp?ts=1717019141',
  })
  banner!: string;

  @ApiProperty({ example: 1641773364 })
  joinedDate!: number;

  @ApiProperty({ type: SocialsDto })
  socials!: SocialsDto;

  @ApiProperty({ example: 'Best creator' })
  description!: string;

  @ApiProperty({ example: 'Bananas' })
  creatorTag!: string;

  @ApiProperty({ example: 0 })
  followCount!: number;
}

export class CreatorUpdateProfileDTO extends PickType(CreatorProfileDto, [
  'socials',
  'description',
  'profile',
]) {}
