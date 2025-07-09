import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsNumber,
} from 'class-validator';

import { ReferralConditionType } from './event-referral-config.doc';
import { TicketingDataType } from './ticketing-data-type.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db-generic-filter';
import { EventReferralDoc } from './event-referral.doc';

export class EventReferralFilterCriteriaDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Search text for referral code or other attributes.',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    description: 'Filter by specific referral codes.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  referralCode?: string[];

  @ApiProperty({
    required: false,
    type: String,
    description: 'Filter by owner ID of the referral.',
  })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiProperty({
    description: 'The ID of the referral configuration this referral follows.',
    required: false,
  })
  @IsOptional()
  @IsString()
  referralConfigId?: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter by active status of the referral.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Filter referrals by minimum successful referrals count.',
  })
  @IsOptional()
  @IsNumber()
  minSuccessfulReferrals?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Filter referrals by maximum successful referrals count.',
  })
  @IsOptional()
  @IsNumber()
  maxSuccessfulReferrals?: number;

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: ReferralConditionType,
    enumName: 'ReferralConditionType',
    description: 'Filter referrals by condition type.',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ReferralConditionType, { each: true })
  conditionType?: ReferralConditionType[];

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
  createdAt?: RangeFilter<EventReferralDoc>[];
}

export class EventReferralFilter extends CosmosDbGenericFilter<EventReferralDoc> {
  @ApiProperty({
    type: EventReferralFilterCriteriaDto,
    description: 'Criteria to filter event referrals.',
  })
  filters: {
    searchText?: string;
    referralCode?: string[];
    isActive?: boolean;
    ownerId?: string;
    minSuccessfulReferrals?: number;
    maxSuccessfulReferrals?: number;
    conditionType?: ReferralConditionType[];
    createdAt?: RangeFilter<EventReferralDoc>[];
    dataType?: string[];
    eventId?: string[];
    referralConfigId?: string;
  } = {
    dataType: [TicketingDataType.REFERRAL_CODE],
  };

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: 'Include total count of results.',
  })
  includeCount?: boolean = false;

  constructor(props: Partial<EventReferralFilter>) {
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
