import { ApiProperty } from '@nestjs/swagger';

import { ActivityChain } from '../../enums/common.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { NftActivityEventSource } from '../../enums/event-source.enum';
import { NftActivityType } from '../../enums/nft-activity-type.enum';
import { NftActivityDoc } from '../../cosmos-db/documents/activity/nft-activity.doc';

class ActivityDataDto {
  @ApiProperty({
    required: false,
    type: 'array',
    items: { type: 'string' },
    example: ['collection1'],
  })
  collection?: string[];

  @ApiProperty({
    required: false,
    type: 'array',
    items: { type: 'string' },
    example: ['identifier1'],
  })
  identifier?: string[];
}

export class NftActivityFilterCriteriaDto {
  @ApiProperty({ required: false, type: String, isArray: true })
  txHash?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  activityAddress?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  from?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  to?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: NftActivityType,
    enumName: 'NftActivityType',
    example: [NftActivityType.LISTING_CREATE],
  })
  activityType?: NftActivityType[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: NftActivityEventSource,
    enumName: 'NftActivityEventSource',
  })
  source?: NftActivityEventSource[];

  @ApiProperty({
    required: false,
    type: RangeFilter,
    isArray: true,
  })
  range?: RangeFilter<NftActivityDoc>[];

  @ApiProperty({ required: false, type: ActivityDataDto })
  activityData?: ActivityDataDto;

  pk?: string[];
}

export class NftActivityFilter extends CosmosDbGenericFilter<NftActivityDoc> {
  @ApiProperty({
    required: false,
    type: NftActivityFilterCriteriaDto,
  })
  filters: {
    txHash?: string[];
    activityAddress?: string[]; // if this is set, it will be used to filter the 'from' OR 'to' fields
    from?: string[];
    to?: string[];
    activityType?: NftActivityType[];
    source?: NftActivityEventSource[];
    range?: RangeFilter<NftActivityDoc>[]; // can be used to filter trade timestamp or egldValue within activity data
    chain?: ActivityChain[];
    activityData?: {
      collection?: string[];
      identifier?: string[];
    };
    pk?: string[]; // no need to set this, it will be set automatically
  } = {};
  @ApiProperty({ required: false, type: 'boolean', default: false })
  strictSelect?: boolean = false;

  constructor(props?: Partial<NftActivityFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
      chain:
        props?.filters?.chain &&
        props.filters.chain.length === 1 &&
        props.filters.chain[0] === ActivityChain.MVX
          ? undefined
          : props?.filters?.chain,
    };
    // Assign other properties
    if (props) {
      const { filters: _, ...otherProps } = props;
      Object.assign(this, otherProps);
    }
    this.setPk();
  }

  private setPk() {
    if (!this.filters) return;

    const uniqueCollections = new Set<string>();
    const activityData = this.filters.activityData;
    if ((activityData?.collection?.length ?? 0) > 0) {
      activityData!.collection!.forEach((collection) => {
        uniqueCollections.add(collection);
      });
    }
    if ((activityData?.identifier?.length ?? 0) > 0) {
      activityData!.identifier!.forEach((identifier) => {
        // Extract collection ticker from identifier (format: COLLECTION-NONCE)
        const collectionTicker = identifier.split('-').slice(0, -1).join('-');
        uniqueCollections.add(collectionTicker);
      });
    }

    this.filters.pk = Array.from(uniqueCollections);
  }
}
