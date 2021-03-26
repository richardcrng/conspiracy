import { useState } from "react";
import useSocketListener from "../../hooks/useSocketListener";
import { useSocket } from "../../socket";
import { ClientEvent, ServerEvent } from "../../types/event.types";
import { Game, Player } from "../../types/game.types";
import GameResults from "../molecules/GameResults";

interface Props {
  game: Game;
  player: Player;
  players: Player[];
}

function GameComplete({ game, player, players }: Props) {
  const socket = useSocket();
  const [showResults, setShowResults] = useState(false);

  useSocketListener(ServerEvent.RESULTS_SHOWN, (gameId) => {
    gameId === game.id && setShowResults(true);
  });

  const handleShowResults = () => {
    socket.emit(ClientEvent.SHOW_RESULTS, game.id);
  };

  return (
    <>
      <p>Game complete!</p>
      {showResults ? (
        <GameResults {...{ game, players }} />
      ) : (
        <>
          <p>
            {player.isHost
              ? "Click to show results to all players"
              : "Waiting for host to show results..."}
          </p>
          {player.isHost && (
            <button onClick={handleShowResults}>Broadcast results</button>
          )}
        </>
      )}
    </>
  );
}

export default GameComplete;
