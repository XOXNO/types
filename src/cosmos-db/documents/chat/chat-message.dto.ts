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

class ProfileDto {
  @ApiProperty({
    example: 'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57',
  })
  address!: string;

  @ApiProperty({ example: '@mihaieremia' })
  username!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57/profilePicture.webp?ts=1718876966',
  })
  profile!: string;
}

class MessageContentReplyToDto {
  @ApiProperty({ example: 'message' })
  type!: string;
  @ApiProperty({ example: 'Hello world' })
  value!: string;
}

class ReplyToDto {
  @ApiProperty({ type: ProfileDto })
  sender!: ProfileDto;

  @ApiProperty({ type: MessageContentReplyToDto })
  content!: MessageContentReplyToDto;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;

  @ApiProperty({ example: 'b02f639a-abcf-4db8-9397-bdb3b60cef6a' })
  id!: string;
}

class MessageContentDto {
  @ApiProperty({ example: 'message' })
  type!: string;

  @ApiProperty({ example: 'Vv' })
  value!: string;

  @ApiProperty({ required: false, type: ReplyToDto })
  replyTo?: ReplyToDto;
}

class MessageDto {
  @ApiProperty({ type: MessageContentDto })
  content!: MessageContentDto;

  @ApiProperty({ example: true })
  isRead!: boolean;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;
}

export class ChatMessageDto {
  @ApiProperty({ example: 'message' })
  dataType!: string;

  @ApiProperty({ example: 'a0vzrplk37ls7swz5ypz78f83grt9qm6pn57' })
  chatId!: string;

  @ApiProperty({ type: ProfileDto })
  receiver!: ProfileDto;

  @ApiProperty({ type: ProfileDto })
  sender!: ProfileDto;

  @ApiProperty({ example: false })
  isGroupChat!: boolean;

  @ApiProperty({ type: MessageDto })
  message!: MessageDto;

  @ApiProperty({ example: 'b02f639a-abcf-4db8-9397-bdb3b60cef6a' })
  id!: string;

  @ApiProperty({ example: '@mihaieremia' })
  chatName!: string;
}

export class FetchChatMessagesDto {
  @ApiProperty({ example: false })
  hasMoreResults: boolean = false;

  @ApiProperty({ type: ProfileDto })
  receiver!: ProfileDto;

  @ApiProperty({ type: ChatMessageDto, isArray: true })
  resources!: ChatMessageDto[];
}
