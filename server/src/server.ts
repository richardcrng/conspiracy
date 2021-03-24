import { createServer } from "http";
import { Server } from "socket.io";
import { GameBase, GameStatus } from "../../client/src/types/game.types";
import { JoinEvent, SocketEvent } from "../../client/src/types/event.types";

let game: GameBase = {
  players: {},
  status: GameStatus.LOBBY
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on(SocketEvent.JOIN, (data: JoinEvent) => {
    console.log('player has joined:', data.playerName)
  })
});


httpServer.listen(process.env.PORT ?? 4000);
