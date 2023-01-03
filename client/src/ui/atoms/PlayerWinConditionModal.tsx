import classNames from "classnames";
import FlavourText from "./FlavourText";

interface Props {
  isInnocent: boolean;
  isOpen?: boolean;
  onClose?(): void;
}

export default function PlayerWinConditionModal({ isInnocent, isOpen, onClose }: Props): JSX.Element {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        onClick={onClose}
        checked={isOpen}
      />
      <div
        className={classNames(
          "modal modal-bottom sm:modal-middle",
          isOpen && "model-open"
        )}
        onClick={onClose}
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">
            <button
              className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            {isInnocent ? (
              <>
                Is there a <FlavourText.Conspiracy className="mr-0.5" />?
              </>
            ) : (
              <>
                Protect the <FlavourText.Conspiracy className="mr-0.5" />!
              </>
            )}
          </h3>
          <div>
            {isInnocent ? (
              <>
                <p className="py-2">
                  As an <FlavourText.Innocent />, you win if, at game end, your
                  vote correctly identifies whether there is a{" "}
                  <FlavourText.Conspiracy /> or not.
                </p>
                <ul className="py-2 list-disc list-outside pl-6">
                  <li className="my-1">
                    <FlavourText.Conspiracy />: every single other player is a{" "}
                    <FlavourText.Conspirator /> against you
                  </li>
                  <li className="my-1">
                    <FlavourText.NoConspiracy />: every single other player is{" "}
                    <FlavourText.Innocent /> with you
                  </li>
                </ul>
                <p className="py-2">
                  See if you can correctly deduce and vote correctly!
                </p>
              </>
            ) : (
              <>
                <p className="py-2">
                  As an <FlavourText.Conspirator />, you win if, at game end,
                  the single <FlavourText.Innocent /> player has voted{" "}
                  <FlavourText.NoConspiracy />.
                </p>
                <p className="py-2 italic font-light">
                  Your vote actually doesn't matter - it's "going through the
                  motions" whilst you pretend to be an Innocent player.
                </p>
                <p className="py-2">
                  See if you can fool the <FlavourText.Innocent /> into thinking that you are all Innocent with them!
                </p>
              </>
            )}
            <p className="py-2 text-lg font-semibold">
              The game ends when every player has cast their vote.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}