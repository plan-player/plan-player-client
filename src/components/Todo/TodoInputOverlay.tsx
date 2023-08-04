import InputOverlay, { InputOverlayProps } from '../UI/overlay/InputOverlay';
import TodoField from './TodoField';
import TodoInput from './TodoInput';

const TodoInputOverlay = ({ isOpen, setIsOpen }: InputOverlayProps) => {
  return (
    <InputOverlay isOpen={isOpen} setIsOpen={setIsOpen}>
      <TodoInput />
      <TodoField />
    </InputOverlay>
  );
};

export default TodoInputOverlay;
