import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';
import shortid from 'shortid';
import { styled } from 'styled-components';
import StatisticsCalanderTime, { formatTime } from './StatisticsCalanderTime';
import { CircleWrapperProps } from '../UI/label/CircleLabel';

const Wrapper = styled.div`
  min-height: 22vh;
`;
const Day = styled.div`
  width: 2.5vh;
  height: 2.5vh;

  span {
    transform: scale(0.3);
    display: inline-block;
  }
`;
const TimeWrapper = styled.div<CircleWrapperProps>`
  color: rgba(0, 0, 0, 0.3);
  &::after {
    margin-left: 0.25rem;
    margin-bottom: 0.125rem;
    display: inline-block;
    content: '';
    flex-shrink: 0;
    width: ${({ $size }) => `var(--size-${$size})`};
    height: ${({ $size }) => `var(--size-${$size})`};
    border-radius: 100%;
    background-color: ${({ $color }) => `var(--${$color})`};
    opacity: ${({ $opacity }) => `${$opacity}`};
  }
`;
export interface MonthorWeeksMockDataProps {
  day: string;
  time: number;
}
interface StatisticsCalanderProps {
  weekHandle: string;
  handleDate: Date;
  onLine: (value: number) => void;
}

// 주별 api - 첫째주 예시
const WeeksTotalTimeMockData: MonthorWeeksMockDataProps[] = [
  {
    day: '20230730',
    time: 3600000,
  },
  {
    day: '20230731',
    time: 3600000,
  },
  {
    day: '20230801',
    time: 3800000,
  },
  {
    day: '20230802',
    time: 0,
  },
  {
    day: '20230803',
    time: 0,
  },
  {
    day: '20230804',
    time: 7200000,
  },
  {
    day: '20230805',
    time: 0,
  },
];
// 주별 api - 둘째주 예시
const WeeksTotalTime2MockData: MonthorWeeksMockDataProps[] = [
  {
    day: '20230806',
    time: 9000000,
  },
  {
    day: '20230807',
    time: 12600000,
  },
  {
    day: '20230810',
    time: 3600000,
  },
  {
    day: '20230812',
    time: 3600000,
  },
];

// 한달 전체 api
const MonthMockData: MonthorWeeksMockDataProps[] = [
  {
    day: '20230730',
    time: 3600000,
  },
  {
    day: '20230731',
    time: 3600000,
  },
  {
    day: '20230801',
    time: 3800000,
  },
  {
    day: '20230802',
    time: 0,
  },
  {
    day: '20230803',
    time: 0,
  },
  {
    day: '20230804',
    time: 7200000,
  },
  {
    day: '20230805',
    time: 0,
  },
  {
    day: '20230806',
    time: 9000000,
  },
  {
    day: '20230807',
    time: 12600000,
  },
  {
    day: '20230810',
    time: 3600000,
  },
  {
    day: '20230812',
    time: 3600000,
  },
  {
    day: '20230821',
    time: 7200000,
  },
];

const getWeeksTotalTime = (data: MonthorWeeksMockDataProps[]) => {
  return data.reduce((sum, value) => sum + value?.time, 0);
};

const Weeks = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주', '여섯째주'];

const Calander = ({ weekHandle, handleDate, onLine }: StatisticsCalanderProps) => {
  const currentMonth = handleDate !== null ? handleDate : new Date();
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(startMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const thisWeek = weekHandle;

  let day = startDate;
  let days = [];
  let line = [];
  let j = 0;

  const WeeksTotalTime = [];

  // 추후 api 요청 방식에 따라 수정 필요
  const test1week = formatTime(getWeeksTotalTime(WeeksTotalTimeMockData));
  const test2week = formatTime(getWeeksTotalTime(WeeksTotalTime2MockData));

  // 1주차 api 요청 - 5주or6주를 반복해야 하니 추후 수정하기.
  WeeksTotalTime.push(test1week);
  WeeksTotalTime.push(test2week);

  while (day <= endDate) {
    for (let i = 0; i < 8; i++) {
      const id = format(day, 'yyyyMMdd').toString();
      if (i === 7) {
        days.push(
          <TimeWrapper
            $color="primary"
            $size="2xxs"
            $opacity={thisWeek !== Weeks[j] ? '0' : '1'}
            className={`extra-bold ml-md text-xs`}
          >
            <StatisticsCalanderTime totalTime={WeeksTotalTime[j]} />
          </TimeWrapper>
        );
        j += 1;
      } else {
        if (format(startMonth, 'M') !== format(day, 'M')) {
          days.push(<Day key={shortid.generate()} className="o0 mg-xxs text-xxs"></Day>);
        } else {
          days.push(
            <Day
              key={id}
              className={`flex-center bg-light round-sm mg-xxs ${
                MonthMockData.filter((date) => date.day === id).length !== 0 &&
                'bg-primary'
              }`}
            >
              <span className="text-lg semi-bold text-white">
                {MonthMockData.filter((date) => date.day === id).length !== 0 &&
                  formatTime(MonthMockData.filter((date) => date.day === id)[0].time)}
              </span>
            </Day>
          );
        }
        day = addDays(day, 1);
      }
    }
    line.push(
      <div className="flex-center w-100" key={shortid.generate()}>
        {days}
      </div>
    );
    days = [];
    onLine(line.length);
  }

  return (
    <Wrapper className="w-80 flex j-around i-center">
      <div className="flex-column">{line}</div>
    </Wrapper>
  );
};

export default Calander;
