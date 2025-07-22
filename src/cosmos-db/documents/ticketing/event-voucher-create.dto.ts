import { OmitType, PartialType } from '@nestjs/swagger';

import { EventVoucherDoc } from './event-voucher.doc';

export class EventVoucherCreateDto extends PartialType(
  OmitType(EventVoucherDoc, [
    'id',
    'dataType',
    'usedCount',
    'createdAt',
    'createdBy',
  ] as const),
) {}
