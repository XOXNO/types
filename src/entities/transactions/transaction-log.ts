import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionLogEvent } from './transaction-log-event';

export class TransactionLog {
  @ApiPropertyOptional({
    description: 'The unique identifier of the transaction log',
    example: 'log-123456',
    type: String,
  })
  id?: string;

  @ApiProperty({
    description: 'The smart contract address that generated the log',
    example: 'erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl',
    type: String,
  })
  address = '';

  @ApiProperty({
    description: 'The array of events emitted in this log',
    type: [TransactionLogEvent],
    isArray: true,
  })
  events: TransactionLogEvent[] = [];

  @ApiProperty({
    description: 'The Unix timestamp when the log was created',
    example: 1672531200,
    type: Number,
  })
  timestamp = 0;

  @ApiProperty({
    description: 'The transaction hash associated with this log',
    example:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: String,
  })
  txHash = '';
}
