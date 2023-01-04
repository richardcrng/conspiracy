import { Vote } from "../types/game.types";
import { generateDummyPlayer } from "./data-utils";
import { isEveryPlayerVoting } from "./game-utils";

describe("isEveryPlayerVoting", () => {
  it("returns true when every player has a non-null vote", () => {
    const playerWithNoVoteProp = generateDummyPlayer();
    delete playerWithNoVoteProp.vote;

    const result = isEveryPlayerVoting({
      "player-1": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-2": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-3": generateDummyPlayer({
        vote: Vote.NO_CONSPIRACY,
      }),
    });
    expect(result).toBe(true);
  });

  it("returns false when there is a single player with null vote", () => {
    const result = isEveryPlayerVoting({
      "player-1": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-2": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-3": generateDummyPlayer({
        vote: null,
      }),
    });
    expect(result).toBe(false);
  });

  it("returns false when there is a single player without a vote prop", () => {
    const playerWithNoVoteProp = generateDummyPlayer();
    delete playerWithNoVoteProp.vote;

    const result = isEveryPlayerVoting({
      "player-1": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-2": generateDummyPlayer({
        vote: Vote.CONSPIRACY,
      }),
      "player-3": playerWithNoVoteProp,
    });
    expect(result).toBe(false);
  });
});
