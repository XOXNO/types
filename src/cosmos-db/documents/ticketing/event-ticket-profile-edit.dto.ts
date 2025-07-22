import { PartialType } from '@nestjs/swagger';

import { EventTicketProfileCreateDto } from './event-ticket-profile-create.dto';

export class EventTicketProfileEditDto extends PartialType(
  EventTicketProfileCreateDto,
) {}
