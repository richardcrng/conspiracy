export interface GameStateCore {
  id: string;
  players: {
    [playerId: string]: Player;
  };
  status: GameStatus;
  conspiracyTargetId?: string | null;
  settings: GameSettings;
}

export type Game = GameStateCore;

export enum GameStatus {
  LOBBY = "lobby",
  ONGOING = "ongoing",
  END = "end",
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

export enum GameOutcome {
  CONSPIRATORS_WIN = "game-outcome/conspirators-win",
  CONSPIRATORS_LOSE = "game-outcome/conspirators-lose",
  CALM_INNOCENTS_WIN = "game-outcome/calm-innocents-win",
}

export enum PlayerOutcome {
  CONSPIRATOR_WIN = "player-outcome/conspirator-win",
  CONSPIRATOR_LOSE = "player-outcome/conspirator-lose",
  INNOCENT_WIN_VS_CONSPIRACY = "player-outcome/innocent-win-vs-conspiracy",
  INNOCENT_LOSE_VS_CONSPIRACY = "player-outcome/innocent-lose-vs-conspiracy",
  INNOCENT_WIN_NO_CONSPIRACY = "player-outcome/innocent-win-no-conspiracy",
  INNOCENT_LOSE_NO_CONSPIRACY = "player-outcome/innocent-lose-no-conspiracy",
}

export enum Vote {
  CONSPIRACY = "conspiracy",
  NO_CONSPIRACY = "no conspiracy",
}

export interface GameSettings {
  pctProbabilityConspiracy: number;
}
