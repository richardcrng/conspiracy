import { Game, GameStatus, Player } from "../types/game.types";
import { PlayerOngoingHandlers } from "../types/handler.types";
import IntroFrame from "../ui/molecules/IntroFrame";
import GameOngoingView from "./GameOngoingView";

interface Props extends PlayerOngoingHandlers {
  game: Game;
  player: Player;
}

export default function GameIdView({ game, player, ...handlers }: Props): JSX.Element {

  if (game.status === GameStatus.ONGOING) {
    return (
      <GameOngoingView
        {...{ game, player, ...handlers }}
      />
    )
  }

  return (
    <IntroFrame>
      <p>Game has started!</p>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </IntroFrame>
  );
}