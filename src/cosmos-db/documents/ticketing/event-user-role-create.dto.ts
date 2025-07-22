import { PickType } from '@nestjs/swagger';

import { EventUserRoleDoc } from './event-user-role.doc';

export class EventUserRoleCreateDto extends PickType(EventUserRoleDoc, [
  'wallet',
  'name',
  'email',
  'role',
  'permissions',
  'endTime',
] as const) {}
