import { ApiProperty } from '@nestjs/swagger';

export class LendingMarketAnalyticsGraph {
  @ApiProperty({
    description: 'Token of the lending market',
    example: 'EGLD',
  })
  token!: string;

  @ApiProperty({
    description: 'Timestamp of the graph point',
    example: [
      '2023-01-01T00:00:00Z',
      '2023-01-02T00:00:00Z',
      '2023-01-03T00:00:00Z',
    ],
    isArray: true,
    items: { type: 'string' },
  })
  timestamp!: string[];

  @ApiProperty({
    description: 'Minimum supply APY value for each timestamp',
    example: [1.2, 1.3, 1.4],
    isArray: true,
    items: { type: 'number' },
  })
  minSupplyApy!: number[];

  @ApiProperty({
    description: 'Maximum supply APY value for each timestamp',
    example: [2.2, 2.3, 2.4],
    isArray: true,
    items: { type: 'number' },
  })
  maxSupplyApy!: number[];

  @ApiProperty({
    description: 'Average supply APY value for each timestamp',
    example: [1.7, 1.8, 1.9],
    isArray: true,
    items: { type: 'number' },
  })
  avgSupplyApy!: number[];

  @ApiProperty({
    description: 'Minimum borrow APY value for each timestamp',
    example: [0.5, 0.6, 0.7],
    isArray: true,
    items: { type: 'number' },
  })
  minBorrowApy!: number[];

  @ApiProperty({
    description: 'Maximum borrow APY value for each timestamp',
    example: [1.5, 1.6, 1.7],
    isArray: true,
    items: { type: 'number' },
  })
  maxBorrowApy!: number[];

  @ApiProperty({
    description: 'Average borrow APY value for each timestamp',
    example: [1.0, 1.1, 1.2],
    isArray: true,
    items: { type: 'number' },
  })
  avgBorrowApy!: number[];

  @ApiProperty({
    description: 'Minimum utilization rate for each timestamp',
    example: [0.1, 0.2, 0.3],
    isArray: true,
    items: { type: 'number' },
  })
  minUtilizationRate!: number[];

  @ApiProperty({
    description: 'Maximum utilization rate for each timestamp',
    example: [0.4, 0.5, 0.6],
    isArray: true,
    items: { type: 'number' },
  })
  maxUtilizationRate!: number[];

  @ApiProperty({
    description: 'Average utilization rate for each timestamp',
    example: [0.25, 0.35, 0.45],
    isArray: true,
    items: { type: 'number' },
  })
  avgUtilizationRate!: number[];

  @ApiProperty({
    description: 'Minimum supply amount for each timestamp',
    example: [1000, 1100, 1200],
    isArray: true,
    items: { type: 'number' },
  })
  minSupplyAmount!: number[];

  @ApiProperty({
    description: 'Maximum supply amount for each timestamp',
    example: [2000, 2100, 2200],
    isArray: true,
    items: { type: 'number' },
  })
  maxSupplyAmount!: number[];

  @ApiProperty({
    description: 'Average supply amount for each timestamp',
    example: [1500, 1600, 1700],
    isArray: true,
    items: { type: 'number' },
  })
  avgSupplyAmount!: number[];

  @ApiProperty({
    description: 'Minimum borrow amount for each timestamp',
    example: [500, 600, 700],
    isArray: true,
    items: { type: 'number' },
  })
  minBorrowAmount!: number[];

  @ApiProperty({
    description: 'Maximum borrow amount for each timestamp',
    example: [1500, 1600, 1700],
    isArray: true,
    items: { type: 'number' },
  })
  maxBorrowAmount!: number[];

  @ApiProperty({
    description: 'Average borrow amount for each timestamp',
    example: [1000, 1100, 1200],
    isArray: true,
    items: { type: 'number' },
  })
  avgBorrowAmount!: number[];

  @ApiProperty({
    description: 'TWAP supply APY for each the time range',
    example: 1.2,
  })
  twapSupplyApy!: number;

  @ApiProperty({
    description: 'TWAP borrow APY for each the time range',
    example: 1.2,
  })
  twapBorrowApy!: number;

  @ApiProperty({
    description: 'TWAP utilization rate for each the time range',
    example: 1.2,
  })
  twapUtilizationRate!: number;

  @ApiProperty({
    description: 'TWAP supply amount for each the time range',
    example: 1.2,
  })
  twapSupplyAmount!: number;

  @ApiProperty({
    description: 'TWAP borrow amount for each the time range',
    example: 1.2,
  })
  twapBorrowAmount!: number;
}
