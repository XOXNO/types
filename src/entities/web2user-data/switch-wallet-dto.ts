import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class SwitchWalletDto {
  @ApiProperty({ description: 'New active address' })
  @IsString()
  address!: string;
}
