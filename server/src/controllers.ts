import { CreateGameEvent } from "../../client/src/types/event.types";
import {
  GameBase,
  GameStatus,
  Player,
} from "../../client/src/types/game.types";
import { games, getGameById } from "./db";
import { generateRandomGameId } from "./utils";

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

export const joinPlayerToGame = (
  gameId: string,
  playerData: Player
): [Player, GameBase] => {
  const game = getGameById(gameId);
  if (game) {
    const player: Player = {
      ...playerData,
      gameId,
    };
    game.players[playerData.socketId] = player;
    return [player, game];
  } else {
    throw new Error("Couldn't find game to join");
  }
};

export const startGame = (gameId: string): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.STARTED;
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};
