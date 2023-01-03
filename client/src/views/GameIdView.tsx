import { Game, GameStatus, Player } from "../types/game.types";
import IntroFrame from "../ui/molecules/IntroFrame";
import GameOngoingView from "./GameOngoingView";

interface Props {
  game: Game;
  player: Player;
}

export default function GameIdView({ game, player }: Props): JSX.Element {

  if (game.status === GameStatus.ONGOING) {
    return (
      <GameOngoingView {...{ game, player }} />
    )
  }

  return (
    <IntroFrame>
      <p>Game has started!</p>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </IntroFrame>
  );
}