import { TransactionLog } from './transaction-log';

export class SmartContractResult {
  hash = '';
  timestamp = 0;
  nonce = 0;
  gasLimit = 0;
  gasPrice = 0;
  value = '';
  sender = '';
  receiver = '';
  relayedValue = '';
  data = '';
  prevTxHash = '';
  originalTxHash = '';
  callType = '';
  miniBlockHash: string | undefined = undefined;
  logs: TransactionLog | undefined = undefined;
  returnMessage: string | undefined = undefined;
}
