import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString } from 'class-validator';
import { TransactionStatus } from './transaction.status';

export class TransactionProcessStatus {
  constructor(init?: Partial<TransactionProcessStatus>) {
    Object.assign(this, init);
  }
  @ApiProperty({ description: 'The error reason' })
  @IsString()
  reason = '';

  @ApiProperty({
    description: 'The status of the transaction',
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
  })
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;
}
