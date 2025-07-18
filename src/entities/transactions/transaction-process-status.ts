import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString } from 'class-validator';
import { TransactionStatus } from '../../enums/transaction-status.enum';

export class TransactionProcessStatus {
  constructor(props?: Partial<TransactionProcessStatus>) {
    Object.assign(this, props);
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
