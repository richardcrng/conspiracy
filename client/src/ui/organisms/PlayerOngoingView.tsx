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

  const makeVoteHandler = (newVote: Vote | null) => () => {
    player.vote === newVote ? onVote(null) : onVote(newVote)
  }

  return (
    <Container>
      <Alignment {...{ isInnocent }} />
      <Description {...{ conspiracyTargetName, isInnocent }} />
      <HelpButton>How do I win?</HelpButton>
      <VoteTable {...{ players }} />
      <VoteActions>
        <div className="flex justify-center items-center content-center h-10">
          <p className='italic text-sm'>
            {player.vote ? (
              <>
                <span>
                  You are voting{" "}
                  <span
                    className={`font-bold text-${
                      player.vote === Vote.CONSPIRACY ? "error" : "success"
                    }`}
                  >
                    {player.vote.toUpperCase()}
                  </span>
                </span>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={makeVoteHandler(null)}
                >
                  X UNVOTE
                </button>
              </>
            ) : (
              <>Click below to vote</>
            )}
          </p>
        </div>
        <div className="w-full btn-group">
          <button
            className={classNames("btn w-1/2 btn-error")}
            onClick={makeVoteHandler(Vote.CONSPIRACY)}
          >
            Conspiracy
          </button>
          <button
            className={classNames("btn w-1/2 btn-success")}
            onClick={makeVoteHandler(Vote.NO_CONSPIRACY)}
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

  grid-template-rows: 15% repeat(3, min-content) minmax(auto, 1fr);
`

const Alignment = styled(PlayerAlignment).attrs({
  className: 'w-full text-center font-bold flex flex-col place-content-center'
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
  className: 'w-full flex flex-col justify-end'
})`
  grid-area: vote-actions;
`