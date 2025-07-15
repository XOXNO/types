import { ApiProperty } from '@nestjs/swagger';

export class NotificationSuccessResponseDto {
  @ApiProperty({
    description: 'Operation success status',
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message!: string;
}
