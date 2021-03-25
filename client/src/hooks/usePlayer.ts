import { useEffect } from "react";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { Player } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UsePlayerResult {
  player: Player | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UsePlayerResult = {
  loading: true,
  player: undefined,
  error: undefined,
};

export default function usePlayer(
  playerId: Player["socketId"]
): UsePlayerResult {
  const { socket } = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);

  useEffect(() => {
    playerId && socket.emit(ClientEvent.GET_PLAYER, playerId);
  }, [socket, playerId]);

  useSocketListener(ServerEvent.PLAYER_GOTTEN, (player) => {
    dispatch(
      bundle([
        actions.player.create.update(player),
        actions.loading.create.off(),
      ])
    );
  });

  useSocketListener(ServerEvent.PLAYER_NOT_FOUND, () => {
    dispatch(
      bundle([
        actions.error.create.update("Player not found"),
        actions.loading.create.off(),
      ])
    );
  });

  return state;
}
