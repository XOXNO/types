import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean } from 'class-validator';

export class NotificationPreferencesPostDto {
  @ApiProperty({
    description: 'Notification preference for sales',
    example: true,
  })
  @IsBoolean()
  readonly sales: boolean = false;

  @ApiProperty({
    description: 'Notification preference for bids',
    example: true,
  })
  @IsBoolean()
  readonly bids: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers received',
    example: true,
  })
  @IsBoolean()
  readonly offersReceived: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers accepted',
    example: true,
  })
  @IsBoolean()
  readonly offersAccepted: boolean = false;

  @ApiProperty({
    description: 'Notification preference for offers rejected',
    example: true,
  })
  @IsBoolean()
  readonly offersRejected: boolean = false;

  @ApiProperty({
    description: 'Notification preference for deposits',
    example: true,
  })
  @IsBoolean()
  readonly deposits: boolean = false;
}
