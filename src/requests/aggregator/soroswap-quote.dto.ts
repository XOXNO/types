import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * One leg of a split route returned by the Soroswap aggregator.
 *
 * The shape mirrors the Soroban lending contract's `DexDistribution`
 * (see rs-lending-xlm common/src/types.rs) so the backend can forward
 * this vector verbatim into `SwapSteps.distribution`. `protocolId`
 * is the u32 enum discriminant:
 *   Soroswap = 0, Phoenix = 1, Aqua = 2, Comet = 3
 */
export class StellarSwapDistributionDto {
  @ApiProperty({
    description:
      'Protocol enum discriminant matching the Soroban `Protocol` enum: Soroswap=0, Phoenix=1, Aqua=2, Comet=3',
    example: 0,
  })
  @IsInt()
  @IsIn([0, 1, 2, 3])
  protocolId!: number;

  @ApiProperty({
    description:
      'Ordered list of Soroban contract addresses describing the swap path (length >= 2)',
    example: [
      'CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75',
      'CDTKPWPLOURQA2SGTKTUQOWRCBZEORB4BWBOMJ3D3ZTQQSGE5F6JBQLV',
    ],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  path!: string[];

  @ApiProperty({
    description: 'Split weight for this leg (> 0)',
    example: 10,
  })
  @IsInt()
  @Min(1)
  parts!: number;

  @ApiProperty({
    description:
      'Optional 32-byte hints forwarded to the aggregator, base64-encoded. `null` or omitted for Soroswap / Phoenix / Aqua.',
    required: false,
    nullable: true,
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bytes?: string[] | null;
}

/**
 * Pre-mapped `SwapSteps` ready to be handed to `buildStellarLendingTx`.
 * Backend shapes this from the Soroswap `/quote` response so the UI
 * never deals with the protocol-id string -> u32 enum mapping.
 */
export class StellarSwapStepsDto {
  @ApiProperty({
    description:
      'Minimum amount of output token the router must return, as an i128 decimal string in base units',
    example: '9067253',
  })
  @IsString()
  amountOutMin!: string;

  @ApiProperty({
    description: 'Split route across one or more AMMs',
    type: () => StellarSwapDistributionDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StellarSwapDistributionDto)
  distribution!: StellarSwapDistributionDto[];
}

/**
 * Query DTO for `GET /stellar/aggregator/quote`. Mirrors the subset of
 * Soroswap `/quote` parameters that are meaningful for lending actions.
 * `sdex` is intentionally excluded from `protocols` server-side because
 * SDEX cannot be routed through the Soroban aggregator CPI.
 */
export class SoroswapQuoteRequestDto {
  @ApiProperty({
    description: 'Input asset Soroban contract address',
    example: 'CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA',
  })
  @IsString()
  assetIn!: string;

  @ApiProperty({
    description: 'Output asset Soroban contract address',
    example: 'CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75',
  })
  @IsString()
  assetOut!: string;

  @ApiProperty({
    description: 'Amount as an i128 decimal string in base units',
    example: '10000000',
  })
  @IsString()
  amount!: string;

  @ApiProperty({
    description:
      'Trade type. Stellar lending actions only support EXACT_IN in v1; EXACT_OUT is reserved for future use.',
    enum: ['EXACT_IN', 'EXACT_OUT'],
    example: 'EXACT_IN',
  })
  @IsIn(['EXACT_IN', 'EXACT_OUT'])
  tradeType!: 'EXACT_IN' | 'EXACT_OUT';

  @ApiProperty({
    description: 'Soroswap network',
    enum: ['mainnet', 'testnet'],
    example: 'testnet',
  })
  @IsIn(['mainnet', 'testnet'])
  network!: 'mainnet' | 'testnet';

  @ApiProperty({
    description:
      'Slippage tolerance in basis points. Defaults to 50 (= 0.5%) server-side when omitted.',
    required: false,
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  slippageBps?: number;

  @ApiProperty({
    description:
      'Number of split routes for optimisation. Defaults to 10 server-side when omitted.',
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  parts?: number;

  @ApiProperty({
    description:
      'Maximum number of hops per route. Defaults to 2 server-side when omitted.',
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxHops?: number;
}

/**
 * Response DTO for `GET /stellar/aggregator/quote`. Carries the raw
 * quote metadata plus the pre-mapped `steps` value the UI can forward
 * verbatim into `buildStellarLendingTx({ action, args: { steps } })`.
 */
export class SoroswapQuoteResponseDto {
  @ApiProperty({ description: 'Input asset Soroban contract address' })
  @IsString()
  assetIn!: string;

  @ApiProperty({ description: 'Output asset Soroban contract address' })
  @IsString()
  assetOut!: string;

  @ApiProperty({
    description: 'Input amount as an i128 decimal string in base units',
  })
  @IsString()
  amountIn!: string;

  @ApiProperty({
    description: 'Expected output amount as an i128 decimal string',
  })
  @IsString()
  amountOut!: string;

  @ApiProperty({
    description:
      'Minimum output (EXACT_IN) or maximum input (EXACT_OUT) after slippage',
  })
  @IsString()
  amountOutMin!: string;

  @ApiProperty({
    enum: ['EXACT_IN', 'EXACT_OUT'],
  })
  @IsIn(['EXACT_IN', 'EXACT_OUT'])
  tradeType!: 'EXACT_IN' | 'EXACT_OUT';

  @ApiProperty({
    description: 'Estimated price impact as a percentage string',
    example: '0.50',
  })
  @IsString()
  priceImpactPct!: string;

  @ApiProperty({
    description:
      'Which Soroswap execution surface served the quote. Stellar lending actions only accept `router` or `aggregator`.',
    enum: ['router', 'aggregator', 'sdex'],
  })
  @IsIn(['router', 'aggregator', 'sdex'])
  platform!: 'router' | 'aggregator' | 'sdex';

  @ApiProperty({
    description:
      'Pre-mapped SwapSteps ready to forward into the Soroban lending contract',
    type: () => StellarSwapStepsDto,
  })
  @ValidateNested()
  @Type(() => StellarSwapStepsDto)
  steps!: StellarSwapStepsDto;
}
