/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../../enums/transaction-type.enum';

export class Transaction {
  @ApiProperty({
    description: 'The unique hash identifier of the transaction',
    example:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: String,
  })
  txHash = '';
  @ApiPropertyOptional({
    description:
      'The maximum amount of gas units allocated for the transaction',
    example: 50000,
    type: 'integer',
  })
  gasLimit: number | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The price per gas unit for the transaction',
    example: 1000000000,
    type: 'integer',
  })
  gasPrice: number | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The actual amount of gas units consumed by the transaction',
    example: 25000,
    type: 'integer',
  })
  gasUsed: number | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The hash of the miniblock containing this transaction',
    example:
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: String,
  })
  miniBlockHash: string | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The sequence number of the transaction for the sender',
    example: 42,
    type: 'integer',
  })
  nonce: number | undefined = undefined;
  @ApiProperty({
    description: 'The address of the transaction receiver',
    example: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    type: String,
  })
  receiver = '';
  @ApiProperty({
    description: 'The shard ID of the receiver address',
    example: 1,
    type: 'integer',
  })
  receiverShard = 0;
  @ApiPropertyOptional({
    description: 'The blockchain round when the transaction was processed',
    example: 1234567,
    type: 'integer',
  })
  round: number | undefined = undefined;
  @ApiProperty({
    description: 'The address of the transaction sender',
    example: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    type: String,
  })
  sender = '';
  @ApiProperty({
    description: 'The shard ID of the sender address',
    example: 0,
    type: 'integer',
  })
  senderShard = 0;
  @ApiPropertyOptional({
    description: 'The cryptographic signature of the transaction',
    example:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: String,
  })
  signature: string | undefined = undefined;
  @ApiProperty({
    description:
      'The current status of the transaction (e.g., success, pending, invalid)',
    example: 'success',
    type: String,
  })
  status = '';
  @ApiProperty({
    description: 'The amount of EGLD tokens transferred in the transaction',
    example: '1000000000000000000',
    type: String,
  })
  value = '';
  @ApiPropertyOptional({
    description: 'The transaction fee paid by the sender',
    example: '50000000000000',
    type: String,
  })
  fee: string | undefined = undefined;
  @ApiProperty({
    description: 'The Unix timestamp when the transaction was processed',
    example: 1672531200,
    type: 'integer',
  })
  timestamp = 0;
  @ApiPropertyOptional({
    description: 'The data field of the transaction, encoded in base64',
    example: 'RVNEVFRyYW5zZmVyQDQ0NDU1ODJkMzQzODM0MzYzNjJkMzAzMUAwMWY0',
    type: String,
  })
  data: string | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The smart contract function name called in the transaction',
    example: 'ESDTTransfer',
    type: String,
  })
  function: string | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The decoded action of the transaction',
    example: { category: 'scCall', name: 'transfer' },
  })
  action: any | undefined = undefined;
  @ApiPropertyOptional({
    description:
      'Information about potential scam indicators for this transaction',
    example: { type: 'none', info: 'N/A' },
  })
  scamInfo: any | undefined = undefined;
  @ApiPropertyOptional({
    description: 'The type of the transaction',
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  type: TransactionType | undefined = undefined;
  @ApiPropertyOptional({
    description:
      'The hash of the original transaction (for smart contract results)',
    example:
      '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    type: String,
  })
  originalTxHash: string | undefined = undefined;
  @ApiPropertyOptional({
    description:
      'Indicates if the transaction has pending smart contract results',
    example: false,
    type: Boolean,
  })
  pendingResults: boolean | undefined = undefined;

  getDate(): Date | undefined {
    if (this.timestamp) {
      return new Date(this.timestamp * 1000);
    }

    return undefined;
  }
}
