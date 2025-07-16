import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ChatMessageContentType } from '../../../enums/chat-message-content-type.enum';
import { ChatMessageReplyDto } from './chat-message-reply.dto';

export class ChatMessageContentDto {
  @IsEnum(ChatMessageContentType)
  @ApiProperty({ description: 'Message type', type: String })
  readonly type!: string;

  @IsString()
  @ApiProperty({ description: 'Message value', type: String })
  readonly value!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ChatMessageReplyDto)
  @IsNotEmptyObject()
  @ApiProperty({
    description: 'Message reply to user',
    type: ChatMessageReplyDto,
    required: false,
  })
  readonly replyTo?: ChatMessageReplyDto;
}
