import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsBoolean,
  IsEnum,
  IsArray,
  IsNotEmpty,
  ArrayUnique,
  IsOptional,
} from 'class-validator';

import { EventQuestionAnswerType } from '../../../enums/event-question-answer-type.enum';

export class EventQuestionCreateDto {
  @ApiProperty({ description: 'The actual question text.' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Indicates whether the question is mandatory.',
    type: 'boolean',
  })
  @IsBoolean()
  required!: boolean;

  @ApiProperty({
    description: 'Type of answer expected.',
    enum: EventQuestionAnswerType,
    enumName: 'EventQuestionAnswerType',
  })
  @IsEnum(EventQuestionAnswerType)
  answerType!: EventQuestionAnswerType;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description:
      'Indicates whether the question has a time component when the answer type is date.',
    type: 'boolean',
  })
  requireTime!: boolean;

  @ApiProperty({
    description:
      'Optional array of possible answers for select-type questions.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  answers!: string[];
}
