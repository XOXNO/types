import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';

import { ChatMessageContentDto } from './chat-message-content.dto';

export class SendChatMessageDto {
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  sender!: string;

  @ValidateNested()
  @Type(() => ChatMessageContentDto)
  @IsNotEmptyObject()
  @ApiProperty({ required: true, type: ChatMessageContentDto })
  content!: ChatMessageContentDto;

  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  receiver!: string;
}
