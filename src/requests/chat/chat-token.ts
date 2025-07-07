import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class WebSocketTokenDto {
  @ApiProperty({ description: 'WebSocket connection token' })
  @IsString()
  token!: string;
}
