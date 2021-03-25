import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
} from "../../client/src/types/event.types";
import app from "./express";
import { games, getGameById, getPlayer } from "./db";
import { GameStatus, Player } from "../../client/src/types/game.types";
import { createGame, joinPlayerToGame, startGame } from "./controllers";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: ServerSocket) => {
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
    // socket.join(game.id);
    io.emit(ServerEvent.GAME_UPDATED, game.id, game);
    io.emit(ServerEvent.PLAYER_UPDATED, playerData.socketId, player);
  });

  socket.on(ClientEvent.START_GAME, (gameId) => {
    const game = startGame(gameId);
    io.emit(ServerEvent.GAME_UPDATED, game.id, game);
  });

  socket.on(ClientEvent.GET_PLAYER, (gameId, playerId) => {
    const player = getPlayer(gameId, playerId);
    player
      ? socket.emit(ServerEvent.PLAYER_GOTTEN, player.socketId, player)
      : socket.emit(ServerEvent.PLAYER_NOT_FOUND);
  });

  socket.on(ClientEvent.UPDATE_PLAYER, (gameId, playerData) => {
    const game = getGameById(gameId);
    const extantPlayer = game?.players[playerData.socketId];
    if (game && extantPlayer) {
      const resultantPlayer = Object.assign(extantPlayer, playerData);
      game.players[playerData.socketId] = resultantPlayer;
      socket.emit(
        ServerEvent.PLAYER_UPDATED,
        resultantPlayer.socketId,
        resultantPlayer
      );
      socket.emit(ServerEvent.GAME_UPDATED, game.id, game);
    } else {
      socket.emit(ServerEvent.PLAYER_NOT_FOUND);
    }
  });
});

export default httpServer;
