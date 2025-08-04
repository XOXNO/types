import { ApiProperty } from '@nestjs/swagger';

import { EventInvitation } from './event-invitation.doc';
import { EventGuestProfile } from './event-guest.doc';

export class EventAcceptInvitation {
  @ApiProperty({
    type: EventInvitation,
  })
  invitation!: EventInvitation;

  @ApiProperty({
    type: EventGuestProfile,
  })
  guest!: EventGuestProfile;
}
