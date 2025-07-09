import { ApiProperty } from '@nestjs/swagger';

import { StakingDataType } from './staking-data-type.enum';

export class StakingCreatorDoc {
  @ApiProperty({
    enum: StakingDataType,
    enumName: 'StakingDataType',
  })
  dataType: StakingDataType = StakingDataType.Creator;

  @ApiProperty()
  address!: string;

  @ApiProperty({ type: Number, isArray: true })
  ownedPools!: number[];

  @ApiProperty({ type: String, isArray: true })
  ownedCollections!: string[];

  @ApiProperty()
  cutFee!: number;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  pk?: string;

  constructor(props?: Partial<StakingCreatorDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
    this.pk = `${this.address}`;
  }
}
