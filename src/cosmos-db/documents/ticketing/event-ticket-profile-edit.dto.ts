import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsObject, IsOptional, IsString, Length } from 'class-validator';

import { EventTicketProfileCreateDto } from './event-ticket-profile-create.dto';

export class EventTicketProfileEditDto extends PickType(
  EventTicketProfileCreateDto,
  ['description', 'badgeColor', 'maxLimit', 'userLimit', 'royalties'] as never,
) {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  @IsOptional()
  name!: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  characteristics!: Record<string, string | number>;
}
