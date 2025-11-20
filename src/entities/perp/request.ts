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

export class ActiveSpotAssetsPerpEvent {
  @ApiProperty()
  type!: PerpEnum.SPOT_ASSET_CTXS;
}

export class ActiveAssetsPerpEvent {
  @ApiProperty()
  type!: PerpEnum.ASSET_CTXS;
}

export class WebData3PerpEvent {
  @ApiProperty()
  type!: PerpEnum.WEBDATA3;

  @ApiProperty()
  user!: string;
}

export class SpotStatePerpEvent {
  @ApiProperty()
  type!: PerpEnum.SPOT_STATE;

  @ApiProperty()
  user!: string;
}

export class UserOpenOrderEvent {
  @ApiProperty()
  type!: PerpEnum.USER_ORDERS;

  @ApiProperty()
  user!: string;
}

export class UserFilledOrderEvent {
  @ApiProperty()
  type!: PerpEnum.USER_FILLS;

  @ApiProperty()
  user!: string;

  @ApiProperty()
  aggregateByTime!: boolean;
}

export class UserHistoricalOrderEvent {
  @ApiProperty()
  type!: PerpEnum.USER_HISTORY;

  @ApiProperty()
  user!: string;
}

@ApiExtraModels(
  L2BookPerpEvent,
  TradesPerpEvent,
  ActiveSpotAssetPerpEvent,
  ActiveAssetPerpEvent,
  ActiveSpotAssetsPerpEvent,
  ActiveAssetsPerpEvent,
  WebData3PerpEvent,
  SpotStatePerpEvent,
  UserOpenOrderEvent,
  UserFilledOrderEvent,
  UserHistoricalOrderEvent,
)
export class PerpEvent {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpEvent) },
      { $ref: getSchemaPath(TradesPerpEvent) },
      { $ref: getSchemaPath(ActiveSpotAssetPerpEvent) },
      { $ref: getSchemaPath(ActiveAssetPerpEvent) },
      { $ref: getSchemaPath(ActiveSpotAssetsPerpEvent) },
      { $ref: getSchemaPath(ActiveAssetsPerpEvent) },
      { $ref: getSchemaPath(WebData3PerpEvent) },
      { $ref: getSchemaPath(SpotStatePerpEvent) },
      { $ref: getSchemaPath(UserOpenOrderEvent) },
      { $ref: getSchemaPath(UserFilledOrderEvent) },
      { $ref: getSchemaPath(UserHistoricalOrderEvent) },
    ],
  })
  event!:
    | L2BookPerpEvent
    | TradesPerpEvent
    | ActiveSpotAssetPerpEvent
    | ActiveAssetPerpEvent
    | ActiveSpotAssetsPerpEvent
    | ActiveAssetsPerpEvent
    | WebData3PerpEvent
    | SpotStatePerpEvent
    | UserOpenOrderEvent
    | UserFilledOrderEvent
    | UserHistoricalOrderEvent;
}
