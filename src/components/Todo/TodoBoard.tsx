import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TodoType, todosAtom } from '../../atoms/todoAtom';
import IconImageHolder from '../UI/general/IconImageHolder';
import CircleLabel from '../UI/label/CircleLabel';

interface TodoBoardProps {
  todos?: TodoType[];
  onTodoClicked?: (id: number) => void;
  className?: string;
}

const TodoBoard = ({ todos: propsTodos, onTodoClicked, className }: TodoBoardProps) => {
  const todos = useRecoilValue(todosAtom);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={`border-box p-root bg round-lg scroll ${className || ''}`}>
      <ul className="flex-column gap-sm">
        {(propsTodos ? propsTodos : todos).map((todo) => (
          <li
            key={todo.id}
            onClick={() => {
              onTodoClicked && onTodoClicked(todo.id as number);
            }}
          >
            <CircleLabel className="flex i-center gap-sm">
              <IconImageHolder size="sm">{todo.icon_image_path}</IconImageHolder>
              <span className="text-md break-word text-ellipsis hidden nowrap">
                {todo.title}
              </span>
            </CircleLabel>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoBoard;
