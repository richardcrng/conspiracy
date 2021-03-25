import { Socket as TClientSocket } from 'socket.io-client'
import { Socket as TServerSocket } from 'socket.io';
import { GameBase } from "./game.types";

export type ClientSocket = TClientSocket<ServerEventEmitters, ClientEventEmitters>

export type ServerSocket = TServerSocket<ClientEventEmitters, ServerEventEmitters>

export enum ClientEvent {
  JOIN = "join",
  CREATE_GAME = "create-game"
}

export enum ServerEvent {
  GAME_CREATED = 'game-created'
}

export type ClientEventEmitters = {
  [ClientEvent.JOIN]: (e: JoinEvent) => void;
  [ClientEvent.CREATE_GAME]: (e: CreateGameEvent) => void;
}

export type ServerEventEmitters = {
  [ServerEvent.GAME_CREATED]: (e: GameCreatedEvent) => void;
};

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