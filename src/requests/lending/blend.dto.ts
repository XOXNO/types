import { ApiProperty } from '@nestjs/swagger';

/**
 * Blend V2 → XOXNO migration detection types.
 *
 * A live read of a user's Blend pool position (`get_positions` → shares,
 * converted to underlying via each reserve's 12-decimal `b_rate`/`d_rate`),
 * annotated with whether each leg can migrate into the XOXNO controller.
 *
 * A debt leg is migratable only when the XOXNO market can flash-borrow it
 * (zero-fee `create_strategy`): the asset is a borrowable market here AND the
 * pool has enough free liquidity within its borrow cap / max utilization.
 */

/** Why a position leg cannot migrate into XOXNO. */
export type BlendMigrateBlockReason =
  | 'not_a_market'
  | 'market_inactive'
  | 'not_collateralizable'
  | 'not_borrowable'
  | 'insufficient_liquidity'
  | 'borrow_cap'
  | 'max_utilization';

const BLEND_BLOCK_REASONS: BlendMigrateBlockReason[] = [
  'not_a_market',
  'market_inactive',
  'not_collateralizable',
  'not_borrowable',
  'insufficient_liquidity',
  'borrow_cap',
  'max_utilization',
];

/** One asset leg of a Blend position, in underlying token units. */
export class BlendLeg {
  @ApiProperty({ description: 'Underlying asset contract address (SAC/SEP-41)' })
  token!: string;
  @ApiProperty({ description: 'Asset symbol', example: 'XLM' })
  symbol!: string;
  @ApiProperty({ description: 'Asset decimals', example: 7 })
  decimals!: number;
  @ApiProperty({
    description: 'Underlying amount in base units (decimal string)',
    example: '5000000000',
  })
  amount!: string;
  @ApiProperty({ description: 'Underlying amount, human-readable', example: 500 })
  amountShort!: number;
  @ApiProperty({ description: 'USD value of the leg', example: 106.6 })
  usd!: number;
}

/** Per-leg migratability verdict. */
export class BlendLegMigratability {
  @ApiProperty({ description: 'Underlying asset contract address' })
  token!: string;
  @ApiProperty({ description: 'Position role on Blend', enum: ['collateral', 'supply', 'debt'] })
  role!: 'collateral' | 'supply' | 'debt';
  @ApiProperty({ description: 'Whether this leg can migrate into XOXNO' })
  migratable!: boolean;
  @ApiProperty({
    description: 'Why the leg is blocked (absent when migratable)',
    enum: BLEND_BLOCK_REASONS,
    required: false,
  })
  reason?: BlendMigrateBlockReason;
}

/** A user's full Blend position + XOXNO migratability annotations. */
export class BlendUserPosition {
  @ApiProperty({ description: 'User address (Stellar G…)' })
  address!: string;
  @ApiProperty({ description: 'Blend pool contract address' })
  blendPool!: string;
  @ApiProperty({ type: () => BlendLeg, isArray: true })
  collateral!: BlendLeg[];
  @ApiProperty({ type: () => BlendLeg, isArray: true })
  supply!: BlendLeg[];
  @ApiProperty({ type: () => BlendLeg, isArray: true })
  debt!: BlendLeg[];
  @ApiProperty({ type: () => BlendLegMigratability, isArray: true })
  legs!: BlendLegMigratability[];
  @ApiProperty({
    description:
      'True when ≥1 leg is migratable AND every debt leg is flash-borrowable by XOXNO',
  })
  migratable!: boolean;
  @ApiProperty({ description: 'True when the user holds no Blend position' })
  empty!: boolean;
}

/** One debt asset the migration repays via a zero-fee XOXNO flash borrow. */
export class BlendDebtCap {
  @ApiProperty({ description: 'Debt asset contract address' })
  token!: string;
  @ApiProperty({
    description: 'Repay cap in base units (decimal string); excess is refunded on-chain',
    example: '200500000',
  })
  cap!: string;
}

/** Chain-agnostic args for `migrate_from_blend`. */
export class MigrateFromBlendArgs {
  @ApiProperty({ description: 'Blend pool contract address' })
  blendPool!: string;
  @ApiProperty({
    description: 'Existing XOXNO account id, or "0" to create a new account',
    example: '0',
  })
  accountId!: string;
  @ApiProperty({ description: 'eMode category to enter (0 = none)', example: 0 })
  eModeCategory!: number;
  @ApiProperty({
    description: 'Collateral assets to withdraw from Blend and re-collateralize',
    type: () => String,
    isArray: true,
  })
  collateralTokens!: string[];
  @ApiProperty({
    description: 'Non-collateral supply assets to withdraw from Blend and re-supply',
    type: () => String,
    isArray: true,
  })
  supplyTokens!: string[];
  @ApiProperty({ type: () => BlendDebtCap, isArray: true })
  debtCaps!: BlendDebtCap[];
}
