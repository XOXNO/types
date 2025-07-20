import { ApiProperty } from '@nestjs/swagger';

export class UnreadMessageCountByChatIdDto {
  @ApiProperty({ example: 1 })
  unreadCount!: number;

  @ApiProperty({ example: '49vtvdnn9w2stmwm7lpz78f83grt9qm6pn57' })
  chatId!: string;
}

export class GlobalConversationSummaryDto {
  @ApiProperty({ example: 1 })
  totalUnreadChats!: number;

  @ApiProperty({ example: 1 })
  totalUnreadMessages!: number;

  @ApiProperty({ type: UnreadMessageCountByChatIdDto, isArray: true })
  unreadMessageCountByChatId!: UnreadMessageCountByChatIdDto[];
}
