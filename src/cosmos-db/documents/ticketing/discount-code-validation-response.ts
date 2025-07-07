import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';

export class DiscountCodeValidationResponse {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isValid!: boolean;

  @ApiProperty({ type: String })
  @IsString()
  discountType!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  discountAmount!: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  discountMaxAmount?: number;
}
