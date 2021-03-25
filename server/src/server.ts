import { createServer } from "http";
import { Server } from "socket.io";
import { ServerSocket } from "../../client/src/types/event.types";
import app from "./express";
import { addGameListeners } from "./gameListeners";
import { addPlayerListeners } from "./playerListeners";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: ServerSocket) => {
  addGameListeners(socket, io);
  addPlayerListeners(socket, io);
});

export default httpServer;
