import { Game, Player, Vote } from '../types/game.types'

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

export const getConspiracyTargetId = (game: Game): string | null => {
  return game.conspiracyTargetId ? game.conspiracyTargetId : null;
};

export const getConspiracyTargetName = (game: Game): string | undefined => {
  if (isGameWithConspiracyTarget(game)) {
    // okay to assert since conspiracy id must be a player
    return game.players[game.conspiracyTargetId]!.name;
  }
};

export const isEveryPlayerVoting = (players: Record<string, Player>): players is Record<string, Player & { vote: Vote }> => {
  for (const playerId in players) {
    if (!(players[playerId]?.vote)) {
      return false
    }
  }
  
  return true
}

export const isGameWithConspiracyTarget = (game: Game): game is Game & { conspiracyTargetId: string } => !!game.conspiracyTargetId;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return isGameWithConspiracyTarget(game) && !isConspiracyTarget(game, playerId);
};

export const isConspiracyTarget = (game: Game, playerId: string): boolean => {
  return isGameWithConspiracyTarget(game) && game.conspiracyTargetId === playerId;
};

export const isInnocent = (game: Game, playerId: string): boolean => {
  if (isGameWithConspiracyTarget(game)) {
    return isConspiracyTarget(game, playerId)
  }

  return true
}

export const isWinner = (game: Game, playerId: string): boolean => {
  if (isConspiracyMember(game, playerId)) {
    return getVote(game, getConspiracyTargetId(game)!) === Vote.NO_CONSPIRACY;
  } else {
    const playerVote = getVote(game, playerId);
    return isGameWithConspiracyTarget(game)
      ? playerVote === Vote.CONSPIRACY
      : playerVote === Vote.NO_CONSPIRACY;
  }
};

enum PlayerOutcome {
  CONSPIRATOR_WIN = 'conspirator-win',
  CONSPIRATOR_LOSE = 'conspirator-lose',
  INNOCENT_WIN_VS_CONSPIRACY = 'innocent-win-vs-conspiracy',
  INNOCENT_LOSE_VS_CONSPIRACY = 'innocent-lose-vs-conspiracy',
  INNOCENT_WIN_NO_CONSPIRACY = 'innocent-win-no-conspiracy',
  INNOCENT_LOSE_NO_CONSPIRACY = 'innocent-lose-no-conspiracy',
}

export const getPlayerOutcome = (game: Game, playerId: string): PlayerOutcome => {
  const isConspiracy = typeof game.conspiracyTargetId === 'string'

  if (isConspiracy) {
    return isConspiracyTarget(game, playerId)
      ? isWinner(game, playerId)
        ? PlayerOutcome.INNOCENT_WIN_VS_CONSPIRACY
        : PlayerOutcome.INNOCENT_LOSE_VS_CONSPIRACY
      : isWinner(game, playerId)
        ? PlayerOutcome.CONSPIRATOR_WIN
        : PlayerOutcome.CONSPIRATOR_LOSE
  }

  return getVote(game, playerId) === Vote.NO_CONSPIRACY
    ? PlayerOutcome.INNOCENT_WIN_NO_CONSPIRACY
    : PlayerOutcome.INNOCENT_LOSE_NO_CONSPIRACY
}

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