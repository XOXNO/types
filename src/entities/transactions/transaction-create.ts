import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionCreate {
  constructor(props?: Partial<TransactionCreate>) {
    Object.assign(this, props);
  }

  @ApiProperty({ description: 'The chain ID', type: String })
  @IsString()
  chainID!: string;

  @ApiProperty({
    description: 'The transaction data',
    required: false,
  })
  @IsString()
  @IsOptional()
  data = '';

  @ApiProperty({
    description: 'The gas limit for the transaction',
    type: Number,
  })
  @IsNumber()
  gasLimit = 0;

  @ApiProperty({
    description: 'The gas price for the transaction',
    type: Number,
  })
  @IsNumber()
  gasPrice!: number;

  @ApiProperty({ description: 'The nonce for the transaction', type: Number })
  @IsNumber()
  nonce!: number;

  @ApiProperty({ description: 'The receiver address', type: String })
  @IsString()
  receiver!: string;

  @ApiPropertyOptional({ description: 'The receiver username', type: String })
  @IsOptional()
  @IsString()
  receiverUsername?: string = undefined;

  @ApiProperty({ description: 'The sender address', type: String })
  @IsString()
  sender!: string;

  @ApiPropertyOptional({ description: 'The sender username', type: String })
  @IsOptional()
  @IsString()
  senderUsername?: string = undefined;

  @ApiProperty({
    description: 'The signature of the transaction',
    type: String,
    required: true,
  })
  @IsString()
  signature!: string;

  @ApiProperty({ description: 'The value of the transaction', type: String })
  @IsString()
  @IsOptional()
  value!: string;

  @ApiProperty({ description: 'The version of the transaction', type: Number })
  @IsNumber()
  version = 0;

  @ApiPropertyOptional({
    description: 'Optional transaction options',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  options?: number = undefined;

  @ApiPropertyOptional({
    description: 'Optional guardian address',
    type: String,
  })
  @IsOptional()
  @IsString()
  guardian?: string = undefined;

  @ApiPropertyOptional({
    description: 'Optional guardian signature',
    type: String,
  })
  @IsOptional()
  @IsString()
  guardianSignature?: string = undefined;

  @ApiPropertyOptional({
    description: 'Optional relayer address',
    type: String,
  })
  @IsOptional()
  @IsString()
  relayer?: string = undefined;

  @ApiPropertyOptional({
    description: 'Optional relayer signature',
    type: String,
  })
  @IsOptional()
  @IsString()
  relayerSignature?: string = undefined;
}
