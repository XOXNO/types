import { PickType } from '@nestjs/swagger';

import { EventTicketProfileDoc } from './event-ticket-profile.doc';

export class EventTicketProfileCreateDto extends PickType(
  EventTicketProfileDoc,
  [
    'name',
    'description',
    'royalties',
    'badgeColor',
    'maxLimit',
    'userLimit',
    'characteristics',
  ] as const,
) {}
