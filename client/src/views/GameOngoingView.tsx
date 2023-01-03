import { Game, Player } from "../types/game.types"
import { conspiracyVictimName, isConspiracyMember } from '../utils/game-utils'

interface Props {
  game: Game;
  player: Player;
}

export default function GameOngoingView({ game, player }: Props): JSX.Element {
  return (
    <>
      <p>
        {isConspiracyMember(game, player.id)
          ? `You are in a conspiracy against ${conspiracyVictimName(game)}`
          : "You are innocent"}
      </p>
    </>
  );
}