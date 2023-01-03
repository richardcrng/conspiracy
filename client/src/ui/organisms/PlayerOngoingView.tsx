import styled from "styled-components";
import { Player } from "../../types/game.types";
import { PlayerOngoingHandlers } from "../../types/handler.types";
import PlayerAlignment from "../atoms/PlayerAlignment";
import PlayerAlignmentInfo from "../atoms/PlayerAlignmentInfo";
import PlayerVotes from "../atoms/PlayerVotes";

interface Props extends PlayerOngoingHandlers {
  conspiracyTargetName?: string;
  isInnocent: boolean;
  players: Record<string, Player>;
}

export default function PlayerOngoingView({
  conspiracyTargetName,
  isInnocent,
  onVote,
  players
}: Props): JSX.Element {

  return (
    <Container>
      <Alignment {...{ isInnocent }} />
      <Description {...{ conspiracyTargetName, isInnocent }} />
      <HelpButton>How do I win?</HelpButton>
      <VoteTable {...{ players }} />
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'h-full gap-y-4'
})`
  grid-template-areas:
    "alignment"
    "description"
    "help"
    "vote-table"
    "vote-actions";
`

const Alignment = styled(PlayerAlignment).attrs({
  className: 'text-center font-bold py-4'
})`
  grid-area: alignment;
`

const Description = styled(PlayerAlignmentInfo)`
  grid-area: description;
`

const HelpButton = styled.button.attrs({
  className: 'btn btn-sm btn-block'
})`
  grid-area: help;
`

const VoteTable = styled(PlayerVotes)`
  grid-area: vote-table;
`