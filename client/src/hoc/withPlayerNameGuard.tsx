import usePlayer from "../hooks/usePlayer";
import { useState } from "react";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";

export default function withPlayerNameGuard<P = any>(
  WrappedComponent: React.FunctionComponent
) {
  return function (props: P) {
    const socket = useSocket();
    const player = usePlayer();
    const [inputText, setInputText] = useState("");

    if (!player.loading && !player.data?.name) {
      return (
        <>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={() => {
              socket.emit(ClientEvent.NAME_PLAYER, socket.id, inputText);
            }}
          >
            Set player name
          </button>
        </>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}
