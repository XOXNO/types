import { PartialType, PickType } from '@nestjs/swagger';

import { EventReferralDoc } from './event-referral.doc';

export class EventReferralEditDto extends PartialType(
  PickType(EventReferralDoc, ['referralCode', 'isActive'] as const),
) {}
