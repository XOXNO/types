import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { PerpCoinTypes } from '../../enums/perp.enum';
import { MarginTable } from './margin-table';
import { ActiveSpotAssetCtx, ActivePerpAssetCtx } from './response';

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

export class ActiveSpotAssetCtxDoc extends ActiveSpotAssetCtx {
  @ApiProperty()
  categories!: PerpCoinTypes[];
}

export class ActivePerpAssetCtxDoc extends ActivePerpAssetCtx {
  @ApiProperty()
  marginTableId!: number;

  @ApiProperty()
  categories!: PerpCoinTypes[];
}

export class ActivePerpAssetCtxDocHydrated extends OmitType(
  ActivePerpAssetCtxDoc,
  ['marginTableId'] as const,
) {
  @ApiProperty()
  marginTable!: MarginTable;

  @ApiProperty()
  maxLeverage!: number;
}

export class PerpCoinExtended extends PerpCoin {
  ctx!: ActivePerpAssetCtxDocHydrated;
}

export class PerpSpotCoinExtended extends PerpCoin {
  ctx!: ActiveSpotAssetCtxDoc;
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
  ctx!: PerpSpotCoinExtendedSlimWs['ctx'] &
    Pick<PerpSpotCoinExtended['ctx'], 'categories'>;
}

export class PerpCoinExtendedSlim extends OmitType(PerpCoinExtendedSlimWs, [
  'ctx',
] as const) {
  ctx!: PerpCoinExtendedSlimWs['ctx'] &
    Pick<PerpCoinExtended['ctx'], 'maxLeverage' | 'categories'>;
}
