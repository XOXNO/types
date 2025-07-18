import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { CollectionDataType } from '../../../enums/collection.enum';
import { ActivityChain } from '../../../enums/common.enum';
import { ShortCollectionDoc } from '../short/short-collection.doc';
import { NftMetadataAttributes } from '../token/nft-metadata-attributes';

class GlobalOfferDocBase {
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
    description: 'Blockchain chain',
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

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

export class GlobalOfferDoc extends GlobalOfferDocBase {
  @ApiProperty({
    description: 'Owner/creator of the offer',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  owner!: string;
}

export class GlobalOfferDocHydrated extends GlobalOfferDocBase {
  usdValue!: number;
  owner!: OwnerDto;
  floorPrice!: number;
  floorPriceMargin!: number;
  collectionInfo!: ShortCollectionDoc;
}
