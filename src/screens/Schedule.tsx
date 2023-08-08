import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import shortid from 'shortid';
import { styled } from 'styled-components';
import { RecordType, recordsAtom } from '../atoms/scheduleAtom';
import { todosAtom } from '../atoms/todoAtom';
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

  const [todos, setTodos] = useRecoilState(todosAtom);
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
      const { id, icon_image_path, category_name } = targetTodo;
      const duration = 600000;
      const end = start + duration;
      if (!checked) {
        // 체크하기
        setRecords((prev) => {
          const prevRecords = prev.filter(
            (record) =>
              !record.is_history &&
              (record.start === end || record.end === start) &&
              record.todo_id === targetTodoId
          );

          if (prevRecords.length === 1) {
            const prevRecord = prevRecords[0];
            const nextRecord = { ...prevRecord };

            // 앞쪽에 인접한 경우
            if (nextRecord.start === end) {
              nextRecord.start = start;
            }

            // 뒤쪽에 인접한 경우
            if (nextRecord.end === start) {
              nextRecord.end = end;
            }

            return prev
              .filter((record) => record.id !== nextRecord.id)
              .concat(nextRecord)
              .sort((a, b) => a.start - b.start);
          } else if (prevRecords.length === 2) {
            // TODO: 다른 투두 사이에 끼어있을 때도 이 조건에 해당되나? 안될 거 같은데... 알아보기
            // 중간인 경우
            const nextRecord = { ...prevRecords[0] };
            nextRecord.end = prevRecords[1].end;

            return prev
              .filter(
                (record) => ![prevRecords[0].id, prevRecords[1].id].includes(record.id)
              )
              .concat(nextRecord)
              .sort((a, b) => a.start - b.start);
          } else {
            return [
              ...prev,
              {
                id: shortid.generate(),
                start,
                end,
                duration,
                is_history: false,
                todo_id: id,
                category_icon: icon_image_path,
                category_group_color: 'blue',
              } as RecordType,
            ].sort((a, b) => a.start - b.start);
          }
        });
      } else {
        // 체크 해제하기
        setRecords((prev) => {
          const prevRecord = prev.find(
            (record) =>
              !record.is_history &&
              record.start <= start &&
              end <= record.end &&
              record.todo_id === targetTodoId
          );

          if (prevRecord) {
            const nextRecord = { ...prevRecord };
            const nextRecords = prev.filter((record) => record.id !== prevRecord.id);
            const isStart = prevRecord.start === start;
            const isEnd = prevRecord.end === end;

            if (isStart && isEnd) {
              // 한 칸짜리일 경우
              return nextRecords;
            } else if (isStart || isEnd) {
              if (isStart) {
                // 시작에 인접한 경우
                nextRecord.start = end;
              } else {
                // 끝에 인접한 경우
                nextRecord.end = start;
              }
              return [...nextRecords, nextRecord].sort((a, b) => a.start - b.start);
            } else {
              // 중간인 경우
              const lastRecord = { ...nextRecord, id: shortid.generate() };

              nextRecord.end = start;
              lastRecord.start = end;

              return [...nextRecords, nextRecord, lastRecord].sort(
                (a, b) => a.start - b.start
              );
            }
          } else {
            return prev;
          }
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

const getTimeTableHeight = () => {
  const top = document.getElementById('hour-label-00:00')?.offsetTop;
  const bottom =
    (document.getElementById('hour-label-24:00')?.offsetTop || 0) +
    (document.getElementById('hour-label-24:00')?.offsetHeight || 0);

  const height = (bottom || 0) - (top || 0);
  return height ? `${height}px` : '100%';
};
