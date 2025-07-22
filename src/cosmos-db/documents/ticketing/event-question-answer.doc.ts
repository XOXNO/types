import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsOptional, IsUUID, IsEnum, IsString, IsInt } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

import { EventQuestionDoc } from './event-question.doc';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventGuestAnswerDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.EVENT_QUESTION_ANSWER,
  })
  @IsEnum(TicketingDataType)
  dataType: TicketingDataType = TicketingDataType.EVENT_QUESTION_ANSWER;

  @ApiProperty({
    description: 'Unique identifier for this guest answer.',
    example: uuidv4(),
  })
  @IsUUID()
  id: string = uuidv4();

  @ApiProperty({
    description: 'The address of the guest who provided the answer.',
  })
  @IsString()
  wallet!: string;

  @ApiProperty({
    description: 'The ID of the question that was answered.',
  })
  @IsUUID()
  questionId!: string;

  @ApiProperty({
    description: 'The event ID this answer is linked to.',
  })
  @IsUUID()
  eventId!: string;

  @ApiProperty({
    description: 'The actual answer provided by the guest.',
  })
  @IsOptional()
  @IsString({ each: true })
  answer!: string | string[];

  @ApiProperty({
    description: 'Timestamp when the answer was provided.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Time to live in seconds. Only set when status is pending.',
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  ttl?: number;

  pk!: string;

  constructor(props?: Partial<EventGuestAnswerDoc>) {
    Object.assign(this, props);
    this.id = `${this.eventId}-${this.questionId}-${this.wallet}`;
    this.pk = this.eventId;
  }

  static create(
    data: Omit<EventGuestAnswerDoc, 'id' | 'dataType' | 'createdAt' | 'pk'>,
  ): EventGuestAnswerDoc {
    return new EventGuestAnswerDoc({
      ...data,
      id: uuidv4(),
      dataType: TicketingDataType.EVENT_QUESTION_ANSWER,
      createdAt: Math.floor(Date.now() / 1000),
    });
  }
}

export class EventQuestionAnswerDto extends PickType(EventGuestAnswerDoc, [
  'questionId',
  'answer',
] as const) {}

export class AnsweredQuestionWithDetails {
  @ApiProperty({
    required: false,
    description: 'The answer provided by the guest',
    type: () => EventGuestAnswerDoc,
  })
  answer?: EventGuestAnswerDoc;

  @ApiProperty({
    description: 'The question details',
    type: () => EventQuestionDoc,
    required: false,
  })
  question?: EventQuestionDoc;
}
