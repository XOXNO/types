import { ILendingAverageTimeFrame } from '../../enums/lending-average.enum';

export class LendingMarketAverageGraph {
  frame!: ILendingAverageTimeFrame;
  supplyAverage!: number;
  borrowAverage!: number;
}
