import { Image } from "@mantine/core";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export default function IntroFrame({ children }: Props): JSX.Element {
  return (
    <div className="h-full flex flex-col justify-between items-center text-center">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">{"Conspiracy"}</h1>
        <Image
          src="/assets/images/conspiracy-typewriter.jpg"
          styles={{
            image: {
              height: "50%",
              maxHeight: "400px",
            },
          }}
        />
      </div>
      {children}
    </div>
  );
}
