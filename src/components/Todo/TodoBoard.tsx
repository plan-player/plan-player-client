import { useState } from 'react';
import { DUMMY_TODOS } from '../../screens/Playlist';
import IconImageHolder from '../UI/general/IconImageHolder';
import CircleLabel from '../UI/label/CircleLabel';

interface TodoBoardProps {
  setTodo?: (id: string) => void;
  className?: string;
}

const TodoBoard = ({ setTodo, className }: TodoBoardProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={`border-box p-root bg round-lg scroll ${className || ''}`}>
      <ul className="flex-column gap-sm">
        {DUMMY_TODOS.map((todo) => (
          <li key={todo.id}>
            <CircleLabel className="flex i-center gap-sm">
              <IconImageHolder size="sm">{todo.cover}</IconImageHolder>
              <span className="text-md break-word">{todo.title}</span>
            </CircleLabel>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoBoard;
