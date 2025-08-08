import { AddressUtils } from '@multiversx/sdk-nestjs-common';

import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { RoleStatus } from '../../../enums/event-user-role.doc';
import {
  EventUserRolePermission,
  EventUserRoles,
} from '../../../enums/event-user-roles.enum';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventUserRoleDoc {
  @ApiProperty({
    description: 'Type of the document.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
  })
  dataType = TicketingDataType.USER_ROLE;

  @ApiProperty({
    description: 'Unique identifier for the event.',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  eventId?: string;

  @ApiProperty({ description: 'User wallet address', required: false })
  @IsString()
  @IsOptional()
  wallet?: string;

  @ApiProperty({ description: 'User name', required: false })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'User email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Role of the user.',
    isArray: true,
    enum: EventUserRoles,
    enumName: 'EventUserRoles',
  })
  @IsArray()
  @ArrayMaxSize(3)
  @IsEnum(EventUserRoles, { each: true })
  role!: EventUserRoles[];

  @ApiProperty({
    description: 'Permissions of the user.',
    isArray: true,
    enum: EventUserRolePermission,
    enumName: 'EventUserRolePermission',
  })
  @IsArray()
  @IsEnum(EventUserRolePermission, { each: true })
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
  @Min(Math.floor(Date.now() / 1000))
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
  @IsEnum(RoleStatus)
  status?: RoleStatus;

  @ApiProperty({
    description: 'Partition key for Cosmos DB document.',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Timestamp for document in Cosmos DB.',
    type: 'integer',
    required: false,
  })
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
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({
    description: 'User wallet herotag.',
  })
  herotag!: string;
}
