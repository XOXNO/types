import { PickType } from '@nestjs/swagger';

import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigCreateDto extends PickType(
  EventReferralConfigDoc,
  ['isSelfService', 'isActive', 'appliedVoucher', 'rewardDetails'] as const,
) {}
