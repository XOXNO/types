import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderGrouping, PerpOrderTpsl, PerpOrderType } from '../../enums';

export class PerpOrderLimitType {
  @ApiProperty()
  tif!: PerpOrderLimitType;
}

export class PerpOrderTriggerType {
  @ApiProperty()
  isMarket!: boolean;

  @ApiProperty()
  triggerPx!: string;

  @ApiProperty()
  tpsl!: PerpOrderTpsl;
}

export class PerpOrderOrder {
  @ApiProperty()
  a!: string;

  @ApiProperty()
  b!: boolean;

  @ApiProperty()
  p!: string;

  @ApiProperty()
  s!: string;

  @ApiProperty()
  r!: boolean;

  @ApiProperty()
  type!: { limit: PerpOrderLimitType } | { trigger: PerpOrderTriggerType };

  @ApiProperty()
  c?: string;
}

export class PerpOrderAction {
  @ApiProperty()
  type!: PerpOrderType.ORDER;

  @ApiProperty()
  orders!: PerpOrderOrder[];

  @ApiProperty()
  grouping!: PerpOrderGrouping;
}

export class PerpOrder {
  @ApiProperty()
  action!: PerpOrderAction;

  @ApiProperty()
  expiresAfter!: number;
}

export class PerpOrderResponseStatusResting {
  @ApiProperty()
  resting!: { oid: number };
}

export class PerpOrderResponseStatusError {
  @ApiProperty()
  error!: string;
}

export class PerpOrderResponseStatusFilled {
  @ApiProperty()
  filled!: { oid: number; totalSz: string; avgPx: string };
}

export type PerpOrderResponseStatus =
  | PerpOrderResponseStatusResting
  | PerpOrderResponseStatusError
  | PerpOrderResponseStatusFilled;

export class PerpOrderResponse {
  @ApiProperty()
  type!: PerpOrderType.ORDER;

  @ApiProperty()
  statuses!: PerpOrderResponseStatus[];
}
