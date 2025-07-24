import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Web2WalletDto } from './web2user-wallet.dto';

export class NativeWalletDto {
  @ApiProperty({
    description: 'Array of wallet shards',
    type: [String],
    minItems: 4,
    maxItems: 4,
    example: ['shard1', 'shard2', 'shard3', 'shard4'],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  readonly shards!: string[];

  @ApiProperty({
    description: 'Web2 wallet information',
    type: () => Web2WalletDto,
  })
  @ValidateNested()
  @Type(() => Web2WalletDto)
  @IsObject()
  readonly wallet!: Web2WalletDto;

  @ApiProperty({
    description: 'Wether the backed up wallet shall become active',
  })
  @IsBoolean()
  isActive!: boolean;
}
