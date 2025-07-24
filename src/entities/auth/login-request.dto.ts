import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { LoginRequestService } from '../../enums/login-request-service.enum';

export class LoginRequestDto {
  @ApiProperty({ description: 'The address of the user', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'The login token' })
  @IsString()
  loginToken!: string;

  @ApiProperty({
    description: 'The signature of the login token',
    required: false,
  })
  @IsString()
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

  @IsEnum(LoginRequestService)
  @IsOptional()
  service?: LoginRequestService = LoginRequestService.XOXNO;
}
