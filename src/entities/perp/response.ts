import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  PerpOrderDirection,
  PerpOrderOrderType,
  PerpOrderTriggerCondition,
  PerpPositionLeverageDirection,
  PerpPositionLeverageType,
  PerpTradesSide,
} from '../../enums/perp.enum';
import {
  PerpCoinExtendedSlimWs,
  PerpSingleCoin,
  PerpSpotCoinExtendedSlimWs,
} from './coins';
import {
  ActiveAssetPerpEvent,
  ActiveAssetsPerpEvent,
  ActiveSpotAssetPerpEvent,
  ActiveSpotAssetsPerpEvent,
  L2BookPerpEvent,
  SpotStatePerpEvent,
  TradesPerpEvent,
  UserFillEvent,
  UserOpenOrderEvent,
  WebData3PerpEvent,
} from './request';

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

export class PerpCommonTrade {
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
}

export class TradesPerpResponseSingle extends PerpCommonTrade {
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
  tokens!: PerpSpotCoinExtendedSlimWs[];
}

export class ActiveAssetsPerpResponse extends ActiveAssetsPerpEvent {
  @ApiProperty()
  tokens!: PerpCoinExtendedSlimWs[];
}

export class Web3DataMarginSummary {
  @ApiProperty()
  accountValue!: string;

  @ApiProperty()
  totalNtlPos!: string;

  @ApiProperty()
  totalRawUsd!: string;

  @ApiProperty()
  totalMarginUsed!: string;
}

export class Web3DataAssetPositionCumFunding {
  @ApiProperty()
  allTime!: string;

  @ApiProperty()
  sinceChange!: string;

  @ApiProperty()
  sinceOpen!: string;
}

export class Web3DataAssetPositionLeverage {
  @ApiProperty()
  rawUsd!: string;

  @ApiProperty()
  type!: PerpPositionLeverageType;

  @ApiProperty()
  value!: number;
}

export class Web3DataAssetPositionPosition {
  @ApiProperty()
  coin!: PerpSingleCoin;

  @ApiProperty()
  entryPx!: string;

  @ApiProperty()
  liquidationPx!: string;

  @ApiProperty()
  marginUsed!: string;

  @ApiProperty()
  maxLeverage!: number;

  @ApiProperty()
  positionValue!: string;

  @ApiProperty()
  returnOnEquity!: string;

  @ApiProperty()
  szi!: string;

  @ApiProperty()
  unrealizedPnl!: string;

  @ApiProperty()
  cumFunding!: Web3DataAssetPositionCumFunding;
}

export class Web3DataAssetPosition {
  @ApiProperty()
  position!: Web3DataAssetPositionPosition;

  @ApiProperty()
  type!: PerpPositionLeverageDirection;
}

export class Web3DataClearingHouseState {
  @ApiProperty()
  crossMaintenanceMarginUsed!: string;

  @ApiProperty()
  withdrawable!: string;

  @ApiProperty()
  time!: number;

  @ApiProperty()
  marginSummary!: Web3DataMarginSummary;

  @ApiProperty()
  crossMarginSummary!: Web3DataMarginSummary;

  @ApiProperty()
  assetPositions!: Web3DataAssetPosition[];
}

export class Web3DataPerpDexStates {
  @ApiProperty()
  totalVaultEquity!: string;

  @ApiProperty()
  clearingHouseState!: Web3DataClearingHouseState;
}

export class WebData3PerpResponse extends WebData3PerpEvent {
  @ApiProperty()
  perpDexStates!: Web3DataPerpDexStates[];
}

export class SpotStateBalance {
  @ApiProperty()
  coin!: PerpSingleCoin;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  total!: string;

  @ApiProperty()
  hold!: string;

  @ApiProperty()
  entryNtl!: string;
}

export class SpotStatePerpResponse extends SpotStatePerpEvent {
  @ApiProperty()
  balances!: SpotStateBalance[];
}

export class UserOpenOrder {
  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  limitPx!: string;

  @ApiProperty()
  oid!: string;

  @ApiProperty()
  side!: PerpTradesSide;

  @ApiProperty()
  sz!: string;

  @ApiProperty()
  timestamp!: number;
}

export class UserOpenOrderExtended extends UserOpenOrder {
  @ApiProperty()
  isPositionTpsl!: boolean;

  @ApiProperty()
  isTrigger!: boolean;

  @ApiProperty()
  origSz!: string;

  @ApiProperty()
  reduceOnly!: boolean;

  @ApiProperty()
  orderType!: PerpOrderOrderType;

  @ApiProperty()
  triggerCondition!: PerpOrderTriggerCondition;

  @ApiProperty()
  triggerPx!: string;
}

export class UserOpenOrderResponse extends UserOpenOrderEvent {
  @ApiProperty()
  orders!: UserOpenOrder[];
}

export class UserFill extends PerpCommonTrade {
  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  closedPnl!: string;

  @ApiProperty()
  crossed!: boolean;

  @ApiProperty()
  dir!: PerpOrderDirection;

  @ApiProperty()
  oid!: number;

  @ApiProperty()
  startPosition!: string;

  @ApiProperty()
  fee!: string;

  @ApiProperty()
  feeToken!: string;

  @ApiProperty()
  tid!: number;
}

export class UserFillResponse extends UserFillEvent {
  @ApiProperty()
  fills!: UserFill[];
}

@ApiExtraModels(
  L2BookPerpResponse,
  TradesPerpResponse,
  ActiveSpotAssetPerpResponse,
  ActiveAssetPerpResponse,
  ActiveSpotAssetsPerpResponse,
  ActiveAssetsPerpResponse,
  WebData3PerpResponse,
  SpotStatePerpResponse,
  UserOpenOrderResponse,
  UserFillResponse,
)
export class PerpResponse {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(L2BookPerpResponse) },
      { $ref: getSchemaPath(TradesPerpResponse) },
      { $ref: getSchemaPath(ActiveSpotAssetPerpResponse) },
      { $ref: getSchemaPath(ActiveAssetPerpResponse) },
      { $ref: getSchemaPath(ActiveSpotAssetsPerpResponse) },
      { $ref: getSchemaPath(ActiveAssetsPerpResponse) },
      { $ref: getSchemaPath(WebData3PerpResponse) },
      { $ref: getSchemaPath(SpotStatePerpResponse) },
      { $ref: getSchemaPath(UserOpenOrderResponse) },
      { $ref: getSchemaPath(UserFillResponse) },
    ],
  })
  event!:
    | L2BookPerpResponse
    | TradesPerpResponse
    | ActiveSpotAssetPerpResponse
    | ActiveAssetPerpResponse
    | ActiveSpotAssetsPerpResponse
    | ActiveAssetsPerpResponse
    | WebData3PerpResponse
    | SpotStatePerpResponse
    | UserOpenOrderResponse
    | UserFillResponse;
}
