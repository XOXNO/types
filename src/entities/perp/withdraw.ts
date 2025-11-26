import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderType, PerpTransferType } from '../../enums';

export class PerpWithdrawWithdraw {
  @ApiProperty()
  type!: PerpOrderType.WITHDRAW_ASSET;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  destinationChainId!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  sourceDex!: PerpTransferType;
}

export class PerpWithdraw {
  @ApiProperty()
  action!: PerpWithdrawWithdraw;
}
