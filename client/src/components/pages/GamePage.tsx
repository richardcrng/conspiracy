import { GameBase, GameStatus, Player, Vote } from "../../types/game.types";
import GameLobby from "../organisms/GameLobby";
import GameOngoing from "../organisms/GameOngoing";

interface Props {
  game: GameBase;
  handleStartGame(customProbability?: number): void;
  handleVote(vote: Vote | null): void;
  players: Player[];
  player: Player;
}

function GamePage({
  game,
  handleStartGame,
  handleVote,
  players,
  player,
}: Props) {
  if (game.status === GameStatus.LOBBY) {
    return <GameLobby {...{ game, handleStartGame, players, player }} />;
  } else {
    return <GameOngoing {...{ game, player, handleVote }} />;
  }
}

export default GamePage;
