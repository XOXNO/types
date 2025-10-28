import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
  OmitType,
} from '@nestjs/swagger';
import { PerpCoinTypes, PerpTradesSide } from '../../enums/perp.enum';
import {
  ActiveAssetPerpEvent,
  ActiveAssetsPerpEvent,
  ActiveSpotAssetPerpEvent,
  ActiveSpotAssetsPerpEvent,
  L2BookPerpEvent,
  TradesPerpEvent,
} from './request';
import { PerpCoinExtendedSlim, PerpSpotCoinExtendedSlim } from './coins';
import { MarginTable } from './margin-table';

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

export class AssetCtxCommon {
  @ApiProperty()
  prevDayPx!: string;

  @ApiProperty()
  dayNtlVlm!: string;

  @ApiProperty()
  markPx!: string;

  @ApiProperty()
  midPx!: string;

  @ApiProperty()
  dayBaseVlm!: string;
}

export class ActiveSpotAssetCtx extends AssetCtxCommon {
  @ApiProperty()
  circulatingSupply!: string;

  @ApiProperty()
  totalSupply!: string;
}

export class ActivePerpAssetCtx extends AssetCtxCommon {
  @ApiProperty()
  funding!: string;

  @ApiProperty()
  openInterest!: string;

  @ApiProperty()
  premium!: string;

  @ApiProperty()
  oraclePx!: string;

  @ApiProperty()
  impactTxs!: string[];
}

export class ActiveSpotAssetCtxFull extends ActiveSpotAssetCtx {
  @ApiProperty()
  categories!: PerpCoinTypes[];
}

export class ActivePerpAssetCtxFull extends ActivePerpAssetCtx {
  @ApiProperty()
  maxLeverage!: number;

  @ApiProperty()
  marginTableId!: number;

  @ApiProperty()
  categories!: PerpCoinTypes[];
}

export class ActivePerpAssetCtxHydrated extends OmitType(
  ActivePerpAssetCtxFull,
  ['marginTableId'] as const,
) {
  marginTable!: MarginTable;
}

export class ActiveSpotAssetPerpResponse extends ActiveSpotAssetPerpEvent {
  @ApiProperty()
  ctx!: ActiveSpotAssetCtx;
}

export class ActiveAssetPerpResponse extends ActiveAssetPerpEvent {
  @ApiProperty()
  ctx!: ActivePerpAssetCtx;
}

export class ActiveSpotAssetsPerpResponse extends ActiveSpotAssetsPerpEvent {
  @ApiProperty()
  tokens!: PerpSpotCoinExtendedSlim[];
}

export class ActiveAssetsPerpResponse extends ActiveAssetsPerpEvent {
  @ApiProperty()
  tokens!: PerpCoinExtendedSlim[];
}

@ApiExtraModels(
  L2BookPerpResponse,
  TradesPerpResponse,
  ActiveSpotAssetPerpResponse,
  ActiveAssetPerpResponse,
)
export class PerpResponse {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpResponse) },
      { $ref: getSchemaPath(TradesPerpResponse) },
      { $ref: getSchemaPath(ActiveSpotAssetPerpResponse) },
      { $ref: getSchemaPath(ActiveAssetPerpResponse) },
    ],
  })
  event!:
    | L2BookPerpResponse
    | TradesPerpResponse
    | ActiveSpotAssetPerpResponse
    | ActiveAssetPerpResponse;
}
