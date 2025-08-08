import { ApiProperty } from '@nestjs/swagger';
import { UserDataType } from '../../../enums/user-data-type.enum';
import { SocialsDto } from '../../../common/socials';
import {
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatorProfileDoc {
  @ApiProperty({ example: 'creatorProfile', enum: UserDataType })
  dataType: UserDataType = UserDataType.CreatorProfile;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'Creator wallet address',
  })
  address!: string;

  @ApiProperty({
    example: 'Awesome Creator',
    description: 'Creator name (editable by creator)',
  })
  @IsString()
  @Length(1, 300)
  name!: string; // editable by creator

  @ApiProperty({
    example: 'awesome-creator',
    description: 'Unique creator tag (not editable)',
  })
  creatorTag!: string; // unique, not editable

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqcollection123456789abcdef',
    description: 'Contract address for regular NFT creators',
    required: false,
  })
  contractAddress?: string; // for regular NFT creators

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqticket123456789abcdef',
    description: 'Contract address for ticketing creators',
    required: false,
  })
  ticketingContractAddress?: string; // for ticketing creators

  @ApiProperty({
    example:
      'https://media.xoxno.com/creatorprofile/erd1.../profilePicture.webp',
    description: 'Creator profile picture URL',
  })
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({
    example:
      'https://media.xoxno.com/creatorprofile/erd1.../profileBanner.webp',
    description: 'Creator profile banner URL',
  })
  banner: string = 'https://media.xoxno.com/utils/defaultBanner.webp';

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when creator joined',
  })
  joinedDate: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    example: 'Leading NFT creator and artist',
    description: 'Creator description',
    required: false,
  })
  @IsString()
  @Length(1, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Social media links for the creator',
    type: () => SocialsDto,
  })
  @ValidateNested()
  @Type(() => SocialsDto)
  @IsObject()
  socials: SocialsDto = new SocialsDto();

  @ApiProperty({
    example:
      'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq-creatorProfile',
    description: 'Document ID',
    required: false,
  })
  id?: string;

  @ApiProperty({
    example: 1640995200,
    description: 'Cosmos DB timestamp',
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<CreatorProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
