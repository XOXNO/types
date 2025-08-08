import { ApiProperty } from '@nestjs/swagger';
import { ChatDataType } from '../../../enums/chat-data-type.enum';

export class GroupChatProfileDoc {
  @ApiProperty({
    description: 'Data type identifier for group chat profile',
    enum: ChatDataType,
    example: ChatDataType.GROUP_CHAT_PROFILE,
    default: ChatDataType.GROUP_CHAT_PROFILE,
  })
  dataType = ChatDataType.GROUP_CHAT_PROFILE;
  @ApiProperty({
    description: 'Name of the group chat',
    example: 'NFT Collectors Group',
  })
  name!: string;
  @ApiProperty({
    description: 'Unique identifier for the chat',
    example: 'chat-123456',
  })
  chatId!: string;
  @ApiProperty({
    description: 'Description of the group chat',
    example: 'A group for NFT collectors to discuss latest trends',
    required: false,
  })
  description?: string;
  @ApiProperty({
    description: 'Profile picture URL for the group chat',
    example: 'https://example.com/profile.jpg',
  })
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';
  @ApiProperty({
    description: 'Address of the group chat owner',
    example: 'erd1...',
  })
  owner!: string;
  @ApiProperty({
    description:
      'Collection of addresses or identifiers associated with the group',
    type: [String],
    example: ['address1', 'address2'],
    default: [],
  })
  collection: string[] = [];
  @ApiProperty({
    description: 'Partition key for Cosmos DB',
    example: 'chat-123456',
  })
  pk!: string;
  @ApiProperty({
    description: 'Document ID in Cosmos DB',
    example: 'chat-123456-GROUP_CHAT_PROFILE',
  })
  id!: string;
  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
  })
  _ts!: number;

  constructor(props?: Partial<GroupChatProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.chatId;
    this.id = `${this.chatId}-${this.dataType}`;
  }
}
