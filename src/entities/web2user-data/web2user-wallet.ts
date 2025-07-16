import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { v4 } from 'uuid';

import { LinkedAccountType } from '../../enums/linked-account-type.enum';
import { WalletClientType } from '../../enums/wallet-client-type.enum';

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

  @ApiProperty({ description: 'Wallet index', required: false })
  @IsOptional()
  @IsNumber()
  index?: number;

  @ApiProperty({ description: 'Signature for the wallet', required: false })
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

  @ApiProperty({
    description: 'Method used for wallet recovery',
    required: false,
  })
  @IsOptional()
  @IsString()
  recoveryMethod?: string;

  @ApiProperty({
    description: 'Unique identifier for the wallet',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;

  constructor(props: Partial<Web2UserWallet>) {
    Object.assign(this, props);
    this.id = v4();
  }
}
