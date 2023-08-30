import { useEffect } from 'react';
import { useActionData } from 'react-router';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { todosAtom } from '../atoms/todoAtom';
import TodoListItem from '../components/Todo/TodoListItem';
import DateNav from '../components/UI/nav/DateNav';

const Playlist = () => {
  const newTodo = useActionData();

  const todos = useRecoilValue(todosAtom);
  const refreshTodos = useRecoilRefresher_UNSTABLE(todosAtom);

  useEffect(() => {
    refreshTodos();
  }, [newTodo]);

  return (
    <div className="w-85 flex-column gap-lg mx-auto">
      <DateNav />
      {/* TODO: DraggableList 컴포넌트 개발 */}
      <ol className="flex-column gap-md">
        {todos.map((todo) => (
          <TodoListItem key={todo.daily_todo_id} {...todo} />
        ))}
      </ol>
    </div>
  );
};

export default Playlist;
