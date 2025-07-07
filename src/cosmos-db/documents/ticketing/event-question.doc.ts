import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsBoolean } from 'class-validator';

import { EventQuestionAnswerType } from './event-question-answer-type.enum';
import { TicketingDataType } from './ticketing-data-type.enum';

export class EventQuestionDoc {
  @ApiProperty({
    description: 'The type of user data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.EVENT_QUESTION,
  })
  dataType: TicketingDataType = TicketingDataType.EVENT_QUESTION;

  @ApiProperty({
    description: 'Automatically generated unique identifier for the question.',
  })
  id!: string;

  @ApiProperty({ description: 'Reference to the EventDoc.' })
  eventId!: string;

  @ApiProperty({ description: 'The actual question text.' })
  title!: string;

  @ApiProperty({
    description: 'Indicates whether the question is mandatory.',
    type: 'boolean',
  })
  @IsBoolean()
  required!: boolean;

  @ApiProperty({
    description:
      'Type of answer expected (e.g., text, textarea, radio, checkbox, etc.).',
    enum: EventQuestionAnswerType,
    enumName: 'EventQuestionAnswerType',
  })
  answerType!: EventQuestionAnswerType;

  @ApiProperty({
    description:
      'Indicates whether the question has a time component when the answer type is date.',
    type: 'boolean',
  })
  @IsBoolean()
  requireTime!: boolean;

  @ApiProperty({
    description:
      'Optional array of possible answers for select-type questions.',
    required: false,
  })
  answers?: string[];

  @ApiProperty({
    description: 'Timestamp of question creation.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  pk!: string;

  constructor(props?: Partial<EventQuestionDoc>) {
    Object.assign(this, props);
    this.pk = this.eventId;
  }
}
