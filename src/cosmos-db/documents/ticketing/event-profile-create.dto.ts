import { ApiProperty, PickType } from '@nestjs/swagger';

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

import { Visibility } from '../../../enums/ticketing-visibility.enum';
import { EventProfileDoc } from './event-profile.doc';
import { Type } from 'class-transformer';

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
  @Min(0)
  @IsOptional()
  maxLimit = 0;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum registrations per user',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  userLimit = 0;

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

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptCrypto?: boolean;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Current number of tickets sold',
  })
  @IsInt()
  @IsOptional()
  soldCount?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Whether the event has custom questions',
  })
  @IsBoolean()
  @IsOptional()
  hasCustomQuestions?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Email sender for notifications',
  })
  @IsString()
  @IsOptional()
  emailSender?: string;
}

export class EventLocationDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 300)
  @IsOptional()
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
  @IsNumber()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  @IsOptional()
  lat?: number;

  @ApiProperty({
    minimum: -180,
    maximum: 180,
    required: false,
    description: 'Longitude must be between -180 and 180',
  })
  @IsNumber()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  @IsOptional()
  long?: number;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 100)
  @IsOptional()
  instructions?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 100)
  @IsOptional()
  onlineLink?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 100)
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 100)
  @IsOptional()
  country?: string;
}
class RegistrationDetailsCreateDto extends PickType(RegistrationDetailsDto, [
  'visibility',
  'maxLimit',
  'userLimit',
  'requireKYC',
  'requireName',
  'requireEmail',
  'requirePhoneNumber',
  'isPublished',
  'hasSideEvents',
  'hasWaitlist',
  'showGuestCount',
  'refundable',
  'nameWithNumber',
  'botProtection',
] as const) {}

export class EventProfileCreateDto extends PickType(EventProfileDoc, [
  'slug',
  'title',
  'startTime',
  'endTime',
  'location',
  'isVirtualEvent',
  'seo',
  'category',
  'subCategory',
] as const) {
  @IsObject()
  @ValidateNested()
  @Type(() => RegistrationDetailsCreateDto)
  registration!: RegistrationDetailsCreateDto;
}
