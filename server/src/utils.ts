export const generateRandomGameId = (): string => {
  const stringOptions = 'ABCDEFGHIJLKMNOPQRSTUVWXYZ1234567890';
  const randomChars = [...Array(10).keys()].map(() => (
    stringOptions[Math.floor(Math.random() * stringOptions.length)]
  ));
  return randomChars.join('');
}