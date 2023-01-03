import { Player } from "../../types/game.types";

interface Props {
  players: Record<string, Player>
}

export default function PlayerVotes({ players }: Props): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        {Object.values(players).map(({ id, name, vote }) => {
          const hasVoted = typeof vote === 'string'
          
          return (
            <tr>
              <th>{name}</th>
              <td>{hasVoted ? "🗳️" : "🤔"}</td>
              <td>{hasVoted ? "VOTE CAST" : "THINKING"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}