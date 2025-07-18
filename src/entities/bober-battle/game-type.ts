import { ActivityChain } from '../../enums/common.enum';
import {
  TokenDataDoc,
  TokenDataDocHydrated,
} from '../token-data/token-data.doc';

export interface BoberBattleGame {
  id: string;
  choice: string;
  token: string;
  value: string;
  valueShort: number;
  creator: string;
  creatorUsername?: string;
  creatorProfile?: string;
  player?: string;
  playerUsername?: string;
  playerProfile?: string;
  winner?: string;
  winnerChoice?: string;
  isPrivate: boolean;
  chain?: ActivityChain;
  createdAt?: number;
}

export interface GameConfigs {
  admins: string[]; // Array of wallet addresses
  gameToken: TokenDataDocHydrated; // Token identifier
  gameFees: number; // Using string for BigUint equivalent
  gameMinBet: string; // Using string for BigUint equivalent
  gameRevenue: string; // Using string for BigUint equivalent
  jackpotChance: number; // Using string for BigUint equivalent
  jackpotBalance: string; // Using string for BigUint equivalent
  jackpotThreshold: string; // Using string for BigUint equivalent
  jackpotPercentage: number; // Using string for BigUint equivalent
  roundTime: number; // u64 becomes number
  lastGameId: number; // u64 becomes number
  isPaused: boolean; // bool becomes boolean
}

export interface BoberWheelPlayer {
  gameId: number;
  player: string;
  playerProfile?: string;
  playerUsername?: string;
  value: string;
  valueShort: number;
  jackpot: string;
  startsAt: number;
  activityType?: string;
}

export interface BoberWheelGame {
  players: BoberWheelPlayer[];
  totalBet: string;
  startsAt: number;
  jackpot: string;
  gameId: number;
  winners: BoberWheelWinner[];
}

export interface BoberWheelWinner
  extends Pick<BoberWheelPlayer, 'gameId' | 'value' | 'valueShort'> {
  wonJackpot: boolean;
  winner: string;
  winnerProfile?: string;
  winnerUsername?: string;
  activityType?: string;
}

// Stream event types that include activity information
export interface BoberWheelPlayerStreamEvent extends BoberWheelPlayer {
  activityType: string;
  chain?: ActivityChain;
}

export interface BoberWheelWinnerStreamEvent extends BoberWheelWinner {
  activityType: string;
  chain?: ActivityChain;
}
