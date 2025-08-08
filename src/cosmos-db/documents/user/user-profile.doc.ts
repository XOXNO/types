import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SocialsDto } from '../../../common/socials';
import { ActivityChain } from '../../../enums/common.enum';
import { UserDataType } from '../../../enums/user-data-type.enum';
import { UserDeposit } from './user-deposit';

export class UserProfileDoc {
  @ApiProperty({ example: 'userProfile', enum: UserDataType })
  dataType: UserDataType = UserDataType.UserProfile;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'User wallet address',
  })
  @IsString()
  address: string = '';

  @ApiProperty({ example: false, description: 'Whether the user is banned' })
  @IsBoolean()
  isBanned: boolean = false;

  @ApiProperty({ example: false, description: 'Whether the user is verified' })
  @IsBoolean()
  isVerified: boolean = false;

  @ApiProperty({
    description: 'Social media links for the user',
    type: () => SocialsDto,
  })
  @ValidateNested()
  @Type(() => SocialsDto)
  @IsObject()
  socials: SocialsDto = new SocialsDto();

  @ApiProperty({ example: 0, description: 'Number of followers' })
  @IsInt()
  followCount: number = 0;

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when user joined',
  })
  @IsInt()
  joinedDate: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    example: 'https://media.xoxno.com/userprofile/erd1.../profilePicture.webp',
    description: 'Profile picture URL',
  })
  @IsString()
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({
    example: 'https://media.xoxno.com/userprofile/erd1.../profileBanner.webp',
    description: 'Profile banner URL',
  })
  @IsString()
  banner: string = 'https://media.xoxno.com/utils/defaultBanner.webp';

  @ApiProperty({
    example: 'NFT collector and trader',
    description: 'User description',
  })
  @IsString()
  description: string = '';

  @ApiProperty({ example: '@username', description: 'User herotag/username' })
  @IsString()
  herotag: string = '';

  @ApiProperty({ example: false, description: 'Whether the user is a creator' })
  @IsBoolean()
  isCreator: boolean = false;

  @ApiProperty({
    example: false,
    description: 'Whether the user owns a staking pool',
  })
  @IsBoolean()
  isPoolOwner: boolean = false;

  @ApiProperty({ example: 0, description: 'Network shard number' })
  @IsInt()
  shard: number = 0;

  @ApiProperty({
    type: () => [UserDeposit],
    description: 'User deposit information',
  })
  @IsObject()
  @Type(() => UserDeposit)
  userDeposit: UserDeposit[] = [];

  @ApiProperty({ example: ActivityChain.MVX, enum: ActivityChain })
  @IsEnum(ActivityChain)
  chain: ActivityChain = ActivityChain.MVX;

  @ApiProperty({ example: 1640995200, description: 'Cosmos DB timestamp' })
  _ts: number = 0;

  @ApiProperty({
    example:
      'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq-userProfile',
    description: 'Document ID',
  })
  id: string = '';

  @ApiProperty({
    example: true,
    description: 'Wether analytics are enabled',
    required: false,
  })
  @IsBoolean()
  isBoberBattleUser?: boolean;

  constructor(props?: Partial<UserProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
