import { GameBase, GameStatus, Player } from "../../types/game.types";
import GameLobby from "../organisms/GameLobby";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  players: Player[];
  player: Player;
}

function GamePage({ game, handleStartGame, players, player }: Props) {
  if (game.status === GameStatus.LOBBY) {
    return <GameLobby {...{ game, handleStartGame, players, player }} />;
  } else {
    return <p>Started the game!!!!</p>;
  }
}

export default GamePage;
