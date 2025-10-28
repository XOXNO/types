import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ActivePerpAssetCtxHydrated, ActiveSpotAssetCtxFull } from './response';

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
  ctx!: ActiveSpotAssetCtxFull;
}

type CommonSlimSlice = 'midPx' | 'markPx' | 'prevDayPx' | 'dayNtlVlm';

export class PerpSpotCoinExtendedSlimWs extends PickType(PerpCoin, [
  'symbol',
] as const) {
  ctx!: Pick<
    PerpSpotCoinExtended['ctx'],
    CommonSlimSlice | 'circulatingSupply'
  >;
}

export class PerpCoinExtendedSlimWs extends PickType(PerpCoin, [
  'symbol',
] as const) {
  ctx!: Pick<
    PerpCoinExtended['ctx'],
    CommonSlimSlice | 'funding' | 'openInterest'
  >;
}

export class PerpSpotCoinExtendedSlim extends OmitType(
  PerpSpotCoinExtendedSlimWs,
  ['ctx'] as const,
) {
  ctx!: PerpCoinExtendedSlimWs['ctx'] &
    Pick<PerpSpotCoinExtended['ctx'], 'categories'>;
}

export class PerpCoinExtendedSlim extends OmitType(PerpCoinExtendedSlimWs, [
  'ctx',
] as const) {
  ctx!: PerpCoinExtendedSlimWs['ctx'] &
    Pick<PerpCoinExtended['ctx'], 'maxLeverage' | 'categories'>;
}
