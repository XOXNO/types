import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderType, PerpTransferType } from '../../enums';

export class PerpTransferTransfer {
  @ApiProperty()
  type!: PerpOrderType.SEND_ASSET;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  sourceDex!: PerpTransferType;

  @ApiProperty()
  destinationDex!: PerpTransferType;
}

export class PerpTransfer {
  @ApiProperty()
  action!: PerpTransferTransfer;
}
