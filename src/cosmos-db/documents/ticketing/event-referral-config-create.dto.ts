import { PickType } from '@nestjs/swagger';

import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigCreateDto extends PickType(
  EventReferralConfigDoc,
  ['appliedVoucher', 'rewardDetails', 'isSelfService', 'isActive'] as const,
) {}
