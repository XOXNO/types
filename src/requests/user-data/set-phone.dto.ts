import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsPhoneNumber } from 'class-validator';

export class SetPhoneDto {
  @ApiProperty({
    description: 'Indicates if the phone feature is enabled',
    example: true,
  })
  @IsBoolean()
  readonly enabled!: boolean;

  @ApiPropertyOptional({
    description: 'The phone number to be set',
    example: '+1234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  readonly phoneNumber!: string;
}
