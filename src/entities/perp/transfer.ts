import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PerpOrderType, PerpTransferType } from '../../enums';
import { PerpWithdrawWithdraw } from './withdraw';

export class PerpTransferTransfer extends OmitType(PerpWithdrawWithdraw, [
  'type',
  'destinationChainId',
] as const) {
  @ApiProperty()
  type!: PerpOrderType.SEND_ASSET;

  @ApiProperty()
  destinationDex!: PerpTransferType;
}

export class PerpTransfer {
  @ApiProperty()
  action!: PerpTransferTransfer;
}
