import classNames from "classnames";
import styled from "styled-components";
import { Player, Vote } from "../../types/game.types";
import { PlayerOngoingHandlers } from "../../types/handler.types";
import PlayerAlignment from "../atoms/PlayerAlignment";
import PlayerAlignmentInfo from "../atoms/PlayerAlignmentInfo";
import PlayerVotes from "../atoms/PlayerVotes";

interface Props extends PlayerOngoingHandlers {
  conspiracyTargetName?: string;
  isInnocent: boolean;
  player: Player;
  players: Record<string, Player>;
}

export default function PlayerOngoingView({
  conspiracyTargetName,
  isInnocent,
  onVote,
  player,
  players
}: Props): JSX.Element {

  return (
    <Container>
      <Alignment {...{ isInnocent }} />
      <Description {...{ conspiracyTargetName, isInnocent }} />
      <HelpButton>How do I win?</HelpButton>
      <VoteTable {...{ players }} />
      <VoteActions>
        {/* <div className='flex justify-end'>
          <button className="btn btn-xs mb-2">Remove vote</button>
        </div> */}
        <button className="btn btn-block btn-ghost btn-xs mb-2">
          Remove vote
        </button>
        <div className="w-full btn-group">
          <button
            className={classNames(
              "btn w-1/2 btn-error",
              player.vote === Vote.CONSPIRACY && "btn-active"
            )}
          >
            Conspiracy
          </button>
          <button
            className={classNames(
              "btn w-1/2 btn-success",
              player.vote === Vote.NO_CONSPIRACY && "btn-active"
            )}
          >
            No Conspiracy
          </button>
        </div>
      </VoteActions>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'h-full gap-y-4 justify-items-center grid'
})`
  grid-template-areas:
    "alignment"
    "description"
    "help"
    "vote-table"
    "vote-actions";

  grid-template-rows: repeat(4, min-content) auto(0, 1fr);
`

const Alignment = styled(PlayerAlignment).attrs({
  className: 'w-full text-center font-bold'
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

const VoteActions = styled.div.attrs({
  className: 'w-full'
})`
  grid-area: vote-actions;
`