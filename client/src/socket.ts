import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ClientSocket } from "./types/event.types";

const socketUrl = true
  ? "https://radiant-sierra-53845.herokuapp.com/"
  : "localhost:4000";

export const socket: ClientSocket = io(socketUrl);

export const SocketContext = createContext(socket);

export function useSocket() {
  const [hasConnected, setHasConnected] = useState(false);
  const socket = useContext(SocketContext);

  // rerender when connected, to allow access to id
  useEffect(() => {
    !hasConnected &&
      socket.on("connect", () => {
        setHasConnected(true);
      });
  });

  return socket;
}
