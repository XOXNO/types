import { ApiProperty } from '@nestjs/swagger';

import { PrioritizedTag } from './tag-priority';
import { NotificationDataType } from '../../enums/notification-data-type.enum';

export class DeviceTagStorageDoc {
  @ApiProperty()
  dataType: string = NotificationDataType.DeviceTagStorage;

  @ApiProperty()
  installationId!: string;

  @ApiProperty()
  web2UserId!: string;

  @ApiProperty({ type: () => Object, isArray: true })
  allTags!: PrioritizedTag[];

  @ApiProperty({ type: [String] })
  activeTags!: string[]; // Currently applied to Azure NH (max 58)

  @ApiProperty({ type: [String] })
  droppedTags!: string[]; // Tags we had to remove due to limit

  @ApiProperty()
  lastOptimized!: number; // Unix timestamp

  @ApiProperty()
  tagCount!: number;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  pk?: string;

  @ApiProperty({ required: false })
  _ts?: number;

  constructor(props?: Partial<DeviceTagStorageDoc>) {
    Object.assign(this, props);

    this.id = this.installationId;
    this.pk = this.web2UserId;
    this.lastOptimized = Math.floor(Date.now() / 1000);
    this.tagCount = this.allTags?.length || 0;
  }
}
