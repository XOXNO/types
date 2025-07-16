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

import { EventVoucherDoc } from './event-voucher.doc';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db-generic-filter';
import { VoucherType } from '../../../enums/voucher-type.enum';

export class EventVoucherFilterCriteriaDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Search text for voucher code or other attributes.',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    description: 'Filter by specific voucher codes.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  code?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    enum: VoucherType,
    enumName: 'VoucherType',
    description: 'Filter by type of discount (fixed or percentage).',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(VoucherType, { each: true })
  type?: VoucherType[];

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Filter vouchers by exact discount amount.',
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Optional maximum discount cap for percentage-based vouchers.',
  })
  @IsOptional()
  @IsNumber()
  maxDiscountAmount?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Filter vouchers by maximum allowed uses.',
  })
  @IsOptional()
  @IsNumber()
  maxUses?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Filter vouchers by maximum uses per user.',
  })
  @IsOptional()
  @IsNumber()
  maxUsesPerUser?: number;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter by active status of the voucher.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Filter by owner ID who can use the voucher.',
  })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiProperty({
    required: false,
    type: RangeFilter,
    isArray: true,
    description: 'Filter vouchers within a range of dates.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RangeFilter)
  range?: RangeFilter<EventVoucherDoc>[];
}

export class EventVoucherFilter extends CosmosDbGenericFilter<EventVoucherDoc> {
  @ApiProperty({
    type: EventVoucherFilterCriteriaDto,
    description: 'Criteria to filter event vouchers.',
  })
  filters: {
    searchText?: string;
    code?: string[];
    type?: VoucherType[];
    amount?: number;
    maxDiscountAmount?: number;
    maxUses?: number;
    maxUsesPerUser?: number;
    isActive?: boolean;
    ownerId?: string;
    range?: RangeFilter<EventVoucherDoc>[];
    dataType?: string[];
    eventId?: string[];
  } = {
    dataType: [TicketingDataType.VOUCHER],
  };

  @ApiProperty({
    required: false,
    type: 'boolean',
    default: false,
    description: 'Include total count of results.',
  })
  includeCount?: boolean = false;

  constructor(props: Partial<EventVoucherFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };

    this.setPk();
  }

  private setPk() {
    if (!this.filters) {
      return;
    }

    this.filters.eventId = Array.from(new Set(this.filters.eventId ?? []));
  }
}
