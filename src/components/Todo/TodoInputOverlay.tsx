import { ChangeEvent, useEffect, useState } from 'react';
import { ActionFunctionArgs } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { DailyTodoType, TodoType, todayAtom, todosAtom } from '../../atoms/todoAtom';
import { fetchRequest } from '../../util/request';
import IconImageHolder from '../UI/general/IconImageHolder';
import InputField from '../UI/input/InputField';
import InputOverlay, { InputOverlayProps } from '../UI/overlay/InputOverlay';

const StyledInput = styled.input`
  height: 1.875rem;
`;

const initialTodoData = {
  title: '',
  subtitle: '',
  memo: '',
};

const TodoInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  const today = useRecoilValue(todayAtom);
  const setTodos = useSetRecoilState(todosAtom);

  // TODO: 서버 구현 이후 삭제
  const [data, setData] = useState(initialTodoData);

  console.log(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setData(initialTodoData);
    }
  }, [isOpen]);

  // TODO: 서버 구현 이후 삭제
  const temporarySubmitHandler = () => {
    const todo: DailyTodoType = {
      daily_todo_id: new Date().getTime(),
      title: data.title,
      subtitle: data.subtitle,
      memo: data.memo,
      category_name: '이름없는 카테고리',
      history_sum: 0,
      schedule_sum: 0,
      star: false,
      todo_emoji: '📑',
    };

    setTodos((state) => [...state, todo]);
  };

  const formDataHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((state) => {
      const key = e.target.name as 'title' | 'subtitle' | 'memo';
      return { ...state, [key]: e.target.value };
    });
  };

  return (
    <InputOverlay
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setHideNav={setHideNav}
      submitHandler={temporarySubmitHandler}
    >
      {/* todo input */}
      <div className="flex gap-sm i-center">
        <IconImageHolder size="xl">📑</IconImageHolder>
        <div className="flex-column mt-sm">
          <span className="text-sm text-gray-200 bold">이름없는 카테고리</span>
          <StyledInput
            onChange={formDataHandler}
            value={data.title}
            className="bold"
            placeholder="할 일을 입력하세요"
            name="title"
          />
        </div>
      </div>
      {/* todo field */}
      <div className="w-80 mx-auto flex-column gap-md">
        {/* subtitle */}
        <InputField isInnerLabel={true}>
          <label>부제목</label>
          <textarea
            onChange={formDataHandler}
            value={data.subtitle}
            className="w-100 h-100 text-md medium"
            rows={1}
            name="subtitle"
          />
        </InputField>
        {/* memo */}
        <InputField isInnerLabel={true}>
          <label>메모</label>
          <textarea
            onChange={formDataHandler}
            value={data.memo}
            className="w-100 h-100 text-md medium"
            rows={4}
            name="memo"
          />
        </InputField>
        {/* date */}
        <input type="hidden" name="date" value={today.toLocaleDateString('sv-SE')} />
      </div>
    </InputOverlay>
  );
};

export default TodoInputOverlay;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get('title') || '';
  const subtitle = formData.get('subtitle') || '';
  const memo = formData.get('memo') || '';
  const emoji = formData.get('emoji') || '';

  // TODO: categoryId, date 제출 구현 필요
  const categoryId = (formData.get('category') as string) || '-1';
  const dailyTodoDate = formData.get('date');

  if (!dailyTodoDate) {
    throw new Error('현재 날짜를 찾을 수 없습니다.');
  }

  // Create new todo
  const todo = await fetchRequest<TodoType>({
    url: `/api/todos/add/${categoryId}`,
    method: 'post',
    body: {
      title,
      subtitle,
      memo,
      emoji,
    },
  });

  // Add todo to today
  if (todo.todo_id) {
    await fetchRequest({
      url: `/api/daily-todos/${todo.todo_id}`,
      method: 'post',
      body: { dailyTodoDate },
    });
  } else {
    throw new Error('등록할 할 일을 찾을 수 없습니다.');
  }

  return {};
};
