import { ApiProperty } from '@nestjs/swagger';

export class UserDeposit {
  @ApiProperty({
    description: 'The balance amount as a string',
    example: '1000000000000000000',
  })
  balance!: string;

  @ApiProperty({
    description: 'The balance amount as a number for display purposes',
    example: 1.5,
  })
  balanceShort!: number;

  @ApiProperty({
    description: 'The payment token identifier',
    example: 'EGLD-123456',
  })
  paymentToken!: string;

  @ApiProperty({
    description: 'The payment token nonce',
    example: 0,
  })
  paymentTokenNonce!: number;

  @ApiProperty({
    description: 'The USD price of the token',
    example: 25.5,
  })
  usdPrice!: number;

  constructor(props: Partial<UserDeposit>) {
    Object.assign(this, props);
  }
}

export type UserDepositType = UserDeposit;
