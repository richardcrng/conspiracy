import { useParams } from "react-router";
import PlayerNamer from "../components/atoms/PlayerNamer";
import GamePage from "../components/pages/GamePage";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";
import { GameStatus } from "../types/game.types";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const socket = useSocket();

  const game = useGame(gameId);
  const player = usePlayer(socket.id);

  if (game.data?.status === GameStatus.STARTED && !player.data) {
    return <p>Can't join a game that is underway - sorry</p>;
  } else if (!player.loading && !player.data?.name) {
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
  } else if (game.data?.status === GameStatus.COMPLETE) {
    return <p>Game complete, voting is done!</p>;
  } else {
    return (
      <>
        {game.loading && <p>Loading...</p>}
        {game.data && player.data && (
          <GamePage
            game={game.data}
            handleStartGame={(customProbability) => {
              socket.emit(
                ClientEvent.START_GAME,
                game.data!.id,
                customProbability
              );
            }}
            handleVote={(vote) => {
              socket.emit(
                ClientEvent.MAKE_VOTE,
                game.data!.id,
                socket.id,
                vote
              );
            }}
            players={Object.values(game.data.players)}
            player={player.data}
          />
        )}
      </>
    );
  }
}

export default GameRoute;
