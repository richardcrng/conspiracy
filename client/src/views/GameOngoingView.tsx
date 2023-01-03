import { Game, Player } from "../types/game.types"
import { PlayerOngoingHandlers } from "../types/handler.types";
import PlayerOngoingView from "../ui/organisms/PlayerOngoingView";
import { getConspiracyTargetName, isInnocent } from "../utils/game-utils";

interface Props extends PlayerOngoingHandlers {
  game: Game;
  player: Player;
}

export default function GameOngoingView({ game, onVote, player }: Props): JSX.Element {
  const conspiracyTargetName = getConspiracyTargetName(game)

  return (
    <PlayerOngoingView
      {...{ conspiracyTargetName, onVote, player }}
      isInnocent={isInnocent(game, player.id)}
      players={game.players}
    />
    // <>
    //   <p>
    //     {isConspiracyMember(game, player.id)
    //       ? `You are in a conspiracy against ${conspiracyVictimName(game)}`
    //       : "You are innocent"}
    //   </p>
    // </>
  );
}