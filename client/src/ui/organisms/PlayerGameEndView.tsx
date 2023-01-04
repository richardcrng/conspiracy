import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { GameOutcome, Player, PlayerOutcome, Vote } from "../../types/game.types";
import { PlayerGameEndHandlers } from "../../types/handler.types";
import FlavourText from "../atoms/FlavourText";
import PlayerAlignmentInfo from "../atoms/PlayerAlignmentInfo";
import PlayerVotes from "../atoms/PlayerVotes";
import PlayerWinConditionModal from "../atoms/PlayerWinConditionModal";
import PlayerWinOrLose from "../atoms/PlayerWinOrLose";
import PlayerWinOrLoseInfo from "../atoms/PlayerWinOrLoseInfo";

interface Props extends PlayerGameEndHandlers {
  // conspiracyTargetName?: string;
  gameOutcome: GameOutcome;
  // isInnocent: boolean;
  isWin: boolean;
  player: Player;
  playerOutcome: PlayerOutcome;
  players: Record<string, Player>;
}

export default function PlayerGameEndView({
  // conspiracyTargetName,
  gameOutcome,
  isWin,
  onGameRestart,
  player,
  playerOutcome,
  players
}: Props): JSX.Element {

  return (
    <>
      <Container>
        <WinStatus {...{ isWin }} />
        <Description {...{ playerOutcome }} />
        <Message>
          {gameOutcome === GameOutcome.CONSPIRATORS_WIN && (
            <>
              The <FlavourText.Conspirator />s all won together by tricking the{" "}
              <FlavourText.Innocent /> player
            </>
          )}
          {gameOutcome === GameOutcome.CONSPIRATORS_LOSE && (
            <>
              The sole <FlavourText.Innocent /> won by figuring out the <FlavourText.Conspiracy />
            </>
          )}
          {gameOutcome === GameOutcome.CALM_INNOCENTS_WIN && (
            <>
              All <FlavourText.Innocent /> players who realised that there was{" "}
              <FlavourText.NoConspiracy /> win
            </>
          )}
        </Message>
        {/* <VoteData {...{ players }} />
        <VoteActions>
          <div className="flex justify-center items-center content-center h-10">
            <p className="italic text-sm">
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
              {player.vote === Vote.CONSPIRACY ? "🗳️ " : ""}Conspiracy
            </button>
            <button
              className={classNames("btn w-1/2 btn-success")}
              onClick={makeVoteHandler(Vote.NO_CONSPIRACY)}
            >
              No Conspiracy{player.vote === Vote.NO_CONSPIRACY ? " 🗳️" : ""}
            </button>
          </div>
        </VoteActions> */}
      </Container>
    </>
  );
}

const Container = styled.div.attrs({
  className: 'h-full gap-y-4 justify-items-center grid'
})`
  grid-template-areas:
    "win-status"
    "description"
    "gif"
    "message"
    "vote-data"
    "player-actions";

  grid-template-rows: 15% repeat(3, min-content) repeat(2, auto);
`

const WinStatus = styled(PlayerWinOrLose).attrs({
  className: 'w-full text-center font-bold flex flex-col place-content-center'
})`
  grid-area: win-status;
`

const Description = styled(PlayerWinOrLoseInfo).attrs({
  className: 'px-4 text-xl'
})`
  grid-area: description;
`

const Gif = styled.image.attrs({
  // className: 'btn btn-sm btn-block'
})`
  grid-area: Gif;
`;

const Message = styled.p.attrs({
  className: 'font-semibold'
})`
  grid-area: message;
`

const VoteData = styled(PlayerVotes).attrs({
  className: 'flex flex-col place-content-center px-4'
})`
  grid-area: vote-data;
`

const PlayerActions = styled.div.attrs({
  className: 'w-full flex flex-col justify-end'
})`
  grid-area: player-actions;
`