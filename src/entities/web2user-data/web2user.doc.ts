import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

import { Web2UserAccount } from './web2user-account';
import { Web2UserWallet } from './web2user-wallet';

export class Web2UserDoc {
  @ApiProperty({ description: 'Timestamp of user creation' })
  @IsNumber()
  createdOn!: number;

  @ApiProperty({ description: 'Unique identifier for the user' })
  @IsString()
  id!: string;

  @ApiProperty({
    type: [Object],
    description: 'Array of linked accounts (Web2UserWallet or Web2UserAccount)',
  })
  @IsArray()
  @Type(() => Object)
  linkedAccounts!: LinkedAccount[];

  @ApiProperty({ type: [String], description: 'Array of shard identifiers' })
  @IsArray()
  @IsString({ each: true })
  shards!: string[];

  @ApiProperty({
    description: 'Indicates if the user has a native wallet',
  })
  @IsBoolean()
  hasNativeWallet = false;

  @ApiPropertyOptional({
    type: () => Web2UserWallet,
    description: "User's wallet information",
  })
  @IsOptional()
  @Type(() => Web2UserWallet)
  wallet?: Web2UserWallet;

  @ApiProperty({ description: 'Salt for the user, used for SUI ZK Login' })
  @IsString()
  salt!: string;

  @ApiPropertyOptional({
    type: () => Web2UserAccount,
    description: "User's Google account information",
  })
  @IsOptional()
  @Type(() => Web2UserAccount)
  google?: Web2UserAccount;

  @ApiPropertyOptional({
    type: () => Web2UserAccount,
    description: "User's Apple account information",
  })
  @IsOptional()
  @Type(() => Web2UserAccount)
  apple?: Web2UserAccount;

  @ApiProperty({ description: 'Primary key for the user document' })
  @IsString()
  pk!: string;

  @ApiPropertyOptional({ description: 'Timestamp of the last update' })
  @IsOptional()
  @IsNumber()
  _ts?: number;

  constructor(props?: Partial<Web2UserDoc>) {
    Object.assign(this, props);
    this.pk = props?.id ?? '';
  }
}

export type LinkedAccount = Web2UserWallet | Web2UserAccount;
