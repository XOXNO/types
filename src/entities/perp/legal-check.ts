import { ApiProperty } from '@nestjs/swagger';
import { PerpOrderType } from '../../enums';

export class PerpLegalCheck {
  @ApiProperty()
  ipAllowed!: boolean;

  @ApiProperty()
  acceptedTerms!: boolean;

  @ApiProperty()
  userAllowed!: boolean;
}

export class PerpTermsTerms {
  @ApiProperty()
  type!: PerpOrderType.ACCEPT_TERMS;

  @ApiProperty()
  user!: string;
}

export class PerpTerms {
  @ApiProperty()
  action!: PerpTermsTerms;
}
