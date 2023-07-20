import { HiMenuAlt4 } from 'react-icons/hi';
import IconImageHolder from '../UI/general/IconImageHolder';
import { styled } from 'styled-components';
import { TodoListItemProps } from '../Todo/TodoListItem';
import { ItemSize, Barmargin } from './CategoryComponents';
import { useNavigate } from 'react-router';

const ItemWrapper = styled.div`
  width: ${ItemSize};
  height: ${ItemSize};
  background-color: var(--gray-50);
  position: relative;
`;

const Barstyle = styled.span`
  position: absolute;
  top: ${Barmargin}rem;
  right: ${Barmargin}rem;
`;

export const CategoryCard = ({ cover, title, time, category }: TodoListItemProps) => {
  const navigate = useNavigate();

  return (
    <ItemWrapper
      onClick={() => navigate('/player')}
      className="round-md flex-column j-center i-center"
    >
      <Barstyle className="text-xs">
        <HiMenuAlt4 />
      </Barstyle>

      <IconImageHolder isCircle={true} bg="white">
        {cover}
      </IconImageHolder>
      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category}</span>
        <h6>{time}</h6>
      </div>
    </ItemWrapper>
  );
};

export default CategoryCard;
