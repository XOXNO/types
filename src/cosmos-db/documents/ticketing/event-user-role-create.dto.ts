import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import {
  EventUserRoles,
  EventUserRolePermission,
} from './event-user-roles.enum';

export class EventUserRoleCreateDto {
  @ApiProperty({ description: 'User wallet address', required: false })
  @IsString()
  @IsOptional()
  wallet?: string;

  @ApiProperty({ description: 'User name' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'User email', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Assigned Roles',
    enum: EventUserRoles,
    enumName: 'EventUserRoles',
    isArray: true,
  })
  @IsArray()
  @ArrayMaxSize(3)
  @IsEnum(EventUserRoles, { each: true })
  role!: EventUserRoles[];

  @ApiProperty({
    description: 'Assigned Permissions',
    enum: EventUserRolePermission,
    enumName: 'EventUserRolePermission',
    isArray: true,
  })
  @IsArray()
  @IsEnum(EventUserRolePermission, { each: true })
  permissions!: EventUserRolePermission[];

  @ApiProperty({
    description: 'The expiry timestamp of the role.',
    example: 1627852800,
    type: 'integer',
  })
  @IsInt()
  @IsOptional()
  @Min(Math.floor(Date.now() / 1000))
  endTime!: number;
}
