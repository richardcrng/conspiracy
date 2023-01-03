import classNames from "classnames";

interface Props {
  className?: string;
  conspiracyTargetName?: string;
  isInnocent: boolean;
  style?: React.CSSProperties;
}

export default function PlayerAlignmentInfo({ className, conspiracyTargetName, isInnocent, style }: Props): JSX.Element {
  if (isInnocent) {
    return (
      <p className={classNames(className)} {...{ style }}>
        You are <span className='font-semibold text-success'>INNOCENT</span> - either with every single other player as well, or entirely by yourself...
      </p>
    );
  } else {
    return (
      <p className={classNames(className)} {...{ style }}>
        <span className='font-bold'>{conspiracyTargetName ?? "[[uh oh, expected a name here]]"}</span> is the sole <span className="font-semibold text-success">INNOCENT</span>. You, and all other players, are conspiring against them...
      </p>
    );
  }
}