import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PerpEnum } from '../../enums/perp.enum';

export class L2BookPerpEvent {
  @ApiProperty()
  type!: PerpEnum.L2BOOK;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  sigFigs!: number;

  @ApiProperty()
  mantissa = 1;
}

export class TradesPerpEvent {
  @ApiProperty()
  type!: PerpEnum.TRADES;

  @ApiProperty()
  symbol!: string;
}

export class ActiveSpotAssetPerpEvent {
  @ApiProperty()
  type!: PerpEnum.SPOT_ASSET_CTX;

  @ApiProperty()
  symbol!: string;
}

export class ActiveAssetPerpEvent {
  @ApiProperty()
  type!: PerpEnum.ASSET_CTX;

  @ApiProperty()
  symbol!: string;
}

@ApiExtraModels(
  L2BookPerpEvent,
  TradesPerpEvent,
  ActiveSpotAssetPerpEvent,
  ActiveAssetPerpEvent,
)
export class PerpEvent {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpEvent) },
      { $ref: getSchemaPath(TradesPerpEvent) },
      { $ref: getSchemaPath(ActiveSpotAssetPerpEvent) },
      { $ref: getSchemaPath(ActiveAssetPerpEvent) },
    ],
  })
  event!:
    | L2BookPerpEvent
    | TradesPerpEvent
    | ActiveSpotAssetPerpEvent
    | ActiveAssetPerpEvent;
}
