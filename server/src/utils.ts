import { CreateGameEvent } from "../../client/src/types/event.types";
import { GameBase, GameStatus } from "../../client/src/types/game.types";

export const createGame = (data: CreateGameEvent): GameBase => {
  const gameId = generateRandomGameId();
  return {
    id: gameId,
    players: {
      [data.socketId]: {
        name: data.playerName,
        socketId: data.socketId,
        isHost: true,
        gameId,
      },
    },
    status: GameStatus.LOBBY,
  };
};

export const generateRandomGameId = (): string => {
  const stringOptions = "ABCDEFGHIJLKMNOPQRSTUVWXYZ1234567890";
  const randomChars = [...Array(5).keys()].map(
    () => stringOptions[Math.floor(Math.random() * stringOptions.length)]
  );
  return randomChars.join("");
};
