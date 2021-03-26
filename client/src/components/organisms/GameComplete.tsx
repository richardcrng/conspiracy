import {
  conspiracyVictimName,
  getVote,
  hasConspiracy,
  isConspiracyMember,
  isWinner,
} from "../../models/game";
import { Game, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: Game;
  player: Player;
  players: Player[];
}

function GameComplete({ game, player, players }: Props) {
  const isConspiracy = hasConspiracy(game);

  return (
    <>
      <p>Game complete!</p>
      <p>
        There was{" "}
        {isConspiracy
          ? `a conspiracy against ${conspiracyVictimName(game)}`
          : "no conspiracy"}
        !
      </p>
      {isConspiracy ? (
        <p>
          Since there was a conspiracy, the only vote that matters is that of
          the single innocent: did they correctly suss out whether or not there
          was a conspiracy?
        </p>
      ) : (
        <p>
          Since there was no conspiracy, all votes matter: which players
          correctly sussed out that there was no conspiracy?
        </p>
      )}
      <PlayerList
        players={players}
        renderPlayer={(player) => (
          <>
            <b>{player.name}</b> (
            {isConspiracyMember(game, player.socketId)
              ? "conspirator"
              : "innocent"}
            ) voted {getVote(game, player.socketId)}:{" "}
            <b>{isWinner(game, player.socketId) ? "wins" : "loses"}</b>
          </>
        )}
      />
    </>
  );
}

export default GameComplete;
