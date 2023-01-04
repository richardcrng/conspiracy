import classNames from "classnames";

interface Props {
  className?: string;
  isWin: boolean;
  style?: React.CSSProperties;
}

export default function PlayerWinOrLose({ className, isWin, style }: Props): JSX.Element {
  return (
    <div
      className={classNames(
        "text-3xl",
        isWin ? "bg-success" : "bg-error",
        className
      )}
      {...{ style }}
    >
      <p>{isWin ? "😎 WIN" : "😭 LOSE"}</p>
    </div>
  );
}