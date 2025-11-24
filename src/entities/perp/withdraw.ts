import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderType } from '../../enums';

export class PerpWithdrawWithdraw {
  @ApiProperty()
  type!: PerpOrderType.WITHDRAW_ASSET;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  amount!: string;
}

export class PerpWithdraw {
  @ApiProperty()
  action!: PerpWithdrawWithdraw;
}
