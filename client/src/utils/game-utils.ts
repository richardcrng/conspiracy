import { Game, GameOutcome, Player, PlayerOutcome, Vote } from '../types/game.types'

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

export const getGameHost = (game: Game): Player & { isHost: true } => {
  const players = Object.values(game.players);
  const host = players.find((p): p is Player & { isHost: true } => !!p.isHost);
  if (!host) {
    throw new Error("Game does not appear to have a host");
  }
  return host;
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

export const isWinOutcome = (outcome: PlayerOutcome): outcome is PlayerOutcome.CONSPIRATOR_WIN | PlayerOutcome.INNOCENT_WIN_VS_CONSPIRACY | PlayerOutcome.INNOCENT_WIN_NO_CONSPIRACY => {
  return [PlayerOutcome.CONSPIRATOR_WIN, PlayerOutcome.INNOCENT_WIN_VS_CONSPIRACY, PlayerOutcome.INNOCENT_WIN_NO_CONSPIRACY].includes(outcome)
}

export const getGameOutcome = (game: Game): GameOutcome => {
  const isConspiracy = typeof game.conspiracyTargetId === "string";

  if (isConspiracy) {
    return getVote(game, getConspiracyTargetId(game)!) === Vote.NO_CONSPIRACY
      ? GameOutcome.CONSPIRATORS_LOSE
      : GameOutcome.CONSPIRATORS_WIN;
  }

  return GameOutcome.CALM_INNOCENTS_WIN
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