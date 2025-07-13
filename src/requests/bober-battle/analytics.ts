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

  constructor(data: Partial<BoberBattleLeaderboardDto>) {
    Object.assign(this, data);
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

  constructor(data: Partial<BoberBattleUserDto>) {
    super(data);
    Object.assign(this, data);
  }
}

export class BoberBattleUserDtoHydrated extends BoberBattleUserDto {
  wallet!: Wallet;
}
