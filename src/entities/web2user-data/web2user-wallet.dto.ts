import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { LinkedAccountType } from '../../enums/linked-account-type.enum';
import { WalletClientType } from '../../enums/wallet-client-type.enum';

export class Web2WalletDto {
  @ApiProperty({
    enum: LinkedAccountType,
    enumName: 'LinkedAccountType',
    description: 'Type of linked account',
  })
  @IsEnum(LinkedAccountType)
  type!: LinkedAccountType;

  @ApiProperty({ description: 'Wallet address' })
  @IsString()
  address!: string;

  @ApiProperty({ description: 'Blockchain network' })
  @IsString()
  chain!: string;

  @ApiProperty({ description: 'Signature for authentication', required: false })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiProperty({ description: 'Authentication token', required: false })
  @IsOptional()
  @IsString()
  authToken?: string;

  @ApiProperty({
    enum: WalletClientType,
    description: 'Type of wallet client',
    enumName: 'WalletClientType',
  })
  @IsEnum(WalletClientType)
  walletClientType!: WalletClientType;

  @ApiProperty({
    description: 'Index of the wallet',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  index?: number;

  @ApiProperty({
    description: 'Method used for wallet recovery',
    required: false,
  })
  @IsOptional()
  @IsString()
  recoveryMethod?: string;
}
