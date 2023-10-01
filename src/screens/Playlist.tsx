import { useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import { useRecoilState } from 'recoil';
import { DailyTodoType, todosAtom } from '../atoms/todoAtom';
import TodoListItem from '../components/Todo/TodoListItem';
import DraggableItem from '../components/UI/draggable/DraggableItem';
import DraggableList from '../components/UI/draggable/DraggableList';
import DateNav from '../components/UI/nav/DateNav';
import { fetchRequest } from '../util/request';

const Playlist = () => {
  const [todos, setTodo] = useRecoilState(todosAtom);

  const todoData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useEffect(() => {
    setTodo(todoData);
  }, [todoData]);

  const submitTodoOrder = () => {
    return;
  };

  return (
    <div className="w-85 flex-column gap-lg mx-auto">
      <DateNav />
      {/* TODO: DraggableList 컴포넌트 개발 */}
      <DraggableList<DailyTodoType>
        id="playlist"
        list={todos}
        setList={setTodo}
        onDragEnd={submitTodoOrder}
        className="flex-column"
      >
        {todos.map((todo, i) => (
          <DraggableItem key={todo.daily_todo_id} id={todo.daily_todo_id.toString()} idx={i}>
            <TodoListItem {...todo} />
          </DraggableItem>
        ))}
      </DraggableList>
    </div>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const today = params.today || new Date().toLocaleDateString('sv-SE');

  const todoData = await fetchRequest<DailyTodoType[]>({
    url: `/api/daily-todos/date/${today}`,
    method: 'get',
  });

  const todos = todoData.map((todo) => {
    todo.history_sum = todo.history_sum * 1000;
    return todo;
  });

  return todos;
};

export default Playlist;
