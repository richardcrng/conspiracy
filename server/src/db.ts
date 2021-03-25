import { GameBase, Player } from "../../client/src/types/game.types";
import { Socket } from "socket.io";

export const games: Record<GameBase["id"], GameBase> = {};
export const players: Record<Socket["id"], Player> = {};
