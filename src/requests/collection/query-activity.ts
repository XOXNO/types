// DTO Type
import { ApiProperty, PickType } from '@nestjs/swagger';

import { CollectionInfoDto } from './collection-info.dto';
import { NftDoc } from '../../cosmos-db/documents/token/nft-details.doc';
import { XoxnoAuctionTypeString } from '../../entities/xoxno-marketplace-sc/xoxno-auction-type.enum';
import { NftActivityData } from '../nft-activity-data/nft-activity-data';
import { ActivityChain } from '../../common/enums';

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

export class ActivityBodyDto {
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

  @ApiProperty({ type: NftActivityData })
  activityData!: NftActivityData;

  @ApiProperty({
    example: ActivityChain.MVX,
    enum: ActivityChain,
    description: 'Blockchain network where the activity occurred',
  })
  chain: ActivityChain = ActivityChain.MVX;
}

export class ActivityHistoryDto {
  @ApiProperty({ type: ActivityBodyDto, isArray: true })
  resources!: ActivityBodyDto[];

  @ApiProperty({ example: true })
  hasMoreResults: boolean = false;
}
