import { ApiProperty } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';

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
  id!: string;
  pk!: string;
  _ts!: number;

  constructor(props?: Partial<LendingTokenEModeProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `${this.token}_${this.eModeCategory}_${this.dataType}`;
  }
}
