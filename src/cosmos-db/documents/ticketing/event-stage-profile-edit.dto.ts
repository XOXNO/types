import { OmitType, PartialType } from '@nestjs/swagger';

import { EventStageProfileCreateDto } from './event-stage-profile-create.dto';

export class EventStageProfileEditDto extends PartialType(
  OmitType(EventStageProfileCreateDto, ['ticketId'] as const),
) {}
