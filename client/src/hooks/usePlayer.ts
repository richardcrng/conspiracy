import { useEffect } from "react";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { Player } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UsePlayerResult {
  data: Player | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UsePlayerResult = {
  loading: true,
  data: undefined,
  error: undefined,
};

export default function usePlayer(
  playerId?: Player["socketId"]
): UsePlayerResult {
  const socket = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);

  const playerSocketId = playerId ?? socket.id;

  const setPlayer = (player: Player) =>
    dispatch(
      bundle([actions.data.create.update(player), actions.loading.create.off()])
    );

  useEffect(() => {
    playerSocketId && socket.emit(ClientEvent.GET_PLAYER, playerSocketId);
  }, [socket, playerSocketId]);

  useSocketListener(ServerEvent.PLAYER_GOTTEN, (player) => {
    setPlayer(player);
  });

  useSocketListener(ServerEvent.PLAYER_UPDATED, (player) => {
    if (player.socketId === playerSocketId) {
      setPlayer(player);
    }
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
