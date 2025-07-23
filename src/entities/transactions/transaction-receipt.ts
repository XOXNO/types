export class TransactionReceipt {
  constructor(init?: Partial<TransactionReceipt>) {
    Object.assign(this, init);
  }
  value = '';
  sender = '';
  data = '';
}
