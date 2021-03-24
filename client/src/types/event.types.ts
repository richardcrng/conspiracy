import { GameBase } from "./game.types";

export enum SocketEvent {
  JOIN = 'join',
  CREATE_GAME = 'create-game',
  GAME_CREATED = 'game-created'
}

export interface GameCreatedEvent extends GameBase {}

export interface JoinEvent {
  playerName: string;
  socketId: string;
}

export interface CreateGameEvent {
  playerName: string;
  socketId: string;
}