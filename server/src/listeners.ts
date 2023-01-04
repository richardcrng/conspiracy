import {
  ClientEvent,
  ClientEventListeners,
  ServerSocket,
} from "../../client/src/types/event.types";
import {
  castVote,
  createHostGame,
  getGame,
  joinGame,
  kickPlayer,
  restartGame,
  startGame,
} from "./controllers";

export const addListeners = (socket: ServerSocket): void => {
  const listeners: ClientEventListeners = {
    CAST_VOTE: castVote,
    CREATE_HOST_GAME: createHostGame,
    GET_GAME: getGame,
    JOIN_GAME: joinGame,
    KICK_PLAYER: kickPlayer,
    RESTART_GAME: restartGame,
    START_GAME: startGame,
  };

  for (const [event, listener] of Object.entries(listeners) as [
    ClientEvent,
    ClientEventListeners[ClientEvent]
  ][]) {
    socket.on(event, listener);
  }
};
