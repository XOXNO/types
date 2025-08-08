import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { TicketProfileSummary } from './event-ticket-profile.doc';

export class ManualCheckInDto {
  @ApiProperty({
    description: 'Invitation ID or wallet address for check-in',
  })
  @IsString()
  invitationIdOrAddress!: string;

  @ApiProperty({
    description: 'Selected tickets for check-in (optional)',
    type: () => [TicketProfileSummary],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketProfileSummary)
  selectedTickets?: TicketProfileSummary[];
}
