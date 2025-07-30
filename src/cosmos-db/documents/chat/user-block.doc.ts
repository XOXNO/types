import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from '../../../enums/chat-data-type.enum';

class UserBlockDocBase {
  @ApiProperty({
    description: 'Data type identifier for blocked user',
    enum: ChatDataType,
    example: ChatDataType.BLOCKED_USER,
    default: ChatDataType.BLOCKED_USER,
  })
  dataType = ChatDataType.BLOCKED_USER;
  @ApiProperty({
    description: 'Unix timestamp when the user was blocked',
    example: 1640995200,
  })
  timestamp = Math.floor(Date.now() / 1000);
  @ApiProperty({
    description: 'ID representing the blocked user',
    example: 'erd1...',
  })
  id!: string; //blockedUser
  @ApiProperty({
    description: 'Partition key representing who blocked the user',
    example: 'erd1...',
  })
  pk!: string; //blockedBy
  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
  })
  _ts!: number;

  constructor(props?: Partial<UserBlockDoc>) {
    Object.assign(this, props);
    this.id = props!.sender!;
    this.pk = props!.receiver!;
  }
}
export class UserBlockDoc extends UserBlockDocBase {
  @ApiProperty({
    description: 'Address of the blocked user',
    example: 'erd1...',
  })
  sender!: string; //blockedUser
  @ApiProperty({
    description: 'Address of the user who blocked',
    example: 'erd1...',
  })
  receiver!: string; //blockedBy
}

export class UserBlockDocHydrated extends UserBlockDocBase {
  @ApiProperty({
    description: 'Blocked user information',
    type: OwnerDto,
  })
  sender!: OwnerDto; //blockedUser
  @ApiProperty({
    description: 'User who blocked',
    type: OwnerDto,
  })
  receiver!: OwnerDto; //blockedBy
}
