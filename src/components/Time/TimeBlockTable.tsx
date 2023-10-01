import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { RecordType, dividedRecordsSelector } from '../../atoms/recordAtom';
import { todayAtom } from '../../atoms/todoAtom';
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

const HOURS = Array.from(new Array(25)); // 24시간
const MINUTES = Array.from(new Array(6)); // 60분
const INITIAL_HOUR = 8; // 스크롤 초기값 위치에 해당하는 시간
const GRID_LINES = Array.from(new Array(7)); // 6칸

const TimeBlockTable = ({
  height,
  records: prevRecords,
  toggleTimeBlockHandler,
  targetTodoId,
}: TimeBlockTableProps) => {
  const schedules = prevRecords.filter((record) => !record.is_history);

  const dividedRecords = useRecoilValue(dividedRecordsSelector);
  const today = useRecoilValue(todayAtom);

  const records = targetTodoId ? schedules : dividedRecords;

  useEffect(() => {
    const startHourId = formatTime({
      h: INITIAL_HOUR < 24 ? INITIAL_HOUR : INITIAL_HOUR - 1,
    });
    document
      .getElementById(`hour-label-${startHourId}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, []);

  let timestampIdx = 0;
  let isStart = false;

  const getTimeBlock = (h: number, m: number) => {
    const target = records[timestampIdx];

    const [current, next] = getCurrentNextTimes(today, h, m);

    let bg: string | undefined;
    let icon: string | undefined;
    let opacity: number | undefined;
    let leftRounded = false;
    let rightRounded = false;
    let checked = false;
    let checkable = targetTodoId ? true : false;

    if (target && floorMinute(target.start) <= current) { // && current < target.end
      const { start, end, is_history, todo_id, category_icon, category_group_color } =
        target;

      // NOTE: 체크 여부 및 배경색 설정
      const isTarget = targetTodoId === todo_id;

      checked = targetTodoId ? isTarget : false;
      checkable = checked;
      bg = `${category_group_color.toLowerCase()}-${is_history ? '300' : '100'}`;

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
        icon = isStartOfCurrent(is_history, start, today) ? undefined : category_icon;
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

const isStartOfCurrent = (isHistory: boolean, start: number, date: Date) => {
  if (!isHistory) {
    const currentHour = date.getHours();
    const targetHour = new Date(start).getHours();
    return targetHour <= currentHour;
  } else {
    return false;
  }
};
