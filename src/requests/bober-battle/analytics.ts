import { Wallet } from '../../utils/types';

export class BoberBattleLeaderboardDto {
  GamesCreated!: number;
  GamesCreatedHead!: number;
  GamesCreatedTail!: number;
  GamesJoined!: number;
  GamesJoinedHead!: number;
  GamesJoinedTail!: number;
  TotalGames!: number;
  TotalVolume!: number;
  TotalVolumeUSD!: number;

  constructor(props?: Partial<BoberBattleLeaderboardDto>) {
    Object.assign(this, props);
  }
}

export class BoberBattleUserDto extends BoberBattleLeaderboardDto {
  Address!: string;
  TotalPNL!: number;
  TotalPNLUSD!: number;
  GamesCreatedWon!: number;
  GamesJoinedWon!: number;
  GamesWonAsHead!: number;
  GamesLostAsHead!: number;
  GamesWonAsTail!: number;
  GamesLostAsTail!: number;
  GamesWon!: number;
  GamesLost!: number;
  WinRate!: number;

  constructor(props?: Partial<BoberBattleUserDto>) {
    super(props);
    Object.assign(this, props);
  }
}

export class BoberBattleUserDtoHydrated extends BoberBattleUserDto {
  wallet!: Wallet;
}
