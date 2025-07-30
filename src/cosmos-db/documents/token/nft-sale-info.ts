import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { MarketplacesOnSaleNames } from '../../../enums/common.enum';
import { XoxnoAuctionTypeString } from '../../../enums/xoxno-auction-type.enum';

class NftSaleInfoBase {
  @ApiProperty({
    type: Number,
    description: 'Unique identifier of the auction',
    example: 12345,
  })
  auctionId!: number;

  @ApiProperty({
    type: String,
    description: 'Wallet address of the NFT seller',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  seller!: string;

  @ApiProperty({
    type: String,
    description: 'Minimum bid amount in smallest token units as string',
    example: '1000000000000000000',
  })
  minBid!: string;

  @ApiProperty({
    type: String,
    description:
      'Maximum bid amount or Buy Now price in smallest token units as string',
    example: '5000000000000000000',
  })
  maxBid!: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Current highest bid amount in smallest token units as string',
    example: '2000000000000000000',
  })
  currentBid?: string;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp when the auction started',
    example: 1640995200,
  })
  startTime!: number;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp when the auction ends',
    example: 1641081600,
  })
  deadline!: number;

  @ApiProperty({
    type: String,
    description: 'Token identifier used for payment',
    example: 'EGLD',
  })
  paymentToken!: string;

  @ApiProperty({
    type: Number,
    description: 'Nonce of the payment token (0 for EGLD)',
    example: 0,
  })
  paymentTokenNonce!: number;

  @ApiProperty({
    enum: XoxnoAuctionTypeString,
    enumName: 'XoxnoAuctionTypeString',
    description: 'Type of auction (e.g., Nft, SftAll, SftOnePerPayment)',
  })
  auctionType!: XoxnoAuctionTypeString;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp when the listing was created',
    example: 1640995200,
  })
  timestamp!: number;

  @ApiProperty({
    type: Number,
    description: 'Minimum bid amount as a decimal number',
    example: 1.5,
  })
  minBidShort!: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Minimum bid amount in USD',
    example: 150.75,
  })
  minBidUsdValue?: number;

  @ApiProperty({
    type: Number,
    description: 'Maximum bid amount or Buy Now price as a decimal number',
    example: 5.0,
  })
  maxBidShort!: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Maximum bid amount or Buy Now price in USD',
    example: 502.5,
  })
  maxBidUsdValue?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Current highest bid amount as a decimal number',
    example: 2.5,
  })
  currentBidShort?: number;

  @ApiProperty({
    type: Number,
    description:
      'Number of NFTs being sold (1 for NFTs, can be higher for SFTs)',
    example: 1,
  })
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
