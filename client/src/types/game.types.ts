export enum GameStatus {
  LOBBY = 'lobby',
  STARTED = 'started',
  COMPLETE = 'complete'
}

export interface Player {
  name: string;
  isHost?: boolean;
}

export interface GameBase {
  players: {
    [playerName: string]: Player;
  };
  status: GameStatus;
}

export interface OngoingGame extends GameBase {
  status: GameStatus.STARTED;
  conspiracyTarget: Player['name'] | null;
  votes: { [K in keyof GameBase['players']]: Player['name'] };
}