import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from '../../../enums/chat-data-type.enum';
import { MessageDto } from './chat-message.doc';

class UserConversationDocBase {
  @ApiProperty({
    description: 'Data type identifier for conversation',
    enum: ChatDataType,
    example: ChatDataType.CONVERSATION,
    default: ChatDataType.CONVERSATION,
  })
  dataType = ChatDataType.CONVERSATION;
  @ApiProperty({
    description: 'Name of the chat conversation',
    example: 'John Doe',
    required: false,
  })
  chatName?: string | undefined;
  @ApiProperty({
    description: 'Whether this is a group chat',
    example: false,
  })
  isGroupChat!: boolean;
  @ApiProperty({
    description: 'Unique identifier for the chat',
    example: 'chat-123456',
  })
  chatId!: string;
  @ApiProperty({
    description: 'Last message in the conversation',
    type: MessageDto,
  })
  message!: MessageDto;
  @ApiProperty({
    description: 'Timestamp when the conversation was deleted',
    example: 1640995200,
    required: false,
  })
  deleteTimestamp?: number | undefined;
  @ApiProperty({
    description: 'Number of unread messages',
    example: 5,
    required: false,
  })
  unreadCount?: number | undefined;
  @ApiProperty({
    description: 'Document ID in Cosmos DB',
    example: 'chat-123456',
  })
  id!: string;
  @ApiProperty({
    description: 'Partition key for Cosmos DB',
    example: 'erd1...',
  })
  pk!: string;
  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
  })
  _ts!: number;

  constructor(props?: Partial<UserConversationDoc>) {
    Object.assign(this, props);
    this.id = props!.chatId!;
    this.pk = props!.sender!;
  }
}

export class UserConversationDoc extends UserConversationDocBase {
  @ApiProperty({
    description: 'Address of the user that holds the conversation',
    example: 'erd1...',
  })
  sender!: string; //depending on the perspective this is the address of the user that holds the conversation
  @ApiProperty({
    description: 'Correspondent address',
    example: 'erd1...',
  })
  receiver!: string; //corespondent address
}

export class UserConversationDocHydrated extends UserConversationDocBase {
  @ApiProperty({
    description: 'User that holds the conversation',
    type: OwnerDto,
  })
  sender!: OwnerDto; //depending on the perspective this is the address of the user that holds the conversation
  @ApiProperty({
    description: 'Correspondent user',
    type: OwnerDto,
  })
  receiver!: OwnerDto; //corespondent address
}
