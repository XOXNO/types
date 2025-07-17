import { ApiProperty } from '@nestjs/swagger';

import { EventGuestStatus } from '../../../enums/event-guest-status.enum';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db-generic-filter';
import { EventGuestDoc } from './event-guest.doc';

export class EventGuestFilterCriteriaDto {
  @ApiProperty({ required: false, type: String })
  searchText?: string;

  @ApiProperty({ required: false, type: String, isArray: true })
  wallet?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  eventId?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: EventGuestStatus,
    enumName: 'EventGuestStatus',
  })
  status?: EventGuestStatus[];

  @ApiProperty({ required: false, type: Boolean })
  questionnaireFilled?: boolean;

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<EventGuestDoc>[];
}

export class EventGuestFilter extends CosmosDbGenericFilter<EventGuestDoc> {
  @ApiProperty({
    type: EventGuestFilterCriteriaDto,
  })
  filters: {
    searchText?: string;
    dataType?: string[];
    wallet?: string[];
    eventId?: string[];
    status?: EventGuestStatus[];
    questionnaireFilled?: boolean;
    range?: RangeFilter<EventGuestDoc>[];
  } = {
    dataType: [TicketingDataType.EVENT_GUEST],
  };
  @ApiProperty({ required: false, type: 'boolean', default: false })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean', default: false })
  includeCount?: boolean = false;

  constructor(props?: Partial<EventGuestFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props!;
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
