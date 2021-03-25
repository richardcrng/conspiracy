import { useParams } from "react-router";
import PlayerNamer from "../components/atoms/PlayerNamer";
import GameLobby from "../components/organisms/GameLobby";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const socket = useSocket();

  const game = useGame(gameId);
  const player = usePlayer(socket.id);

  if (!player.loading && !player.data?.name) {
    return (
      <>
        <p>
          To {player.data?.isHost ? "host" : "join"} the game, please choose a
          player name first:
        </p>
        <PlayerNamer
          handleSetName={(name) => {
            if (player.data) {
              // player is in game, so update
              socket.emit(ClientEvent.UPDATE_PLAYER, gameId, {
                socketId: socket.id,
                name,
                gameId,
              });
            } else {
              // player not in game, so join
              socket.emit(ClientEvent.JOIN_GAME, gameId, {
                socketId: socket.id,
                name,
              });
            }
          }}
        />
      </>
    );
  } else
    return (
      <>
        {game.loading && <p>Loading...</p>}
        {game.data && player.data && (
          <GameLobby
            game={game.data}
            players={Object.values(game.data.players)}
            player={player.data}
          />
        )}
      </>
    );
}

export default GameRoute;
