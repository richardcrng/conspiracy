import { useEffect } from "react";
import { useSocket } from "../socket";
import { ClientSocket, ServerEvent, ServerEventEmitters } from "../types/event.types";


export default function useSocketListener<ListenEvent extends ServerEvent = ServerEvent>(
  event: ListenEvent,
  listener: ServerEventEmitters[ListenEvent]
): void {
  const socket = useSocket()

  useEffect(() => {    
    // @ts-ignore
    socket.on(event, listener)

    return function cleanup() {
      socket.off(event, listener)
    }
  })
}