import {
  conspiracyVictimName,
  getVote,
  hasVoted,
  isConspiracyMember,
} from "../../models/game";
import { Game, Player, Vote } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: Game;
  player: Player;
  handleVote(vote: Vote | null): void;
}

function GameOngoing({ game, player, handleVote }: Props) {
  const playerVote = getVote(game, player.socketId);

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
      <p>{playerVote ? `Your vote: ${playerVote}` : "You have not voted"}</p>
      <button onClick={() => handleVote(Vote.CONSPIRACY)}>
        Vote: Conspiracy
      </button>
      <button onClick={() => handleVote(Vote.NO_CONSPIRACY)}>
        Vote: No Conspiracy
      </button>
      <button onClick={() => handleVote(null)}>Clear vote</button>
    </>
  );
}

export default GameOngoing;
