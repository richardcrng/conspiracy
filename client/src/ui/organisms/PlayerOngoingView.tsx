import styled from "styled-components";
import { PlayerOngoingHandlers } from "../../types/handler.types";

interface Props extends PlayerOngoingHandlers {
  conspiracyTargetName?: string;
  isInnocent: boolean;
}

export default function PlayerOngoingView({
  conspiracyTargetName,
  isInnocent,
  onVote
}: Props): JSX.Element {
  if (isInnocent) {
    return (
      <Container>
        <Alignment>
          <p>😇 INNOCENT</p>
        </Alignment>
      </Container>
    );
  } else {
    return (
      <Container>
        <Alignment>
          <p>🕵️‍♀️ CONSPIRATOR</p>
        </Alignment>
      </Container>
    );
  }
}

const Container = styled.div`
  grid-template-areas:
    "alignment"
    "description"
    "help"
    "vote-table"
    "vote-actions";
`

const Alignment = styled.div`
  grid-area: alignment;
`