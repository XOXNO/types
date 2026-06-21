import { ApiProperty } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';
import { ActivityChain } from '../../../enums/common.enum';
import { normalizeLendingChain } from './lending-chain';

export class LendingTokenEModeProfileDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.TOKEN_EMODE_PROFILE,
  })
  dataType = LendingDataType.TOKEN_EMODE_PROFILE;
  @ApiProperty({
    description: 'The token associated with the eMode profile',
    example: 'EGLD',
  })
  token!: string;
  @ApiProperty({
    description:
      'Human-readable ticker of the token (e.g. "USDC", "EURC", "XLM", "EGLD"). Derived from the market profile name (MVX identifier symbol, Stellar hydrated ticker, Sui coin symbol). Falls back to the raw token identifier when no hydrated name is available.',
    example: 'EGLD',
  })
  name!: string;
  @ApiProperty({
    description: 'Indicates if the token can be used as collateral',
    example: true,
  })
  canBeCollateral!: boolean;
  @ApiProperty({
    description: 'Indicates if the token can be borrowed',
    example: true,
  })
  canBeBorrowed!: boolean;
  @ApiProperty({
    description: 'EMode category of the token',
    example: '1',
  })
  eModeCategory!: string;

  @ApiProperty({
    description:
      'Per-asset loan-to-value ratio within the e-mode category. Present on chains with per-asset e-mode risk params (Stellar); omitted where params are category-level (MVX).',
    required: false,
    example: '0.97',
  })
  ltv?: string;

  @ApiProperty({
    description:
      'Per-asset liquidation threshold within the e-mode category. Present on chains with per-asset e-mode risk params (Stellar).',
    required: false,
    example: '0.98',
  })
  liquidationThreshold?: string;

  @ApiProperty({
    description:
      'Per-asset liquidation bonus within the e-mode category. Present on chains with per-asset e-mode risk params (Stellar).',
    required: false,
    example: '0.02',
  })
  liquidationBonus?: string;

  @ApiProperty({
    description:
      'Spoke supply cap in asset-native units (0 = uncapped). Stellar e-mode only.',
    required: false,
    example: '100000000000000',
  })
  supplyCap?: string;

  @ApiProperty({
    description:
      'Spoke borrow cap in asset-native units (0 = uncapped). Stellar e-mode only.',
    required: false,
    example: '100000000000000',
  })
  borrowCap?: string;

  @ApiProperty({
    description:
      'Aggregate supplied scaled amount (RAY) tracked for this asset within the spoke. Stellar indexer only.',
    required: false,
    example: '0',
  })
  suppliedScaledRay?: string;

  @ApiProperty({
    description:
      'Aggregate borrowed scaled amount (RAY) tracked for this asset within the spoke. Stellar indexer only.',
    required: false,
    example: '0',
  })
  borrowedScaledRay?: string;

  @ApiProperty({
    description: 'Cosmos DB document identifier',
    example: 'EGLD_1_TOKEN_EMODE_PROFILE',
  })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB partition key',
    example: 'TOKEN_EMODE_PROFILE',
  })
  pk!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1732650682,
  })
  _ts!: number;

  @ApiProperty({
    description: 'Blockchain network the token eMode profile belongs to',
    required: false,
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

  constructor(props?: Partial<LendingTokenEModeProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `${this.token}_${this.eModeCategory}_${this.dataType}`;
    this.chain = normalizeLendingChain(this.chain);
  }
}
