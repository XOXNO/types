import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OwnerDto } from '../../common/owner.dto';
import { NftDoc } from '../../cosmos-db/documents/token/nft-details.doc';

export class OfferDto {
  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 'HLSR-374950-1934' })
  identifier!: string;

  @ApiProperty({ example: 'HLSR-374950' })
  collection!: string;

  @ApiProperty({ example: 336875 })
  offerId!: number;

  @ApiProperty({ example: 'EGLD' })
  paymentToken!: string;

  @ApiProperty({ example: 0 })
  paymentTokenNonce!: number;

  @ApiProperty({ example: '36700000000000000000' })
  price!: string;

  @ApiProperty({ example: 36.7 })
  priceShort!: number;

  @ApiProperty({ example: 1721220240 })
  deadline!: number;

  @ApiProperty({ example: 1720615494 })
  timestamp!: number;

  @ApiProperty({
    type: OwnerDto,
  })
  owner!: OwnerDto;

  @ApiProperty({ example: 1 })
  quantity!: number;

  @ApiProperty({ example: 'xoxno' })
  marketplace!: string;

  @ApiProperty({ example: 1323.373 })
  usdValue!: number;

  @ApiProperty({ example: -1.95 })
  floorPriceMargin!: number;

  @ApiProperty({ example: 1 })
  floorPrice!: number;

  @ApiProperty({
    type: PartialType<NftDoc>,
  })
  nftInfo!: Partial<NftDoc>;
}

export class GetUserOffersResponseDto {
  @ApiProperty({ example: 11 })
  count!: number;

  @ApiProperty({ example: false })
  hasMoreResults!: boolean;

  @ApiProperty({
    type: OfferDto,
    isArray: true,
  })
  resources!: OfferDto[];
}
