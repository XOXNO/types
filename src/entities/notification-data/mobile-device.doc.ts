import { ApiProperty } from '@nestjs/swagger';
import { NotificationDataType } from '../../cosmos-db/documents/notification/notification-data-type.enum';

export enum DevicePlatform {
  IOS = 'ios',
  ANDROID = 'android',
}

export class MobileDeviceDoc {
  @ApiProperty({ description: 'Document type identifier' })
  dataType: string = NotificationDataType.MobileDevice;

  @ApiProperty({ description: 'Unique device identifier' })
  deviceUUID!: string;

  @ApiProperty({ description: 'Azure Notification Hubs installation ID' })
  installationId!: string;

  @ApiProperty({
    enum: DevicePlatform,
    enumName: 'DevicePlatform',
    description: 'Mobile platform (iOS or Android)',
  })
  platform!: DevicePlatform;

  @ApiProperty({
    description: 'Platform-specific push token (FCM for Android, APNS for iOS)',
  })
  pushChannel!: string;

  @ApiProperty({ description: 'Firebase user ID' })
  web2UserId!: string;

  @ApiProperty({
    type: [String],
    description: 'Blockchain addresses linked to this device',
  })
  linkedAddresses!: string[];

  @ApiProperty({ description: 'Mobile app version' })
  appVersion!: string;

  @ApiProperty({
    required: false,
    description: 'Device model (e.g., iPhone 14, Pixel 7)',
  })
  deviceModel?: string;

  @ApiProperty({ required: false, description: 'Operating system version' })
  osVersion?: string;

  @ApiProperty({ description: 'Unix timestamp when device was registered' })
  registeredAt!: number;

  @ApiProperty({ description: 'Unix timestamp of last device activity' })
  lastActiveAt!: number;

  @ApiProperty({
    description: 'Whether the device is active for notifications',
  })
  isActive = true;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  pk?: string;

  @ApiProperty({ required: false })
  _ts?: number;

  constructor(props: Partial<MobileDeviceDoc>) {
    Object.assign(this, props);

    this.id = `${this.web2UserId}-${this.deviceUUID}`;
    this.pk = this.web2UserId;
    this.installationId = this.id;
    this.registeredAt = Math.floor(Date.now() / 1000);
    this.lastActiveAt = this.registeredAt;
  }
}
