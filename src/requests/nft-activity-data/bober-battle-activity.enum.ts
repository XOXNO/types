import { ActivityChain } from '../../common/enums';

export enum BoberBattleActivity {
  NEW_GAME = 'newGame',
  END_GAME = 'endGame',
  CANCEL_GAME = 'cancelGame',
  SPIN = 'spin',
  JOIN_WHEEL = 'joinWheel',
}

export enum BoberBattleGames {
  BOBER_BATTLE = 'bober-battle',
  BOBER_WHEEL = 'bober-wheel',
}

interface IBoberBattleGlobal {
  GamesCreated: number;
  GamesCreatedHead: number;
  GamesCreatedTail: number;
  GamesJoined: number;
  GamesJoinedHead: number;
  GamesJoinedTail: number;
  TotalGames: number;
  TotalVolume: number;
}

interface IBoberWheelGlobal {
  TotalGames: number;
  TotalVolume: number;
}

interface IBoberBattlePlayer extends IBoberBattleGlobal {
  GamesCreatedWon: number;
  GamesJoinedWon: number;
  GamesWonAsHead: number;
  GamesLostAsHead: number;
  GamesWonAsTail: number;
  GamesLostAsTail: number;
  GamesWon: number;
  GamesLost: number;
  WinRate: number;
  NetProfit?: number;
}

interface IBoberWheelPlayer extends IBoberWheelGlobal {
  GamesWon: number;
  GamesLost: number;
  WinRate: number;
  NetProfit?: number;
}

interface WithChain {
  chain: ActivityChain;
}

export interface IBoberBattleGlobalResult extends WithChain {
  type: BoberBattleGames.BOBER_BATTLE;
  player: null;
  data: IBoberBattleGlobal;
}

export interface IBoberBattlePlayerResult extends WithChain {
  type: BoberBattleGames.BOBER_BATTLE;
  player: string;
  data: IBoberBattlePlayer;
}

export interface IBoberWheelGlobalResult extends WithChain {
  type: BoberBattleGames.BOBER_WHEEL;
  player: null;
  data: IBoberWheelGlobal;
}

export interface IBoberWheelPlayerResult extends WithChain {
  type: BoberBattleGames.BOBER_WHEEL;
  player: string;
  data: IBoberWheelPlayer;
}

export type IGameAnalytics =
  | IBoberBattleGlobalResult
  | IBoberBattlePlayerResult
  | IBoberWheelGlobalResult
  | IBoberWheelPlayerResult;
