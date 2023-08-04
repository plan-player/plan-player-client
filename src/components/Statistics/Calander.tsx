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

const Wrapper = styled.div`
  min-height: 25%;
`;
const Day = styled.div`
  width: 2vh;
  height: 2vh;
`;

interface StatisticsCalanderProps {
  handleDate: Date;
  onLine: (value: number) => void;
}

const Calander = ({ handleDate, onLine }: StatisticsCalanderProps) => {
  const currentMonth = handleDate !== null ? handleDate : new Date();
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(startMonth);
  const startDate = startOfWeek(startMonth);

  const endDate = endOfWeek(endMonth);
  let day = startDate;
  let days = [];
  let line = [];

  /* Todo : 주 별로 합계 시간 나타내기 */
  while (day <= endDate) {
    for (let i = 0; i < 8; i++) {
      const id = format(day, 'yyyyMMdd').toString();
      if (i === 7) {
        days.push(
          <div className="extra-bold ml-lg text-sm" key={shortid.generate()}>
            00:00
          </div>
        );
      } else {
        if (format(startMonth, 'M') !== format(day, 'M')) {
          days.push(<Day key={shortid.generate()} className="o0 m-xs"></Day>);
        } else {
          days.push(<Day key={id} className="bg-light round-xs m-xs"></Day>);
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
    <Wrapper className="w-100 flex j-around i-center">
      <div className="w-60 flex-column">{line}</div>
    </Wrapper>
  );
};

export default Calander;
