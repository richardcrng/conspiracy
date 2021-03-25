import { GameBase, GameStatus, Player } from "../../types/game.types";
import GameLobby from "../organisms/GameLobby";
import GameOngoing from "../organisms/GameOngoing";

interface Props {
  game: GameBase;
  handleStartGame(customProbability?: number): void;
  players: Player[];
  player: Player;
}

function GamePage({ game, handleStartGame, players, player }: Props) {
  if (game.status === GameStatus.LOBBY) {
    return <GameLobby {...{ game, handleStartGame, players, player }} />;
  } else {
    return <GameOngoing {...{ game, player }} />;
  }
}

export default GamePage;
