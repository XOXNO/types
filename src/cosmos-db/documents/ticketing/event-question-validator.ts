import { BadRequestException } from '@nestjs/common';

import { EventQuestionAnswerType } from './event-question-answer-type.enum';
import { EventQuestionDoc } from './event-question.doc';

export class EventQuestionValidator {
  static validate(question: Partial<EventQuestionDoc>): void {
    const multipleChoiceTypes = [
      EventQuestionAnswerType.RADIO,
      EventQuestionAnswerType.DROPDOWN,
      EventQuestionAnswerType.CHECKBOX,
    ];
    // Check for minimum answers for certain types
    if (
      question.answerType &&
      multipleChoiceTypes.includes(question.answerType)
    ) {
      if (!question.answers || question.answers.length < 2) {
        throw new BadRequestException(
          `[${question.answerType}] questions require at least 2 answer options`,
        );
      }
    }
    // Ensure answers array is empty for non-multiple choice questions
    else if (question.answers && question.answers.length > 0) {
      throw new BadRequestException(
        `[${question.answerType}] questions should not have predefined answers`,
      );
    }

    // Check for duplicate answers
    if (question.answers) {
      const uniqueAnswers = new Set(question.answers);
      if (uniqueAnswers.size !== question.answers.length) {
        throw new BadRequestException('Duplicate answers are not allowed');
      }
    }
  }
}
