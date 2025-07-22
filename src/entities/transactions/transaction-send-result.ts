import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionStatus } from '../../enums/transaction-status.enum';

export class TransactionSendResult {
  constructor(props?: Partial<TransactionSendResult>) {
    Object.assign(this, props);
  }

  @ApiProperty({ description: 'The receiver address', type: String })
  @IsString()
  receiver = '';

  @ApiProperty({ description: 'The shard of the receiver', type: Number })
  @IsNumber()
  receiverShard = 0;

  @ApiProperty({ description: 'The sender address', type: String })
  @IsString()
  sender = '';

  @ApiProperty({ description: 'The shard of the sender', type: Number })
  @IsNumber()
  senderShard = 0;

  @ApiProperty({
    description: 'The status of the transaction',
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
  })
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;

  @ApiProperty({ description: 'The transaction hash', type: String })
  @IsString()
  txHash!: string;
}

export class BatchTransactionResponse extends PickType(TransactionSendResult, [
  'txHash',
  'status',
] as const) {}
