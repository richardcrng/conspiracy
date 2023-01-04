import { Game, Player } from "../types/game.types"
import { PlayerGameEndHandlers } from "../types/handler.types";
import PlayerGameEndView from "../ui/organisms/PlayerGameEndView";
import PlayerOngoingView from "../ui/organisms/PlayerOngoingView";
import { getConspiracyTargetName, getGameOutcome, getPlayerOutcome, isInnocent, isWinOutcome } from "../utils/game-utils";

interface Props extends PlayerGameEndHandlers {
  game: Game;
  player: Player;
}

export default function GameEndView({ game, onGameRestart, player }: Props): JSX.Element {
  const gameOutcome = getGameOutcome(game);
  const playerOutcome = getPlayerOutcome(game, player.id)
  const isWin = isWinOutcome(playerOutcome)

  return (
    <PlayerGameEndView
      {...{ game, gameOutcome, isWin, onGameRestart, player, playerOutcome }}
      players={game.players}
    />
  );
}