import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ActivityChain } from '../../../common/enums';
import { NftMetadataAttributes } from '../token/nft-metadata-attributes';
import { CollectionDataType } from './dataTypes';
import { CollectionProfileDoc } from './profile';

export class GlobalOfferDoc {
  @ApiProperty({
    description: 'Data type identifier for the global offer',
    enum: CollectionDataType,
    example: CollectionDataType.GlobalOffer,
  })
  dataType: CollectionDataType = CollectionDataType.GlobalOffer;

  @ApiProperty({
    description: 'Unique identifier for the offer',
    example: 12345,
  })
  offerId!: number;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;

  @ApiProperty({
    description: 'Owner/creator of the offer',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  owner!: string;

  @ApiProperty({
    description: 'Offer price in atomic units',
    example: '1000000000000000000',
  })
  price!: string;

  @ApiProperty({
    description: 'Payment token identifier',
    example: 'EGLD',
  })
  paymentToken!: string;

  @ApiProperty({
    description: 'Payment token nonce',
    example: 0,
  })
  paymentTokenNonce!: number;

  @ApiProperty({
    description: 'Quantity of items in the offer',
    example: 1,
  })
  quantity!: number;

  @ApiProperty({
    description: 'Marketplace where the offer was created',
    example: 'xoxno',
  })
  marketplace!: string;

  @ApiProperty({
    description: 'Timestamp when the offer was created (Unix timestamp)',
    example: 1640995200,
  })
  timestamp!: number;

  @ApiProperty({
    description: 'Required attributes/traits for the NFT',
    type: [NftMetadataAttributes],
  })
  attributes: NftMetadataAttributes[] = [];

  @ApiProperty({
    description: 'Price in decimal format for display',
    example: 1.5,
  })
  priceShort!: number;

  @ApiProperty({
    description: 'Floor price margin percentage (used on user profile offers)',
    example: 10.5,
    required: false,
  })
  floorPriceMargin?: number;

  @ApiProperty({
    description: 'Floor price of the collection (used on user profile offers)',
    example: 1.2,
    required: false,
  })
  floorPrice?: number;

  @ApiProperty({
    description: 'Whether the offer is active',
    example: true,
  })
  isActive: boolean = true;

  @ApiProperty({
    description: 'Collection information (used on user profile offers)',
    type: PartialType(CollectionProfileDoc),
    required: false,
  })
  collectionInfo?: Partial<CollectionProfileDoc>;

  @ApiProperty({
    description: 'Blockchain chain',
    enum: ActivityChain,
    example: ActivityChain.MULTIVERSX,
  })
  chain: ActivityChain = ActivityChain.MULTIVERSX;

  @ApiProperty({
    description: 'USD value of the offer',
    example: 150.75,
    required: false,
  })
  usdValue?: number;

  @ApiProperty({
    description: 'Unique identifier for the document',
    example: 'COLLECTION-123456-12345-xoxno-globalOffer',
  })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
  })
  _ts!: number;

  constructor(props?: Partial<GlobalOfferDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.offerId}-${this.marketplace}-${this.dataType}`;
  }
}
