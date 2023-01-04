import { Redirect } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { Game, GameStatus, Player } from "../types/game.types";
import {
  PlayerGameEndHandlers,
  PlayerOngoingHandlers,
} from "../types/handler.types";
import GameEndView from "./GameEndView";
import GameOngoingView from "./GameOngoingView";

interface Props extends PlayerOngoingHandlers, PlayerGameEndHandlers {
  game: Game;
  player: Player;
}

export default function GameIdView({
  game,
  player,
  ...handlers
}: Props): JSX.Element {
  switch (game.status) {
    case GameStatus.ONGOING:
      return <GameOngoingView {...{ game, player, ...handlers }} />;

    case GameStatus.END:
      return <GameEndView {...{ game, player, ...handlers }} />;

    case GameStatus.LOBBY:
      return <Redirect to={PATHS.lobbyForGameId(game.id)} />;
  }
}
