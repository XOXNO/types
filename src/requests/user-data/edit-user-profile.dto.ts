import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsObject, IsOptional, IsString, Length } from 'class-validator';
import { SocialsDto } from '../../common/socials';

export class EditUserProfileDto {
  @ApiPropertyOptional({
    description: 'User description',
    maxLength: 300,
    example: 'I am a user',
  })
  @IsString()
  @Length(1, 300)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Profile picture URL',
    example: 'https://media.xoxno.com/example-01',
  })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiPropertyOptional({ description: 'Social media profiles' })
  @IsObject()
  @IsOptional()
  socials?: SocialsDto;
}
