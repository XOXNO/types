import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

import { EventStageProfileCreateDto } from './event-stage-profile-create.dto';

export class EventStageProfileEditDto extends PickType(
  EventStageProfileCreateDto,
  [
    'maxLimit',
    'userLimit',
    'isEnabled',
    'isWhitelist',
    'requiredApproval',
    'prices',
  ] as const,
) {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  @IsOptional()
  name!: string;

  @ApiProperty({ minimum: Math.floor(Date.now() / 1000), type: 'integer' })
  @IsInt()
  @IsOptional()
  startTime!: number;

  @ApiProperty({
    minimum: Math.floor(Date.now() / 1000) + 86400,
    type: 'integer',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000) + 86400)
  @IsOptional()
  endTime!: number;
}
