import { ApiProperty } from '@nestjs/swagger';
import {
  EsdtTokenType,
  EsdtTokenSubType,
  ActivityChain,
} from '../../../common/enums';
import { Socials } from '../../../common/socials';
import {
  CollectionStatistics,
  StatisticsDto,
  StatisticsOtherDto,
} from '../../../common/statistics';
import { XoxnoMarketplaceScCollectionConfig } from './collectionConfig';
import { CollectionDataType } from './dataTypes';

export class CollectionProfileDoc {
  dataType: CollectionDataType = CollectionDataType.CollectionProfile;
  collection: string = '';
  originalCollection: string = '';
  name: string = '';
  description: string = '';
  isVisible: boolean = true;
  isVerified: boolean = false;
  socials!: Socials;
  type!: EsdtTokenType;
  subType?: EsdtTokenSubType;
  profile!: string; // TODO: Set default later in the code
  banner!: string; // TODO: Set default later in the code
  statistics: CollectionStatistics = new StatisticsDto({
    other: new StatisticsOtherDto({
      followCount: 0,
      nftCount: 0,
      holdersCount: 0,
    }),
  });
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  transferPolicies: TransferPolicy[] = [];
  owner: string = '';
  creator: string = '';
  isMintable: boolean = false;
  hasStaking: boolean = false;
  isEvent: boolean = false;
  roles: Record<string, string[]> = {};
  eventId?: string;
  pinnedAtDrops?: number;
  pinnedAt?: number;
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
  id: string = '';
  _ts: number = 0;

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

export type CollectionProfileDocType = CollectionProfileDoc;

export class Rule {
  @ApiProperty({ description: 'Rule type' })
  type!: 'kiosk_lock_rule' | 'royalty_rule';

  @ApiProperty({ description: 'Rule amount bp' })
  amount_bp?: number;

  @ApiProperty({ description: 'Rule min amount' })
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
