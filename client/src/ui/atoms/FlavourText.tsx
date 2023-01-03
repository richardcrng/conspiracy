import classNames from 'classnames';
import { fontStyle, fontWeight, TFontWeight } from "tailwindcss-classnames";
import { twClasses } from '../../utils/tailwind-utils';
import { RemovePrefix } from '../../utils/type-utils';

type Props = TextProps & {
  text: 'conspiracy' | 'no conspiracy' | 'conspirator' | 'innocent'
}

export default function FlavourText({ text, ...rest }: Props): JSX.Element {
  switch (text) {
    case "conspiracy":
      return <ConspiracyText {...rest} />;
    case "no conspiracy":
      return <NoConspiracyText {...rest} />;
    case "conspirator":
      return <ConspiratorText {...rest} />;
    case "innocent":
      return <InnocentText {...rest} />;
  }
}

interface TextProps {
  italic?: boolean;
  boldness?: RemovePrefix<'font-', TFontWeight>;
  // color?: RemovePrefix<'text-', TTextColor> | "success" | "error";
}

const ConspiracyText = ({
  italic = true,
  boldness = "bold",
}: TextProps): JSX.Element => (
  <span
    className={classNames(
      italic === true && fontStyle("italic"),
      italic === false && fontStyle("non-italic"),
      twClasses(fontWeight(`font-${boldness}`))
    )}
  >
    CONSPIRACY
  </span>
);

const ConspiratorText = ({
  italic = false,
  boldness = "bold",
}: TextProps): JSX.Element => (
  <span
    className={classNames(
      "text-error",
      italic === true && fontStyle("italic"),
      italic === false && fontStyle("non-italic"),
      twClasses(fontWeight(`font-${boldness}`))
    )}
  >
    CONSPIRATOR
  </span>
);

const InnocentText = ({
  italic = false,
  boldness = "bold",
}: TextProps): JSX.Element => (
  <span
    className={classNames(
      "text-success",
      italic === true && fontStyle("italic"),
      italic === false && fontStyle("non-italic"),
      twClasses(fontWeight(`font-${boldness}`))
    )}
  >
    INNOCENT
  </span>
);

const NoConspiracyText = ({
  italic = true,
  boldness = "bold",
}: TextProps): JSX.Element => (
  <span
    className={classNames(
      italic === true && fontStyle("italic"),
      italic === false && fontStyle("non-italic"),
      twClasses(fontWeight(`font-${boldness}`))
    )}
  >
    NO CONSPIRACY
  </span>
);

FlavourText.Conspiracy = ConspiracyText;
FlavourText.NoConspiracy = NoConspiracyText;
FlavourText.Innocent = InnocentText;
FlavourText.Conspirator = ConspiratorText;