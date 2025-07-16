import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db-generic-filter';
import { EventReferralConfigDoc } from './event-referral-config.doc';

export class EventReferralConfigFilterCriteriaDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Search text for config or other attributes.',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Filter by owner ID of the config.',
  })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter by active status of the config.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter by self service status of the config.',
  })
  @IsOptional()
  @IsBoolean()
  isSelfService?: boolean;

  @ApiProperty({
    required: false,
    type: RangeFilter,
    isArray: true,
    description: 'Filter referrals within a range of dates.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RangeFilter)
  createdAt?: RangeFilter<EventReferralConfigDoc>[];
}

export class EventReferralConfigFilter extends CosmosDbGenericFilter<EventReferralConfigDoc> {
  @ApiProperty({
    type: EventReferralConfigFilterCriteriaDto,
    description: 'Criteria to filter event referral configs.',
  })
  filters: {
    searchText?: string;
    ownerId?: string;
    createdBy?: string[];
    isActive?: boolean;
    isSelfService?: boolean;
    createdAt?: RangeFilter<EventReferralConfigDoc>[];
    dataType?: string[];
    eventId?: string[];
  } = {
    dataType: [TicketingDataType.REFERRAL_CONFIG],
  };

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: 'Include total count of results.',
  })
  includeCount?: boolean = false;

  constructor(props: Partial<EventReferralConfigFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties if any
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
