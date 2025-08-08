import { ApiProperty } from '@nestjs/swagger';
import {
  RangeFilter,
  CosmosDbGenericFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { LendingDataType } from '../../enums/lending-data-type.enum';
import { LendingMarketProfileDoc } from '../../cosmos-db/documents/lending/lending-market-profile.doc';

export class LendingMarketProfileFilterCriteriaDto {
  @ApiProperty({ required: false, type: String, isArray: true })
  token?: string[];

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<LendingMarketProfileDoc>[];

  @ApiProperty({ required: false, type: Boolean })
  eMode?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  flashLoan?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  isolated?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  siloed?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  canBeCollateral?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  canBeBorrowed?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  canBorrowInIsolation?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  isDebtCeilingReached?: boolean;
}

export class LendingMarketProfileExtraProperties {
  @ApiProperty({ required: false, type: 'boolean' })
  eModeCategoryProfile?: boolean;

  @ApiProperty({ required: false, type: 'boolean' })
  participants?: boolean;
}

export class LendingMarketProfileFilter extends CosmosDbGenericFilter<LendingMarketProfileDoc> {
  @ApiProperty({
    type: LendingMarketProfileFilterCriteriaDto,
  })
  filters: {
    range?: RangeFilter<LendingMarketProfileDoc>[];
    token?: string[];
    canBeCollateral?: boolean;
    canBeBorrowed?: boolean;
    eMode?: boolean;
    isolated?: boolean;
    siloed?: boolean;
    flashLoan?: boolean;
    canBorrowInIsolation?: boolean;
    isDebtCeilingReached?: boolean;
    pk?: string;
  } = {
    pk: LendingDataType.MARKET_PROFILE,
  };
  @ApiProperty({ required: false, type: 'boolean', default: false })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean', default: false })
  includeCount?: boolean = false;

  @ApiProperty({
    required: false,
    type: LendingMarketProfileExtraProperties,
  })
  extraProperties?: {
    eModeCategoryProfile: boolean;
    participants: boolean;
  } = {
    eModeCategoryProfile: false,
    participants: false,
  };

  constructor(props?: Partial<LendingMarketProfileFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props!;
    Object.assign(this, otherProps);

    this.applySelectPropertyLogic(props);
  }

  private applySelectPropertyLogic(
    props?: Partial<LendingMarketProfileFilter>,
  ) {
    if (Array.isArray(this.select)) {
      const defaultProperties = this.getDefaultProperties();
      this.select = this.select.concat(defaultProperties);
    }

    if (this.strictSelect) {
      this.select = props?.select;
    }
  }

  private getDefaultProperties() {
    return [
      'decimals',
      'name',
      'token',
      'address',
      'canBeCollateral',
      'canBeBorrowed',
      'eMode',
      'isolated',
      'siloed',
      'canBorrowInIsolation',
      'eModeCategories',
      'ltv',
      'liquidationThreshold',
      'borrowApy',
      'supplyApy',
      'utilizationRate',
      'maxDebtUsd',
      'supplyCap',
      'borrowCap',
      'reserves',
      'supplyAmountScaled',
      'borrowAmountScaled',
      'debtCeiling',
      'oracleProvider',
      'baseRate',
      'maxBorrowRate',
      'slopeRate1',
      'slopeRate2',
      'slopeRate3',
      'midUsageRate',
      'optimalUsageRate',
      'reserveFactor',
    ] as const;
  }
}
