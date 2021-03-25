import { GameBase, GameStatus, Player } from "../../types/game.types";
import GameLobby from "../organisms/GameLobby";
import { conspiracyVictimName, isConspiracyMember } from "../../models/game";

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
    return (
      <p>
        {isConspiracyMember(game, player.socketId)
          ? `You are in a conspiracy against ${conspiracyVictimName(game)}`
          : "You are innocent"}
      </p>
    );
  }
}

export default GamePage;
