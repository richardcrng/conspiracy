import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ClientEventEmitters, ServerEventEmitters } from "./types/event.types";

export const socket: Socket<ServerEventEmitters, ClientEventEmitters> = io("localhost:4000");

export const SocketContext = createContext(socket);

export function useSocket() {
  return useContext(SocketContext);
}
