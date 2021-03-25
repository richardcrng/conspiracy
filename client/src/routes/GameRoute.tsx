import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import { useSocket } from "../socket";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const { socket, id } = useSocket();

  const { game, loading, error } = useGame(gameId);
  const { player } = usePlayer(id);

  console.log(player);

  return (
    <>
      <h1>Game id: {gameId}</h1>
      {loading && <p>Loading...</p>}
      {game && <pre>{JSON.stringify(game, null, 2)}</pre>}
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default GameRoute;
