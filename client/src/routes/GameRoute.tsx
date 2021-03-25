import { useParams } from "react-router";
import useGame from "../hooks/useGame";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();

  const { game, loading, error } = useGame(gameId);

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
