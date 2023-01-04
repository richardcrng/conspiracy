export function assertArrayLengthAtLeastOne<E>(
  arr: E[]
): asserts arr is [E, ...E[]] {
  if (arr.length < 1) {
    throw new Error("Expected at least one element in array");
  }
}

export type RemovePrefix<
  Prefix extends string,
  T extends string
> = T extends `${Prefix}${infer Suffix}` ? Suffix : never;
