import { ApiProperty, PartialType } from '@nestjs/swagger';

import { EventProfileCreateDto } from './event-profile-create.dto';
import { IsString, Matches, Length, IsOptional } from 'class-validator';

export class EventProfileEditDto extends PartialType(EventProfileCreateDto) {
  @ApiProperty({
    description: 'Unique slug for the event URL.',
    required: false,
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
  })
  @Length(3, 20)
  @IsOptional()
  slug?: string;
}
