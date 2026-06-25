import { ApiProperty } from '@nestjs/swagger';

export class LendingStatsHistory {
  @ApiProperty({
    description: 'Bin-start timestamp of each point, ISO 8601',
    example: [
      '2026-05-26T00:00:00Z',
      '2026-05-27T00:00:00Z',
      '2026-05-28T00:00:00Z',
    ],
    isArray: true,
    items: { type: 'string' },
  })
  timestamp!: string[];

  @ApiProperty({
    description: 'Total deposits (supplied) in USD at each timestamp',
    example: [1156010.01, 1133263.57, 1104721.64],
    isArray: true,
    items: { type: 'number' },
  })
  supplied!: number[];

  @ApiProperty({
    description: 'Active loans (borrowed) in USD at each timestamp',
    example: [265017.92, 261174.28, 252766.49],
    isArray: true,
    items: { type: 'number' },
  })
  borrowed!: number[];
}
