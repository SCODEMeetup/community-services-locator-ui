// eslint-disable-next-line import/prefer-default-export
export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}
