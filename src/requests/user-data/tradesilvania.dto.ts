// User Network Info DTO
import { ApiProperty } from '@nestjs/swagger';

export class TradesilvaniaSignature {
  @ApiProperty({
    example: 'htps://tradesilvania.com/asdasd',
  })
  url!: string;
}
