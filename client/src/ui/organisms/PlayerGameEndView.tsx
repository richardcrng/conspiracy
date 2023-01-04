import styled from "styled-components";
import { Game, GameOutcome, Player, PlayerOutcome } from "../../types/game.types";
import { PlayerGameEndHandlers } from "../../types/handler.types";
import { getGameHost } from "../../utils/game-utils";
import FlavourText from "../atoms/FlavourText";
import PlayerResults from "../atoms/PlayerResults";
import PlayerWinOrLose from "../atoms/PlayerWinOrLose";
import PlayerWinOrLoseInfo from "../atoms/PlayerWinOrLoseInfo";

interface Props extends PlayerGameEndHandlers {
  // conspiracyTargetName?: string;
  game: Game;
  gameOutcome: GameOutcome;
  // isInnocent: boolean;
  isWin: boolean;
  player: Player;
  playerOutcome: PlayerOutcome;
  players: Record<string, Player>;
}

export default function PlayerGameEndView({
  // conspiracyTargetName,
  game,
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
              The <FlavourText.Conspirator /> team won together by tricking the{" "}
              <FlavourText.Innocent /> player
            </>
          )}
          {gameOutcome === GameOutcome.CONSPIRATORS_LOSE && (
            <>
              The sole <FlavourText.Innocent /> won by figuring out the{" "}
              <FlavourText.Conspiracy />
            </>
          )}
          {gameOutcome === GameOutcome.CALM_INNOCENTS_WIN && (
            <>
              All <FlavourText.Innocent /> players who realised that there was{" "}
              <FlavourText.NoConspiracy /> win
            </>
          )}
        </Message>
        <Gif alt={playerOutcome} src={getPlayerGifUrl(playerOutcome)} />
        <ResultsData {...{ game, players }} />
        <PlayerActions>
          {player.isHost ? (
            <>
              <p className="text-sm">As host, you can restart the game.</p>
              <button
                className="mt-2 btn btn-block btn-sm"
                onClick={onGameRestart}
              >
                Restart game
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-lg">Play again?</p>
              <p className="text-sm">
                Ask{" "}
                <span className="font-semibold">{getGameHost(game).name}</span>{" "}
                (host) to restart the game.
              </p>
            </>
          )}
        </PlayerActions>
      </Container>
    </>
  );
}

const getPlayerGifUrl = (playerOutcome: PlayerOutcome): string => {
  switch (playerOutcome) {
    case PlayerOutcome.CONSPIRATOR_WIN:
      // littlefinger smug
      return "https://media.giphy.com/media/Vff5Qxz6LLzag/giphy.gif";
    case PlayerOutcome.CONSPIRATOR_LOSE:
      // foiled
      return "https://media.giphy.com/media/xUNd9I18JKZnp91Kne/giphy.gif";
    case PlayerOutcome.INNOCENT_WIN_VS_CONSPIRACY:
      // sherlock victory
      return "https://media.giphy.com/media/l6d8IEQdmiSsM/giphy.gif";
    case PlayerOutcome.INNOCENT_LOSE_VS_CONSPIRACY:
      // shocked Jim Carey
      return "https://media.giphy.com/media/jquDWJfPUMCiI/giphy.gif";
    case PlayerOutcome.INNOCENT_WIN_NO_CONSPIRACY:
      // minions - no conspiracy and win
      return "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif";
    case PlayerOutcome.INNOCENT_LOSE_NO_CONSPIRACY:
      // flat earther
      return "https://media.giphy.com/media/eg4d3BZTuxeuDyM9UZ/giphy.gif";
  }
}

const Container = styled.div.attrs({
  className: 'h-full gap-y-4 justify-items-center grid'
})`
  grid-template-areas:
    "win-status"
    "description"
    "gif"
    "message"
    "results-data"
    "player-actions";

  grid-template-rows: 15% min-content 25% min-content 1fr repeat(2, auto);
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

const Gif = styled.img.attrs({
  className: 'max-h-full'
})`
  grid-area: gif;
`;

const Message = styled.p.attrs({
  className: 'font-semibold px-4 text-center'
})`
  grid-area: message;
`

const ResultsData = styled(PlayerResults).attrs({
  className: 'flex flex-col place-content-center px-2 overflow-y-scroll'
})`
  grid-area: results-data;
`

const PlayerActions = styled.div.attrs({
  className: 'w-full flex flex-col justify-end px-2 text-center'
})`
  grid-area: player-actions;
`