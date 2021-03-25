import { Player } from "../../types/game.types";

interface Props {
  players: Player[];
  renderPlayer?(player: Player): JSX.Element;
}

const defaultRenderPlayer = (player: Player): JSX.Element => (
  <>
    {player.name}
    {player.isHost && " (host)"}
  </>
);

function PlayerList({ players, renderPlayer = defaultRenderPlayer }: Props) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.socketId}>{renderPlayer(player)}</li>
      ))}
    </ul>
  );
}

export default PlayerList;
