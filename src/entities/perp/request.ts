import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PerpEnum } from '../../enums/perp.enum';

export class L2BookPerpEvent {
  @ApiProperty()
  type!: PerpEnum.L2BOOK;

  @ApiProperty()
  coin!: string;

  @ApiProperty()
  againstCoin!: string;

  @ApiProperty()
  sigFigs!: number;

  @ApiProperty()
  mantissa = 1;
}

export class TradesPerpEvent {
  @ApiProperty()
  type!: PerpEnum.TRADES;

  @ApiProperty()
  coin!: string;
}

@ApiExtraModels(L2BookPerpEvent, TradesPerpEvent)
export class PerpEvent {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpEvent) },
      { $ref: getSchemaPath(TradesPerpEvent) },
    ],
  })
  event!: L2BookPerpEvent | TradesPerpEvent;
}
