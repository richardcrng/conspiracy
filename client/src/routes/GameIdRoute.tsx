import { Redirect, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import useSocketPlayer from "../hooks/useSocketPlayer";
import { socket } from "../socket";
import { GameStatus } from "../types/game.types";
import GameIdView from "../views/GameIdView";
import LoadingGameIdView from "../views/LoadingGameIdView";
import { PATHS } from "./paths";

export default function GameIdRoute(): JSX.Element {
  const { id: gameId } = useParams<{ id: string }>();
  const game = useGame(gameId);
  const player = useSocketPlayer();

  if (game.loading) {
    return <LoadingGameIdView {...{ gameId }} />;
  }

  if (!game.data) {
    return <Redirect to={PATHS.index} />;
  }

  const playerData = game.data.players[player.data.id];
  if (!playerData) {
    const redirect =
      game.data.status === GameStatus.LOBBY
        ? PATHS.lobbyForGameId(game.data.id)
        : PATHS.index;

    return <Redirect to={redirect} />;
  }

  return (
    <GameIdView
      game={game.data}
      player={playerData}
      onGameRestart={() => {
        socket.emit("RESTART_GAME", gameId);
      }}
      onVote={(vote) => {
        socket.emit("CAST_VOTE", gameId, playerData.id, vote);
      }}
    />
  );
}
