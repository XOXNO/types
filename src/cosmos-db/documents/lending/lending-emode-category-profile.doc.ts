import { ApiProperty, PickType } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';
import { LendingTokenEModeProfileDoc } from './lending-token-emode-profile.doc';
import { ActivityChain } from '../../../enums/common.enum';
import { normalizeLendingChain } from './lending-chain';

export class LendingEModeCategoryProfileDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.EMODE_CATEGORY_PROFILE,
  })
  dataType = LendingDataType.EMODE_CATEGORY_PROFILE;

  @ApiProperty({ description: 'EMode Name', example: 'XOXNO Derivates' })
  name!: string;

  @ApiProperty({
    description:
      'Category-level loan-to-value ratio. Present where e-mode params are category-wide (MVX); omitted on chains with per-asset params (Stellar), where each token profile carries its own.',
    required: false,
    example: 0.75,
  })
  ltv?: string;

  @ApiProperty({
    description:
      'Category-level liquidation threshold. Present on MVX; omitted on Stellar (per-asset).',
    required: false,
    example: 0.85,
  })
  liquidationThreshold?: string;

  @ApiProperty({
    description:
      'Category-level liquidation bonus. Present on MVX; omitted on Stellar (per-asset).',
    required: false,
    example: 0.1,
  })
  liquidationBonus?: string;

  @ApiProperty({ description: 'Is eMode deprecated', example: false })
  isDeprecated!: boolean;

  @ApiProperty({ description: 'EMode category', example: '1' })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB partition key',
    example: 'EMODE_CATEGORY_PROFILE',
  })
  pk!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1732650682,
    required: false,
  })
  _ts?: number;

  @ApiProperty({
    description: 'Blockchain network the eMode category belongs to',
    required: false,
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

  constructor(props?: Partial<LendingEModeCategoryProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.chain = normalizeLendingChain(this.chain);
  }
}

export class ShortLendingTokenEModeProfileDoc extends PickType(
  LendingTokenEModeProfileDoc,
  [
    'token',
    'name',
    'canBeBorrowed',
    'canBeCollateral',
    'eModeCategory',
    'ltv',
    'liquidationThreshold',
    'liquidationBonus',
    'supplyCap',
    'borrowCap',
    'suppliedScaledRay',
    'borrowedScaledRay',
  ] as const,
) {}

export class LendingEModeCategoryProfile extends LendingEModeCategoryProfileDoc {
  @ApiProperty({
    description: 'EMode profiles',
    isArray: true,
    type: ShortLendingTokenEModeProfileDoc,
    required: true,
  })
  eModeTokenProfiles!: Pick<
    LendingTokenEModeProfileDoc,
    | 'token'
    | 'name'
    | 'canBeBorrowed'
    | 'canBeCollateral'
    | 'eModeCategory'
    | 'ltv'
    | 'liquidationThreshold'
    | 'liquidationBonus'
    | 'supplyCap'
    | 'borrowCap'
    | 'suppliedScaledRay'
    | 'borrowedScaledRay'
  >[];
}
