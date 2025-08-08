import { ApiProperty, PickType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EventInvitationDoc } from './event-invitation.doc';
export class TicketsType {
  @ApiProperty({ type: String })
  @IsString()
  ticketId!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity!: number;
}
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
