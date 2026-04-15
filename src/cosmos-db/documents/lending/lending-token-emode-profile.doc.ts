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
