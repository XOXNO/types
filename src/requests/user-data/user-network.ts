// User Network Info DTO
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

class ActiveGuardianDto {
  @ApiProperty({ example: 1099 })
  activationEpoch!: number;

  @ApiProperty({
    example: 'erd1vhe5a5wyf62ylu4cvwjm0rg3ukwp8tusj0t2vxme5c3aav9jd9ws2c43dq',
  })
  address!: string;

  @ApiProperty({ example: 'INVISIBLE_GUARDIAN' })
  serviceUID!: string;
}

export class UserNetworkInfoDto {
  @ApiProperty({
    example: 'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57',
  })
  address!: string;

  @ApiProperty({ example: 3339 })
  nonce!: number;

  @ApiProperty({ example: 0.5 })
  balanceShort!: number;

  @ApiProperty({ example: '@mihaieremia' })
  username!: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isUpgradeable?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isReadable?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isGuarded?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isPayable?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isPayableBySmartContract?: boolean;

  @ApiProperty({ example: '499779492251062403' })
  balance!: string;

  @ApiProperty({ example: 2 })
  shard!: number;

  @ApiProperty({ example: true })
  guarded!: boolean;

  @ApiProperty({ type: ActiveGuardianDto, required: false })
  @IsOptional()
  activeGuardian?: ActiveGuardianDto;

  @ApiProperty({ example: 18.254 })
  usdValue!: number;
}
