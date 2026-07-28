import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../enums/common.enum';

export class LendingIndexesDto {
  @ApiProperty({
    description: 'Supply index as a string to preserve precision',
    example: '1050000000000000000',
    type: String,
  })
  supplyIndex!: string;
  @ApiProperty({
    description: 'Supply index as a number (may lose precision)',
    example: 1.05,
    type: Number,
  })
  supplyIndexShort!: number;
  @ApiProperty({
    description: 'Borrow index as a string to preserve precision',
    example: '1025000000000000000',
    type: String,
  })
  borrowIndex!: string;
  @ApiProperty({
    description: 'Borrow index as a number (may lose precision)',
    example: 1.025,
    type: Number,
  })
  borrowIndexShort!: number;
  @ApiProperty({
    description: 'EGLD price in USD as a string to preserve precision',
    example: '65.50',
    type: String,
  })
  egldPrice!: string;
  @ApiProperty({
    description: 'EGLD price in USD as a number',
    example: 65.5,
    type: Number,
  })
  egldPriceShort!: number;
  @ApiProperty({
    description: 'Final composed USD price as a string to preserve precision',
    example: '1.0',
    type: String,
  })
  usdPrice!: string;
  @ApiProperty({
    description: 'Final composed USD price as a number',
    example: 1.0,
    type: Number,
  })
  usdPriceShort!: number;
  @ApiProperty({
    description:
      'Primary (first) oracle leg in EGLD as a string. Equals the final/anchor under single-source configs. (MVX dual-source leg; Stellar leaves this unused or equal to primary USD denoms.)',
    example: '1000000000000000000',
    type: String,
  })
  primaryPriceEgld!: string;
  @ApiProperty({
    description: 'Primary oracle leg in EGLD as a number (may lose precision)',
    example: 1,
    type: Number,
  })
  primaryPriceEgldShort!: number;
  @ApiProperty({
    description:
      'Primary (first) independent oracle leg in USD as a string to preserve precision',
    example: '16124645832563882000',
    type: String,
  })
  primaryPriceUsd!: string;
  @ApiProperty({
    description: 'Primary oracle leg in USD as a number (may lose precision)',
    example: 16.124645832563882,
    type: Number,
  })
  primaryPriceUsdShort!: number;
  @ApiProperty({
    description:
      'Anchor (second) oracle leg in EGLD as a string. Equals primary under single-source configs.',
    example: '1000000000000000000',
    type: String,
  })
  anchorPriceEgld!: string;
  @ApiProperty({
    description: 'Anchor oracle leg in EGLD as a number (may lose precision)',
    example: 1,
    type: Number,
  })
  anchorPriceEgldShort!: number;
  @ApiProperty({
    description:
      'Anchor (second) independent oracle leg in USD as a string to preserve precision',
    example: '16124645832563882000',
    type: String,
  })
  anchorPriceUsd!: string;
  @ApiProperty({
    description: 'Anchor oracle leg in USD as a number (may lose precision)',
    example: 16.124645832563882,
    type: Number,
  })
  anchorPriceUsdShort!: number;

  @ApiProperty({
    description:
      'Whether the oracle price is within the first (tightest) deviation tolerance band. MVX-only; absent for chains whose oracle does not expose tolerance bands (e.g. Stellar). The UI borrow/withdraw flow reads this flag.',
    required: false,
    type: Boolean,
    example: true,
  })
  withinFirstTolerance?: boolean;
  @ApiProperty({
    description:
      'Whether the oracle price is within the second (wider) deviation tolerance band. MVX-only; absent for chains whose oracle does not expose tolerance bands (e.g. Stellar). The UI borrow/withdraw flow reads this flag.',
    required: false,
    type: Boolean,
    example: true,
  })
  withinSecondTolerance?: boolean;

  @ApiProperty({
    description:
      'Blockchain network the indexes belong to (optional, defaults downstream to MVX when absent)',
    required: false,
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain?: ActivityChain;
}
