import { useState } from 'react';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';
import { styled } from 'styled-components';

const DateNavWrapper = styled.div`
  width: 50vw;
`;

const DateNav = () => {
  // TODO: locale 설정 가져오기 / 설정하기
  const [date, setDate] = useState(new Date());

  const today = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

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
    <DateNavWrapper className="w-50 flex justify-between items-center mx-auto">
      <FaBackwardStep onClick={backPrevDate} />
      <h3 style={{ lineHeight: '0.2rem' }}>{today}</h3>
      <FaForwardStep onClick={goNextDate} />
    </DateNavWrapper>
  );
};

export default DateNav;
