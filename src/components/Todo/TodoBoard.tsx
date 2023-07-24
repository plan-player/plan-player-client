import React, { useState } from 'react';
import { DUMMY_TODOS } from '../../screens/Playlist';
import { styled } from 'styled-components';
import IconImageHolder from '../UI/general/IconImageHolder';

interface TodoBoardProps {
  setTodo?: (id: string) => void;
  className?: string;
}

interface TodoLiProps {
  $color: string;
}

const TodoBoardWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`;

const TodoLi = styled.li<TodoLiProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 100%;
    background-color: ${({ $color }) => $color};
    transform: translateY(0.0625rem);
  }
`;

const TodoBoard = ({ setTodo, className }: TodoBoardProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <TodoBoardWrapper className={`bg round-lg scroll ${className || ''}`}>
      <ul className="flex-column gap-sm">
        {DUMMY_TODOS.map((todo) => (
          <TodoLi className="text-md break-word" key={todo.id} $color="var(--primary)">
            <IconImageHolder size="sm">{todo.cover}</IconImageHolder>
            <span>{todo.title}</span>
          </TodoLi>
        ))}
      </ul>
    </TodoBoardWrapper>
  );
};

export default TodoBoard;
