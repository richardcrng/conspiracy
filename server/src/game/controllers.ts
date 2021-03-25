import { sample } from "lodash";
import { CreateGameEvent } from "../../../client/src/types/event.types";
import {
  Game,
  GameBase,
  GameStatus,
} from "../../../client/src/types/game.types";
import { games, getGameById } from "../db";
import { generateRandomGameId } from "../utils";

const generateConspiracyState = (game: Game): void => {
  const players = Object.values(game.players);
  const nPlayers = players.length;
  const isConspiracy = Math.random() > nPlayers / (nPlayers + 1);
  if (isConspiracy) {
    const conspiracyTarget = sample(players)!;
    game.conspiracyTarget = conspiracyTarget.socketId;
  } else {
    game.conspiracyTarget = null;
  }
};

export const createGame = (data: CreateGameEvent): GameBase => {
  const gameId = generateRandomGameId();
  const game: GameBase = {
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
  games[gameId] = game;
  return game;
};

export const startGame = (gameId: string): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.STARTED;
    generateConspiracyState(game);
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};
