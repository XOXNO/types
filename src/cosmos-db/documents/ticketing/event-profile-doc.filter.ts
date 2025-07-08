import { ApiProperty } from '@nestjs/swagger';

import { TicketingDataType } from './ticketing-data-type.enum';
import { RangeFilter } from '../../cosmos-db-generic-filter';
import { CosmosDbGenericFilter } from '../../cosmos-db-generic-filter';
import { EventProfileDoc } from './event-profile.doc';

export class EventProfileFilterCriteriaDto {
  @ApiProperty({ required: false, type: String })
  searchText?: string;

  @ApiProperty({ required: false, type: String, isArray: true })
  area?: string[];

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<EventProfileDoc>[];

  @ApiProperty({ required: false, type: String, isArray: true })
  category?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  subCategory?: string[];
}

export class EventExtraProperties {
  @ApiProperty({ required: false, type: 'boolean' })
  creatorProfile?: boolean;

  @ApiProperty({ required: false, type: 'boolean' })
  guestSummary?: boolean;

  @ApiProperty({ required: false, type: 'boolean' })
  startsFrom?: boolean;
}

export class EventProfileFilter extends CosmosDbGenericFilter {
  @ApiProperty({
    type: EventProfileFilterCriteriaDto,
  })
  filters: {
    searchText?: string;
    area?: string[];
    id?: string[];
    category?: string[];
    subCategory?: string[];
    range?: RangeFilter<EventProfileDoc>[];
    registration?: {
      visibility?: string;
      isPublished?: boolean;
    };
    premium?: {
      searchable?: boolean;
    };
    pk?: string;
  } = {
    pk: TicketingDataType.EVENT_PROFILE,
    registration: {
      visibility: 'public',
      isPublished: true,
    },
    premium: {
      searchable: true,
    },
  };
  @ApiProperty({ required: false, type: 'boolean', default: false })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean', default: false })
  includeCount?: boolean = false;

  @ApiProperty({ required: false, type: EventExtraProperties, default: false })
  extraProperties?: {
    creatorProfile: boolean;
    guestSummary: boolean;
    startsFrom: boolean;
  } = {
    creatorProfile: true,
    guestSummary: true,
    startsFrom: true,
  };

  constructor(props: Partial<EventProfileFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props;
    Object.assign(this, otherProps);

    this.applySelectPropertyLogic(props);
  }

  private applySelectPropertyLogic(props?: Partial<EventProfileFilter>) {
    if (Array.isArray(this.select)) {
      const defaultProperties = this.getDefaultProperties();
      this.select = this.select.concat(defaultProperties);
    }

    if (this.strictSelect) {
      this.select = props?.select;
    }
  }

  private getDefaultProperties() {
    return [
      'dataType',
      'collection',
      'title',
      'startTime',
      'endTime',
      'isVirtualEvent',
      'type',
      'location',
      'profile',
      'descriptionUrl',
      'id',
      'slug',
      'background',
      'creatorAddress',
    ];
  }
}
