import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { MarketplacesOnSaleNames } from '../../../enums/common.enum';
import { XoxnoAuctionTypeString } from '../../../enums/xoxno-auction-type.enum';

class NftSaleInfoBase {
  @ApiProperty()
  auctionId!: number;

  @ApiProperty()
  seller!: string;

  @ApiProperty()
  minBid!: string;

  @ApiProperty()
  maxBid!: string;

  @ApiProperty({ required: false })
  currentBid?: string;

  @ApiProperty()
  startTime!: number;

  @ApiProperty()
  deadline!: number;

  @ApiProperty()
  paymentToken!: string;

  @ApiProperty()
  paymentTokenNonce!: number;

  @ApiProperty()
  auctionType!: XoxnoAuctionTypeString;

  @ApiProperty()
  timestamp!: number;

  @ApiProperty()
  minBidShort!: number;

  @ApiProperty({ required: false })
  minBidUsdValue?: number;

  @ApiProperty()
  maxBidShort!: number;

  @ApiProperty({ required: false })
  maxBidUsdValue?: number;

  @ApiProperty({ required: false })
  currentBidShort?: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty({
    enum: MarketplacesOnSaleNames,
    example: MarketplacesOnSaleNames.XOXNO_MARKETPLACE,
    enumName: 'MarketplacesOnSaleNames',
  })
  marketplace!: string;

  @ApiProperty({
    example: 10,
    description: 'This value is the one set by the owner at listing time',
    required: false,
  })
  royalties?: number;
}

export class NftSaleInfo extends NftSaleInfoBase {
  @ApiProperty({
    required: false,
    type: String,
  })
  currentWinner?: string;
}
export class NftSaleInfoHydrated extends NftSaleInfoBase {
  @ApiProperty({
    required: false,
    type: OwnerDto,
  })
  currentWinner?: OwnerDto;
}
