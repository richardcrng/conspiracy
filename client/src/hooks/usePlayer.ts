import { useEffect } from "react";
import { useParams } from "react-router";
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
  const { gameId } = useParams<{ gameId: string }>();
  const playerSocketId = playerId ?? socket.id;

  const setPlayer = (player: Player) =>
    dispatch(
      bundle([actions.data.create.update(player), actions.loading.create.off()])
    );

  useEffect(() => {
    gameId &&
      playerSocketId &&
      socket.emit(ClientEvent.GET_PLAYER, gameId, playerSocketId);
  }, [socket, gameId, playerSocketId]);

  useSocketListener(ServerEvent.PLAYER_GOTTEN, (id, player) => {
    id === playerSocketId && setPlayer(player);
  });

  useSocketListener(ServerEvent.PLAYER_UPDATED, (id, player) => {
    id === playerSocketId && setPlayer(player);
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
