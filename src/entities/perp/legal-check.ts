import { ApiProperty } from '@nestjs/swagger';

export class PerpLegalCheck {
  @ApiProperty()
  ipAllowed!: boolean;

  @ApiProperty()
  acceptedTerms!: boolean;

  @ApiProperty()
  userAllowed!: boolean;
}
