import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import packageJson from "../../package.json";
import { LocalPlayerData } from "../types/game.types";
import { generateUUID } from "../utils/data-utils";

interface LocalPlayer {
  data: LocalPlayerData;
  assign(newData: Partial<LocalPlayerData>): LocalPlayerData;
}

export default function useLocalPlayer(): LocalPlayer {
  const uuid = useRef(generateUUID());
  const [value, setValue] = useLocalStorage<LocalPlayerData>(`player-${packageJson.name}`);

  useEffect(() => {
    if (!value) {
      setValue({
        id: uuid.current,
        name: "",
      });
    }
  });

  const data: LocalPlayerData = value ?? {
    id: uuid.current,
    name: "",
  };

  return {
    data,
    assign: (newPartialData) => {
      const newOverallData: LocalPlayerData = {
        ...data,
        ...newPartialData,
      };
      setValue(newOverallData);
      return newOverallData;
    },
  };
}
