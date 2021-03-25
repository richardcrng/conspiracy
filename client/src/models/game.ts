import { GameBase } from "../types/game.types";

export const gameLobbyReadiness = (
  game: GameBase
): { isReady: true } | { isReady: false; reason: string } => {
  const players = Object.entries(game.players);
  if (players.length < 3) {
    return {
      isReady: false,
      reason: "At least three players are needed",
    };
  } else {
    return { isReady: true };
  }
};
