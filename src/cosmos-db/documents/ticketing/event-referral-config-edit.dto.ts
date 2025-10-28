import { PartialType, PickType } from '@nestjs/swagger';

import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigEditDto extends PartialType(
  PickType(EventReferralConfigDoc, [
    'name',
    'isActive',
    'appliedVoucher',
    'rewardDetails',
  ] as const),
) {}
