import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { EventCategory, EventSubCategory } from './event-category.enum';

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class EventSeoDto {
  @ApiProperty({ example: 'This is a description', required: false })
  @MaxLength(160, {
    message: 'Description is too long. Maximum length is 160 characters.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: ['tag1', 'tag2'], required: false })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: 'Alternative Title', required: false })
  @IsString()
  @Length(3, 30)
  @IsOptional()
  alternativeTitle?: string;
}

export class RegistrationDetailsDto {
  @ApiProperty({
    enum: Visibility,
    enumName: 'Visibility',
  })
  @IsEnum(Visibility)
  visibility!: Visibility;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum registrations allowed',
  })
  @IsInt()
  maxLimit!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum registrations per user',
  })
  @IsInt()
  userLimit!: number;

  @ApiProperty()
  @IsBoolean()
  requireKYC!: boolean;

  @ApiProperty()
  @IsBoolean()
  requireName!: boolean;

  @ApiProperty()
  @IsBoolean()
  requireEmail!: boolean;

  @ApiProperty()
  @IsBoolean()
  requirePhoneNumber!: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isPublished!: boolean;

  @ApiProperty()
  @IsBoolean()
  hasSideEvents!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  hasWaitlist!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  showGuestCount!: boolean;

  @ApiProperty()
  @IsBoolean()
  refundable!: boolean;

  @ApiProperty()
  @IsBoolean()
  nameWithNumber!: boolean;

  @ApiProperty()
  @IsBoolean()
  botProtection!: boolean;
}

export class EventLocationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 300)
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  placeId?: string;

  @ApiProperty({
    minimum: -90,
    maximum: 90,
    required: false,
    description: 'Latitude must be between -90 and 90',
  })
  @IsOptional()
  @IsNumber()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  lat?: number;

  @ApiProperty({
    minimum: -180,
    maximum: 180,
    required: false,
    description: 'Longitude must be between -180 and 180',
  })
  @IsOptional()
  @IsNumber()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  long?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  instructions?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  onlineLink?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  country?: string;
}

export class EventProfileCreateDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  title!: string;

  @ApiProperty({ minimum: Math.floor(Date.now() / 1000), type: 'integer' })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000))
  startTime!: number;

  @ApiProperty({ type: 'integer' })
  @IsInt()
  endTime!: number;

  @ApiProperty({ type: EventLocationDto })
  @IsObject()
  @ValidateNested()
  @Type(() => EventLocationDto)
  location!: EventLocationDto;

  @ApiProperty({ type: RegistrationDetailsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => RegistrationDetailsDto)
  registration!: RegistrationDetailsDto;

  @ApiProperty()
  @IsBoolean()
  isVirtualEvent!: boolean;

  @ApiProperty({ type: EventSeoDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => EventSeoDto)
  @IsOptional()
  seo?: EventSeoDto;

  @ApiProperty({
    enum: EventCategory,
    enumName: 'EventCategory',
  })
  @IsEnum(EventCategory)
  category!: EventCategory;

  @ApiProperty({
    required: false,
    enum: EventSubCategory,
    enumName: 'EventSubCategory',
  })
  @IsString()
  @IsOptional()
  @IsEnum(EventSubCategory)
  subCategory?: EventSubCategory;
}
