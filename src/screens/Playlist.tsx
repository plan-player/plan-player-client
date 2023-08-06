import { useRecoilState } from 'recoil';
import { todosAtom } from '../atoms/todoAtom';
import TodoListItem from '../components/Todo/TodoListItem';
import DateNav from '../components/UI/nav/DateNav';

const Playlist = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);

  return (
    <div className="w-85 flex-column gap-lg mx-auto">
      <DateNav />
      {/* TODO: DraggableList 컴포넌트 개발 */}
      <ol className="flex-column gap-md">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} {...todo} />
        ))}
      </ol>
    </div>
  );
};

export default Playlist;
