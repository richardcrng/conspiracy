import { Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  gameId: string;
  players: Player[];
}

function GameLobby({ gameId, players }: Props) {
  return (
    <>
      <h1>Game id: {gameId}</h1>
      <PlayerList players={players} />
    </>
  );
}

export default GameLobby;
