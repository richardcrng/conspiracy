import { useParams } from "react-router"
import useGame from "../hooks/useGame";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>()
  
  const { game } = useGame(gameId)

  return (
    <>
      <h1>Game id: {gameId}</h1>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </>
  );
}

export default GameRoute