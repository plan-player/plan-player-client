import { styled } from 'styled-components';
import Calander from '../components/Statistics/Calander';
import DateNav from '../components/UI/nav/DateNav';
import StatisticsDay from '../components/Statistics/StatisticsDay';
import { useState } from 'react';
import StatisticsCategory from '../components/Statistics/StatisticsCategory';
import StatisticsCategoryItem from '../components/Statistics/StatisticsCategoryItem';
import CircleLabel from '../components/UI/label/CircleLabel';

const Wrapper = styled.div`
  height: 89%;
`;

const StatisticsBoard = styled.div`
  height: 40%;
  overflow: hidden;
  div {
    span {
      white-space: nowrap;
    }
  }
`;

const WeekWrapper = styled.div`
  h6 {
    white-space: nowrap;
  }
`;

interface CategoriesSampleProps {
  id: string;
  text: string;
}

const categoriesSample: CategoriesSampleProps[] = [
  {
    id: 'category1',
    text: 'Category1',
  },
  {
    id: 'category2',
    text: 'Category2',
  },
  {
    id: 'category3',
    text: 'Category3',
  },
  {
    id: 'category4',
    text: 'Category4',
  },
];

interface StatisticsWeeksProps {
  value: number;
  text: string;
  id: string;
}

const weeks: StatisticsWeeksProps[] = [
  {
    value: 0,
    text: '첫째주',
    id: 'week1',
  },
  {
    value: 7,
    text: '둘째주',
    id: 'week2',
  },
  {
    value: 14,
    text: '셋째주',
    id: 'week3',
  },
  {
    value: 21,
    text: '넷째주',
    id: 'week4',
  },
  {
    value: 28,
    text: '다섯째주',
    id: 'week5',
  },
  {
    value: 35,
    text: '여섯째주',
    id: 'week6',
  },
];

const Statistics = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [weekLine, setWeekLine] = useState(0);

  const onHandleMonth = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <Wrapper className="flex-column scroll i-center w-100">
      <DateNav onNext={onHandleMonth} onPrev={onHandleMonth} isMonth={true} />

      <Calander onLine={setWeekLine} handleDate={currentDate} />

      <div className="w-80 flex-i-center j-between m-lg">
        <input
          id="all"
          className="hide"
          type="radio"
          checked={selectedCategory === 'all'}
          onChange={() => setSelectedCategory('all')}
        />
        <label
          className={`flex-center ${selectedCategory !== 'all' && 'o-3'}`}
          htmlFor="all"
        >
          <CircleLabel className="gap-xs" color="gray-200">
            <span className="text-xs">All</span>
          </CircleLabel>
        </label>

        {categoriesSample.map((cate) => (
          <StatisticsCategory
            current={selectedCategory}
            onChangeHandle={setSelectedCategory}
            id={cate.id}
            key={cate.id}
          >
            {cate.text}
          </StatisticsCategory>
        ))}
      </div>

      <div className="flex j-around mt-md scroll w-90 h-60">
        <div className="flex-column w-70 ml-md">
          <StatisticsDay
            weekHandle={weeks[selectedIndex].value}
            handleDate={currentDate}
          />
        </div>

        <div className="w-40">
          <StatisticsBoard className="round-md bg-gray-50 flex-column i-center pd-lg gap-xs text-xs ml-lg">
            <StatisticsCategoryItem />
          </StatisticsBoard>

          <WeekWrapper className="text-sm gap-md mt-lg flex-column i-center j-around">
            {weeks.slice(0, weekLine).map((week, index) => {
              const { id } = week;
              return (
                <div key={id}>
                  <label htmlFor={id}>
                    <h6 className={`${selectedIndex !== index && 'o-3'}`}>{week.text}</h6>
                  </label>
                  <input
                    id={id}
                    className="hide"
                    type="radio"
                    checked={selectedIndex === index}
                    onChange={() => setSelectedIndex(index)}
                  />
                </div>
              );
            })}
          </WeekWrapper>
        </div>
      </div>
    </Wrapper>
  );
};

export default Statistics;
