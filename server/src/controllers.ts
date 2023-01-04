import { ClientEventListeners } from "../../client/src/types/event.types";
import { GameStatus } from "../../client/src/types/game.types";
import { GameManager } from "./game/manager";
import { isEveryPlayerVoting } from '../../client/src/utils/game-utils';

export const castVote: ClientEventListeners["CAST_VOTE"] = (
  gameId,
  playerId,
  vote
) => {
  const gameManager = GameManager.for(gameId)
  if (gameManager.snapshot()?.status === GameStatus.COMPLETE) return
  
  gameManager.managePlayer(playerId).castVote(vote);
  gameManager.update(g => {
    if (isEveryPlayerVoting(g.players)) {
      g.status = GameStatus.COMPLETE
    }
  })
};

export const createHostGame: ClientEventListeners["CREATE_HOST_GAME"] = (
  hostPlayer
) => {
  GameManager.for(hostPlayer.gameId).createGameWithHost(hostPlayer);
};

export const getGame: ClientEventListeners["GET_GAME"] = (gameId) => {
  const gameManager = GameManager.for(gameId);
  if (gameManager.isRetrievable()) {
    gameManager._broadcast();
  } else {
    gameManager.io.emit("GAME_NOT_FOUND", gameId);
  }
};

export const joinGame: ClientEventListeners["JOIN_GAME"] = (gameId, player) => {
  GameManager.for(gameId).addPlayer(player);
};

export const kickPlayer: ClientEventListeners["KICK_PLAYER"] = (
  gameId,
  playerId
) => {
  GameManager.for(gameId).removePlayer(playerId);
};

export const startGame: ClientEventListeners["START_GAME"] = (gameId) => {
  GameManager.for(gameId).start();
};
