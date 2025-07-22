import { PickType } from '@nestjs/swagger';

import { EventQuestionDoc } from './event-question.doc';

export class EventQuestionCreateDto extends PickType(EventQuestionDoc, [
  'title',
  'required',
  'answerType',
  'requireTime',
  'answers',
] as const) {}
