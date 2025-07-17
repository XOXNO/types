import { BadRequestException } from '@nestjs/common';

import { EventQuestionAnswerType } from '../../../enums/event-question-answer-type.enum';
import { EventQuestionDoc } from './event-question.doc';

export class EventQuestionValidator {
  static validate(props?: Partial<EventQuestionDoc>): void {
    const multipleChoiceTypes = [
      EventQuestionAnswerType.RADIO,
      EventQuestionAnswerType.DROPDOWN,
      EventQuestionAnswerType.CHECKBOX,
    ];
    // Check for minimum answers for certain types
    if (props?.answerType && multipleChoiceTypes.includes(props.answerType)) {
      if (!props.answers || props.answers.length < 2) {
        throw new BadRequestException(
          `[${props.answerType}] questions require at least 2 answer options`,
        );
      }
    }
    // Ensure answers array is empty for non-multiple choice questions
    else if (props?.answers && props.answers.length > 0) {
      throw new BadRequestException(
        `[${props.answerType}] questions should not have predefined answers`,
      );
    }

    // Check for duplicate answers
    if (props?.answers) {
      const uniqueAnswers = new Set(props.answers);
      if (uniqueAnswers.size !== props.answers.length) {
        throw new BadRequestException('Duplicate answers are not allowed');
      }
    }
  }
}
