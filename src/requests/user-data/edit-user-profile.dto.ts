import { ApiProperty } from '@nestjs/swagger';

import { IsObject, IsOptional, IsString, Length } from 'class-validator';
import { SocialsDto } from '../../common/socials';

export class EditUserProfileDto {
  @ApiProperty({
    description: 'User description',
    maxLength: 300,
    example: 'I am a user',
    required: false,
  })
  @IsString()
  @Length(1, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://media.xoxno.com/example-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiProperty({ description: 'Social media profiles', required: false })
  @IsObject()
  @IsOptional()
  socials?: SocialsDto;
}
