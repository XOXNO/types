import { TokenDataType } from './token-data.enum';
import { NftMetadata } from './nft-metadata';
import { NftSaleInfo } from './nft-sale-info';
import {
  ActivityChain,
  EsdtTokenSubType,
  EsdtTokenType,
} from '../../../common/enums';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../collection/profile';
import { OwnerDto } from '../../../common/owner.dto';
// Sale: Check Last Owner nfts from GuestDoc [1,2,3] -> 0 -> Delete GuestDoc > 0: Edit GuestDoc nftIds [1,2]
// New Owner: Get GuestDoc -> YES -> nfts insert new ID [0,3] -> NO -> Empty Guest Doc with nfts insert [3]

export class NFTEventData {
  @ApiProperty({
    description: 'ID of the event associated with this NFT.',
  })
  eventId!: string;

  @ApiProperty({
    description: 'Ticket type ID associated with this NFT.',
  })
  ticketId!: string;

  @ApiProperty({
    description: 'Check-in status of the NFT.',
    example: false,
  })
  checkInStatus = false;

  constructor(props?: Partial<NFTEventData>) {
    Object.assign(this, props);
  }
}

class OriginalMedia {
  @ApiProperty({ description: 'The content type of the original media' })
  contentType!: string;

  @ApiProperty({ description: 'The content length of the original media' })
  contentLength!: number;
}

export class NftMedia {
  @ApiProperty({ description: 'The AVIF URL of the media' })
  avifUrl!: string;
  @ApiProperty({ description: 'The WebP URL of the media' })
  webpUrl!: string;
  @ApiProperty({ description: 'The number of retries' })
  retries!: number;
  @ApiProperty({ description: 'The original media' })
  originalMedia!: OriginalMedia;
}

class NftStats {
  @ApiProperty({ type: Number, required: false })
  likedCount?: number;
}

export class NftDoc {
  dataType: TokenDataType = TokenDataType.Nft;
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the asset',
  })
  identifier!: string;
  @ApiProperty({
    type: String,
    description: 'Unique collection ID',
  })
  collection!: string;
  @ApiProperty({
    type: String,
    required: false,
    description:
      'For syntetic NFTs this unique collection represents the underlaying collection',
  })
  originalCollection?: string;
  @ApiProperty({
    type: String,
    required: false,
    description: 'The attributes of the NFT as base64 encoded string',
  })
  attributes!: string;
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The nonce of the NFT',
  })
  nonce!: number;
  @ApiProperty({
    enum: EsdtTokenType,
    enumName: 'EsdtTokenType',
    required: true,
    description: 'The type of the NFT',
  })
  type!: EsdtTokenType;
  @ApiProperty({
    enum: EsdtTokenSubType,
    enumName: 'EsdtTokenSubType',
    required: false,
    description: 'The sub-type of the NFT',
  })
  subType?: EsdtTokenSubType;
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The supply of the NFT',
  })
  supply!: number;
  @ApiProperty({
    type: String,
    required: false,
    description:
      'In case of an SFT/MetaESDT we show the total supply minted for this unique asset as string',
  })
  supplyLong?: string;
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the NFT',
  })
  name!: string;
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The royalties of the NFT',
  })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The royalties of the NFT',
  })
  royalties!: number;
  @ApiProperty({
    type: String,
    required: true,
    description: 'The URL of the NFT',
  })
  url!: string;
  @ApiProperty({
    type: String,
    required: false,
    description: 'The URIs of the NFT',
  })
  uris?: string[];
  @ApiProperty({
    type: String,
    required: false,
    description: 'The creator of the NFT',
  })
  creator?: string;
  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether the NFT was processed',
  })
  wasProcessed: boolean = false;
  @ApiProperty({
    type: NftMedia,
    required: false,
    description: 'The media of the NFT',
  })
  media?: NftMedia;
  @ApiProperty({
    type: OwnerDto,
    required: false,
    description: 'The current owner of the NFT',
  })
  currentOwner?: string | OwnerDto;
  @ApiProperty({
    type: OwnerDto,
    required: false,
    description: 'The owner of the NFT',
  })
  owner?: string | OwnerDto;
  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether the NFT is on sale',
  })
  onSale: boolean = false;
  @ApiProperty({
    type: NftSaleInfo,
    required: false,
    description: 'The sale info of the NFT',
  })
  saleInfo?: NftSaleInfo;
  @ApiProperty({
    type: NftStats,
    required: false,
    description: 'The statistics of the NFT',
  })
  statistics?: NftStats;
  @ApiProperty({
    type: NftMetadata,
    required: false,
    description: 'The metadata of the NFT',
  })
  metadata?: NftMetadata = { attributes: [] };
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Whether the NFT is a ticket',
  })
  // Encapsulate event-specific data in a separate key
  isTicket?: boolean = false;
  @ApiProperty({
    type: NFTEventData,
    required: false,
    description: 'The event data of the NFT',
  })
  eventData?: NFTEventData;

  @ApiProperty({
    enum: ActivityChain,
    enumName: 'ActivityChain',
    required: true,
    description: 'The chain of the NFT',
  })
  chain: ActivityChain = ActivityChain.MULTIVERSX;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The tags of the NFT',
  })
  tags?: string[];

  @ApiProperty({
    type: String,
    description: 'SUI specific: The Kiosk ID if the NFT is listed on a kiosk.',
    required: false,
  })
  kiosk?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The ID of the NFT',
  })
  id?: string;
  @ApiProperty({
    type: Number,
    required: false,
    description: 'The timestamp of the NFT last DB change',
  })
  _ts?: number;

  constructor(props?: Partial<NftDoc>) {
    Object.assign(this, props);
    this.id = this.identifier;
    if (this.type === EsdtTokenType.NonFungibleESDT) {
      this.supply = 1;
      this.supplyLong = '1';
    } else {
      this.supply = props?.supply ?? 1;
      this.supplyLong = props?.supplyLong;
    }
  }
}

export class ExtraProperties {
  @ApiProperty({
    required: false,
    description: 'Current epoch of the day',
  })
  currentEpoch?: number;

  @ApiProperty({
    required: false,
    description: 'Custom level of the NFT',
  })
  level?: number;
}

export class NftProps extends NftDoc {
  constructor(props?: Partial<NftDoc>) {
    super(props);
  }

  @ApiProperty({ type: Boolean, required: false })
  receiverIsNotOwner?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Balance owned by the user',
  })
  balance?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Balance owned by the user as long string',
  })
  balanceLong?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Left days until the staked NFT can be claimed back',
  })
  unboundDaysLeft?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'The epoch day when the NFT will be available for claiming',
  })
  unboundEpoch?: number;

  @ApiProperty({
    type: PartialType<CollectionProfileDoc>,
    required: false,
    description:
      'The extra information about the collection of this specific NFT',
  })
  collectionInfo?: Partial<CollectionProfileDoc>;

  @ApiProperty({
    type: ExtraProperties,
    required: false,
    description: 'Extra props for the specific NFT',
  })
  extraProperties?: ExtraProperties;
}

export class NftCosmosResponse {
  @ApiProperty({ type: NftProps, isArray: true })
  resources: NftProps[] = [];

  @ApiProperty({ example: true, type: Boolean })
  hasMoreResults: boolean = false;

  @ApiProperty({ example: 12, type: Number, required: false })
  count?: number;
}
