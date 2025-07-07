import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayUnique,
} from 'class-validator';

import { EventQuestionAnswerType } from './event-question-answer-type.enum';

export class EventQuestionEditDto {
  @ApiProperty({ description: 'The actual question text.', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Indicates whether the question is mandatory.',
    required: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiProperty({
    description: 'Type of answer expected.',
    enum: EventQuestionAnswerType,
    enumName: 'EventQuestionAnswerType',
    required: false,
  })
  @IsOptional()
  @IsEnum(EventQuestionAnswerType)
  answerType?: EventQuestionAnswerType;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description:
      'Indicates whether the question has a time component when the answer type is date.',
    type: 'boolean',
  })
  requireTime?: boolean;

  @ApiProperty({
    description:
      'Optional array of possible answers for select-type questions.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  answers?: string[];
}
