import {
  LaunchpadCustomData,
  MarketplaceCustomData,
  TwispayEventTicketCustomData,
} from './external-payment-request';
import { ExternalPaymentInternalStatus } from '../../../enums/external-payment-status.enum';
import { PaymentProvider } from '../../../enums/payment-provider.enum';
import { PurchaseType } from '../../../enums/purchase-type.enum';

export class ExternalPayment {
  internalStatus!: ExternalPaymentInternalStatus;
  address!: string;
  purchaseType!: PurchaseType;
  purchaseDetails!: {
    name: string;
    currency: string;
    amount: number; // payment price in specific currency + taxes
    egldFiatPrice?: number; // egld price in specific currency
    egldPrice?: number; // payment egld price
    quantity: number;
    collection: string;
    description: string;
    identifier?: string;
  };
  requestData!:
    | MarketplaceCustomData
    | LaunchpadCustomData
    | TwispayEventTicketCustomData;
  paymentProvider!: PaymentProvider;
  paymentProviderDetails!: {
    externalOrderId?: string;
    transactionId?: string;
    transactionStatus?: string;
    customerId?: string; // twispay
    siteId?: number; // twispay
  };
  customerDetails?: {
    email?: string; // maybe in the future
  };
  chainDetails?: {
    txHash: string;
    status: string;
  };
  timestamp!: number;
  ttl?: number; // set only on form creation
  id!: string;
  pk!: string;
  _ts!: number;

  constructor(props?: Partial<ExternalPayment>) {
    Object.assign(this, props);
    this.pk = this.address;
  }
}
