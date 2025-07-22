import { ApiProperty, PickType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { EventInvitationDoc } from './event-invitation.doc';
class Ticket {
  @ApiProperty({ type: 'string' })
  @IsUUID()
  ticketId!: string;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  quantity!: number;
}
export class EventInvitationCreateDto extends PickType(EventInvitationDoc, [
  'name',
  'email',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({ type: () => Ticket, isArray: true })
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  tickets: Ticket[] = [];
}
