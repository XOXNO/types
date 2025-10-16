import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PerpTradesSide } from '../../enums/perp.enum';
import { L2BookPerpEvent, TradesPerpEvent } from './request';

export class L2BookPerpResponseSingle {
  @ApiProperty()
  px!: string;

  @ApiProperty()
  sz!: string;

  @ApiProperty()
  n!: number;
}

export class L2BookPerpResponse extends L2BookPerpEvent {
  @ApiProperty()
  time!: number;

  @ApiProperty()
  bid!: L2BookPerpResponseSingle[];

  @ApiProperty()
  ask!: L2BookPerpResponseSingle[];
}

export class TradesPerpResponseSingle {
  @ApiProperty()
  side!: PerpTradesSide;

  @ApiProperty()
  px!: string;

  @ApiProperty()
  sz!: string;

  @ApiProperty()
  time!: number;

  @ApiProperty()
  hash!: string;

  @ApiProperty()
  users!: string[];
}

export class TradesPerpResponse extends TradesPerpEvent {
  @ApiProperty()
  trades!: TradesPerpResponseSingle[];
}

@ApiExtraModels(L2BookPerpResponse, TradesPerpResponse)
export class PerpResponse {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpResponse) },
      { $ref: getSchemaPath(TradesPerpResponse) },
    ],
  })
  event!: L2BookPerpResponse | TradesPerpResponse;
}
