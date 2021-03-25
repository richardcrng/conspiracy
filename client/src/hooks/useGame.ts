import { useEffect } from "react";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { GameBase } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UseGameResult {
  game: GameBase | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UseGameResult = {
  loading: true,
  game: undefined,
  error: undefined,
};

export default function useGame(gameId: GameBase["id"]): UseGameResult {
  const { socket } = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);

  useEffect(() => {
    socket.emit(ClientEvent.GET_GAME, gameId);
  }, [socket, gameId]);

  useSocketListener(ServerEvent.GAME_GOTTEN, (game) => {
    dispatch(
      bundle([actions.game.create.update(game), actions.loading.create.off()])
    );
  });

  useSocketListener(ServerEvent.GAME_NOT_FOUND, () => {
    dispatch(
      bundle([
        actions.error.create.update("Game not found"),
        actions.loading.create.off(),
      ])
    );
  });

  return state;
}
