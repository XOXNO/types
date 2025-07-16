import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNumber, IsOptional } from 'class-validator';

export interface ProviderLiquidStaking {
  APR: number; // Provider's APR in percentage
  totalStaked: number; // Amount of EGLD staked with the provider
}

export class ProviderDto {
  @ApiProperty({ description: 'The address of the provider' })
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'The profile avatar of the provider',
    required: false,
  })
  @IsOptional()
  @IsString()
  profile?: string;

  @ApiProperty({ description: 'The name of the provider', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The delegation cap of the provider',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  delegationCap?: number;

  @ApiProperty({
    description: 'The number of nodes the provider has',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  nodes?: number;

  @ApiProperty({
    description: 'The annual percentage rate (APR) of the provider',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  apr?: number;

  @ApiProperty({ description: 'The identity of the provider', required: false })
  @IsOptional()
  @IsString()
  identity?: string;

  @ApiProperty({ description: 'The total staked amount by the provider' })
  @IsNumber()
  totalStaked!: number;

  @ApiProperty({ description: 'The protocol staked amount' })
  @IsNumber()
  protocolStakedAmount!: number;
}
