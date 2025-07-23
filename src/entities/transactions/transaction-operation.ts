/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionOperationType } from '../../enums/transaction-operation-type.enum';
import { TransactionOperationAction } from '../../enums/transaction.operation.action';

export class TransactionOperation {
  id?: string = '';

  action: TransactionOperationAction = TransactionOperationAction.none;
  type: TransactionOperationType = TransactionOperationType.none;
  esdtType?: any;
  identifier = '';
  collection?: string;
  name?: string;
  value?: string;
  sender = '';
  receiver = '';
  decimals?: number;
  data?: string = '';
  message?: string = '';
}
