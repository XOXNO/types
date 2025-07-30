import { ApiProperty } from '@nestjs/swagger';

export class Guardian {
  @ApiProperty({
    description: 'Epoch when the guardian becomes active',
    example: 1000,
    type: Number,
  })
  activationEpoch = 0;
  @ApiProperty({
    description: 'Guardian wallet address',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  address = '';
  @ApiProperty({
    description: 'Unique identifier for the guardian service',
    example: 'guardian-service-123',
    type: String,
  })
  serviceUID = '';
}

export class MvxGuardianData {
  @ApiProperty({
    description: 'Indicates whether the account is guarded',
    example: false,
    type: Boolean,
  })
  guarded = false;
  @ApiProperty({
    description: 'Currently active guardian information',
    type: () => Guardian,
    required: false,
  })
  activeGuardian?: Guardian;
  @ApiProperty({
    description: 'Pending guardian information awaiting activation',
    type: () => Guardian,
    required: false,
  })
  pendingGuardian?: Guardian;

  constructor(init?: Partial<MvxGuardianData>) {
    Object.assign(this, init);
  }
}
