import { styled } from 'styled-components';
import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  endOfMonth,
  endOfWeek,
} from 'date-fns';
import StatisticsTime from './StatisticsTime';
import shortid from 'shortid';

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const TimeWrapper = styled.div`
  overflow: hidden;
`;

interface TimeDataProps {
  day: string;
  data: StatisticsTimeProps[];
}

export interface StatisticsTimeProps {
  time: number;
  size: string;
  categoryName?: string;
  categoryColor: string;
}

const timeTestdata: TimeDataProps[] = [
  {
    day: '20230731',
    data: [
      {
        time: 9000000,
        categoryName: 'Todo2',
        categoryColor: 'black',
        size: '0',
      },
      {
        time: 3600000,
        categoryName: 'Todo In Progress',
        categoryColor: 'gray',
        size: '0',
      },
      {
        time: 9000000,
        categoryName: 'Todo In Progress',
        categoryColor: 'gray',
        size: '0',
      },
    ],
  },
  {
    day: '20230801',
    data: [
      {
        time: 7200000,
        categoryName: 'Todo In Progress',
        categoryColor: 'black',
        size: '0',
      },
      {
        time: 7200000,
        categoryName: 'Todo In Progress',
        categoryColor: 'black',
        size: '0',
      },
      {
        time: 12600000,
        categoryName: 'Todo2',
        categoryColor: 'gray',
        size: '0',
      },
    ],
  },
];

interface StatisticsDayProps {
  weekHandle: number;
  handleDate: Date;
}

const getTotalTimeForDay = (dayData: StatisticsTimeProps[]): number => {
  return dayData.reduce((total, item) => total + item.time, 0);
};

const getMaxTotalTime = (data: TimeDataProps[]): number => {
  let maxTotalTime = 0;
  data.forEach((item) => {
    const totalDayTime = getTotalTimeForDay(item.data);
    maxTotalTime = Math.max(maxTotalTime, totalDayTime);
  });
  return maxTotalTime;
};

const StatisticsDay = ({ weekHandle, handleDate }: StatisticsDayProps) => {
  const currentMonth = handleDate;
  const startMonth = startOfMonth(currentMonth);
  const startWeek = startOfWeek(startMonth);
  const maxTimeValue = getMaxTotalTime(timeTestdata);
  const endMonth = endOfMonth(currentMonth);
  const endDay = endOfWeek(endMonth);

  let weekprops = addDays(startWeek, weekHandle);

  let day = weekprops;
  let days = [];
  let isAddedPrevMonth = false;
  let isAddedThisMonth = false;
  let isNextMonth = false;
  let isAddedNextMonth = false;
  // let isAddedPrevYear = false;
  // let isAddedNextYear = false;

  const formatTimeDate = (date: Date) => format(date, 'yyyyMMdd');
  const formatDateDay = (date: Date) => format(date, 'dd');
  // const formatYear = (date: Date) => format(date, 'yyyy');
  const isSameMonth = (date1: Date | number, date2: Date) =>
    format(date1, 'M') === format(date2, 'M');

  for (let i = 0; i < 7; i++) {
    const date = formatDateDay(day);
    const haveTimeDate = formatTimeDate(day);

    if (!isSameMonth(startMonth, day)) {
      if (!isAddedPrevMonth && !isNextMonth) {
        days.push(<h6 className="mb-sm mt-md">{format(startWeek, 'MMMM')}</h6>);
        isAddedPrevMonth = true;
      } else if (isNextMonth && !isAddedNextMonth) {
        days.push(<h6 className="mb-sm mt-md">{format(endDay, 'MMMM')}</h6>);
        isAddedNextMonth = true;
      }
    } else {
      if (!isAddedThisMonth) {
        days.push(<h6 className="mb-sm mt-md">{format(startMonth, 'MMMM')}</h6>);
        isAddedThisMonth = true;
        if (!isSameMonth(Number(date), day)) isNextMonth = true;
      }
    }

    days.push(
      <li className="flex j-between " key={date}>
        <div className="m-xs flex-column i-center w-10">
          <span className="text-xs extra-bold">{week[day.getDay()]}</span>
          <span className="text-lg extra-bold">{date}</span>
        </div>
        <TimeWrapper className="flex i-center j-start gap-sm w-100 ml-lg">
          {timeTestdata
            ?.filter((a) => a.day === haveTimeDate)?.[0]
            ?.data?.map((b) => (
              <StatisticsTime
                key={shortid.generate()}
                {...b}
                time={b.time / 60000}
                size={(b.time / maxTimeValue) * 100 + '%'}
              />
            ))}
        </TimeWrapper>
      </li>
    );

    day = addDays(day, 1);
  }

  return <ul className="flex-column w-100">{days}</ul>;
};

export default StatisticsDay;
