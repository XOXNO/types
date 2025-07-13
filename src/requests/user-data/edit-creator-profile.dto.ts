import { ApiProperty } from '@nestjs/swagger';

import { SocialsDto } from '../../common/socials';
import { IsObject, IsOptional, IsString, Length } from 'class-validator';

export class EditUserCreatorProfileDto {
  @ApiProperty({
    description: 'User description',
    maxLength: 300,
    example: 'I am a creator',
    required: false,
  })
  @IsString()
  @Length(1, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Social media profiles',
    required: false,
  })
  @IsObject({ each: true })
  @IsOptional()
  socials?: SocialsDto;

  @ApiProperty({
    description: 'Creator name',
    maxLength: 30,
    example: 'Creator Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(1, 300)
  name?: string;
}
