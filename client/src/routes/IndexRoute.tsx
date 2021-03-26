import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import useSocketListener from "../hooks/useSocketListener";
import { useSocket } from "../socket";
import {
  ClientEvent,
  CreateGameEvent,
  ServerEvent,
} from "../types/event.types";

function IndexRoute() {
  const socket = useSocket();
  const history = useHistory();

  useSocketListener(ServerEvent.GAME_CREATED, (data) => {
    history.push(`/game/${data.id}`);
  });

  const handleNewGame = () => {
    const data: CreateGameEvent = {
      socketId: socket.id,
    };
    socket.emit(ClientEvent.CREATE_GAME, data);
  };

  return (
    <>
      <h1>Conspiracy</h1>
      <Button primary onClick={handleNewGame}>
        New game
      </Button>
      <Button
        onClick={() => {
          window.alert(
            "Not implemented yet - get the game join link from your host"
          );
        }}
      >
        Join game
      </Button>
    </>
  );
}

export default IndexRoute;
