import { ApiPropertyOptional } from '@nestjs/swagger';

import { SocialsDto } from '../../common/socials';
import { IsObject, IsOptional, IsString, Length } from 'class-validator';

export class EditUserCreatorProfileDto {
  @ApiPropertyOptional({
    description: 'User description',
    maxLength: 300,
    example: 'I am a creator',
  })
  @IsString()
  @Length(1, 300)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Social media profiles' })
  @IsObject()
  @IsOptional()
  socials?: SocialsDto;

  @ApiPropertyOptional({
    description: 'Creator name',
    maxLength: 30,
    example: 'Creator Name',
  })
  @IsString()
  @IsOptional()
  @Length(1, 300)
  name?: string;
}
