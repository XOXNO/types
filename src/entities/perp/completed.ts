import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderType } from '../../enums';
import { PerpTransferTransfer } from './transfer';

export class PerpSend extends PerpTransferTransfer {
  @ApiProperty()
  ntlValue!: string;

  @ApiProperty()
  nativeTokenFee!: string;

  @ApiProperty()
  fee!: string;

  @ApiProperty()
  feeToken!: string;

  @ApiProperty()
  nonce!: number;

  @ApiProperty()
  sender!: string;
}

export class PerpDepositCompleted {
  @ApiProperty()
  type!: PerpOrderType.DEPOSIT_ASSET;

  @ApiProperty()
  ntl!: string;
}

export class PerpWithdrawCompleted {
  @ApiProperty()
  type!: PerpOrderType.WITHDRAW_ASSET;

  @ApiProperty()
  ntl!: string;

  @ApiProperty()
  nonce!: number;

  @ApiProperty()
  fee!: string;
}

export type PerpCompleted =
  | PerpDepositCompleted
  | PerpWithdrawCompleted
  | PerpSend;
