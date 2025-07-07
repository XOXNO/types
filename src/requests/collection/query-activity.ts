// DTO Type
import { ApiProperty } from '@nestjs/swagger';

import { CollectionInfoDto } from './collection-info.dto';
import { NftMedia } from '../../cosmos-db/documents/token/nft-details.doc';

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

class NftInfoDto {
  @ApiProperty({ example: 'EBMC-8a2d40-0ad0' })
  identifier!: string;

  @ApiProperty({ example: 'EBMC-8a2d40' })
  collection!: string;

  @ApiProperty({ example: 'Elrond Billionair Monkeys Club #2768' })
  name!: string;

  @ApiProperty({ example: { rarity: { rank: 2606 } } })
  metadata!: object;

  @ApiProperty({
    example:
      'https://media.elrond.com/nfts/asset/bafybeigwxctbhty5eei3lrievjecqgnqvwyt4qtbsi6kuaukp7jfafzztq/1868.png',
  })
  url!: string;

  @ApiProperty({ example: true })
  wasProcessed!: boolean;

  @ApiProperty({ type: NftMedia })
  media!: NftMedia;
}

class ActivityDataDto {
  @ApiProperty({ example: 'EBMC-8a2d40' })
  collection!: string;

  @ApiProperty({ example: 'EBMC-8a2d40-0ad0' })
  identifier!: string;

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

  @ApiProperty({ example: 'Nft' })
  auctionType!: string;

  @ApiProperty({ type: NftInfoDto })
  nftInfo!: NftInfoDto;

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
