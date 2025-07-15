import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

import { DevicePlatform } from './mobile-device.doc';

export class MobileDeviceRegistrationDto {
  @ApiProperty({
    description: 'Unique device identifier',
    example: 'abc123-def456-ghi789',
  })
  @IsString()
  deviceUUID!: string;

  @ApiProperty({
    description: 'Device platform',
    enum: DevicePlatform,
    enumName: 'DevicePlatform',
    example: DevicePlatform.IOS,
  })
  @IsEnum(DevicePlatform)
  platform!: DevicePlatform;

  @ApiProperty({
    description: 'FCM token for Android or APNs token for iOS',
    example: 'fcm-token-or-apns-token-here',
  })
  @IsString()
  pushChannel!: string;

  @ApiProperty({
    description: 'App version',
    example: '1.0.0',
  })
  @IsString()
  appVersion!: string;

  @ApiProperty({
    description: 'Device model',
    example: 'iPhone 14 Pro',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceModel?: string;

  @ApiProperty({
    description: 'Operating system version',
    example: 'iOS 17.0',
    required: false,
  })
  @IsOptional()
  @IsString()
  osVersion?: string;
}

export class DeviceNotificationSettingsUpdateDto {
  @ApiProperty({
    description: 'Array of notification tags to enable for this device',
    example: ['pref:eventUpdates', 'pref:eventMarketing'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enabledTags?: string[];

  @ApiProperty({
    description: 'Array of notification tags to disable for this device',
    example: ['pref:eventMarketing'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disabledTags?: string[];
}
