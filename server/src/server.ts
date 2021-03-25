import { createServer } from "http";
import { Server } from "socket.io";
import { ClientEvent, ServerEvent, ServerSocket } from "../../client/src/types/event.types";
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
    const createdGame = createGame(e)
    games[createdGame.id] = createdGame;
    socket.emit(ServerEvent.GAME_CREATED, createdGame)
    // socket should join the room for the created game
    socket.join(createdGame.id)
  })
});

export default httpServer
