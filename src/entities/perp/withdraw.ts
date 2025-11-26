import { ApiProperty } from '@nestjs/swagger';
import {
  PerpOrderType,
  PerpTransferType,
  PerpWithdrawalChain,
} from '../../enums';

export class PerpWithdrawWithdraw {
  @ApiProperty()
  type!: PerpOrderType.WITHDRAW_ASSET;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  destinationChainId!: PerpWithdrawalChain;

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
