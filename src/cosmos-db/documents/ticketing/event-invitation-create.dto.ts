import { ApiProperty, PickType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { EventInvitationDoc } from './event-invitation.doc';
import { TicketsType } from './event-ticket-qr-type.enum';

export class EventInvitationCreateDto extends PickType(EventInvitationDoc, [
  'name',
  'email',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({ type: () => TicketsType, isArray: true })
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => TicketsType)
  tickets: TicketsType[] = [];
}
