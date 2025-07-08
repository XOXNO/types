import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

import { LinkedAccountType } from './linked-account-type.enum';

export class Web2UserAccountDto {
  @ApiProperty({
    enum: LinkedAccountType,
    enumName: 'LinkedAccountType',
    description: 'Type of the linked account',
  })
  @IsEnum(LinkedAccountType)
  type!: LinkedAccountType;

  @ApiProperty({ description: 'Unique identifier for the account' })
  @IsString()
  subject!: string;

  @ApiPropertyOptional({ description: "URL of the user's profile picture" })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ description: "User's email address" })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: "User's username" })
  @IsOptional()
  @IsString()
  username?: string;
}
