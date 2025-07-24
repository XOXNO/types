import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class EventGuestApproveDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Length(62, 62)
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isApproved!: boolean;
}
