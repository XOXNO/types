import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ChatMessageContentDto } from './chat-message-content.dto';

export class ChatMessageReplyDto {
  @IsString()
  @ApiProperty({ description: 'Message sender', type: String })
  sender!: string;

  @ValidateNested()
  @Type(() => ChatMessageContentDto)
  @IsObject()
  @ApiProperty({
    description: 'Message value',
    type: () => ChatMessageReplyDto,
  })
  readonly content!: ChatMessageContentDto;

  @IsNumber()
  @ApiProperty({ description: 'Message timestamp', type: Number })
  readonly timestamp!: number;

  @IsString()
  @ApiProperty({ description: 'Message id', type: String })
  readonly id!: string;
}
