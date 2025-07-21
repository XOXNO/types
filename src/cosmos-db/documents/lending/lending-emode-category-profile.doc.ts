import { ApiProperty, PickType } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';
import { LendingTokenEModeProfileDoc } from './lending-token-emode-profile.doc';

export class LendingEModeCategoryProfileDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.EMODE_CATEGORY_PROFILE,
  })
  dataType = LendingDataType.EMODE_CATEGORY_PROFILE;

  @ApiProperty({ description: 'EMode Name', example: 'XOXNO Derivates' })
  name!: string;

  @ApiProperty({ description: 'Loan-to-value ratio', example: 0.75 })
  ltv!: string;

  @ApiProperty({ description: 'Liquidation threshold', example: 0.85 })
  liquidationThreshold!: string;

  @ApiProperty({ description: 'Liquidation bonus', example: 0.1 })
  liquidationBonus!: string;

  @ApiProperty({ description: 'Is eMode deprecated', example: false })
  isDeprecated!: boolean;

  @ApiProperty({ description: 'EMode category', example: '1' })
  id!: string;

  pk!: string;
  _ts?: number;

  constructor(props?: Partial<LendingEModeCategoryProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
  }
}

export class ShortLendingTokenEModeProfileDoc extends PickType(
  LendingTokenEModeProfileDoc,
  ['token', 'canBeBorrowed', 'canBeCollateral', 'eModeCategory'],
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
    'token' | 'canBeBorrowed' | 'canBeCollateral' | 'eModeCategory'
  >[];
}
