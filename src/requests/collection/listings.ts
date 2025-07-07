import { ApiProperty } from '@nestjs/swagger';
import { NftMedia } from '../../cosmos-db/documents/token/nft-details.doc';

class DensityDto {
  @ApiProperty({ example: '0.180' })
  key!: string;

  @ApiProperty({ example: '0.180 - 0.180' })
  intervalName!: string;

  @ApiProperty({ example: 0 })
  intervalCount!: number;

  @ApiProperty({ example: 0 })
  totalCount!: number;
}

class RarityDto {
  @ApiProperty({ example: 3769 })
  rank!: number;
}

class MetadataDto {
  @ApiProperty({ type: RarityDto })
  rarity!: RarityDto;
}

class SaleInfoDto {
  @ApiProperty({ example: 0.18 })
  minBidShort!: number;

  @ApiProperty({ example: 'xoxno' })
  marketplace!: string;
}

class ListingDto {
  @ApiProperty({ example: 'MICE-a0c447-10fd' })
  identifier!: string;

  @ApiProperty({ example: 'MiceCity #4349' })
  name!: string;

  @ApiProperty({ example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({ type: MetadataDto })
  metadata!: MetadataDto;

  @ApiProperty({
    example:
      'https://media.elrond.com/nfts/asset/QmWEwSi9AhgMPeu4CJfLpWq1yKSfmERZXt76b429pVSU9R/2287.png',
  })
  url!: string;

  @ApiProperty({ type: NftMedia })
  media!: NftMedia;

  @ApiProperty({ example: true })
  wasProcessed!: boolean;

  @ApiProperty({ type: SaleInfoDto })
  saleInfo!: SaleInfoDto;
}

export class ListingsResponseDto {
  @ApiProperty({ type: DensityDto, isArray: true })
  density!: DensityDto[];

  @ApiProperty({ type: ListingDto, isArray: true })
  listings!: ListingDto[];
}
