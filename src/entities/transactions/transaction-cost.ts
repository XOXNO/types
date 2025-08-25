import { ApiProperty } from '@nestjs/swagger';

class TransactionCostData {
  @ApiProperty()
  txGasUnits!: number;
}

export class TransactionCost {
  @ApiProperty()
  data!: TransactionCostData;
}
