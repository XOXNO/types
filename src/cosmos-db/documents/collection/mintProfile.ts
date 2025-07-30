import { ApiProperty, PickType } from '@nestjs/swagger';
import { EgldOrEsdtTokenPayment } from '../../../common/tokenPayent';
import { CollectionDataType } from '../../../enums/collection.enum';
import { MintStageDto } from '../../../requests/collection/creator-drop-info';
import { ShortCollectionInfoDoc } from '../short/short-collection-info.doc';
import { ShortCreatorDoc } from '../short/short-creator.doc';
import { CreatorProfileDoc } from '../user/user-creator-profile.doc';

export class CollectionMintProfileDoc {
  @ApiProperty({
    description: 'Data type identifier for the mint profile',
    enum: CollectionDataType,
    example: CollectionDataType.MintProfile,
  })
  dataType: CollectionDataType = CollectionDataType.MintProfile;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;

  @ApiProperty({
    description: 'Creator tag/identifier',
    example: 'creator123',
  })
  creatorTag!: string;

  @ApiProperty({
    description: 'Name of the collection creator',
    example: 'John Doe',
  })
  creatorName!: string;

  @ApiProperty({
    description: 'Smart contract address for minting',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  contractAddress!: string;

  @ApiProperty({
    description: 'Collection tag for identification',
    example: 'MYNFT',
  })
  collectionTag!: string;

  @ApiProperty({
    description: 'IPFS CID for metadata',
    example: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
  })
  cid!: string;

  @ApiProperty({
    description: 'Media type of the NFT collection',
    example: 'image/png',
  })
  mediaType!: string;

  @ApiProperty({
    description: 'Base name for NFTs in the collection',
    example: 'My NFT Collection',
  })
  baseNftName!: string;

  @ApiProperty({
    description: 'Whether the collection has attributes/traits',
    example: true,
  })
  hasAttributes!: boolean;

  @ApiProperty({
    description: 'Whether the collection owner has been transferred',
    example: false,
  })
  ownerTransferred!: boolean;

  @ApiProperty({
    description: 'Total size of the collection',
    example: 10000,
  })
  collectionSize!: number;

  @ApiProperty({
    description: 'Total number of NFTs minted',
    example: 5000,
  })
  totalNftMinted!: number;

  @ApiProperty({
    description: 'Global wallet limit for minting',
    example: 10,
  })
  globalWalletLimit!: number;

  @ApiProperty({
    description: 'Royalties percentage (basis points)',
    example: 500,
  })
  royalties!: number;

  @ApiProperty({
    description: 'Whether this is an old version of the contract',
    example: false,
  })
  oldVersion!: boolean;

  @ApiProperty({
    description: 'Whether names are shuffled during minting',
    example: true,
  })
  nameShuffle!: boolean;

  @ApiProperty({
    description: 'Whether NFT transfers are limited',
    example: false,
  })
  nftTransferLimited!: boolean;

  @ApiProperty({
    description: 'Whether public burning is allowed',
    example: false,
    required: false,
  })
  allowsPublicBurn?: boolean;

  @ApiProperty({
    description: 'Whether KYC is required for minting',
    example: false,
  })
  kycRequired!: boolean;

  @ApiProperty({
    description: 'Whether refunds are allowed',
    example: false,
  })
  allowsRefund!: boolean;

  @ApiProperty({
    description: 'Whether bot protection is enabled',
    example: true,
  })
  hasBotProtection!: boolean;

  @ApiProperty({
    description: 'Whether the collection has reveal mechanics',
    example: false,
  })
  hasReveal!: boolean;

  @ApiProperty({
    description: 'Tags associated with the collection',
    example: ['gaming', 'art', 'utility'],
  })
  tags!: string | string[];

  @ApiProperty({
    description: 'Minimum starting prices for each public stage',
    type: [EgldOrEsdtTokenPayment],
  })
  prices: EgldOrEsdtTokenPayment[] = [];

  @ApiProperty({
    description: 'Earliest start time of all public stages (Unix timestamp)',
    example: 1640995200,
  })
  startTime!: number;

  @ApiProperty({
    description: 'Latest end time of all public stages (Unix timestamp)',
    example: 1641081600,
  })
  endTime!: number;

  @ApiProperty({
    description: 'Whether the collection is sold out',
    example: false,
  })
  isSoldOut: boolean = false;

  @ApiProperty({
    description: 'Unique identifier for the document',
    example: 'COLLECTION-123456-mintProfile',
  })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<CollectionMintProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.dataType}`;
    if (typeof this.tags === 'string') {
      this.tags = this.tags.split(',');
    }
  }
}

export class CollectionMintProfileDocHydrated extends CollectionMintProfileDoc {
  @ApiProperty({
    description: 'Short collection information',
    type: ShortCollectionInfoDoc,
  })
  collectionInfo!: ShortCollectionInfoDoc;

  @ApiProperty({
    description: 'Short creator information',
    type: ShortCreatorDoc,
  })
  creatorInfo!: ShortCreatorDoc;
}

export class CollectionMintProfileDocWithStages extends PickType(
  CollectionMintProfileDocHydrated,
  [
    'contractAddress',
    'collectionTag',
    'nftTransferLimited',
    'hasBotProtection',
    'kycRequired',
    'collectionSize',
    'cid',
    'mediaType',
    'globalWalletLimit',
    'totalNftMinted',
    'hasAttributes',
    'collectionInfo',
  ] as const,
) {
  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;

  @ApiProperty({
    description: 'Whether the user is excluded from minting',
    example: false,
  })
  isExcludedFromMint!: boolean;

  @ApiProperty({
    description: 'Number of global mints by the user',
    example: 5,
  })
  userMintsGlobal!: number;

  @ApiProperty({
    description: 'Available mint stages for the collection',
    type: [MintStageDto],
  })
  mintStages!: MintStageDto[];

  @ApiProperty({
    description: 'Creator profile information',
    type: CreatorProfileDoc,
  })
  creatorInfo!: CreatorProfileDoc;
}
