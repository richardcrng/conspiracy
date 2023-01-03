import classNames from "classnames";

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
                Is there a{" "}
                <span className="italic font-semibold mr-0.5">CONSPIRACY</span>?
              </>
            ) : (
              <>
                Protect the{" "}
                <span className="italic font-semibold mr-0.5">CONSPIRACY</span>!
              </>
            )}
          </h3>
          <div>
            {isInnocent ? (
              <>
                <p className="py-2">
                  As an <span className="text-success font-bold">INNOCENT</span>
                  , you win by identifying if there is a{" "}
                  <span className="italic font-bold">CONSPIRACY</span> or not.
                </p>
                <ul className="py-2 list-disc list-outside pl-6">
                  <li className="my-1">
                    <span className="italic font-bold">CONSPIRACY</span>: every
                    single other player is a{" "}
                    <span className="font-bold text-error">CONSPIRATOR</span>{" "}
                    against you
                  </li>
                  <li className="my-1">
                    <span className="italic font-bold">NO CONSPIRACY</span>:
                    every single other player is{" "}
                    <span className="font-bold text-success">INNOCENT</span>{" "}
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