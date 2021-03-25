import { GameBase, Player } from "../../client/src/types/game.types";
// import { Socket } from "socket.io";

export const games: Record<GameBase["id"], GameBase> = {};
// export const players: Record<Socket["id"], Player> = {};

export const getGames = () => games;

export const getGameById = (gameId: GameBase["id"]): GameBase | undefined => {
  return getGames()[gameId];
};

export const getPlayer = (
  gameId: string,
  playerId: string
): Player | undefined => {
  const game = getGameById(gameId);
  return game?.players[playerId];
};
