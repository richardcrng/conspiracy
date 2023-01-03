import classNames from "classnames";

interface Props {
  isInnocent: boolean;
  isOpen?: boolean;
  onClose?(): void;
}

export default function PlayerWinConditionModal({ isInnocent, isOpen, onClose }: Props): JSX.Element {
  return (
    <>
      <input type="checkbox" className="modal-toggle" onClick={onClose} checked={isOpen} />
      <div className={classNames("modal modal-bottom sm:modal-middle", isOpen && "model-open")} onClick={onClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {isInnocent ? (
              <>
                As an <span className="text-success">INNOCENT</span>, you win by
                identifying if there is a conspiracy or not.
              </>
            ) : (
              <>
                As a <span className="text-error">CONSPIRATOR</span>, you win if
                the single <span className="text-success">INNOCENT</span> player
                believes there is no conspiracy.
              </>
            )}
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>Yay!</button>
          </div>
        </div>
      </div>
    </>
  );
}