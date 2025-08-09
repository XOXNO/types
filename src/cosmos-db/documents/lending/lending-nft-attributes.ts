import { ApiProperty } from '@nestjs/swagger';
import { PositionMode } from '../../../enums/lending.enum';

export class LendingNftAttributes {
  @ApiProperty({
    description: 'Whether the position is isolated',
    example: false,
  })
  isolated!: boolean;
  @ApiProperty({
    description: 'E-mode category identifier',
    example: '1',
  })
  eModeCategory!: string;
  @ApiProperty({
    description: 'Position mode for the lending NFT',
    enum: PositionMode,
    enumName: 'PositionMode',
    example: PositionMode.Normal,
  })
  positionMode!: PositionMode;
  @ApiProperty({
    description: 'Token identifier for isolated positions',
    example: 'USDC-c76f1f',
    required: false,
  })
  isolatedToken?: string;

  constructor(props?: Partial<LendingNftAttributes>) {
    Object.assign(this, props);
  }
}
