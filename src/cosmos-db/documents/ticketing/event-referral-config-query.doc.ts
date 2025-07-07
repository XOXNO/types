import { ApiProperty } from '@nestjs/swagger';

import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigQuery {
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
    description: 'List of referral configurations matching the filter.',
    type: [EventReferralConfigDoc],
  })
  resources!: EventReferralConfigDoc[];
}
