import { ApiProperty } from '@nestjs/swagger';

/**
 * Chain-agnostic argument DTOs for the lending protocol.
 *
 * These shapes mirror the Stellar controller entry points
 * (see /rs-lending/stellar/controller/src/lib.rs) but are deliberately
 * decoupled from any chain-specific types:
 *
 *   - `token` is a string (MVX uses ESDT ticker, Stellar uses contract
 *     address, SUI uses coin type) — callers pass whatever their chain
 *     uses, the SDK builder interprets it.
 *   - `amount` is a string to preserve precision across u64 / u128 /
 *     i128 backends.
 *   - `steps`, `data` are `unknown` — the concrete swap-path / callback
 *     struct is chain-specific and encoded by the SDK transaction
 *     builder.
 *
 * MVX flows can reuse these via a thin adapter; Stellar flows consume
 * them directly in the `@xoxno/sdk-js` Soroban transaction builders.
 */

export class SupplyArgs {
  @ApiProperty({
    description:
      'Collateral token identifier (ESDT ticker on MVX, contract address on Stellar)',
    example: 'USDC-c76f1f',
  })
  token!: string;

  @ApiProperty({
    description: 'Amount to supply, as a decimal string in base units',
    example: '1000000',
  })
  amount!: string;

  @ApiProperty({
    description: 'Optional eMode category to enter on first supply',
    required: false,
    example: 1,
  })
  eModeCategory?: number;

  @ApiProperty({
    description:
      'Optional existing account nonce / account id — when omitted, a new account is created',
    required: false,
    example: 42,
  })
  accountNonce?: number;
}

export class BorrowArgs {
  @ApiProperty({
    description: 'Debt token identifier',
    example: 'USDC-c76f1f',
  })
  token!: string;

  @ApiProperty({
    description: 'Amount to borrow, as a decimal string in base units',
    example: '500000',
  })
  amount!: string;

  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;
}

export class RepayArgs {
  @ApiProperty({
    description: 'Debt token identifier being repaid',
    example: 'USDC-c76f1f',
  })
  token!: string;

  @ApiProperty({
    description: 'Amount to repay, as a decimal string in base units',
    example: '500000',
  })
  amount!: string;

  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;
}

export class WithdrawArgs {
  @ApiProperty({
    description: 'Collateral token identifier being withdrawn',
    example: 'USDC-c76f1f',
  })
  token!: string;

  @ApiProperty({
    description:
      'Amount to withdraw, as a decimal string in base units (0 = full position)',
    example: '1000000',
  })
  amount!: string;

  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;
}

export class LiquidateDebtPayment {
  @ApiProperty({
    description: 'Debt token identifier being repaid as part of liquidation',
    example: 'USDC-c76f1f',
  })
  token!: string;

  @ApiProperty({
    description: 'Amount of debt token provided by the liquidator',
    example: '500000',
  })
  amount!: string;
}

export class LiquidateArgs {
  @ApiProperty({
    description: 'Target account nonce / account id being liquidated',
    example: 42,
  })
  accountNonce!: number;

  @ApiProperty({
    description: 'Debt payments supplied by the liquidator',
    type: () => LiquidateDebtPayment,
    isArray: true,
  })
  debtPayments!: Array<{ token: string; amount: string }>;
}

export class MultiplyArgs {
  @ApiProperty({ description: 'eMode category to enter', example: 1 })
  eModeCategory!: number;

  @ApiProperty({
    description: 'Collateral token identifier',
    example: 'USDC-c76f1f',
  })
  collateralToken!: string;

  @ApiProperty({
    description:
      'Debt amount borrowed via flash loan to fund the leverage entry',
    example: '2000000',
  })
  debtToFlashLoan!: string;

  @ApiProperty({
    description: 'Debt token identifier (the flash-loaned asset)',
    example: 'USDC-c76f1f',
  })
  debtToken!: string;

  @ApiProperty({
    description: 'Strategy mode flag (long / short / native)',
    example: 0,
  })
  mode!: number;

  @ApiProperty({
    description:
      'Chain-specific swap path encoded by the SDK transaction builder',
  })
  steps!: unknown;

  @ApiProperty({
    description:
      'Optional existing account nonce — when omitted, a new account is created',
    required: false,
    example: 42,
  })
  accountNonce?: number;
}

export class SwapDebtArgs {
  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;

  @ApiProperty({
    description: 'Token identifier of the existing debt being swapped out',
    example: 'USDC-c76f1f',
  })
  existingDebtToken!: string;

  @ApiProperty({
    description: 'Amount of the new debt to take on',
    example: '500000',
  })
  newDebtAmount!: string;

  @ApiProperty({
    description: 'Token identifier of the new debt being taken on',
    example: 'USDT-abcdef',
  })
  newDebtToken!: string;

  @ApiProperty({
    description:
      'Chain-specific swap path encoded by the SDK transaction builder',
  })
  steps!: unknown;
}

export class SwapCollateralArgs {
  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;

  @ApiProperty({
    description: 'Current collateral token identifier being swapped out',
    example: 'USDC-c76f1f',
  })
  currentCollateral!: string;

  @ApiProperty({
    description: 'Amount of the current collateral to swap',
    example: '1000000',
  })
  fromAmount!: string;

  @ApiProperty({
    description: 'New collateral token identifier being received',
    example: 'USDT-abcdef',
  })
  newCollateral!: string;

  @ApiProperty({
    description:
      'Chain-specific swap path encoded by the SDK transaction builder',
  })
  steps!: unknown;
}

export class RepayDebtWithCollateralArgs {
  @ApiProperty({ description: 'Account nonce / account id', example: 42 })
  accountNonce!: number;

  @ApiProperty({
    description: 'Collateral token being unwound to repay debt',
    example: 'USDC-c76f1f',
  })
  collateralToken!: string;

  @ApiProperty({
    description: 'Amount of collateral to unwind',
    example: '1000000',
  })
  collateralAmount!: string;

  @ApiProperty({
    description: 'Debt token being repaid',
    example: 'USDT-abcdef',
  })
  debtToken!: string;

  @ApiProperty({
    description:
      'Chain-specific swap path encoded by the SDK transaction builder',
  })
  steps!: unknown;

  @ApiProperty({
    description: 'When true the position is closed after the repay',
    example: false,
  })
  closePosition!: boolean;
}

export class FlashLoanArgs {
  @ApiProperty({
    description: 'Token identifier to borrow via flash loan',
    example: 'USDC-c76f1f',
  })
  asset!: string;

  @ApiProperty({
    description: 'Amount to borrow, as a decimal string in base units',
    example: '2000000',
  })
  amount!: string;

  @ApiProperty({
    description: 'Receiver contract / address that handles the callback',
    example: 'erd1qqqqqq...',
  })
  receiver!: string;

  @ApiProperty({
    description:
      'Opaque callback payload forwarded to the receiver — shape is chain-specific',
  })
  data!: unknown;
}
