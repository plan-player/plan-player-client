import { PropsWithChildren } from 'react';
import CircleLabel from '../UI/label/CircleLabel';

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
        <CircleLabel className="gap-xs" color="gray-200">
          <span className="text-xs">{children}</span>
        </CircleLabel>
      </label>
    </>
  );
};

export default StatisticsCategory;
