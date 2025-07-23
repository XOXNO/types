/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionType } from '../../enums/transaction-type.enum';

export class Transaction {
  txHash = '';
  gasLimit: number | undefined = undefined;
  gasPrice: number | undefined = undefined;
  gasUsed: number | undefined = undefined;
  miniBlockHash: string | undefined = undefined;
  nonce: number | undefined = undefined;
  receiver = '';
  receiverShard = 0;
  round: number | undefined = undefined;
  sender = '';
  senderShard = 0;
  signature: string | undefined = undefined;
  status = '';
  value = '';
  fee: string | undefined = undefined;
  timestamp = 0;
  data: string | undefined = undefined;
  function: string | undefined = undefined;
  action: any | undefined = undefined;
  scamInfo: any | undefined = undefined;
  type: TransactionType | undefined = undefined;
  originalTxHash: string | undefined = undefined;
  pendingResults: boolean | undefined = undefined;

  getDate(): Date | undefined {
    if (this.timestamp) {
      return new Date(this.timestamp * 1000);
    }

    return undefined;
  }
}
