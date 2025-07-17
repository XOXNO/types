import { ApiProperty } from '@nestjs/swagger';
import { UserDataType } from '../../../enums/user-data-type.enum';
import { UserFavoriteType } from '../../../enums/user-favorite-type.enum';

export class UserFavorite {
  address!: string;
  dataType: UserDataType = UserDataType.UserFavorite;
  type!: UserFavoriteType;
  addressFavorite!: string; // only for users
  collection?: string; // only for collections & NFTs
  identifier?: string; //only for NFTs
  timestamp!: number;
  id!: string;
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
  isFollowed!: boolean;

  @ApiProperty({
    description: 'The user that is followed or unfollowed',
    example: 'erd12131241213',
    type: String,
  })
  addressFavorite!: string;
}
