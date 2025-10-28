import { PickType } from '@nestjs/swagger';

import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigCreateDto extends PickType(
  EventReferralConfigDoc,
  [
    'name',
    'isSelfService',
    'isActive',
    'appliedVoucher',
    'rewardDetails',
  ] as const,
) {}
