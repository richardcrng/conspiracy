import { useParams } from "react-router"

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>()

  return <p>Game id: {gameId}</p>
}

export default GameRoute