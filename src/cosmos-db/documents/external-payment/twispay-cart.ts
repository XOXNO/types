import { ItemType } from '../../../enums/external-payment-status.enum';

//https://twispay.github.io/
export interface TwispayCartItems {
  item: string; //name of the product
  unitPrice: string; //float (can have negative value for discounts, vouchers, etc.) – including VAT
  units: number; //quantity
  type: ItemType;
  code: string; //code of the item => string - varchar 64
  vatPercent?: number; //VAT percent
  itemDescription: string; //string - varchar 500
}
