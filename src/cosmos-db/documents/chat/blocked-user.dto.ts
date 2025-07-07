import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';

class BlockedChatResourceDto {
  @ApiProperty({ example: 'blockedUser' })
  dataType!: string;

  @ApiProperty({ example: 1720734463 })
  timestamp!: number;

  @ApiProperty({ type: OwnerDto })
  sender!: OwnerDto;

  @ApiProperty({ type: OwnerDto })
  receiver!: OwnerDto;

  @ApiProperty({
    example: 'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57',
  })
  id!: string;

  @ApiProperty({ example: 'erd1...wm7l' })
  chatName!: string;
}

export class FetchBlockedChatsDto {
  @ApiProperty({ example: false })
  hasMoreResults: boolean = false;

  @ApiProperty({ type: BlockedChatResourceDto, isArray: true })
  resources: BlockedChatResourceDto[] = [];
}
