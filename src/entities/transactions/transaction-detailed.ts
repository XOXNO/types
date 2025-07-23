import { SmartContractResult } from './smart-contract-result';
import { Transaction } from './transaction';
import { TransactionLog } from './transaction-log';
import { TransactionOperation } from './transaction-operation';

export class TransactionDetailed extends Transaction {
  results: SmartContractResult[] = [];
  // receipt: TransactionReceipt | undefined = undefined;
  price: number | undefined = undefined;
  logs: TransactionLog | undefined = undefined;
  operations: TransactionOperation[] = [];
}
