import { ApiProperty } from '@nestjs/swagger';

export class TransactionLogEvent {
  @ApiProperty({
    description: 'The address of the smart contract that emitted the event',
    example: 'erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl',
    type: String,
  })
  address = '';

  @ApiProperty({
    description: 'The event identifier or signature',
    example: 'transfer',
    type: String,
  })
  identifier = '';

  @ApiProperty({
    description: 'The indexed topics of the event used for filtering',
    example: ['0x1234567890abcdef', '0xabcdef1234567890'],
    type: [String],
    isArray: true,
  })
  topics: string[] = [];

  @ApiProperty({
    description: 'The main data payload of the event',
    example: '0x00000000000000000000000000000001',
    type: String,
  })
  data = '';

  @ApiProperty({
    description: 'Additional data associated with the event',
    example: ['extra1', 'extra2'],
    type: [String],
    isArray: true,
  })
  additionalData: string[] = [];
}
