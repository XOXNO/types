import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { v4 } from 'uuid';

import { LinkedAccountType } from './linked-account-type.enum';
import { WalletClientType } from './wallet-client-type.enum';

export class Web2UserWallet {
  @ApiProperty({
    enum: LinkedAccountType,
    enumName: 'LinkedAccountType',
  })
  @IsEnum(LinkedAccountType)
  type!: LinkedAccountType.WALLET;

  @ApiProperty({ description: 'Wallet address' })
  @IsString()
  address!: string;

  @ApiPropertyOptional({ description: 'Wallet index' })
  @IsOptional()
  @IsNumber()
  index?: number;

  @ApiPropertyOptional({ description: 'Signature for the wallet' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiProperty({ description: 'Blockchain network' })
  @IsString()
  chain!: string;

  @ApiProperty({
    enum: WalletClientType,
    description: 'Type of wallet client',
    enumName: 'WalletClientType',
  })
  @IsEnum(WalletClientType)
  walletClientType!: WalletClientType;

  @ApiPropertyOptional({ description: 'Method used for wallet recovery' })
  @IsOptional()
  @IsString()
  recoveryMethod?: string;

  @ApiPropertyOptional({
    description: 'Unique identifier for the wallet',
  })
  @IsOptional()
  @IsString()
  id?: string;

  constructor(props: Partial<Web2UserWallet>) {
    Object.assign(this, props);
    this.id = v4();
  }
}
