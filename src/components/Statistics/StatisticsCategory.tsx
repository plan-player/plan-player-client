import { Circle } from '../Category/CategoryComponents';
import { PropsWithChildren } from 'react';

interface StatisticsCategoryProps {
  id: string;
  current: number | string;
  onChangeHandle: (data: string) => void;
}

const StatisticsCategory = ({
  id,
  onChangeHandle,
  current,
  children,
}: PropsWithChildren<StatisticsCategoryProps>) => {
  return (
    <>
      <input
        id={id}
        className="hide"
        type="radio"
        checked={current === id}
        onChange={() => onChangeHandle(id)}
      />
      <label className={`flex-center ${current !== id && 'o-3'}`} htmlFor={id}>
        <Circle />
        <h6 className="text-xs">{children}</h6>
      </label>
    </>
  );
};

export default StatisticsCategory;
