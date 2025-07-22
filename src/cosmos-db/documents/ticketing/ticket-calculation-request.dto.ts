import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';

import { TicketSelectionDto } from './event-guest-registration.dto';

export class TicketCalculationRequestDto {
  @ApiProperty({ type: String, nullable: true, required: false })
  @IsString()
  @IsOptional()
  referralCode?: string | null;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsString()
  @IsOptional()
  discountCode?: string | null;

  @ApiProperty({ type: () => [TicketSelectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketSelectionDto)
  ticketSelections: TicketSelectionDto[] = [];
}
