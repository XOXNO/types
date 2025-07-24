import { ApiProperty } from '@nestjs/swagger';
import { SocialsDto } from '../../../common/socials';
import { ActivityChain } from '../../../enums/common.enum';
import { UserDataType } from '../../../enums/user-data-type.enum';
import { UserDeposit } from './user-deposit';
import { Type } from 'class-transformer';
import { ValidateNested, IsObject, IsOptional } from 'class-validator';

export class UserProfileDoc {
  @ApiProperty({ example: 'userProfile', enum: UserDataType })
  dataType: UserDataType = UserDataType.UserProfile;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'User wallet address',
  })
  address: string = '';

  @ApiProperty({ example: false, description: 'Whether the user is banned' })
  isBanned: boolean = false;

  @ApiProperty({ example: false, description: 'Whether the user is verified' })
  isVerified: boolean = false;

  @ApiProperty({
    description: 'Social media links for the user',
    type: () => SocialsDto,
  })
  @ValidateNested()
  @Type(() => SocialsDto)
  @IsObject()
  @IsOptional()
  socials: SocialsDto = new SocialsDto();

  @ApiProperty({ example: 0, description: 'Number of followers' })
  followCount: number = 0;

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when user joined',
  })
  joinedDate: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    example: 'https://media.xoxno.com/userprofile/erd1.../profilePicture.webp',
    description: 'Profile picture URL',
  })
  profile!: string;

  @ApiProperty({
    example: 'https://media.xoxno.com/userprofile/erd1.../profileBanner.webp',
    description: 'Profile banner URL',
  })
  banner!: string;

  @ApiProperty({
    example: 'NFT collector and trader',
    description: 'User description',
  })
  description: string = '';

  @ApiProperty({ example: '@username', description: 'User herotag/username' })
  herotag: string = '';

  @ApiProperty({ example: false, description: 'Whether the user is a creator' })
  isCreator: boolean = false;

  @ApiProperty({
    example: false,
    description: 'Whether the user owns a staking pool',
  })
  isPoolOwner: boolean = false;

  @ApiProperty({ example: 0, description: 'Network shard number' })
  shard: number = 0;

  @ApiProperty({ type: [UserDeposit], description: 'User deposit information' })
  userDeposit: UserDeposit[] = [];

  @ApiProperty({ example: ActivityChain.MVX, enum: ActivityChain })
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
  isBoberBattleUser?: boolean;

  constructor(props?: Partial<UserProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
