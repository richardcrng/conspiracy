import { useState } from "react";

interface Props {
  handleSetName(name: string): void;
}

function PlayerNamer({ handleSetName }: Props) {
  const [inputText, setInputText] = useState("");

  const handleSetClick = () => {
    if (inputText.length > 0) {
      handleSetName(inputText);
    } else {
      window.alert("Can't have an empty player name");
    }
  };

  return (
    <>
      <input
        placeholder="Enter your name"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={handleSetClick}>Set player name</button>
    </>
  );
}

export default PlayerNamer;
