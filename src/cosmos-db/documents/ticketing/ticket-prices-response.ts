import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';

export class StagePrice {
  @ApiProperty({ type: String })
  @IsString()
  stageId!: string;

  @ApiProperty({ type: String })
  @IsString()
  stageName!: string;

  @ApiProperty({ type: String })
  @IsString()
  ticketTypeId!: string;

  @ApiProperty({ type: String })
  @IsString()
  ticketTypeName!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  normalPrice!: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  discountedPrice!: number;

  @ApiProperty({ type: 'integer' })
  @IsInt()
  quantity!: number;
}

export class TicketPricesResponse {
  @ApiProperty({ type: String })
  @IsString()
  currency!: string;

  @ApiProperty({ type: [StagePrice] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StagePrice)
  stagePrices!: StagePrice[];

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  vat?: number;
}
