import classNames from "classnames";

interface Props {
  className?: string;
  isInnocent: boolean;
  style?: React.CSSProperties;
}

export default function PlayerAlignment({
  className,
  isInnocent,
  style,
}: Props): JSX.Element {
  return (
    <div
      className={classNames(
        "text-3xl",
        isInnocent ? "bg-success" : "bg-error",
        className
      )}
      {...{ style }}
    >
      <p>{isInnocent ? "😇 INNOCENT" : "🕵️‍♀️ CONSPIRATOR"}</p>
    </div>
  );
}
