import { Player } from "../../types/game.types";

interface Props {
  players: Player[];
}

function PlayerList({ players }: Props) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.socketId}>
          {player.name}
          {player.isHost && " (host)"}
        </li>
      ))}
    </ul>
  );
}

export default PlayerList;
