import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsPhoneNumber } from 'class-validator';

export class SetPhoneDto {
  @ApiProperty({
    description: 'Indicates if the phone feature is enabled',
    example: true,
  })
  @IsBoolean()
  readonly enabled!: boolean;

  @ApiProperty({
    description: 'The phone number to be set',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  readonly phoneNumber!: string;
}
