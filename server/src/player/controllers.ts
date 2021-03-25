import { GameBase, Player } from "../../../client/src/types/game.types";
import { getGameById } from "../db";

export const joinPlayerToGame = (
  gameId: string,
  playerData: Player
): [Player, GameBase] => {
  const game = getGameById(gameId);
  if (game) {
    const player: Player = {
      ...playerData,
      gameId,
    };
    game.players[playerData.socketId] = player;
    return [player, game];
  } else {
    throw new Error("Couldn't find game to join");
  }
};

export const updatePlayer = (
  gameId: string,
  playerData: Player
): [Player, GameBase] => {
  const game = getGameById(gameId);
  const extantPlayer = game?.players[playerData.socketId];
  if (game && extantPlayer) {
    const resultantPlayer = Object.assign(extantPlayer, playerData);
    game.players[playerData.socketId] = resultantPlayer;
    return [resultantPlayer, game];
  } else {
    throw new Error("Couldn't update player");
  }
};