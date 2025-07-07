import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { MarketplacesOnSaleNames } from '../../../common/enums';

export class NftSaleInfo {
  @ApiProperty()
  auctionId!: number;

  @ApiProperty()
  seller!: string;

  @ApiProperty({
    required: false,
    type: OwnerDto,
  })
  currentWinner?: string | OwnerDto;

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
  auctionType!: string;

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
