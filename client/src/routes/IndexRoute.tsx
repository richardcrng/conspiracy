import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSocket } from "../socket";
import {
  ClientEvent,
  CreateGameEvent,
  GameCreatedEvent,
  ServerEvent,
} from "../types/event.types";

function IndexRoute() {
  const socket = useSocket();
  const history = useHistory();

  useEffect(() => {
    const listener = (data: GameCreatedEvent) => {
      history.push(`/game/${data.id}`);
    };

    socket.on(ServerEvent.GAME_CREATED, listener);

    return function cleanup() {
      socket.off(ServerEvent.GAME_CREATED, listener);
    };
  }, [history, socket]);

  const handleNewGame = () => {
    const data: CreateGameEvent = {
      playerName: "Richard",
      socketId: socket.id,
    };
    socket.emit(ClientEvent.CREATE_GAME, data);
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
