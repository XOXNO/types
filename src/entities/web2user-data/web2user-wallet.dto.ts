import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { LinkedAccountType } from './linked-account-type.enum';
import { WalletClientType } from './wallet-client-type.enum';

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

  @ApiPropertyOptional({ description: 'Signature for authentication' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({ description: 'Authentication token' })
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

  @ApiPropertyOptional({ description: 'Index of the wallet', type: Number })
  @IsOptional()
  @IsNumber()
  index?: number;

  @ApiPropertyOptional({ description: 'Method used for wallet recovery' })
  @IsOptional()
  @IsString()
  recoveryMethod?: string;
}
