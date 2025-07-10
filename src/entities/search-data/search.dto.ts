// DTO Type
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';
import { MetadataDto } from '../../requests/collection/listings';
import { NftMedia } from '../../cosmos-db/documents/token/nft-details.doc';
import { StatisticsDto } from '../../common/statistics';
import { ActivityChain } from '../../common/enums';

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

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain;
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

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain;
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

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain.MVX;
}

class NftDto {
  @ApiProperty({ example: 'EAPES-8f3c1f-0209' })
  identifier!: string;

  @ApiProperty({ example: 'EAPES' })
  name!: string;

  @ApiProperty({ example: 'EAPES-8f3c1f' })
  collection!: string;

  @ApiProperty({ example: true })
  onSale!: boolean;

  @ApiProperty({
    example:
      'https://media.elrond.com/nfts/asset/QmRP9FVznm1xxa3FEsDENXhafRDaRWY6LKQdg8GygHNHKw/520.png',
  })
  url!: string;

  @ApiProperty({ type: NftMedia })
  media!: NftMedia;

  @ApiProperty({ example: true })
  wasProcessed!: boolean;

  @ApiProperty({ type: MetadataDto })
  metadata!: MetadataDto;

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain;
}

class GlobalSearchResourcesDto {
  @ApiProperty({ type: CollectionDto, isArray: true })
  collections!: CollectionDto[];

  @ApiProperty({ type: UserDto, isArray: true })
  users!: UserDto[];

  @ApiProperty({ type: CreatorDto, isArray: true })
  creators!: CreatorDto[];

  @ApiProperty({ type: NftDto, isArray: true })
  nft!: NftDto[];
}

export class GlobalSearchResponseDto {
  @ApiProperty({ example: 30 })
  count!: number;

  @ApiProperty({ example: true })
  hasMoreResults: boolean = false;

  @ApiProperty({ type: GlobalSearchResourcesDto })
  resources!: GlobalSearchResourcesDto;
}
