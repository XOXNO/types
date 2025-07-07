import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsUUID,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
class Ticket {
  @ApiProperty({ type: 'string' })
  @IsUUID()
  ticketId!: string;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  quantity!: number;
}
export class EventInvitationCreateDto {
  @ApiProperty()
  @IsOptional()
  @Length(1, 30)
  name?: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ type: Ticket, isArray: true })
  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  tickets: Ticket[] = [];

  @ApiProperty({
    description: 'The start timestamp of the invitation.',
    example: 1627849200,
    type: 'integer',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  startTime!: number;

  @ApiProperty({
    description: 'The expiry timestamp of the invitation.',
    example: 1627852800,
    type: 'integer',
  })
  @IsNumber()
  @IsOptional()
  @Min(Math.floor(Date.now() / 1000) + 86400)
  endTime!: number;
}
