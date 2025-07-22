import { PickType } from '@nestjs/swagger';

import { EventStageProfileDoc } from './event-stage-profile.doc';

export class EventStageProfileCreateDto extends PickType(EventStageProfileDoc, [
  'ticketId',
  'name',
  'startTime',
  'endTime',
  'maxLimit',
  'userLimit',
  'isEnabled',
  'isWhitelist',
  'requiredApproval',
  'prices',
] as const) {}
