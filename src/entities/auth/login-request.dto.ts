import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'The address of the user', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'The login token' })
  @IsString()
  @IsNotEmpty()
  loginToken!: string;

  @ApiProperty({
    description: 'The signature of the login token',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  signature?: string;

  @ApiProperty({
    description: 'Additional data as key-value pairs',
    type: Object,
    required: false,
  })
  @IsObject()
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any };
}
