import styled from "styled-components";
import { Game, Player } from "../../types/game.types";
import { isWinner } from "../../utils/game-utils";

interface Props {
  className?: string;
  game: Game;
  players: Record<string, Player>;
}

export default function PlayerResults({
  className,
  game,
  players,
}: Props): JSX.Element {
  return (
    <div className={className}>
      <ResultsContainer>
        {Object.values(players).map(({ id, name }, idx) => {
          return (
            <PlayerResult
              key={id}
              isWinner={isWinner(game, id)}
              name={name}
              rowStart={idx + 1}
            />
          );
        })}
      </ResultsContainer>
    </div>
  );
}

const ResultsContainer = styled.div.attrs({
  className: "grid gap-x-2 gap-y-4",
})`
  grid-template-columns: repeat(2, min-content) minmax(min-content, auto);
`;

interface PlayerResultProps {
  name: string;
  isWinner: boolean;
  rowStart: number;
}

const PlayerResult = ({ name, isWinner, rowStart }: PlayerResultProps) => (
  <>
    <Name {...{ rowStart }}>{name}</Name>
    <Outcome {...{ rowStart }}>{isWinner ? "🏆" : "🗑️"}</Outcome>
  </>
);

const Name = styled.span.attrs({
  className: "font-bold",
})`
  grid-row-start: ${({ rowStart }: { rowStart: number }) => rowStart};
  grid-column-start: 1;
`;

const Outcome = styled.span`
  grid-row-start: ${({ rowStart }: { rowStart: number }) => rowStart};
  grid-column-start: 2;
`;
