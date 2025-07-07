import { PartialType } from '@nestjs/swagger';

import { EventReferralConfigCreateDto } from './event-referral-config-create.dto';

export class EventReferralConfigEditDto extends PartialType(
  EventReferralConfigCreateDto,
) {}
