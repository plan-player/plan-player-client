import { styled } from 'styled-components';
import IconImageHolder from '../UI/general/IconImageHolder';

const StyledInput = styled.input`
  height: 1.875rem;
`;

const TodoInput = () => {
  return (
    <div className="flex gap-sm i-center">
      <IconImageHolder size="xl"></IconImageHolder>
      <div className="flex-column mt-sm">
        <span className="text-sm text-gray-200 bold">이름없는 카테고리</span>
        <StyledInput className="bold" placeholder="할 일을 입력하세요" />
      </div>
    </div>
  );
};

export default TodoInput;
