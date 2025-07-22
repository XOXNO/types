import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  EsdtTokenType,
  EsdtTokenSubType,
  ActivityChain,
} from '../../../enums/common.enum';
import { SocialsDto } from '../../../common/socials';
import { StatisticsDto, StatisticsOtherDto } from '../../../common/statistics';
import { XoxnoMarketplaceScCollectionConfig } from './collectionConfig';
import { CollectionDataType } from '../../../enums/collection.enum';
import { IsString, Length } from 'class-validator';

export class Rule {
  @ApiProperty({ description: 'Rule type' })
  type!: 'kiosk_lock_rule' | 'royalty_rule';

  @ApiProperty({ description: 'Rule amount bp', required: false })
  amount_bp?: number;

  @ApiProperty({ description: 'Rule min amount', required: false })
  min_amount?: string;
}

export class TransferPolicy {
  @ApiProperty({ description: 'Transfer policy id' })
  id!: string;

  @ApiProperty({ description: 'Transfer policy type' })
  type!: string;

  @ApiProperty({ description: 'Transfer policy rules' })
  rules!: Rule[];

  @ApiProperty({ description: 'Transfer policy is origin byte' })
  is_origin_byte!: boolean;
}

export class CollectionProfileDoc {
  @ApiProperty({
    description: 'Data type identifier for the collection profile',
    enum: CollectionDataType,
    example: CollectionDataType.CollectionProfile,
  })
  dataType: CollectionDataType = CollectionDataType.CollectionProfile;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection: string = '';

  @ApiProperty({
    description: 'Original collection identifier',
    example: 'ORIGINAL-123456',
  })
  originalCollection: string = '';

  @ApiProperty({
    description: 'Name of the collection',
    example: 'My NFT Collection',
  })
  @IsString()
  @Length(3, 30)
  name: string = '';

  @ApiProperty({
    description: 'Description of the collection',
    example: 'A unique collection of digital artwork',
  })
  @IsString()
  @Length(3, 300)
  description: string = '';

  @ApiProperty({
    description: 'Whether the collection is visible to the public',
    example: true,
  })
  isVisible: boolean = true;

  @ApiProperty({
    description: 'Whether the collection is verified',
    example: false,
  })
  isVerified: boolean = false;

  @ApiProperty({
    description: 'Social media links for the collection',
    type: SocialsDto,
  })
  socials!: SocialsDto;

  @ApiProperty({
    description: 'Token type',
    enum: EsdtTokenType,
    example: EsdtTokenType.NonFungibleESDT,
  })
  type!: EsdtTokenType;

  @ApiProperty({
    description: 'Token subtype',
    enum: EsdtTokenSubType,
    required: false,
    example: EsdtTokenSubType.NonFungibleESDTv2,
  })
  subType?: EsdtTokenSubType;

  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://example.com/profile.jpg',
  })
  profile!: string;

  @ApiProperty({
    description: 'Banner image URL',
    example: 'https://example.com/banner.jpg',
  })
  banner!: string;

  @ApiProperty({
    description: 'Collection statistics',
    type: StatisticsDto,
  })
  statistics = new StatisticsDto({
    other: new StatisticsOtherDto({
      followCount: 0,
      nftCount: 0,
      holdersCount: 0,
    }),
  });

  @ApiProperty({
    description: 'Blockchain chain',
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

  @ApiProperty({
    description: 'Transfer policies for the collection',
    type: [TransferPolicy],
  })
  transferPolicies: TransferPolicy[] = [];

  @ApiProperty({
    description: 'Owner address of the collection',
    example: 'erd1...',
  })
  owner: string = '';

  @ApiProperty({
    description: 'Creator address of the collection',
    example: 'erd1...',
  })
  creator: string = '';

  @ApiProperty({
    description: 'Whether the collection is mintable',
    example: false,
  })
  isMintable: boolean = false;

  @ApiProperty({
    description: 'Whether the collection has staking',
    example: false,
  })
  hasStaking: boolean = false;

  @ApiProperty({
    description: 'Whether the collection is an event',
    example: false,
  })
  isEvent: boolean = false;

  @ApiProperty({
    description: 'Roles associated with the collection',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'string' },
    },
    example: { ESDTRoleNFTCreate: ['erd1...'] },
  })
  roles: Record<string, string[]> = {};

  @ApiProperty({
    description: 'Event ID if this is an event collection',
    required: false,
    example: 'event-123',
  })
  eventId?: string;

  @ApiProperty({
    description: 'Timestamp when pinned at drops',
    required: false,
    example: 1640995200,
  })
  pinnedAtDrops?: number;

  @ApiProperty({
    description: 'Timestamp when pinned',
    required: false,
    example: 1640995200,
  })
  pinnedAt?: number;

  @ApiProperty({
    description: 'Custom configuration for the collection',
    required: false,
    type: XoxnoMarketplaceScCollectionConfig,
  })
  customConfig?: XoxnoMarketplaceScCollectionConfig;

  @ApiProperty({
    description: 'Royalty of the collection',
    required: false,
  })
  royalty?: number;

  @ApiProperty({
    description: 'Size of the collection, applied post processing',
    required: false,
  })
  collectionSize?: number = 0;

  @ApiProperty({
    description: 'Holders count of the collection, applied post processing',
    required: false,
  })
  holdersCount?: number = 0;

  @ApiProperty({
    description: 'Follow count of the collection, applied post processing',
    required: false,
  })
  followCount?: number = 0;

  @ApiProperty({
    description: 'Minimum sale price of the collection',
    required: false,
  })
  minSalePrice?: string;

  @ApiProperty({
    description: 'Unique identifier for the document',
    example: 'COLLECTION-123456-CollectionProfile',
    required: false,
  })
  id!: string;

  @ApiProperty({
    description: 'Timestamp of the document',
    example: 1640995200,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<CollectionProfileDoc>) {
    Object.assign(this, props);
    this.collection = this.collection.replace('::', '-');
    this.id = `${this.collection}-${this.dataType}`;
    if (this.transferPolicies?.length > 0) {
      for (const policy of this.transferPolicies) {
        this.royalty = policy.rules.find(
          (rule) => rule.type === 'royalty_rule',
        )?.amount_bp;
        const minPrice = policy.rules.find(
          (rule) => rule.type === 'royalty_rule',
        )?.min_amount;
        if (minPrice && minPrice !== '0') {
          this.minSalePrice = minPrice;
        }
      }
    }
  }
}

export class CollectionProfileEditDto extends PartialType(
  PickType(CollectionProfileDoc, ['description', 'name'] as const),
) {}
