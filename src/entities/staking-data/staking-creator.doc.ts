import { ApiProperty } from '@nestjs/swagger';

import { StakingDataType } from '../../enums/staking-data-type.enum';

export class StakingCreatorDoc {
  @ApiProperty({
    description: 'Type of staking data document',
    enum: StakingDataType,
    enumName: 'StakingDataType',
    example: StakingDataType.Creator,
  })
  dataType: StakingDataType = StakingDataType.Creator;

  @ApiProperty({
    description: 'Creator wallet address',
    example: 'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6',
    type: String,
  })
  address!: string;

  @ApiProperty({
    description: 'List of pool IDs owned by this creator',
    example: [1, 3, 7],
    type: Number,
    isArray: true,
  })
  ownedPools!: number[];

  @ApiProperty({
    description: 'List of collection identifiers owned by this creator',
    example: ['MICE-a0c447', 'SRB-61daf7', 'XOXNO-a52799'],
    type: String,
    isArray: true,
  })
  ownedCollections!: string[];

  @ApiProperty({
    description: 'Fee percentage cut taken by the creator from staking rewards',
    example: 5,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  cutFee!: number;

  @ApiProperty({
    description: 'Document ID in format: {address}-{dataType}',
    example:
      'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6-creator',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Partition key for Cosmos DB storage',
    example: 'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6',
    type: String,
    required: false,
  })
  pk?: string;

  constructor(props?: Partial<StakingCreatorDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
    this.pk = `${this.address}`;
  }
}
