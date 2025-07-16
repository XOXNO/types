import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../../enums/common.enum';
import { NftDocHydrated } from './nft-details.doc';
import { TokenDataType } from '../../../enums/token-data.enum';
import { OwnerDto } from '../../../common/owner.dto';

class NftOfferDocBase {
  @ApiProperty({
    example: TokenDataType.Offer,
    enum: TokenDataType,
    description: 'Type of token data document',
  })
  dataType: TokenDataType = TokenDataType.Offer;

  @ApiProperty({
    example: 'COLLECTION-1234-5678',
    description: 'Unique identifier of the NFT',
  })
  identifier!: string;

  @ApiProperty({
    example: 'COLLECTION-1234',
    description: 'Collection identifier',
  })
  collection!: string;

  @ApiProperty({
    example: 1,
    description: 'Unique offer identifier',
  })
  offerId!: number;

  @ApiProperty({
    example: 'EGLD',
    description: 'Token identifier used for payment',
  })
  paymentToken!: string;

  @ApiProperty({
    example: 0,
    description: 'Nonce of the payment token (0 for EGLD)',
  })
  paymentTokenNonce!: number;

  @ApiProperty({
    example: '1000000000000000000',
    description: 'Offer price in smallest token units as string',
  })
  price!: string;

  @ApiProperty({
    example: 1.5,
    description: 'Offer price as a decimal number',
  })
  priceShort!: number;

  @ApiProperty({
    example: 150.75,
    description: 'Offer price in USD',
    required: false,
  })
  priceUsd?: number;

  @ApiProperty({
    example: 0.15,
    description: 'Margin compared to floor price as percentage',
    required: false,
  })
  floorPriceMargin?: number;

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when the offer expires',
  })
  deadline!: number;

  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when the offer was created',
  })
  timestamp!: number;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'Address of the NFT owner',
    required: false,
  })
  nftOwner?: string;

  @ApiProperty({
    example: 1,
    description: 'Quantity of NFTs being offered for',
  })
  quantity!: number;

  @ApiProperty({
    example: 'xoxno',
    description: 'Marketplace where the offer was created',
  })
  marketplace!: string;

  @ApiProperty({
    example: 123,
    description: 'Auction identifier if related to an auction',
    required: false,
  })
  auctionId?: number;

  @ApiProperty({
    example: true,
    description: 'Whether the offer is currently active',
  })
  isActive: boolean = true;

  @ApiProperty({
    example: ActivityChain.MVX,
    enum: ActivityChain,
    description: 'Blockchain network of the offer',
  })
  chain: ActivityChain = ActivityChain.MVX;

  @ApiProperty({
    example: 'COLLECTION-1234-5678-1-xoxno-offer',
    description: 'Unique document identifier',
  })
  id!: string;

  @ApiProperty({
    example: 1640995200,
    description: 'Cosmos DB timestamp for document versioning',
  })
  _ts!: number;

  constructor(props?: Partial<NftOfferDoc>) {
    Object.assign(this, props);
    this.id = `${this.identifier}-${this.offerId}-${this.marketplace}-${this.dataType}`;
    if (!this.timestamp) {
      this.timestamp = Math.floor(Date.now() / 1000);
    }
  }
}

export class NftOfferDoc extends NftOfferDocBase {
  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'Address of the offer creator',
  })
  owner!: string;
}

export class NftOfferDocHydrated extends NftOfferDocBase {
  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'Address of the offer creator',
  })
  owner!: OwnerDto;

  @ApiProperty({
    example: 150.75,
    description: 'USD value of the offer',
  })
  usdValue!: number;

  @ApiProperty({
    example: 0.15,
    description: 'Margin compared to floor price as percentage',
  })
  floorPriceMargin!: number;

  @ApiProperty({
    example: 1.25,
    description: 'Current floor price of the collection',
  })
  floorPrice!: number;

  @ApiProperty({
    type: () => NftDocHydrated,
    description: 'NFT information related to the offer',
  })
  nftInfo!: NftDocHydrated;
}
