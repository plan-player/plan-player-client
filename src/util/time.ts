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
  const format = `${getDigit(h, 2)}:${m ? getDigit(m, 2) : '00'}`;

  if (includeSeconds) {
    return `${format}:${s ? getDigit(s, 2) : '00'}`;
  } else {
    return format;
  }
}) as ((param: number, includeSeconds?: boolean) => string) &
  ((param: HourMinuteType, includeSeconds?: boolean) => string);
