import { useEffect } from 'react';
import { styled } from 'styled-components';
import { TimeListType } from '../../screens/Schedule';
import { formatTime } from '../../util/time';
import TimeBlock from './TimeBlock';

interface TimeBlockTableProps {
  height: string;
  timestamps: TimeListType;
}

interface GridLineProps {
  $height: string;
}

const HOUR_SIZE = '2.5rem';

const HourLabel = styled.span`
  display: inline-block;
  width: ${HOUR_SIZE};
  scroll-margin: 0.5rem;
`;

const GridWrapper = styled.div`
  width: calc(100% - ${HOUR_SIZE});
  left: ${HOUR_SIZE};
`;

const GridLine = styled.div<GridLineProps>`
  width: 0.025rem;
  height: ${({ $height }) => $height};
`;

const BlockRow = styled.div`
  position: absolute;
  width: calc(100% - ${HOUR_SIZE});
  left: ${HOUR_SIZE};
`;

const HOURS = Array.from(new Array(25));
const MINUTES = Array.from(new Array(6));
const START_HOUR = formatTime(8);
const GRID_LINES = Array.from(new Array(7));

// TODO: DateNav의 날짜와 동일하도록 처리 필요
// NOTE: 현재 DUMMY_TIMES의 날짜대로 임시 세팅
const DUMMY_DATE = new Date();
DUMMY_DATE.setFullYear(2023);
DUMMY_DATE.setMonth(6);
DUMMY_DATE.setDate(23);
// NOTE: 현재 시각이 구간 사이일 경우 처리 확인을 위한 코드
DUMMY_DATE.setHours(12);
DUMMY_DATE.setMinutes(10);

const TimeBlockTable = (props: TimeBlockTableProps) => {
  const height = props.height;
  const timestamps = getReducedTimestamp(props.timestamps);

  useEffect(() => {
    document.getElementById(START_HOUR)?.scrollIntoView();
  }, []);

  let timestampIdx = 0;
  let isStart = false;

  const getTimeBlock = (h: number, m: number) => {
    // TODO: DUMMY_DATE 값이 DateNav의 날짜와 동일하도록 처리 필요
    const target = timestamps[timestampIdx];
    const [current, next] = getCurrentNextTimes(DUMMY_DATE, h, m);

    // TODO: 카테고리 색깔에 따라 bg 처리 필요
    // TODO: todo 아이콘에 따라 icon 처리 필요
    let bg: string | undefined;
    let icon: string | undefined;
    let leftRounded = false;
    let rightRounded = false;

    if (target && floorMinute(target.start) <= current && current < target.end) {
      const { start, end, isHistory } = target;

      bg = isHistory ? 'primary' : 'gray';

      // NOTE: 순서에 따른 round
      if (m === 0) {
        leftRounded = true;
      } else if (m === 50) {
        rightRounded = true;
      }

      // NOTE: 시작일 때 round
      if (!isStart && floorMinute(start) <= current) {
        icon = isStartOfCurrent(isHistory, start) ? undefined : '📑';
        leftRounded = true;
        isStart = true;
      }

      // NOTE: 끝일 때 round, 다음 구간으로
      if (isStart && end <= next) {
        rightRounded = true;
        isStart = false;
        timestampIdx += 1;
      }
    }

    const formattedTime = formatTime(h, m);

    return (
      <TimeBlock
        key={formattedTime}
        id={formattedTime}
        value={current}
        icon={icon}
        bg={bg}
        leftRounded={leftRounded}
        rightRounded={rightRounded}
      />
    );
  };

  return (
    <div className="w-100 relative">
      {/* grid */}
      <GridWrapper className="absolute flex j-between">
        {GRID_LINES.map((_, i) => (
          <GridLine
            key={i}
            className={i === 0 || i === MINUTES.length ? '' : 'bg-gray'}
            $height={height}
          />
        ))}
      </GridWrapper>
      {/* blocks */}
      <div className="absolute w-100 flex-column gap-lg">
        {HOURS.map((_, h) => {
          const formattedHour = formatTime(h);

          return (
            <div key={formattedHour} className="flex gap-2xs i-center">
              <HourLabel id={formattedHour} className="text-sm">
                {formattedHour}
              </HourLabel>
              <BlockRow className="flex">
                {MINUTES.map((_, m) => {
                  return getTimeBlock(h, m * 10);
                })}
              </BlockRow>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeBlockTable;

const getReducedTimestamp = (timestamps: TimeListType) => {
  return timestamps
    .reduce((acc, time) => {
      const now = DUMMY_DATE.getTime();
      const { start, end, isHistory } = time;

      // NOTE: history의 end값이 현재보다 클 경우 - end를 현재로
      if (start < now && now < end && isHistory) {
        return [...acc, { ...time, end: now }];
      }

      // NOTE: schedule의 start값이 현재보다 작을 경우 - start를 현재로
      if (now < end && start < now && !isHistory) {
        return [...acc, { ...time, start: now }];
      }

      // NOTE: history가 현재 시각 이전의 구간일 경우 포함
      if (end <= now && isHistory) {
        return [...acc, time];
      }

      // NOTE: schedule이 현재 시각 이후의 구간일 경우 포함
      if (now < start && !isHistory) {
        return [...acc, time];
      }

      return acc;
    }, [] as TimeListType)
    .sort((a, b) => a.start - b.start);
};

const floorMinute = (timestamp: number) => {
  const current = new Date(timestamp);
  const m = current.getMinutes();
  current.setSeconds(0);
  current.setUTCMilliseconds(0);
  return current.setMinutes(Math.floor(m / 10) * 10);
};

const getCurrentNextTimes = (date: Date, h: number, m: number) => {
  const datetime = new Date(date);
  datetime.setHours(h);
  datetime.setMinutes(m);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  const current = new Date(datetime).getTime();
  const next = new Date(datetime).setMinutes(m + 10);

  return [current, next];
};

const isStartOfCurrent = (isHistory: boolean, start: number) => {
  if (!isHistory) {
    const currentHour = DUMMY_DATE.getHours();
    const targetHour = new Date(start).getHours();
    return targetHour <= currentHour;
  } else {
    return false;
  }
};
