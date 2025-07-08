import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../common/enums';
import {
  RangeFilter,
  CosmosDbGenericFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { CollectionDataType } from '../../cosmos-db/documents/collection/dataTypes';

export class CollectionStatsFilterCriteriaDto {
  @ApiProperty({
    required: false,
    enum: CollectionDataType,
    enumName: 'CollectionDataType',
    example: CollectionDataType.CollectionStats,
  })
  dataType?: CollectionDataType;

  @ApiProperty({ required: false, type: String, isArray: true })
  collection?: string[];

  @ApiProperty({ required: false, type: Boolean, example: true })
  verifiedOnly?: boolean;

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter[];
}

export class CollectionStatsFilter extends CosmosDbGenericFilter {
  @ApiProperty({
    type: CollectionStatsFilterCriteriaDto,
  })
  filters: {
    dataType?: CollectionDataType;
    collection?: string[];
    verifiedOnly?: boolean;
    range?: RangeFilter[];
    chain?: ActivityChain[];
  } = {
    dataType: CollectionDataType.CollectionStats,
  };
  @ApiProperty({ required: false, type: 'boolean' })
  strictSelect?: boolean = false;

  constructor(props?: Partial<CollectionStatsFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
      chain:
        props?.filters?.chain &&
        props?.filters.chain.length === 1 &&
        props?.filters.chain[0] === ActivityChain.MULTIVERSX
          ? undefined
          : props?.filters?.chain,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props ?? {};
    Object.assign(this, otherProps);

    this.applySelectPropertyLogic(props);
  }

  private applySelectPropertyLogic(props?: Partial<CollectionStatsFilter>) {
    if (Array.isArray(this.select)) {
      const defaultProperties = this.getDefaultProperties();
      if (this.select.includes('tradingStats')) {
        // Filter out 'tradingStats' related properties from defaultProperties
        const filteredDefaultProperties = defaultProperties.filter(
          (prop) => !prop.startsWith('tradingStats.'),
        );
        this.select = this.select.concat(filteredDefaultProperties);
      } else {
        this.select = this.select.concat(defaultProperties);
      }
    }

    if (this.strictSelect) {
      this.select = props?.select;
    }
  }

  private getDefaultProperties() {
    return [
      'collection',
      'tradingStats.totalVolume',
      'tradingStats.totalTrades',
      'floorPrice',
      'listedCount',
    ];
  }
}
