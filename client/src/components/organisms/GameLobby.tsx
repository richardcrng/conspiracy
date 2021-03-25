import { gameLobbyReadiness } from "../../models/game";
import { GameBase, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  players: Player[];
  player: Player;
}

function GameLobby({ game, handleStartGame, players, player }: Props) {
  const readiness = gameLobbyReadiness(game);

  return (
    <>
      <h1>Game id: {game.id}</h1>
      <PlayerList players={players} />
      {player.isHost ? (
        <button disabled={!readiness.isReady} onClick={handleStartGame}>
          Start game
        </button>
      ) : (
        <p>Waiting for the host to start the game</p>
      )}
      {!readiness.isReady && (
        <p>The game cannot yet be started: {readiness.reason}</p>
      )}
    </>
  );
}

export default GameLobby;
