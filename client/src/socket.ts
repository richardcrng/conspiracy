import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { ClientSocket } from "./types/event.types";

export const socket: ClientSocket = io("localhost:4000");

export const SocketContext = createContext(socket);

export function useSocket(): ClientSocket {
  return useContext(SocketContext);
}
