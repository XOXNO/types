import { ApiProperty } from '@nestjs/swagger';

export class TransactionReceipt {
  constructor(init?: Partial<TransactionReceipt>) {
    Object.assign(this, init);
  }
  @ApiProperty({
    description: 'The value transferred in the receipt',
    example: '1000000000000000000',
    type: String,
  })
  value = '';
  @ApiProperty({
    description: 'The sender address of the receipt',
    example: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    type: String,
  })
  sender = '';
  @ApiProperty({
    description: 'The data field of the receipt',
    example: 'QDZmNmI=',
    type: String,
  })
  data = '';
}
