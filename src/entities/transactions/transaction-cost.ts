import { ApiProperty } from '@nestjs/swagger';

export class TransactionCostData {
  @ApiProperty()
  txGasUnits!: number;
}
