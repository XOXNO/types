import { ApiProperty } from '@nestjs/swagger';

export class MarginTier {
  @ApiProperty()
  lowerBound!: string;

  @ApiProperty()
  maxLeverage!: number;
}

export class MarginTable {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  marginTiers!: MarginTier[];
}
