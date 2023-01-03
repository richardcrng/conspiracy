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
          <h3 className="font-bold text-xl">
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
                  As an <FlavourText.Innocent />, you win by identifying if
                  there is a <FlavourText.Conspiracy /> or not.
                </p>
                <ul className="py-2 list-disc list-outside pl-6">
                  <li className="my-1">
                    <FlavourText.Conspiracy />: every single other player is a{" "}
                    <FlavourText.Conspirator /> against you
                  </li>
                  <li className="my-1">
                    <FlavourText.NoConspiracy />:
                    every single other player is{" "}
                    <FlavourText.Innocent />{" "}
                    with you
                  </li>
                </ul>
                <p className="py-2">
                  See if you can correctly deduce and vote correctly!
                </p>
              </>
            ) : (
              <p>
                As a <span className="text-error font-bold">CONSPIRATOR</span>,
                you win if the single{" "}
                <span className="text-success font-bold">INNOCENT</span> player
                believes there is no conspiracy.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}