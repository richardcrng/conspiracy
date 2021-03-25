import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
  ServerIO,
} from "../../../client/src/types/event.types";
import { getPlayer } from "../db";
import { makeVote, updatePlayer } from "./controllers";

export const addPlayerListeners = (
  socket: ServerSocket,
  io: ServerIO
): void => {
  socket.on(ClientEvent.GET_PLAYER, (gameId, playerId) => {
    const player = getPlayer(gameId, playerId);
    player
      ? socket.emit(ServerEvent.PLAYER_GOTTEN, player.socketId, player)
      : socket.emit(ServerEvent.PLAYER_NOT_FOUND);
  });

  socket.on(ClientEvent.MAKE_VOTE, (gameId, playerId, vote) => {
    const game = makeVote(gameId, playerId, vote);
    io.emit(ServerEvent.GAME_UPDATED, game.id, game);
  });

  socket.on(ClientEvent.UPDATE_PLAYER, (gameId, playerData) => {
    const [player, game] = updatePlayer(gameId, playerData);
    socket.emit(ServerEvent.PLAYER_UPDATED, player.socketId, player);
    socket.emit(ServerEvent.GAME_UPDATED, game.id, game);
  });
};
