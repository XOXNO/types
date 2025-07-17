import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsString,
  Matches,
  Length,
  IsOptional,
  IsObject,
  ValidateNested,
  IsBoolean,
  IsInt,
  IsEnum,
} from 'class-validator';

import {
  EventCategory,
  EventSubCategory,
} from '../../../enums/event-category.enum';
import {
  EventLocationDto,
  EventSeoDto,
  RegistrationDetailsDto,
} from './event-profile-create.dto';

export class EventProfileEditDto {
  @ApiProperty({ example: 'Event Title', type: String, required: false })
  @IsString()
  @Length(3, 30)
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
    required: false,
  })
  @IsInt()
  @IsOptional()
  startTime?: number;

  @ApiProperty({
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
    required: false,
  })
  @IsInt()
  @IsOptional()
  endTime?: number;

  @ApiProperty({ type: EventLocationDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => EventLocationDto)
  @IsOptional()
  location?: EventLocationDto;

  @ApiProperty({ type: 'boolean', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isVirtualEvent?: boolean;

  @ApiProperty({ type: RegistrationDetailsDto, example: {}, required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RegistrationDetailsDto)
  registration?: RegistrationDetailsDto;

  @ApiProperty({ example: 'my-awesome-event', type: String, required: false })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
  })
  @Length(3, 20)
  @IsOptional()
  slug?: string;

  @ApiProperty({ type: EventSeoDto, example: {}, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => EventSeoDto)
  @IsOptional()
  seo?: EventSeoDto;

  @ApiProperty({
    enum: EventCategory,
    enumName: 'EventCategory',
    required: false,
  })
  @IsEnum(EventCategory)
  @IsOptional()
  category?: EventCategory;

  @ApiProperty({
    enum: EventSubCategory,
    enumName: 'EventSubCategory',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(EventSubCategory)
  subCategory?: EventSubCategory;
}
