import { ApiProperty } from '@nestjs/swagger';
import { UserDataType } from '../../../enums/user-data-type.enum';
import { UserFavoriteType } from '../../../enums/user-favorite-type.enum';

export class UserFavorite {
  @ApiProperty({
    description: 'User wallet address',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  address!: string;

  @ApiProperty({
    description: 'Type of user data',
    example: 'userFavorite',
    enum: UserDataType,
  })
  dataType: UserDataType = UserDataType.UserFavorite;

  @ApiProperty({
    description: 'Type of favorite (user, collection, or NFT)',
    enum: UserFavoriteType,
    example: UserFavoriteType.USER,
  })
  type!: UserFavoriteType;

  @ApiProperty({
    description: 'Address of the favorited user (only for user favorites)',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  addressFavorite!: string; // only for users

  @ApiProperty({
    description:
      'Collection identifier (only for collection and NFT favorites)',
    example: 'COLLECTION-123456',
    required: false,
  })
  collection?: string; // only for collections & NFTs

  @ApiProperty({
    description: 'NFT identifier (only for NFT favorites)',
    example: 'COLLECTION-123456-01',
    required: false,
  })
  identifier?: string; //only for NFTs

  @ApiProperty({
    description: 'Unix timestamp when the favorite was created',
    example: 1640995200,
  })
  timestamp!: number;

  @ApiProperty({
    description: 'Document ID',
    example: 'erd1...-user-erd2...',
  })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
  })
  _ts!: number;

  constructor(props?: Partial<UserFavorite>) {
    Object.assign(this, props);
    this.timestamp = Math.floor(Date.now() / 1000);
    this.id = `${this.address}-${this.type}`;
    switch (this.type) {
      case UserFavoriteType.USER:
        this.id += `-${this.addressFavorite}`;
        break;

      case UserFavoriteType.COLLECTION:
        this.id += `-${this.collection}`;
        break;

      case UserFavoriteType.NFT:
        this.id += `-${this.identifier}`;
        break;

      default:
        break;
    }
  }
}

export class UserFavoriteResponseDto {
  @ApiProperty({
    description: 'The follow status of a user',
    example: true,
    type: Boolean,
  })
  isFavorite!: boolean;

  @ApiProperty({
    description: 'The user that is followed or unfollowed',
    example: 'erd12131241213',
    type: String,
  })
  addressFavorite!: string;
}
