import { useState } from 'react';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';
import { styled } from 'styled-components';

interface DateProps {
  isMonth?: boolean;
  onPrev?: (newDate: Date) => void;
  onNext?: (newDate: Date) => void;
}

const DateNavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--white);
  z-index: 50;
`;

const Polyfill = styled.div`
  height: 3rem;
`;

const DateNav = ({ isMonth, onPrev, onNext }: DateProps) => {
  // TODO: locale 설정 가져오기 / 설정하기
  const [date, setDate] = useState(new Date());

  const today = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const month = date.toLocaleString('en-US', {
    month: 'long',
  });

  const goNextMonth = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setMonth(prev.getMonth() + 1);
      onNext && onNext(date);
      return date;
    });
  };

  const goPrevMonth = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setMonth(prev.getMonth() - 1);
      onPrev && onPrev(date);
      return date;
    });
  };

  const goNextDate = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(prev.getDate() + 1);
      return date;
    });
  };

  const backPrevDate = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(prev.getDate() - 1);
      return date;
    });
  };

  return (
    <div>
      <Polyfill />
      <DateNavWrapper className="w-100">
        <div className="w-70 flex j-between i-center mx-auto mb-lg">
          <FaBackwardStep onClick={isMonth ? goPrevMonth : backPrevDate} />
          <h3>{isMonth ? month : today}</h3>
          <FaForwardStep onClick={isMonth ? goNextMonth : goNextDate} />
        </div>
      </DateNavWrapper>
    </div>
  );
};

export default DateNav;
