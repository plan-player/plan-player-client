import { useState } from 'react';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';

interface DateProps {
  showMonth?: boolean;
}

const DateNav = ({ showMonth }: DateProps) => {
  // TODO: locale 설정 가져오기 / 설정하기
  const [date, setDate] = useState(new Date());

  const today = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const englishMonth = date.toLocaleDateString('en-US', {
    month: 'long',
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
    <div className="w-70 flex j-between i-center mx-auto">
      <FaBackwardStep onClick={backPrevDate} />
      <h3>{showMonth ? englishMonth : today}</h3>
      <FaForwardStep onClick={goNextDate} />
    </div>
  );
};

export default DateNav;
