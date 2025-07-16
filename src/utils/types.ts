import { ActivityChain } from '../enums/common.enum';

export type PublicOnly<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export interface Wallet {
  address: string;
  addressTrimmed: string;
  profile: string;
  username: string;
  isVerified: boolean;
  chain?: ActivityChain;
}
