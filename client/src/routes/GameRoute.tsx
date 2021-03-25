import { useState } from "react";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const socket = useSocket();

  const game = useGame(gameId);
  const player = usePlayer(socket.id);
  console.log(player);

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
            if (player.data) {
              // player is in game, so update
              socket.emit(ClientEvent.UPDATE_PLAYER, gameId, {
                socketId: socket.id,
                name: inputText,
                gameId,
              });
            } else {
              console.log("joining game");
              // player not in game, so join
              socket.emit(ClientEvent.JOIN_GAME, gameId, {
                socketId: socket.id,
                name: inputText,
              });
            }
          }}
        >
          Set player name
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Game id: {gameId}</h1>
      {player.loading || (game.loading && <p>Loading...</p>)}
      {game.data && (
        <ul>
          {Object.values(game.data.players).map((player) => (
            <li key={player.socketId}>
              {player.name}
              {player.isHost && " (host)"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default GameRoute;
