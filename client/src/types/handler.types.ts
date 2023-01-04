import { Vote } from "./game.types";

export interface LobbyHandlers {
  onGameStart(): void;
  onPlayerKick(playerId: string): void;
}

export interface PlayerOngoingHandlers {
  onVote(vote: Vote | null): void;
}

export interface PlayerGameEndHandlers {
  onGameRestart(): void;
}