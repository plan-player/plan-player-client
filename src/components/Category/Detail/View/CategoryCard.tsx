import { HiMenuAlt4 } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { DailyTodoType } from '../../../../atoms/todoAtom';
import IconImageHolder from '../../../UI/general/IconImageHolder';
import {
  categoryBarMarginSize,
  categoryItemSizeBig,
  categoryItemSize,
} from '../../CategoryComponents';

const ItemWrapper = styled.div`
  width: ${categoryItemSize};
  height: ${categoryItemSize};

  @media screen and (min-width: 500px) {
    width: ${categoryItemSizeBig};
    height: ${categoryItemSizeBig};
  }
`;

const Barstyle = styled.span`
  top: ${categoryBarMarginSize};
  right: ${categoryBarMarginSize};
`;

export const CategoryCard = ({
  todo_emoji,
  history_sum,
  category_name,
}: DailyTodoType) => {
  const navigate = useNavigate();

  return (
    <ItemWrapper
      onClick={() => navigate('/player')}
      className="round-md flex-column j-center i-center bg relative"
    >
      <Barstyle className="text-xs absolute">
        <HiMenuAlt4 />
      </Barstyle>

      <IconImageHolder isCircle={true} bg="white">
        {todo_emoji}
      </IconImageHolder>

      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category_name}</span>
        <h6>{history_sum}</h6>
      </div>
    </ItemWrapper>
  );
};

export default CategoryCard;
