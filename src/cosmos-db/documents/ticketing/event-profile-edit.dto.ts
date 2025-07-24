import { PartialType } from '@nestjs/swagger';

import { EventProfileCreateDto } from './event-profile-create.dto';

export class EventProfileEditDto extends PartialType(EventProfileCreateDto) {}
