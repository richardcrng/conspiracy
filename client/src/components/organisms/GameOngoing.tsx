import {
  conspiracyVictimName,
  hasVoted,
  isConspiracyMember,
} from "../../models/game";
import { Game, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: Game;
  player: Player;
}

function GameOngoing({ game, player }: Props) {
  return (
    <>
      <p>
        {isConspiracyMember(game, player.socketId)
          ? `You are in a conspiracy against ${conspiracyVictimName(game)}`
          : "You are innocent"}
      </p>
      <PlayerList
        players={Object.values(game.players)}
        renderPlayer={(player) => (
          <>
            {player.name}{" "}
            {hasVoted(game, player.socketId)
              ? "(has voted)"
              : "(has not voted)"}
          </>
        )}
      />
    </>
  );
}

export default GameOngoing;
