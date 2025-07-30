import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { v4 } from 'uuid';

import { Type } from 'class-transformer';
import { EgldOrEsdtTokenPayment } from '../../../common/tokenPayent';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventStageProfileDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.EVENT_TICKET_STAGE,
  })
  dataType: TicketingDataType = TicketingDataType.EVENT_TICKET_STAGE;

  @ApiProperty({
    description: 'ID of the event this stage is associated with.',
    required: true,
    type: String,
  })
  @IsUUID()
  eventId!: string;

  @ApiProperty({
    description:
      'ID of the ticket type this stage is associated with (reference to TicketTypeDoc).',
    required: true,
    type: String,
  })
  @IsUUID()
  ticketId!: string;

  @ApiProperty({
    description: 'Name of the stage (e.g., Early Bird, Regular).',
    required: true,
    type: String,
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Timestamp when this stage starts.',
    example: Math.floor(Date.now() / 1000),
    required: true,
    type: 'integer',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000))
  startTime!: number;

  @ApiProperty({
    description: 'Timestamp when this stage ends.',
    example: Math.floor(Date.now() / 1000),
    required: true,
    type: 'integer',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000) + 86400)
  endTime!: number;

  @ApiProperty({
    description:
      'Limit on the total number of tickets that can be sold during this stage.',
    required: true,
    type: 'integer',
  })
  @IsInt()
  @Min(0)
  maxLimit = 0;

  @ApiProperty({
    description:
      'Limit on the number of tickets a single user can buy during this stage.',
    required: true,
    type: 'integer',
  })
  @IsInt()
  @Min(0)
  userLimit = 0;

  @ApiProperty({
    description: 'Indicates whether ticket sales are enabled for this stage.',
    required: true,
    type: 'boolean',
  })
  @IsBoolean()
  isEnabled = false;

  @ApiProperty({
    description:
      'If true, only whitelisted users can buy tickets in this stage.',
    required: true,
    type: 'boolean',
  })
  @IsBoolean()
  isWhitelist = false;

  // TODO: Whitelist can be large
  // it is not wise to store it in the stage document as this document might be frequently requested
  // @ApiProperty({
  //   description:
  //     'List of user IDs who are whitelisted for this stage (if isWhitelist is true).',
  // })
  // whitelist?: string[];

  @ApiProperty({
    description: 'Require approval for users paying or registration',
    required: true,
    type: 'boolean',
  })
  @IsBoolean()
  requiredApproval = false;

  @ApiProperty({
    description:
      'Price of the ticket during this stage, can override base price.',
    required: true,
    type: () => [EgldOrEsdtTokenPayment],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EgldOrEsdtTokenPayment)
  prices: EgldOrEsdtTokenPayment[] = []; // Assuming this represents a token-based payment structure

  @ApiProperty({
    description: 'Tracks the total number of tickets sold during this stage.',
    required: true,
    type: 'integer',
  })
  @IsInt()
  soldCount = 0;

  @ApiProperty({
    description: 'Unique identifier for this stage.',
    example: v4(),
    required: true,
    type: String,
  })
  id: string = v4();

  @ApiProperty({
    description: 'Partition key for Cosmos DB document.',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    required: false,
    description: 'Timestamp for document in Cosmos DB.',
    type: 'integer',
  })
  _ts?: number;

  constructor(props?: Partial<EventStageProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.eventId;
  }
}
