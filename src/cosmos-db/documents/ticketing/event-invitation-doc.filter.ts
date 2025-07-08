import { ApiProperty } from '@nestjs/swagger';

import { EventInvitationStatus } from './event-invitation-status.enum';
import { TicketingDataType } from './ticketing-data-type.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db-generic-filter';
import { EventInvitationDoc } from './event-invitation.doc';

export class EventInvitationFilterCriteriaDto {
  @ApiProperty({ required: false, type: String })
  searchText?: string;

  @ApiProperty({ required: false, type: String, isArray: true })
  claimedBy?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  eventId?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  email?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: EventInvitationStatus,
    enumName: 'EventInvitationStatus',
  })
  status?: EventInvitationStatus[];

  @ApiProperty({ required: false, type: Boolean })
  isClaimed?: boolean;

  @ApiProperty({ required: false, type: Boolean })
  isUsed?: boolean;

  @ApiProperty({
    required: false,
    type: RangeFilter,
    isArray: true,
  })
  range?: RangeFilter<EventInvitationDoc>[];
}

export class EventInvitationFilter extends CosmosDbGenericFilter {
  @ApiProperty({
    type: EventInvitationFilterCriteriaDto,
  })
  filters: {
    searchText?: string;
    dataType?: string[];
    id?: string[];
    eventId?: string[];
    email?: string[];
    isClaimed?: boolean;
    isUsed?: boolean;
    status?: EventInvitationStatus[];
    // TODO: Handle ticket filter on cosmos query
    tickets?: unknown[];
    claimedBy?: string[];
    range?: RangeFilter<EventInvitationDoc>[];
  } = {
    dataType: [TicketingDataType.INVITATION],
  };
  @ApiProperty({ required: false, type: 'boolean', default: false })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean', default: false })
  includeCount?: boolean = false;

  constructor(props: Partial<EventInvitationFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props;
    Object.assign(this, otherProps);

    this.setPk();
  }

  private setPk() {
    const uniqueEvents = new Set<string>();
    if (this.filters?.eventId && this.filters.eventId.length > 0) {
      this.filters.eventId.forEach((event) => {
        uniqueEvents.add(event);
      });
    }

    this.filters.eventId = Array.from(uniqueEvents);
  }
}
