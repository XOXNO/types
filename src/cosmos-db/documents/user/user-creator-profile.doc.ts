import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Socials } from '../../../common/socials';
import { UserDataType } from './user-data.type';

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
  name!: string; // editable by creator

  @ApiProperty({
    example: 'awesome-creator',
    description: 'Unique creator tag (not editable)',
  })
  creatorTag!: string; // unique, not editable

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqcollection123456789abcdef',
    description: 'Contract address for regular NFT creators',
  })
  contractAddress!: string; // for regular NFT creators

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqticket123456789abcdef',
    description: 'Contract address for ticketing creators',
  })
  ticketingContractAddress!: string; // for ticketing creators

  @ApiProperty({
    example:
      'https://media.xoxno.com/creatorprofile/erd1.../profilePicture.webp',
    description: 'Creator profile picture URL',
  })
  profile!: string; // TOOD: Add default picture

  @ApiProperty({
    example:
      'https://media.xoxno.com/creatorprofile/erd1.../profileBanner.webp',
    description: 'Creator profile banner URL',
  })
  banner!: string; // TODO: Add default picture

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when creator joined',
  })
  joinedDate: number = Math.floor(Date.now() / 1000);

  @ApiPropertyOptional({
    example: 'Leading NFT creator and artist',
    description: 'Creator description',
  })
  description?: string;

  @ApiPropertyOptional({ description: 'Creator social media links' })
  socials?: Socials;

  @ApiProperty({
    example:
      'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq-creatorProfile',
    description: 'Document ID',
  })
  id!: string;

  @ApiProperty({ example: 1640995200, description: 'Cosmos DB timestamp' })
  _ts!: number;

  constructor(props?: Partial<CreatorProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
