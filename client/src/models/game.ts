import { Game, GameBase } from "../types/game.types";

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

export const conspiracyVictimName = (game: Game): string | undefined => {
  if (hasConspiracy(game)) {
    return game.players[game.conspiracyTarget!].name;
  }
};

export const hasConspiracy = (game: Game) => !!game.conspiracyTarget;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && game.conspiracyTarget === playerId;
};

export const hasVoted = (game: Game, playerId: string): boolean =>
  !!(game.votes && game.votes[playerId]);
