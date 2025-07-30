import { ApiProperty } from '@nestjs/swagger';

import { PrioritizedTag } from './tag-priority';
import { NotificationDataType } from '../../enums/notification-data-type.enum';

export class DeviceTagStorageDoc {
  @ApiProperty({
    description: 'Document type identifier for Cosmos DB',
    example: NotificationDataType.DeviceTagStorage,
    enum: NotificationDataType,
    enumName: 'NotificationDataType',
  })
  dataType = NotificationDataType.DeviceTagStorage;

  @ApiProperty({
    description:
      'Azure Notification Hub installation ID (matches device document ID)',
    example: 'firebase-uid-123-device-uuid-456',
    type: String,
  })
  installationId!: string;

  @ApiProperty({
    description: 'Firebase UID of the device owner',
    example: 'firebase-uid-123456789',
    type: String,
  })
  web2UserId!: string;

  @ApiProperty({
    description:
      'Complete list of all tags associated with this device, ordered by priority',
    example: [
      {
        tag: 'user:firebase-uid-123',
        priority: 1,
        category: 'user_identity',
        createdAt: 1704067200,
      },
      {
        tag: 'event:event-123',
        priority: 2,
        category: 'active_event',
        createdAt: 1704067200,
        lastUsed: 1704067500,
      },
    ],
    type: () => Object,
    isArray: true,
  })
  allTags!: PrioritizedTag[];

  @ApiProperty({
    description:
      'Tags currently applied to Azure Notification Hub (maximum 58 tags)',
    example: [
      'user:firebase-uid-123',
      'addr:erd1abc...',
      'pref:eventUpdates',
      'event:event-123',
    ],
    type: [String],
  })
  activeTags!: string[]; // Currently applied to Azure NH (max 58)

  @ApiProperty({
    description:
      'Tags that were removed due to Azure Notification Hub 60-tag limit',
    example: ['event:old-event-789', 'creator:inactive-creator-456'],
    type: [String],
  })
  droppedTags!: string[]; // Tags we had to remove due to limit

  @ApiProperty({
    description: 'Unix timestamp of the last tag optimization process',
    example: 1704067200,
    type: Number,
  })
  lastOptimized!: number; // Unix timestamp

  @ApiProperty({
    description: 'Total number of tags associated with this device',
    example: 75,
    type: Number,
  })
  tagCount!: number;

  @ApiProperty({
    description: 'Document ID (matches installationId)',
    example: 'firebase-uid-123-device-uuid-456',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Partition key for Cosmos DB (web2UserId)',
    example: 'firebase-uid-123456789',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp (seconds since epoch)',
    example: 1704067200,
    type: Number,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<DeviceTagStorageDoc>) {
    Object.assign(this, props);

    this.id = this.installationId;
    this.pk = this.web2UserId;
    this.lastOptimized = Math.floor(Date.now() / 1000);
    this.tagCount = this.allTags?.length || 0;
  }
}
