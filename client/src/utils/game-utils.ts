import { Game, Vote } from '../types/game.types'

export const gameLobbyReadiness = (
  game: Game
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

export const conspiracyVictimId = (game: Game): string | null => {
  return game.conspiracyTargetId ? game.conspiracyTargetId : null;
};

export const conspiracyVictimName = (game: Game): string | undefined => {
  if (hasConspiracy(game)) {
    // okay to assert since conspiracy id must be a player
    return game.players[game.conspiracyTargetId]!.name;
  }
};

export const hasConspiracy = (game: Game): game is Game & { conspiracyTargetId: string } => !!game.conspiracyTargetId;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && game.conspiracyTargetId === playerId;
};

export const isWinner = (game: Game, playerId: string): boolean => {
  if (isConspiracyMember(game, playerId)) {
    return getVote(game, conspiracyVictimId(game)!) === Vote.NO_CONSPIRACY;
  } else {
    const playerVote = getVote(game, playerId);
    return hasConspiracy(game)
      ? playerVote === Vote.CONSPIRACY
      : playerVote === Vote.NO_CONSPIRACY;
  }
};

export const getVote = (game: Game, playerId: string): Vote | null => {
  const player = game.players[playerId];
  if (!player) throw new Error(`Can't get vote for non-existent player ${playerId}`)
  return player.vote ?? null
};

export const hasVoted = (game: Game, playerId: string): boolean =>
  !!getVote(game, playerId);

export const haveAllVoted = (game: Game): boolean =>
  Object.values(game.players).every((player) =>
    hasVoted(game, player.socketId)
  );