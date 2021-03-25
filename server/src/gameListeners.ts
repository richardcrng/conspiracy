import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
} from "../../client/src/types/event.types";
import { Server } from "socket.io";
import { createGame, joinPlayerToGame, startGame } from "./controllers";
import { getGameById } from "./db";

export const addGameListeners = (socket: ServerSocket, io: Server): void => {
  socket.on(ClientEvent.CREATE_GAME, (e) => {
    const createdGame = createGame(e);
    socket.emit(ServerEvent.GAME_CREATED, createdGame);
  });

  socket.on(ClientEvent.GET_GAME, (gameId) => {
    const game = getGameById(gameId);
    game
      ? socket.emit(ServerEvent.GAME_GOTTEN, game.id, game)
      : socket.emit(ServerEvent.GAME_NOT_FOUND);
  });

  socket.on(ClientEvent.JOIN_GAME, (gameId, playerData) => {
    const [player, game] = joinPlayerToGame(gameId, playerData);
    io.emit(ServerEvent.GAME_UPDATED, game.id, game);
    io.emit(ServerEvent.PLAYER_UPDATED, playerData.socketId, player);
  });

  socket.on(ClientEvent.START_GAME, (gameId) => {
    const game = startGame(gameId);
    io.emit(ServerEvent.GAME_UPDATED, game.id, game);
  });
};
