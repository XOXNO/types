import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class SetEmailDto {
  @ApiProperty({
    description: 'Indicates if the email feature is enabled',
    example: true,
  })
  @IsBoolean()
  readonly enabled!: boolean;

  @ApiPropertyOptional({
    description: 'The email address to be set',
    example: 'example@example.com',
  })
  @IsOptional()
  @IsEmail()
  readonly emailAddress!: string;
}
