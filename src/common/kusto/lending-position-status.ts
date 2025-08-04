import { ApiProperty } from '@nestjs/swagger';

import { OwnerDto } from '../owner.dto';

export class LendingPositionStatus {
  @ApiProperty({
    description: 'The position of the lending account',
    example: 1,
  })
  position!: number;
  @ApiProperty({
    description: 'Unique identifier for the lending account',
    example: 'account123',
  })
  identifier!: string;
  @ApiProperty({
    description: 'The USD amount supplied in the lending account',
    example: 100,
  })
  supplied!: number;
  @ApiProperty({
    description: 'The USD amount borrowed from the lending account',
    example: 50,
  })
  borrowed!: number;
  @ApiProperty({
    description: 'The health factor of the lending account',
    example: 30,
  })
  healthFactor!: number;
  @ApiProperty({
    description: 'The owner of the lending account',
    type: OwnerDto,
  })
  wallet!: OwnerDto;
  @ApiProperty({
    description: 'Wether the position is E-Mode or not',
    example: false,
  })
  isEMode!: boolean;

  constructor(props?: Partial<LendingPositionStatus>) {
    Object.assign(this, props);
  }
}
