import { Socket as TClientSocket } from "socket.io-client";
import { Socket as TServerSocket } from "socket.io";
import { GameBase } from "./game.types";

export type ClientSocket = TClientSocket<
  ServerEventListeners,
  ClientEventListeners
>;

export type ServerSocket = TServerSocket<
  ClientEventListeners,
  ServerEventListeners
>;

export enum ClientEvent {
  CREATE_GAME = "create-game",
  GET_GAME = "get-game",
  JOIN_GAME = "join",
}

export enum ServerEvent {
  GAME_CREATED = "game-created",
  GAME_GOTTEN = "game-gotten",
  GAME_JOINED = "game-joined",
  GAME_NOT_FOUND = "game-not-found",
  REDIRECT_TO_LOBBY = "redirect-to-lobby",
}

export type ClientEventListeners = {
  [ClientEvent.CREATE_GAME]: (e: CreateGameEvent) => void;
  [ClientEvent.GET_GAME]: (gameId: string) => void;
  [ClientEvent.JOIN_GAME]: (e: JoinGameEvent) => void;
};

export type ServerEventListeners = {
  [ServerEvent.GAME_CREATED]: (e: GameCreatedEvent) => void;
  [ServerEvent.GAME_GOTTEN]: (game: GameBase) => void;
  [ServerEvent.GAME_JOINED]: (e: GameJoinedEvent) => void;
  [ServerEvent.GAME_NOT_FOUND]: () => void;
  [ServerEvent.REDIRECT_TO_LOBBY]: () => void;
};

export interface GameCreatedEvent extends GameBase {}

export interface CreateGameEvent {
  playerName: string;
  socketId: string;
}

export interface JoinGameEvent {
  playerName: string;
  socketId: string;
  gameId: GameBase["id"];
}

export interface GameJoinedEvent {
  game: GameBase;
}
