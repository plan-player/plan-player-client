export const getDigit = (number: number, digit: number) => {
  return number.toLocaleString(undefined, {
    minimumIntegerDigits: digit,
  });
};
