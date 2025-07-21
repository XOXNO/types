import { PickType } from '@nestjs/swagger';
import { EventVoucherDoc } from '../ticketing/event-voucher.doc';

export class ShortVoucherDoc extends PickType(EventVoucherDoc, [
  'amount',
  'type',
  'maxDiscountAmount',
] as never) {}
