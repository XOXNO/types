import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Wallet } from '../../utils/types';

export class BoberBattleLeaderboardDto {
  @ApiProperty({
    description: 'Total number of games created by the user',
    example: 25,
    type: 'integer',
  })
  GamesCreated!: number;

  @ApiProperty({
    description: 'Number of games created where user chose heads',
    example: 15,
    type: 'integer',
  })
  GamesCreatedHead!: number;

  @ApiProperty({
    description: 'Number of games created where user chose tails',
    example: 10,
    type: 'integer',
  })
  GamesCreatedTail!: number;

  @ApiProperty({
    description: 'Total number of games joined by the user',
    example: 30,
    type: 'integer',
  })
  GamesJoined!: number;

  @ApiProperty({
    description: 'Number of games joined where user chose heads',
    example: 18,
    type: 'integer',
  })
  GamesJoinedHead!: number;

  @ApiProperty({
    description: 'Number of games joined where user chose tails',
    example: 12,
    type: 'integer',
  })
  GamesJoinedTail!: number;

  @ApiProperty({
    description: 'Total number of games participated in',
    example: 55,
    type: 'integer',
  })
  TotalGames!: number;

  @ApiProperty({
    description: 'Total volume of tokens wagered',
    example: 125.5,
    type: Number,
  })
  TotalVolume!: number;

  @ApiProperty({
    description: 'Total volume in USD equivalent',
    example: 2510.75,
    type: Number,
  })
  TotalVolumeUSD!: number;

  constructor(props?: Partial<BoberBattleLeaderboardDto>) {
    Object.assign(this, props);
  }
}

export class BoberBattleUserDto extends BoberBattleLeaderboardDto {
  @ApiProperty({
    description: 'User wallet address',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  Address!: string;

  @ApiProperty({
    description: 'Total profit and loss',
    example: 15.25,
    type: Number,
  })
  TotalPNL!: number;

  @ApiProperty({
    description: 'Total profit and loss in USD',
    example: 305.5,
    type: Number,
  })
  TotalPNLUSD!: number;

  @ApiProperty({
    description: 'Number of created games that were won',
    example: 12,
    type: 'integer',
  })
  GamesCreatedWon!: number;

  @ApiProperty({
    description: 'Number of joined games that were won',
    example: 18,
    type: 'integer',
  })
  GamesJoinedWon!: number;

  @ApiProperty({
    description: 'Games won when choosing heads',
    example: 15,
    type: 'integer',
  })
  GamesWonAsHead!: number;

  @ApiProperty({
    description: 'Games lost when choosing heads',
    example: 8,
    type: 'integer',
  })
  GamesLostAsHead!: number;

  @ApiProperty({
    description: 'Games won when choosing tails',
    example: 13,
    type: 'integer',
  })
  GamesWonAsTail!: number;

  @ApiProperty({
    description: 'Games lost when choosing tails',
    example: 7,
    type: 'integer',
  })
  GamesLostAsTail!: number;

  @ApiProperty({
    description: 'Total games won',
    example: 30,
    type: 'integer',
  })
  GamesWon!: number;

  @ApiProperty({
    description: 'Total games lost',
    example: 25,
    type: 'integer',
  })
  GamesLost!: number;

  @ApiProperty({
    description: 'Win rate percentage',
    example: 54.55,
    type: 'integer',
    minimum: 0,
    maximum: 100,
  })
  WinRate!: number;

  constructor(props?: Partial<BoberBattleUserDto>) {
    super(props);
    Object.assign(this, props);
  }
}

export class BoberBattleUserDtoHydrated extends BoberBattleUserDto {
  @ApiProperty({
    description: 'Wallet object containing address and shard information',
    type: Object,
  })
  wallet!: Wallet;
}

export class BoberWheelLeaderboardDto extends OmitType(
  BoberBattleLeaderboardDto,
  [
    'GamesCreatedHead',
    'GamesCreatedTail',
    'GamesJoinedHead',
    'GamesJoinedTail',
  ] as const,
) {
  constructor(props?: Partial<BoberWheelLeaderboardDto>) {
    super(props);
    Object.assign(this, props);
  }
}

export class BoberWheelUserDto extends OmitType(BoberBattleUserDto, [
  'GamesCreatedHead',
  'GamesCreatedTail',
  'GamesJoinedHead',
  'GamesJoinedTail',
  'GamesWonAsHead',
  'GamesLostAsHead',
  'GamesWonAsTail',
  'GamesLostAsTail',
] as const) {
  constructor(props?: Partial<BoberWheelUserDto>) {
    super(props);
    Object.assign(this, props);
  }
}

export class BoberWheelUserDtoHydrated extends OmitType(BoberWheelUserDto, []) {
  @ApiProperty({
    description: 'Wallet object containing address and shard information',
    type: Object,
  })
  wallet!: Wallet;
}
