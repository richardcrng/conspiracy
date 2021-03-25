import usePlayer from "../hooks/usePlayer";
import { useState } from "react";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";
import { useParams } from "react-router";

export default function withPlayerNameGuard<P = any>(
  WrappedComponent: React.FunctionComponent
) {
  return function (props: P) {
    const { gameId } = useParams<{ gameId: string }>();
    const socket = useSocket();
    const player = usePlayer();
    console.log(player.data);
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
              socket.emit(ClientEvent.UPDATE_PLAYER, gameId, {
                socketId: socket.id,
                name: inputText,
              });
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
