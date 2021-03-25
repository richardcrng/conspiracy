import { useEffect, useState } from "react";
import { useRiducer } from 'riduce';
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { GameBase } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UseGameResult {
  game: GameBase | undefined,
  loading: boolean;
  error: string | undefined;
}

const initialState: UseGameResult = {
  loading: true,
  game: undefined,
  error: undefined
}

export default function useGame(gameId: GameBase['id']): UseGameResult {
  const socket = useSocket()
  const { state, dispatch, actions } = useRiducer(initialState)

  useEffect(() => {
    socket.emit(ClientEvent.GET_GAME, gameId)
  }, [socket, gameId])

  // const listener = (game: GameBase) => {
  //   dispatch(actions.game.create.update(game));
  // };

  // socket.on(ServerEvent.GAME_GOTTEN, listener);

  // return function cleanup() {
  //   socket.off(ServerEvent.GAME_GOTTEN, listener);
  // };

  useSocketListener(ServerEvent.GAME_GOTTEN, (game) => {
    dispatch(actions.game.create.update(game))
  })

  return state
}