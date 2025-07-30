import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShortCollectionDoc } from '../../cosmos-db/documents/short/short-collection.doc';
import { ShortNftDoc } from '../../cosmos-db/documents/short/short-nft.doc';
import { XoxnoAuctionTypeString } from '../../enums/xoxno-auction-type.enum';

export class NftActivityData {
  @ApiProperty({
    description: 'The collection identifier',
    example: 'GOOSEV-edcceb',
    type: String,
    required: true,
  })
  collection!: string;

  @ApiPropertyOptional({
    description: 'The NFT identifier (missing in globalOfferCreate)',
    example: 'GOOSEV-edcceb-0e08',
    type: String,
  })
  identifier?: string;

  @ApiProperty({
    description: 'The price in the specified payment token',
    example: 1.5,
    type: Number,
    required: true,
  })
  price!: number;

  @ApiProperty({
    description: 'The payment token identifier',
    example: 'EGLD',
    type: String,
    required: true,
  })
  paymentToken!: string;

  @ApiProperty({
    description: 'The quantity of NFTs involved in this activity',
    example: 1,
    type: Number,
    required: true,
    minimum: 1,
  })
  quantity!: number;

  @ApiProperty({
    description: 'The smart contract ID',
    example: 3,
    type: Number,
    required: true,
  })
  scId!: number;

  @ApiProperty({
    description: 'The USD value at the time of the activity',
    example: 150.75,
    type: Number,
    required: true,
  })
  usdValue!: number;

  @ApiProperty({
    description: 'The EGLD value at the time of the activity',
    example: 1.5,
    type: Number,
    required: true,
  })
  egldValue!: number;

  @ApiPropertyOptional({
    description: 'The auction type (available for listingCreate)',
    example: 'FixedPrice',
    enum: XoxnoAuctionTypeString,
  })
  auctionType?: XoxnoAuctionTypeString;

  @ApiPropertyOptional({
    description:
      'The deadline timestamp (available for offerCreate & auctions)',
    example: 1709218759,
    type: Number,
  })
  deadline?: number;

  @ApiPropertyOptional({
    description: 'Original payment details for ash buy events',
    type: 'object',
    properties: {
      paymentToken: { type: 'string', example: 'ASH-a642d1' },
      price: { type: 'number', example: 100.5 },
    },
  })
  originalPayment?: {
    paymentToken: string;
    price: number;
  };

  @ApiPropertyOptional({
    description: 'Original token amount as string',
    example: '1000000000000000000',
    type: String,
  })
  originalTokenAmount?: string;

  @ApiPropertyOptional({
    description: 'Original token amount in human-readable format',
    example: 1.0,
    type: Number,
  })
  originalTokenAmountShort?: number;

  @ApiPropertyOptional({
    description: 'Original token value in EGLD',
    example: 0.5,
    type: Number,
  })
  originalTokenEgldValue?: number;

  @ApiPropertyOptional({
    description: 'Original token value in USD',
    example: 50.0,
    type: Number,
  })
  originalTokenUsdValue?: number;

  @ApiPropertyOptional({
    description: 'Original token identifier',
    example: 'ASH-a642d1',
    type: String,
  })
  originalTokenIdentifier?: string;

  constructor(props?: Partial<NftActivityData>) {
    Object.assign(this, props);
  }
}

export class NftActivityDataHydrated extends NftActivityData {
  @ApiProperty({
    description: 'Detailed NFT information',
    type: ShortNftDoc,
    required: true,
  })
  nftInfo!: ShortNftDoc;

  @ApiProperty({
    description: 'Detailed collection information',
    type: ShortCollectionDoc,
    required: true,
  })
  collectionInfo!: ShortCollectionDoc;
}

export interface NftMvxBuiltIn {
  collection: string;
  identifier: string;
  // creator/burner will be the from field
}
