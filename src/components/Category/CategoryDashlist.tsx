import { HiMenuAlt4 } from 'react-icons/hi';
import IconImageHolder from '../UI/general/IconImageHolder';
import { styled } from 'styled-components';
import { TodoListItemProps } from '../Todo/TodoListItem';
import { ItemSize, Barmargin } from './CategoryComponents';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  width: ${ItemSize};
  height: ${ItemSize};
  background-color: var(--gray-50);
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  box-sizing: border-box;
`;

const Barstyle = styled.span`
  position: absolute;
  top: ${Barmargin}rem;
  right: ${Barmargin}rem;
`;

const CategoryDashlist = ({ cover, title, time, category }: TodoListItemProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => navigate('/player')}
      className="round-md flex-column j-center i-center"
    >
      <Barstyle className="text-xs">
        <HiMenuAlt4 />
      </Barstyle>

      <IconImageHolder size="2xl" isCircle={true} bg="white">
        {cover}
      </IconImageHolder>
      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category}</span>
        <h6>{time}</h6>
      </div>
    </Wrapper>
  );
};

export default CategoryDashlist;
