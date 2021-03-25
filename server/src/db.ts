import { ServerEvent, ServerSocket } from "../../client/src/types/event.types";
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

export const updatePlayer = (
  socket: ServerSocket,
  gameId: string,
  playerData: Player
) => {
  const game = getGameById(gameId);
  if (game) {
    const extantPlayer = game.players[playerData.socketId];
    const updatedPlayer = Object.assign(extantPlayer, playerData);
    game.players[playerData.socketId] = updatedPlayer;
    socket.emit(
      ServerEvent.PLAYER_UPDATED,
      updatedPlayer.socketId,
      updatedPlayer
    );
    socket.emit(ServerEvent.GAME_UPDATED, game.id, game);
  }
};
