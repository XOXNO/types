import { ApiProperty, PickType } from '@nestjs/swagger';
import { ActivePerpAssetCtxHydrated, ActiveSpotAssetCtx } from './response';

export class PerpConfig {
  @ApiProperty()
  sigFigs!: number;

  @ApiProperty()
  mantissa!: number;
}

export class PerpSingleCoin {
  @ApiProperty()
  identifier!: string;

  @ApiProperty()
  decimals!: number;

  @ApiProperty()
  symbol!: string;
}

export class PerpCoin {
  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  coin!: PerpSingleCoin;

  @ApiProperty()
  againstCoin!: PerpSingleCoin;

  @ApiProperty()
  config!: PerpConfig[];
}

export class PerpCoinExtended extends PerpCoin {
  ctx!: ActivePerpAssetCtxHydrated;
}

export class PerpSpotCoinExtended extends PerpCoin {
  ctx!: ActiveSpotAssetCtx;
}

export class PerpCoinExtendedSlim extends PickType(PerpCoin, [
  'symbol',
] as const) {
  ctx!: Pick<
    ActivePerpAssetCtxHydrated,
    | 'maxLeverage'
    | 'midPx'
    | 'markPx'
    | 'prevDayPx'
    | 'funding'
    | 'dayNtlVlm'
    | 'openInterest'
  >;
}

export class PerpSpotCoinExtendedSlim extends PickType(PerpCoin, [
  'symbol',
] as const) {
  ctx!: Pick<
    ActiveSpotAssetCtx,
    'midPx' | 'markPx' | 'prevDayPx' | 'dayNtlVlm' | 'circulatingSupply'
  >;
}
