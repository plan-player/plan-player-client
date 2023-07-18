import { HiMenuAlt4 } from 'react-icons/hi';
import IconImageHolder from '../UI/general/IconImageHolder';
import { styled } from 'styled-components';
import { TodoListItemProps } from '../Todo/TodoListItem';
const ItemSize = '6.125rem';
const Barmargin = 0.375;

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

export const CategoryDetailIcon = ({
  cover,
  title,
  time,
  category,
}: TodoListItemProps) => {
  return (
    <ItemWrapper className="round-md flex-column j-center i-center">
      <Barstyle className="text-xs">
        <HiMenuAlt4 />
      </Barstyle>

      <IconImageHolder isCircle={true} bg="white" children={cover} />
      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category}</span>
        <h6>{time}</h6>
      </div>
    </ItemWrapper>
  );
};

export default CategoryDetailIcon;
