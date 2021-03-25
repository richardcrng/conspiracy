import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
} from "../../client/src/types/event.types";
import app from "./express";
import { createGame } from "./utils";
import { games, getGameById, getPlayer } from "./db";
import { Player } from "../../client/src/types/game.types";

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
    games[createdGame.id] = createdGame;
    socket.emit(ServerEvent.GAME_CREATED, createdGame);
    // socket should join the room for the created game
    socket.join(createdGame.id);
  });

  socket.on(ClientEvent.GET_GAME, (gameId) => {
    const game = getGameById(gameId);
    game
      ? socket.emit(ServerEvent.GAME_GOTTEN, game.id, game)
      : socket.emit(ServerEvent.GAME_NOT_FOUND);
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
    if (extantPlayer) {
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

  socket.on(ClientEvent.JOIN_GAME, (gameId, playerData) => {
    const game = getGameById(gameId);
    if (game) {
      const player: Player = {
        ...playerData,
        gameId,
      };
      game.players[playerData.socketId] = player;
      // socket should join the room for the created game
      socket.join(game.id);
      socket.emit(ServerEvent.GAME_UPDATED, game.id, game);
      socket.to(gameId).emit(ServerEvent.GAME_UPDATED, game.id, game);
      socket.emit(ServerEvent.PLAYER_UPDATED, playerData.socketId, player);
    } else {
      socket.emit(ServerEvent.REDIRECT_TO_LOBBY);
    }
  });
});

export default httpServer;
