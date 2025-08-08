import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { TicketsType } from './event-invitation-create.dto';

export class ManualCheckInDto {
  @ApiProperty({
    description: 'Invitation ID or wallet address for check-in',
  })
  @IsString()
  invitationIdOrAddress!: string;

  @ApiProperty({
    description: 'Selected tickets for check-in (optional)',
    type: () => [TicketsType],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketsType)
  selectedTickets?: TicketsType[];
}
