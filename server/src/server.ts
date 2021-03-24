import { createServer } from "http";
import { Server } from "socket.io";
import { GameBase, GameStatus } from "../../client/src/types/game.types";
import { CreateGameEvent, JoinEvent, SocketEvent } from "../../client/src/types/event.types";
import app from "./express";
import { generateRandomGameId } from "./utils";
import { games } from "./db";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on(SocketEvent.CREATE_GAME, (data: CreateGameEvent) => {
    const gameId = generateRandomGameId()
    const createdGame: GameBase = {
      id: gameId,
      players: {
        [data.playerName]: {
          name: data.playerName,
          socketId: data.socketId
        }
      },
      status: GameStatus.LOBBY
    }
    games[gameId] = createdGame;
    socket.emit(SocketEvent.GAME_CREATED, createdGame)
  })
});

export default httpServer
