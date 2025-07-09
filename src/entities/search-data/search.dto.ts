// DTO Type
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

class TradeDataDto {
  @ApiProperty({ example: 0 })
  dayEgldVolume!: number;

  @ApiProperty({ example: 116.67 })
  weekEgldVolume!: number;

  @ApiProperty({ example: 128123.25 })
  totalEgldVolume!: number;
}

class OtherStatsDto {
  @ApiProperty({ example: 10000 })
  nftCount!: number;

  @ApiProperty({ example: 525 })
  followCount!: number;
}

class StatisticsDto {
  @ApiProperty({ type: TradeDataDto })
  tradeData!: TradeDataDto;

  @ApiProperty({ type: OtherStatsDto })
  other!: OtherStatsDto;
}

class CollectionDto {
  @ApiProperty({ example: 'EAPES-8f3c1f' })
  collection!: string;

  @ApiProperty({ example: 'EAPES' })
  name!: string;

  @ApiProperty({ example: true })
  isVisible!: boolean;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1691359925',
  })
  profile!: string;

  @ApiProperty({ example: 'NonFungibleESDT' })
  type!: string;

  @ApiProperty({ type: StatisticsDto })
  statistics!: StatisticsDto;

  @ApiProperty({ example: 3.1 })
  floorPrice!: number;
}

class UserDto {
  @ApiProperty({
    example: 'erd10hsfh2xhn4qzatc0vguxgfdu8aegurnep7zzyg0ht9ddw50g5xfq8ccu4q',
  })
  address!: string;

  @ApiProperty({ example: 'erd1...cu4q' })
  herotag!: string;

  @ApiProperty({ example: false })
  isVerified!: boolean;

  @ApiProperty({
    example: 'https://media.xoxno.com/utils/defaultProfilePic.webp',
  })
  profile!: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isCreator?: boolean;

  @ApiProperty({ example: 'erd1...cu4q' })
  addressTrimmed!: string;
}

class CreatorDto {
  @ApiProperty({
    example: 'erd10hsfh2xhn4qzatc0vguxgfdu8aegurnep7zzyg0ht9ddw50g5xfq8ccu4q',
  })
  address!: string;

  @ApiProperty({ example: 'erd1...cu4q' })
  herotag!: string;

  @ApiProperty({ example: 'erd1...cu4q' })
  addressTrimmed!: string;

  @ApiProperty({ example: true })
  isCreator!: boolean;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqfnmr778ef8z9mk79rcwzwdhywraahs7hys5sute79u',
  })
  contractAddress!: string;

  @ApiProperty({ example: 'Ep1xStudio' })
  name!: string;

  @ApiProperty({ example: 'Ep1xStudio' })
  creatorTag!: string;

  @ApiProperty({ example: 1643145426 })
  joinedDate!: number;

  @ApiProperty({
    example: 'https://media.xoxno.com/utils/defaultProfilePic.webp',
  })
  profile!: string;
}

class GlobalSearchResourcesDto {
  @ApiProperty({ type: CollectionDto, isArray: true })
  collections!: CollectionDto[];

  @ApiProperty({ type: UserDto, isArray: true })
  users!: UserDto[];

  @ApiProperty({ type: CreatorDto, isArray: true })
  creators!: CreatorDto[];

  @ApiProperty({ type: Object, isArray: true })
  nft!: object[];
}

export class GlobalSearchResponseDto {
  @ApiProperty({ example: 30 })
  count!: number;

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;

  @ApiProperty({ type: GlobalSearchResourcesDto })
  resources!: GlobalSearchResourcesDto;
}
