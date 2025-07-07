import { ApiProperty } from '@nestjs/swagger';

import { EventReferralDoc } from './event-referral.doc';

export class EventReferralQuery {
  @ApiProperty({
    description: 'Total number of items matching the filter.',
    required: false,
  })
  count?: number;

  @ApiProperty({
    description: 'Indicates if there are more results.',
    required: false,
  })
  hasMoreResults?: boolean;

  @ApiProperty({
    description: 'List of referrals matching the filter.',
    type: [EventReferralDoc],
  })
  resources: EventReferralDoc[] = [];
}
