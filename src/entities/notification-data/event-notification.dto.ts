import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional, IsArray } from 'class-validator';

export class EventNotificationDto {
  @ApiProperty({
    description: 'Notification title',
    example: 'Event Update',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'The event location has been updated!',
  })
  @IsString()
  message!: string;

  @ApiProperty({
    description: 'Optional image URL for the notification',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Event ID for event-specific notifications',
    example: 'event-123-456',
    required: false,
  })
  @IsOptional()
  @IsString()
  eventId?: string;

  @ApiProperty({
    description: 'Target specific user IDs (Web2 Firebase UIDs)',
    example: ['user123', 'user456'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetUsers?: string[];

  @ApiProperty({
    description: 'Target specific wallet addresses',
    example: ['erd1abc...', 'erd1def...'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAddresses?: string[];

  @ApiProperty({
    description: 'Additional metadata for the notification',
    required: false,
  })
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}

export class CreatorMarketingNotificationDto {
  @ApiProperty({
    description: 'Notification title',
    example: 'New Event from Your Favorite Creator!',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Join us for an exciting new event next month!',
  })
  @IsString()
  message!: string;

  @ApiProperty({
    description: 'Optional image URL for the notification',
    example: 'https://example.com/event-image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Creator wallet address to target past attendees',
    example: 'erd1creator123...',
  })
  @IsString()
  creatorAddress!: string;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    required: false,
  })
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}
