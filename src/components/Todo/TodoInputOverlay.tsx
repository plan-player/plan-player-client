import InputOverlay, { InputOverlayProps } from '../UI/overlay/InputOverlay';
import TodoField from './TodoField';
import TodoInput from './TodoInput';

const TodoInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  return (
    <InputOverlay isOpen={isOpen} setIsOpen={setIsOpen} setHideNav={setHideNav}>
      <TodoInput />
      <TodoField />
    </InputOverlay>
  );
};

export default TodoInputOverlay;
