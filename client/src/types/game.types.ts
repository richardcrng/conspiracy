export enum GameStatus {
  LOBBY = "lobby",
  STARTED = "started",
  COMPLETE = "complete",
}

export interface Player {
  socketId: string;
  gameId: string;
  name?: string;
  isHost?: boolean;
}

export type Game = GameBase | OngoingGame;

export interface GameBase {
  id: string;
  players: {
    [playerName: string]: Player;
  };
  status: GameStatus;
  conspiracyTarget?: Player["name"] | null;
  votes?: { [K in keyof GameBase["players"]]: Player["name"] };
}

export interface OngoingGame extends GameBase {
  status: GameStatus.STARTED;
  conspiracyTarget: Player["name"] | null;
  votes: { [K in keyof GameBase["players"]]: Player["name"] };
}
