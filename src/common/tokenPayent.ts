import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class EgldOrEsdtTokenPayment {
  @ApiProperty({ example: 'EGLD' })
  @IsString()
  tokenIdentifier!: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  tokenNonce!: number;

  @ApiProperty({ example: '500000000000000000' })
  @IsString()
  amount!: string;

  @ApiProperty({ example: 0, required: false, description: 'Short amount' })
  @IsInt()
  amountShort?: number; // Applied after

  @ApiProperty({ example: 0, required: false, description: 'USD value' })
  @IsInt()
  usdValue?: number; // Applied after

  @ApiProperty({ example: 0, required: false, description: 'Decimals' })
  @IsInt()
  decimals?: number; // Applied after

  constructor(init?: Partial<EgldOrEsdtTokenPayment>) {
    Object.assign(this, init);
  }
}
