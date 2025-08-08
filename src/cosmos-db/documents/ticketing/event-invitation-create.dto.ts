import { ApiProperty, PickType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { EventInvitationDoc } from './event-invitation.doc';
import { TicketProfileSummary } from './event-ticket-profile.doc';

export class EventInvitationCreateDto extends PickType(EventInvitationDoc, [
  'name',
  'email',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({ type: () => TicketProfileSummary, isArray: true })
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => TicketProfileSummary)
  tickets: TicketProfileSummary[] = [];
}
