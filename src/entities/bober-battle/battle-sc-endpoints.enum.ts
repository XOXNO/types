export enum BoberBattleScEndpoints {
  JOIN_GAME = 'joinGame',
  CANCEL_GAME = 'cancelGame',
  CREATE_GAME = 'createGame',
  ACTIVE_GAMES = 'activeGames', // view
  ALLOWED_TOKENS = 'allowedTokens',
  USER_GAMES = 'userGames', // view
}

export enum BoberWheelScEndpoints {
  JOIN_WHEEL = 'joinWheel',
  SPIN = 'spin',
  GET_CURRENT_GAME = 'getCurrentGame',
  GET_CONFIG = 'getConfigs',
}
