import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

import { LinkedAccountType } from '../../enums/linked-account-type.enum';

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

  @ApiProperty({
    description: "URL of the user's profile picture",
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ description: "User's email address", required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: "User's username", required: false })
  @IsOptional()
  @IsString()
  username?: string;
}
