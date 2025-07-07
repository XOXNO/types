import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString, Length } from 'class-validator';

export class EventGuestApproveDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(62, 62)
  address?: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isApproved!: boolean;
}
