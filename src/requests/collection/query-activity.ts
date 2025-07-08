// DTO Type
import { ApiProperty, PickType } from '@nestjs/swagger';

import { CollectionInfoDto } from './collection-info.dto';
import { NftDoc } from '../../cosmos-db/documents/token/nft-details.doc';
import { NftActivityData } from '../../cosmos-db/documents/activity/nft-activity-data';
import { AuctionTypes } from '../../common/enums';

class FromToDto {
  @ApiProperty({
    example: 'erd1p98x64g8642n6sykjcs64fm69ll92tj7a204tadcn3d92a8gqx7sgn6hks',
  })
  address!: string;

  @ApiProperty({
    example: 'https://media.xoxno.com/utils/defaultProfilePic.webp',
  })
  profile!: string;

  @ApiProperty({ example: 'erd1...6hks' })
  username!: string;
}

class NftInfoDto extends PickType(NftDoc, [
  'identifier',
  'collection',
  'name',
  'url',
  'wasProcessed',
  'media',
] as const) {
  @ApiProperty({ example: { rarity: { rank: 2606 } } })
  metadata!: object;
}

class ActivityDataDto implements NftActivityData {
  @ApiProperty({ example: 'EBMC-8a2d40' })
  collection!: string;

  @ApiProperty({ example: 'EBMC-8a2d40-0ad0', required: false })
  identifier?: string;

  @ApiProperty({ example: 0.05 })
  price!: number;

  @ApiProperty({ example: 'EGLD' })
  paymentToken!: string;

  @ApiProperty({ example: 1 })
  quantity!: number;

  @ApiProperty({ example: 489392 })
  scId!: number;

  @ApiProperty({ example: 1.6446 })
  usdValue!: number;

  @ApiProperty({ example: 0.05 })
  egldValue!: number;

  @ApiProperty({ example: 'Nft', required: false })
  auctionType?: AuctionTypes;

  deadline?: number;
  originalPayment?: {
    paymentToken: string;
    price: number;
  };

  @ApiProperty({ type: NftInfoDto, required: false })
  nftInfo?: Partial<NftDoc>;

  @ApiProperty({ type: CollectionInfoDto })
  collectionInfo!: CollectionInfoDto;
}

class ActivityBodyDto {
  @ApiProperty({
    example: '0ee3f1f8effcfa49e0b397cae16e24382087581da5c9f47a64a071e7e5dd2cb4',
  })
  txHash!: string;

  @ApiProperty({ example: 'listing' })
  eventIdentifier!: string;

  @ApiProperty({ example: 1672531200 })
  timestamp!: number;

  @ApiProperty({ example: 'listingCreate' })
  activityType!: string;

  @ApiProperty({ example: 'xoxno' })
  source!: string;

  @ApiProperty({ type: FromToDto })
  from!: FromToDto;

  @ApiProperty({ type: FromToDto })
  to!: FromToDto;

  @ApiProperty({ type: ActivityDataDto })
  activityData!: ActivityDataDto;
}

export class ActivityHistoryDto {
  @ApiProperty({ type: ActivityBodyDto, isArray: true })
  resources!: ActivityBodyDto[];

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;
}
