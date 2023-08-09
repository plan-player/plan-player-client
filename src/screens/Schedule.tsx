import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import shortid from 'shortid';
import { styled } from 'styled-components';
import { RecordType, recordsAtom } from '../atoms/scheduleAtom';
import { TodoType, todosAtom } from '../atoms/todoAtom';
import { showInputAtom } from '../atoms/uiAtom';
import TimeBlockTable from '../components/Time/TimeBlockTable';
import TodoBoard from '../components/Todo/TodoBoard';
import ConfirmCancelButtons from '../components/UI/button/ConfirmCancelButtons';
import TimeBar from '../components/UI/graph/TimeBar';
import DateNav from '../components/UI/nav/DateNav';

const now = new Date();
now.setMinutes(0);

const ScheduleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0rem 2rem 2rem 2rem;
`;

const Polyfill = styled.div`
  height: 2.5rem;

  @media screen and (min-width: 960px) {
    height: 3.5rem;
  }
`;

const Schedule = () => {
  const submit = useSubmit();

  const todos = useRecoilValue(todosAtom);
  const setShowInput = useSetRecoilState(showInputAtom);
  const [records, setRecords] = useRecoilState(recordsAtom);

  // TODO: 사용자 입력에 따라 targetTodoId / timestamps 변경
  const [targetTodoId, setTargetTodoId] = useState<number | null>(null);
  const [todoBoardItems, setTodoBoardItems] = useState(todos);

  // NOTE: 타임테이블과 타임바의 높이 일치를 위한 처리 (컴포넌트 로드 후 진행되어야 함)
  const [tableHeight, setTableHeight] = useState('100%');
  useEffect(() => {
    setTableHeight(getTimeTableHeight());
  }, []);

  const setTargetTodoHandler = (id: number) => {
    setTargetTodoId(id);
    setShowInput(false);

    const todo = todos.find((item) => item.id === id);
    if (todo) {
      setTodoBoardItems([todo]);
    } else {
      throw new Error('편집할 할 일이 존재하지 않습니다.');
    }
  };

  const toggleScheduleHandler = (start: number, checked: boolean) => {
    const targetTodo = todos.find((todo) => targetTodoId === todo.id);
    if (targetTodo) {
      const end = start + 600000; // 스케줄 한 칸의 시간 길이 10분의 밀리초를 더함
      
      if (!checked) {
        // 체크하기
        setRecords((prev) => {
          return checkSchedule(prev, start, end, targetTodo);
        });
      } else {
        // 체크 해제하기
        setRecords((prev) => {
          return unCheckSchedule(prev, start, end, targetTodo);
        });
      }
    } else {
      throw new Error('편집할 할 일이 존재하지 않습니다.');
    }
  };

  const cancelHandler = () => {
    setTargetTodoId(null);
    setShowInput(true);
    setTodoBoardItems(todos);
  };

  // TODO: 백엔드로 데이터 전송 로직 작성
  const submitHandler = () => {
    submit({}, { method: 'POST' });
  };

  return (
    <ScheduleWrapper className="h-100 flex-column gap-md">
      <DateNav />
      <div className="flex-column gap-lg hidden">
        <motion.div layout className="w-80 mx-auto h-70 flex gap-lg scroll">
          <TimeBar height={tableHeight} />
          <TimeBlockTable
            height={tableHeight}
            records={records}
            targetTodoId={targetTodoId}
            toggleTimeBlockHandler={toggleScheduleHandler}
          />
        </motion.div>
        <motion.div layout="position" className="flex-column gap-md">
          {targetTodoId && (
            <motion.div layout="position" className="flex-column i-center gap-xs">
              <h5>스케줄 편집하기</h5>
              <p className="text-sm">
                상단의 시간표를 눌러 아래 할 일을 실행할 시간 계획을 편집하세요.
              </p>
            </motion.div>
          )}
          <motion.div layout="position">
            <TodoBoard onTodoClicked={setTargetTodoHandler} todos={todoBoardItems} />
          </motion.div>
          {targetTodoId && (
            <ConfirmCancelButtons
              onConfirm={submitHandler}
              onClose={cancelHandler}
              noMargin={true}
            />
          )}
          {!targetTodoId && <Polyfill />}
        </motion.div>
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
  return { ok: true };
};

// 블록 체크에 따른 상태 업데이트 함수
const checkSchedule = (
  prevRecords: RecordType[],
  start: number,
  end: number,
  { id, icon_image_path, category_name }: TodoType
) => {
  const nearBlocks = prevRecords.filter(
    (record) =>
      !record.is_history &&
      (record.start === end || record.end === start) &&
      record.todo_id === id
  );

  // 인접한 스케줄의 개수에 따라 앞에 / 뒤에 / 중간에 / 새로 스케줄 생성
  if (nearBlocks.length === 1) {
    const newBlock = { ...nearBlocks[0] };

    // 앞쪽에 인접한 경우 - 기존 start 확장
    if (newBlock.start === end) {
      newBlock.start = start;
    }

    // 뒤쪽에 인접한 경우 - 기존 end 확장
    if (newBlock.end === start) {
      newBlock.end = end;
    }

    return prevRecords
      .filter((record) => record.id !== newBlock.id)
      .concat(newBlock)
      .sort((a, b) => a.start - b.start);
  } else if (nearBlocks.length === 2) {
    // 중간인 경우 - 중간을 포함하는 하나의 블록으로 합치기
    const newBlock = { ...nearBlocks[0] };
    newBlock.end = nearBlocks[1].end;

    return prevRecords
      .filter((record) => ![nearBlocks[0].id, nearBlocks[1].id].includes(record.id))
      .concat(newBlock)
      .sort((a, b) => a.start - b.start);
  } else {
    // 인접하지 않은 경우 - 새로 생성
    return [
      ...prevRecords,
      {
        id: shortid.generate(),
        start,
        end,
        duration: 600000,
        is_history: false,
        todo_id: id,
        category_icon: icon_image_path,
        category_group_color: 'blue',
      } as RecordType,
    ].sort((a, b) => a.start - b.start);
  }
};

// 블록 체크 해제에 따른 상태 업데이트 함수
const unCheckSchedule = (
  prevRecords: RecordType[],
  start: number,
  end: number,
  { id }: TodoType
) => {
  const targetBlock = prevRecords.find(
    (record) =>
      !record.is_history &&
      record.start <= start &&
      end <= record.end &&
      record.todo_id === id
  );

  if (targetBlock) {
    const nextBlock = { ...targetBlock };
    const nextBlocks = prevRecords.filter((record) => record.id !== targetBlock.id);
    const isStart = targetBlock.start === start;
    const isEnd = targetBlock.end === end;

    if (isStart && isEnd) {
      // 한 칸짜리일 경우 - 없애기
      return nextBlocks;
    } else if (isStart || isEnd) {
      if (isStart) {
        // 시작에 인접한 경우 - 시작 블록 줄이기
        nextBlock.start = end;
      } else {
        // 끝에 인접한 경우 - 끝 블록 줄이기
        nextBlock.end = start;
      }
      return [...nextBlocks, nextBlock].sort((a, b) => a.start - b.start);
    } else {
      // 중간인 경우 - 앞쪽과 뒤쪽 블록으로 나눔
      const lastRecord = { ...nextBlock, id: shortid.generate() };

      nextBlock.end = start;
      lastRecord.start = end;

      return [...nextBlocks, nextBlock, lastRecord].sort((a, b) => a.start - b.start);
    }
  } else {
    return prevRecords;
  }
};

// 시간 길이에 따라 높이 구하기
const getTimeTableHeight = () => {
  const top = document.getElementById('hour-label-00:00')?.offsetTop;
  const bottom =
    (document.getElementById('hour-label-24:00')?.offsetTop || 0) +
    (document.getElementById('hour-label-24:00')?.offsetHeight || 0);

  const height = (bottom || 0) - (top || 0);
  return height ? `${height}px` : '100%';
};
