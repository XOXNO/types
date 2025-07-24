import { ApiProperty } from '@nestjs/swagger';

import { IsNumberString, IsOptional, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Verification code sent to the user',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsNumberString()
  @Length(6, 6)
  @IsOptional()
  readonly verificationCode!: string;
}
