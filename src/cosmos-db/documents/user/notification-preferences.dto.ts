import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean } from 'class-validator';

export class NotificationPreferencesPostDto {
  @ApiProperty({
    description: 'Notification preference for sales',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly sales: boolean = false;

  @ApiProperty({
    description: 'Notification preference for bids',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly bids: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers received',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly offersReceived: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers accepted',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly offersAccepted: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers rejected',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly offersRejected: boolean = false;

  @ApiProperty({
    description: 'Notification preference for deposits',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly deposits: boolean = false;
}
