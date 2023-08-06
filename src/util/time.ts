import { getDigit } from './number';

type HourMinuteType = { h: number; m?: number; s?: number };

export const formatTime = ((param, includeSeconds) => {
  if (typeof param === 'number') {
    const datetime = new Date(parseFloat(param.toString()));
    const format = `${getDigit(datetime.getUTCHours(), 2)}:${getDigit(
      datetime.getUTCMinutes(),
      2
    )}`;
    if (includeSeconds) {
      return `${format}:${getDigit(datetime.getUTCMinutes(), 2)}`;
    } else {
      return format;
    }
  }

  const { h, m, s } = param;
  return `${getDigit(h, 2)}:${m ? getDigit(m, 2) : '00'}${
    s !== undefined ? ':' + getDigit(s, 2) : ''
  }`;
}) as ((param: number, includeSeconds?: boolean) => string) &
  ((param: HourMinuteType, includeSeconds?: boolean) => string);
