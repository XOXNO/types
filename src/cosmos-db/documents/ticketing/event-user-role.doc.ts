import { AddressUtils } from '@multiversx/sdk-nestjs-common';

import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import {
  EventUserRoles,
  EventUserRolePermission,
} from './event-user-roles.enum';
import { TicketingDataType } from './ticketing-data-type.enum';

export enum RoleStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
}

export class EventUserRoleDoc {
  @ApiProperty({
    description: 'Type of the document.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
  })
  dataType: string = TicketingDataType.USER_ROLE;

  @ApiProperty({
    description: 'Unique identifier for the event.',
    required: false,
  })
  eventId?: string;

  @ApiProperty({ description: 'User wallet address', required: false })
  wallet?: string;

  @ApiProperty({ description: 'User name', required: false })
  name!: string;

  @ApiProperty({ description: 'User email address', required: false })
  email?: string;

  @ApiProperty({
    description: 'Role of the user.',
    isArray: true,
    enum: EventUserRoles,
    enumName: 'EventUserRoles',
  })
  role!: EventUserRoles[];

  @ApiProperty({
    description: 'Permissions of the user.',
    isArray: true,
    enum: EventUserRolePermission,
    enumName: 'EventUserRolePermission',
  })
  permissions!: EventUserRolePermission[];

  @ApiProperty({
    description: 'Timestamp for when the user role was created.',
    type: 'integer',
    required: false,
  })
  @IsInt()
  createdAt?: number;

  @ApiProperty({
    description: 'Timestamp for when the user role will expire.',
    type: 'integer',
    required: false,
  })
  @IsInt()
  endTime?: number;

  @ApiProperty({
    description: 'Unique identifier for the document.',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Status of the user role.',
    enum: RoleStatus,
    enumName: 'RoleStatus',
    required: false,
  })
  status?: RoleStatus;

  pk?: string;
  @IsInt()
  _ts?: number;

  constructor(props?: Partial<EventUserRoleDoc>) {
    Object.assign(this, props);
    if (this.wallet && AddressUtils.isAddressValid(this.wallet) && !this.id) {
      this.id = `${this.wallet}_${this.eventId}_${this.dataType}`;
    }
    this.pk = this.eventId;
  }
}

export class EventUserRole extends EventUserRoleDoc {
  @ApiProperty({
    description: 'User profile picture.',
  })
  profile!: string;

  @ApiProperty({
    description: 'User wallet herotag.',
  })
  herotag!: string;
}
