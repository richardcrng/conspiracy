export interface GameStateCore {
  id: string;
  players: {
    [playerId: string]: Player;
  };
  status: GameStatus;
  conspiracyTargetId?: string | null;
}

export type Game = GameStateCore;

export enum GameStatus {
  LOBBY = "lobby",
  STARTED = "started",
  COMPLETE = "complete",
}

export interface LocalPlayerData {
  id: string;
  name: string;
  gameId?: string;
}

export interface Player extends LocalPlayerData {
  socketId: string;
  gameId: string;
  isHost?: boolean;
  vote?: Vote | null;
}

export enum Vote {
  CONSPIRACY = "conspiracy",
  NO_CONSPIRACY = "no conspiracy",
}