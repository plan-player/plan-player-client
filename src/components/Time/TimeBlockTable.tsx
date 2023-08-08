import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { RecordType } from '../../atoms/scheduleAtom';
import { formatTime } from '../../util/time';
import TimeBlock from './TimeBlock';

interface TimeBlockTableProps {
  height: string;
  records: RecordType[];
  targetTodoId: number | null;
  toggleTimeBlockHandler?: (value: number, checked: boolean) => void;
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
const START_HOUR = 8;
const GRID_LINES = Array.from(new Array(7));

// TODO: DateNav의 날짜와 동일하도록 처리 필요
// NOTE: 현재 DUMMY_TIMES의 날짜대로 임시 세팅
const DUMMY_DATE = new Date();
DUMMY_DATE.setFullYear(2023);
DUMMY_DATE.setMonth(6);
DUMMY_DATE.setDate(23);
// NOTE: 현재 시각이 구간 사이일 경우 처리 확인을 위한 코드
DUMMY_DATE.setHours(0);
DUMMY_DATE.setMinutes(0);

const TimeBlockTable = ({
  height,
  records: propsRecords,
  toggleTimeBlockHandler,
  targetTodoId,
}: TimeBlockTableProps) => {
  const records = getReducedRecords(propsRecords, targetTodoId);

  useEffect(() => {
    const startHourId = formatTime({ h: START_HOUR < 24 ? START_HOUR + 1 : START_HOUR });
    document.getElementById('hour-label-08:00')?.scrollIntoView({ block: 'nearest' });
  }, []);

  let timestampIdx = 0;
  let isStart = false;

  const getTimeBlock = (h: number, m: number) => {
    // TODO: DUMMY_DATE 값이 DateNav의 날짜와 동일하도록 처리 필요
    const target = records[timestampIdx];

    const [current, next] = getCurrentNextTimes(DUMMY_DATE, h, m);

    let bg: string | undefined;
    let icon: string | undefined;
    let opacity: number | undefined;
    let leftRounded = false;
    let rightRounded = false;
    let checked = false;
    let checkable = targetTodoId ? true : false;

    if (target && floorMinute(target.start) <= current && current < target.end) {
      const { start, end, is_history, todo_id, category_icon, category_group_color } =
        target;

      // NOTE: 체크 여부 및 배경색 설정
      const isTarget = targetTodoId === todo_id;

      checked = targetTodoId ? isTarget : false;
      checkable = checked;
      bg = `${category_group_color}-${is_history ? '300' : '100'}`;

      // NOTE: 투명도 설정
      if (targetTodoId) {
        if (todo_id === targetTodoId) {
          opacity = 1;
        } else {
          opacity = 0.1;
        }
      } else if (!is_history) {
        opacity = 0.5;
      } else {
        opacity = 1;
      }

      // NOTE: 순서에 따른 round
      if (m === 0) {
        leftRounded = true;
      } else if (m === 50) {
        rightRounded = true;
      }

      // NOTE: 시작일 때 round
      if (!isStart && floorMinute(start) <= current) {
        icon = isStartOfCurrent(is_history, start) ? undefined : category_icon;
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

    const formattedTime = formatTime({ h, m });

    return (
      <TimeBlock
        key={formattedTime}
        id={formattedTime}
        value={current}
        onChange={toggleTimeBlockHandler}
        checked={checked}
        icon={icon}
        bg={bg}
        opacity={opacity}
        disabled={!checkable}
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
      <motion.div layout className="absolute w-100 flex-column gap-lg">
        {HOURS.map((_, h) => {
          const formattedHour = formatTime({ h });
          return (
            <div key={formattedHour} className="flex gap-2xs i-center">
              <HourLabel id={`hour-label-${formattedHour}`} className="text-sm">
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
      </motion.div>
    </div>
  );
};

export default TimeBlockTable;

const getReducedRecords = (records: RecordType[], taregtTodoId: number | null) => {
  if (taregtTodoId) {
    return records.filter((record) => !record.is_history);
  }

  return records
    .reduce((acc, record) => {
      const now = DUMMY_DATE.getTime();
      const { start, end, is_history } = record;

      // NOTE: history의 end값이 현재보다 클 경우 - end를 현재로
      if (start < now && now < end && is_history) {
        return [...acc, { ...record, end: now }];
      }

      // NOTE: schedule의 start값이 현재보다 작을 경우 - start를 현재로
      if (now < end && start < now && !is_history) {
        return [...acc, { ...record, start: now }];
      }

      // NOTE: history가 현재 시각 이전의 구간일 경우 포함
      if (end <= now && is_history) {
        return [...acc, record];
      }

      // NOTE: schedule이 현재 시각 이후의 구간일 경우 포함
      if (now < start && !is_history) {
        return [...acc, record];
      }

      return acc;
    }, [] as RecordType[])
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
