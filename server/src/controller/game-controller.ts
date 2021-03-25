import { GameBase } from "../../../client/src/types/game.types";
import { games } from "../db";

export function getGameById(gameId: GameBase['id']): GameBase | undefined {
  return games[gameId];
}