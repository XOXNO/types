import { PartialType } from '@nestjs/swagger';

import { EventQuestionCreateDto } from './event-question-create.dto';

export class EventQuestionEditDto extends PartialType(EventQuestionCreateDto) {}
