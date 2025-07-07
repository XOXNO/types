import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNumber, IsBoolean } from 'class-validator';

import { TicketingDataType } from './ticketing-data-type.enum';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';

export enum VoucherType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export class EventVoucherDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.VOUCHER,
  })
  dataType: TicketingDataType = TicketingDataType.VOUCHER;

  @ApiProperty({
    description: 'Unique identifier for the voucher.',
  })
  id!: string;

  @ApiProperty({ description: 'Unique voucher code.' })
  code!: string;

  @ApiProperty({
    description: 'Type of discount provided by the voucher.',
    enum: VoucherType,
    enumName: 'VoucherType',
  })
  type!: VoucherType;

  @ApiProperty({
    description: 'The discount value. Fixed amount or percentage.',
    type: 'number',
  })
  @IsNumber()
  amount!: number;

  @ApiProperty({
    description: 'Optional maximum discount cap for percentage-based vouchers.',
    type: 'number',
    required: false,
  })
  @IsNumber()
  maxDiscountAmount?: number;

  @ApiProperty({
    description: 'Total number of uses allowed for this voucher.',
    type: 'integer',
  })
  @IsInt()
  maxUses!: number;

  @ApiProperty({
    description: 'Maximum uses allowed per user.',
    type: 'integer',
  })
  @IsInt()
  maxUsesPerUser!: number;

  @ApiProperty({
    description: 'Tracks the number of times the voucher has been used.',
    type: 'integer',
  })
  @IsInt()
  usedCount = 0;

  @ApiProperty({
    description: 'List of specific event IDs where the voucher can be applied.',
  })
  eventId!: string;

  @ApiProperty({
    description:
      'List of specific ticket type IDs where the voucher can be applied.',
  })
  ticketTypeIds: string[] = [];

  @ApiProperty({
    description:
      'List of specific stage IDs where the voucher can be applied, optional.',
    required: false,
  })
  stageIds?: string[];

  @ApiProperty({
    description:
      'Minimum number of tickets required to use the voucher, optional.',
    type: 'integer',
    required: false,
  })
  @IsInt()
  minTicketCount?: number;

  @ApiProperty({
    description:
      'Maximum number of tickets in a single transaction where the voucher can be applied, optional.',
    type: 'integer',
    required: false,
  })
  @IsInt()
  maxTicketCount?: number;

  @ApiProperty({
    description: 'Timestamp when the voucher becomes valid.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  startDate!: number;

  @ApiProperty({
    description: 'Timestamp when the voucher expires.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  endDate!: number;

  @ApiProperty({
    description: 'Indicates whether the voucher is currently active.',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  isActive = true;

  @ApiProperty({
    description: 'Optional ID of the owner who can use this voucher.',
    required: false,
  })
  ownerId?: string;

  @ApiProperty({
    description: 'Timestamp when the voucher was created.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Reference to the admin or system that created the voucher.',
  })
  createdBy!: string;

  pk!: string;

  constructor(props?: Partial<EventVoucherDoc>) {
    Object.assign(this, props);
    this.id = `${this.code}_${this.eventId}_${this.dataType}`;
    this.pk = this.eventId;
  }
}

export class EventVoucherQuery extends createCosmosPaginatedResponse(
  EventVoucherDoc,
) {}
