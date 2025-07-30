/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionOperationType } from '../../enums/transaction-operation-type.enum';
import { TransactionOperationAction } from '../../enums/transaction.operation.action';

export class TransactionOperation {
  @ApiPropertyOptional({
    description: 'The unique identifier of the operation',
    example: '0x1234567890abcdef',
    type: String,
  })
  id?: string = '';

  @ApiProperty({
    description: 'The action performed in this operation',
    enum: TransactionOperationAction,
    enumName: 'TransactionOperationAction',
    example: TransactionOperationAction.transfer,
  })
  action: TransactionOperationAction = TransactionOperationAction.none;
  @ApiProperty({
    description: 'The type of the operation',
    enum: TransactionOperationType,
    enumName: 'TransactionOperationType',
    example: TransactionOperationType.nft,
  })
  type: TransactionOperationType = TransactionOperationType.none;
  @ApiPropertyOptional({
    description: 'The ESDT token type information',
    example: 'NonFungibleESDT',
  })
  esdtType?: any;
  @ApiProperty({
    description: 'The token identifier (collection-random-nonce for NFTs)',
    example: 'XOXNO-5e0b1f-01',
    type: String,
  })
  identifier = '';
  @ApiPropertyOptional({
    description: 'The collection identifier for NFT operations',
    example: 'XOXNO-5e0b1f',
    type: String,
  })
  collection?: string;
  @ApiPropertyOptional({
    description: 'The name of the token or NFT',
    example: 'My NFT #1',
    type: String,
  })
  name?: string;
  @ApiPropertyOptional({
    description: 'The value transferred in the operation',
    example: '1000000000000000000',
    type: String,
  })
  value?: string;
  @ApiProperty({
    description: 'The sender address of the operation',
    example: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    type: String,
  })
  sender = '';
  @ApiProperty({
    description: 'The receiver address of the operation',
    example: 'erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx',
    type: String,
  })
  receiver = '';
  @ApiPropertyOptional({
    description: 'The number of decimals for the token',
    example: 18,
    type: Number,
  })
  decimals?: number;
  @ApiPropertyOptional({
    description: 'Additional data for the operation',
    example: 'QDZmNmI=',
    type: String,
  })
  data?: string = '';
  @ApiPropertyOptional({
    description: 'Human-readable message describing the operation',
    example: 'NFT transfer from Alice to Bob',
    type: String,
  })
  message?: string = '';
}
