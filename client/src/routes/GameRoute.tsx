import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import { useSocket } from "../socket";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const socket = useSocket();

  const game = useGame(gameId);
  const player = usePlayer(socket.id);

  return (
    <>
      <h1>Game id: {gameId}</h1>
      {player.loading || (game.loading && <p>Loading...</p>)}
      {game.data && <pre>{JSON.stringify(game.data, null, 2)}</pre>}
      {player.error ||
        (game.error && <p>Error: {[player.error, game.error].join(", ")}</p>)}
    </>
  );
}

export default GameRoute;
