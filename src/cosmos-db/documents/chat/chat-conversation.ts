import { ApiProperty } from '@nestjs/swagger';

class ProfileDto {
  @ApiProperty({
    example: 'erd1fmd662htagt07xxd8me09newa9a0euzvaz3wp0c4az78f83grt9qm6pn57',
  })
  address!: string;

  @ApiProperty({ example: '@john' })
  username!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57/profilePicture.webp?ts=1718876966',
  })
  profile!: string;
}

class MessageContentDto {
  @ApiProperty({ example: 'message' })
  type!: string;

  @ApiProperty({ example: 'Hello world' })
  value!: string;

  @ApiProperty({ required: false })
  replyTo?: {
    sender: ProfileDto;
    content: {
      type: string;
      value: string;
    };
    timestamp: number;
    id: string;
  };
}

class MessageDto {
  @ApiProperty({ type: MessageContentDto })
  content!: MessageContentDto;

  @ApiProperty({ type: ProfileDto })
  sender!: ProfileDto;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;
}

export class ChatConversationDto {
  @ApiProperty({ example: 'conversation' })
  dataType!: string;

  @ApiProperty({ example: 'a0vzrplk37ls7swz5y1z78283grt4qm6pn57' })
  chatId!: string;

  @ApiProperty({ type: ProfileDto })
  sender!: ProfileDto;

  @ApiProperty({ type: ProfileDto })
  receiver!: ProfileDto;

  @ApiProperty({ example: false })
  isGroupChat!: boolean;

  @ApiProperty({ type: MessageDto })
  message!: MessageDto;

  @ApiProperty({ example: 'a0vzrplk37ls7swz5ypz78f83grt9qm6pn57' })
  id!: string;

  @ApiProperty({ example: 'erd1...wz5y' })
  chatName!: string;

  @ApiProperty({ example: 0 })
  unreadCount!: number;
}

export class FetchChatConversationsSummaryDto {
  @ApiProperty({ example: false })
  hasMoreResults!: boolean;

  @ApiProperty({ type: ChatConversationDto, isArray: true })
  resources!: ChatConversationDto[];
}
