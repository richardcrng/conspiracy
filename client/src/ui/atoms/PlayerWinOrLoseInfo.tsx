import classNames from "classnames";
import { PlayerOutcome } from "../../types/game.types";

interface Props {
  className?: string;
  // conspiracyTargetName?: string;
  // isInnocent: boolean;
  // isWin: boolean;
  playerOutcome: PlayerOutcome;
  style?: React.CSSProperties;
}

export default function PlayerWinOrLoseInfo({ className, playerOutcome, style }: Props): JSX.Element {
  switch (playerOutcome) {
    case PlayerOutcome.CONSPIRATOR_WIN:
      return (
        <p className={classNames(className)} {...{ style }}>
          You fooled them!
        </p>
      );

    case PlayerOutcome.CONSPIRATOR_LOSE:
      return (
        <p className={classNames(className)} {...{ style }}>
          You were rumbled!
        </p>
      );

    case PlayerOutcome.INNOCENT_WIN_VS_CONSPIRACY:
      return (
        <p className={classNames(className)} {...{ style }}>
          You cracked it!
        </p>
      );

    case PlayerOutcome.INNOCENT_LOSE_VS_CONSPIRACY:
      return (
        <p className={classNames(className)} {...{ style }}>
          You got tricked!
        </p>
      );

    case PlayerOutcome.INNOCENT_WIN_NO_CONSPIRACY:
      return (
        <p className={classNames(className)} {...{ style }}>
          You kept your cool!
        </p>
      );

    case PlayerOutcome.INNOCENT_LOSE_NO_CONSPIRACY:
      return (
        <p className={classNames(className)} {...{ style }}>
          You were too paranoid!
        </p>
      );
  }
}