import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const socket = io("localhost:4000");

export const SocketContext = createContext(socket);

export function useSocket() {
  return useContext(SocketContext);
}
