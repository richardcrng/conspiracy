import styled from 'styled-components';
import { Player } from "../../types/game.types";

interface Props {
  className?: string;
  players: Record<string, Player>;
}

export default function PlayerVotes({ className, players }: Props): JSX.Element {
  return (
    <div className={className}>
      <VoteContainer>
        {Object.values(players).map(({ id, name, vote }, idx) => {
          const hasVoted = typeof vote === "string";

          return (
            <PlayerVote
              key={id}
              {...{ hasVoted, name }}
              rowStart={idx + 1}
            />
          );
        })}
      </VoteContainer>
    </div>
  );
}

const VoteContainer = styled.div.attrs({
  className: 'grid gap-x-2 gap-y-4'
})`
  grid-template-columns: repeat(3, min-content);
`

interface PlayerVoteProps {
  hasVoted: boolean;
  name: string;
  rowStart: number;
}

const PlayerVote = ({ hasVoted, name, rowStart }: PlayerVoteProps) => (
  <>
    <Name {...{ rowStart }}>{name}</Name>
    <Emoji {...{ rowStart }}>{hasVoted ? "🗳️" : "🤔"}</Emoji>
    <Status {...{ rowStart }}>{hasVoted ? "vote cast" : "thinking"}</Status>
  </>
);

const Name = styled.span.attrs({
  className: 'font-bold'
})`
  grid-row-start: ${({ rowStart }: { rowStart: number }) => rowStart};
  grid-column-start: 1;
`

const Emoji = styled.span`
  grid-row-start: ${({ rowStart }: { rowStart: number }) => rowStart};
  grid-column-start: 2;
`;

const Status = styled.span.attrs({
  className: 'italic'
})`
  grid-row-start: ${({ rowStart }: { rowStart: number }) => rowStart};
  grid-column-start: 3;
`;