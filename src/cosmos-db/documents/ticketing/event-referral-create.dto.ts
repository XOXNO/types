import { PickType } from '@nestjs/swagger';

import { EventReferralDoc } from './event-referral.doc';

export class EventReferralCreateDto extends PickType(EventReferralDoc, [
  'referralCode',
  'referralConfigId',
] as const) {}
