import { useEffect, useState } from 'react';
import { redirect, useSubmit } from 'react-router-dom';
import { styled } from 'styled-components';
import TimeBlockTable from '../components/Time/TimeBlockTable';
import TodoBoard from '../components/Todo/TodoBoard';
import TimeBar from '../components/UI/graph/TimeBar';
import DateNav from '../components/UI/nav/DateNav';

export type TimeListType = {
  key?: string;
  start: number;
  end: number;
  isHistory: boolean;
  icon?: string; // todoId?
  color?: string; // todoId => categoryId?
}[];
const now = new Date();
now.setMinutes(0);

// 2023. 07. 23. GMT+9
const DUMMY_TIMES = [
  {
    key: '08:00 - 09:20',
    start: 1690066800000, // 08:00
    end: 1690071600000, // 09:20
    isHistory: false,
  },
  {
    key: '10:30 - 12:30',
    start: 1690075800000, // 10:30
    end: 1690083000000, // 12:30
    isHistory: false,
  },
  {
    key: '15:40 - 16:30',
    start: 1690094400000, // 15:40
    end: 1690097400000, // 16:30
    isHistory: false,
  },
  {
    key: '08:12 - 09:47',
    start: 1690067537000, // 08:12:17
    end: 1690073246000, // 09:47:26
    isHistory: true,
  },
  {
    key: '10:30 - 12:19',
    start: 1690075819000, // 10:30:19
    end: 1690082340000, // 12:19:00
    isHistory: true,
  },
  {
    key: '15:55 - 16:30',
    start: 1690095300000, // 15:55:00
    end: 1690097447000, // 16:30:47
    isHistory: true,
  },
];

const ScheduleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0rem 2rem 2rem 2rem;
`;

const Polyfill = styled.div`
  height: 2rem;

  @media screen and (min-width: 960px) {
    display: none;
  }
`;

const Schedule = () => {
  const submit = useSubmit();

  // TODO: 사용자 입력에 따라 targetTodoId / timestamps 변경
  const [targetTodoId, setTargetTodoId] = useState<string | null>(null);
  const [timestamps, setTimestamps] = useState<TimeListType>(DUMMY_TIMES);

  // NOTE: 타임테이블과 타임바의 높이 일치를 위한 처리 (컴포넌트 로드 후 진행되어야 함)
  const [tableHeight, setTableHeight] = useState('100%');
  useEffect(() => {
    setTableHeight(getTimeTableHeight());
  }, []);

  // TODO: 백엔드로 데이터 전송 로직 작성
  const submitHandler = () => {
    submit({}, { method: 'POST' });
  };

  return (
    <ScheduleWrapper className="h-100 flex-column gap-md">
      <DateNav />
      <div className="flex-column gap-lg hidden">
        <div className="w-80 mx-auto h-70 flex gap-lg scroll">
          <TimeBar height={tableHeight} />
          <TimeBlockTable height={tableHeight} timestamps={timestamps} />
        </div>
        <TodoBoard
          setTodo={(id: string) => {
            setTargetTodoId(id);
          }}
        />
        <Polyfill />
      </div>
    </ScheduleWrapper>
  );
};

export default Schedule;

// TODO: 백엔드로 데이터 전송 로직 작성
export const action = async ({ request }: { request: Request }) => {
  const data = await request.formData();
  data.get('');
  await fetch('url', {
    method: 'POST',
  });
  return redirect('/');
};

const getTimeTableHeight = () => {
  const top = document.getElementById('00:00')?.offsetTop;
  const bottom =
    (document.getElementById('24:00')?.offsetTop || 0) +
    (document.getElementById('24:00')?.offsetHeight || 0);

  const height = (bottom || 0) - (top || 0);
  return height ? `${height}px` : '100%';
};
