import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
} from "../../client/src/types/event.types";
import app from "./express";
import { createGame } from "./utils";
import { games } from "./db";

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
    const game = games[gameId];
    game
      ? socket.emit(ServerEvent.GAME_GOTTEN, game)
      : socket.emit(ServerEvent.GAME_NOT_FOUND);
  });

  socket.on(ClientEvent.JOIN_GAME, (e) => {
    const game = games[e.gameId];
    if (game) {
      socket.emit(ServerEvent.GAME_JOINED, { game });
    } else {
      socket.emit(ServerEvent.REDIRECT_TO_LOBBY);
    }
  });
});

export default httpServer;
