import { useState } from 'react';
import TodoListItem, { TodoListItemProps } from '../components/Todo/TodoListItem';
import DateNav from '../components/UI/nav/DateNav';

export const DUMMY_TODOS: TodoListItemProps[] = [
  {
    id: '1',
    cover: '🖇',
    category: 'Category Name 1',
    title: 'Long Main Title Main Todo 1',
    time: '00:00:00',
  },
  {
    id: '2',
    cover: '📑',
    category: 'Category Name 2',
    title: 'Main Title Main Todo 2',
    time: '00:00:00',
  },
  {
    id: '3',
    cover: '📚',
    category: 'Category Name 3',
    title: 'Main Title Main Todo 3',
    time: '00:00:00',
  },
  {
    id: '4',
    cover: '💻',
    category: 'Category Name 4',
    title: 'IfLongLongLongLongMainTitleMainTodo4',
    time: '00:00:00',
  },
];

const Playlist = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      <div className="w-85 flex-column gap-lg mx-auto">
        <DateNav />
        {/* TODO: DraggableList 컴포넌트 개발 */}
        <ol className="flex-column gap-md">
          {DUMMY_TODOS.map((todo) => (
            <TodoListItem key={todo.id} {...todo} />
          ))}
        </ol>
      </div>
      {/* <TodoInputOverlay isOpen={showInput} setIsOpen={setShowInput} /> */}
    </>
  );
};

export default Playlist;
