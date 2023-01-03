import { fisherYatesShuffle, getRNGFromMaybeSeed, SeedOrRNGOrPseudoRNG } from "./rng-utils";

/**
 * Generates a boolean: `true` (conspiracy) or `false` (no conspiracy)
 * @param pctConspiracy % probability (e.g. `50`) of conspiracy
 */
export function generateConspiracyStatus(pctConspiracy: number, maybeSeedOrRNG?: string | SeedOrRNGOrPseudoRNG): boolean {
  const rng = getRNGFromMaybeSeed(maybeSeedOrRNG);
  const generatedPct = rng.value() * 100
  return generatedPct <= pctConspiracy
}

export function pickConspiracyTarget(playerIds: [string, ...string[]], maybeSeedOrRNG?: string | SeedOrRNGOrPseudoRNG): string {
  const shuffledPlayerIds = fisherYatesShuffle(playerIds, maybeSeedOrRNG);
  return shuffledPlayerIds[0]
}

export function generatePossibleConspiracyTargetId(
  playerIds: [string, ...string[]],
  pctConspiracy: number,
  maybeSeedOrRNG?: string | SeedOrRNGOrPseudoRNG
): string | null {
  const rng = getRNGFromMaybeSeed(maybeSeedOrRNG)

  const isConspiracy = generateConspiracyStatus(pctConspiracy, rng);

  return isConspiracy
    ? pickConspiracyTarget(playerIds, rng)
    : null
}