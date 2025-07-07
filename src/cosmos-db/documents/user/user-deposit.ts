export class UserDeposit {
  balance!: string;
  balanceShort!: number;
  paymentToken!: string;
  paymentTokenNonce!: number;
  usdPrice!: number;

  constructor(props: Partial<UserDeposit>) {
    Object.assign(this, props);
  }
}

export type UserDepositType = UserDeposit;
