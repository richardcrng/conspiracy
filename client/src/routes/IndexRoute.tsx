import { useEffect } from "react";
import { useSocket } from '../socket';
import { CreateGameEvent, GameCreatedEvent, SocketEvent } from "../types/event.types";

function IndexRoute() {
  const socket = useSocket()

  useEffect(() => {
    socket.on(SocketEvent.GAME_CREATED, (data: GameCreatedEvent) => {
      console.log("created game!", data);
    });
  }, [socket]);

  const handleNewGame = () => {
    const data: CreateGameEvent = {
      playerName: "Richard",
      socketId: socket.id,
    };
    socket.emit(SocketEvent.CREATE_GAME, data);
  };

  return (
    <>
      <h1>Conspiracy</h1>
      <input />
      <button onClick={handleNewGame}>New game</button>
      <button>Join game</button>
    </>
  );
}

export default IndexRoute;
