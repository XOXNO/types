import { TransactionLogEvent } from './transaction-log-event';

export class TransactionLog {
  id?: string;
  address = '';
  events: TransactionLogEvent[] = [];
  timestamp = 0;
  txHash = '';
}
