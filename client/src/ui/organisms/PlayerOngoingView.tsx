import styled from "styled-components";
import { PlayerOngoingHandlers } from "../../types/handler.types";
import PlayerAlignment from "../atoms/PlayerAlignment";

interface Props extends PlayerOngoingHandlers {
  conspiracyTargetName?: string;
  isInnocent: boolean;
}

export default function PlayerOngoingView({
  conspiracyTargetName,
  isInnocent,
  onVote
}: Props): JSX.Element {

  return (
    <Container>
      <Alignment {...{ isInnocent }} />
    </Container>
  );
}

const Container = styled.div`
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