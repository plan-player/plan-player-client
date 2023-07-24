import { getDigit } from './number';

export const formatTime = (hour: number, minute?: number) => {
  return `${getDigit(hour, 2)}:${minute ? getDigit(minute, 2) : '00'}`;
};
