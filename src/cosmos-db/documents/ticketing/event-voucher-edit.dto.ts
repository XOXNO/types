import { OmitType, PartialType } from '@nestjs/swagger';

import { EventVoucherCreateDto } from './event-voucher-create.dto';

export class EventVoucherEditDto extends PartialType(
  OmitType(EventVoucherCreateDto, ['code', 'eventId'] as const),
) {}
