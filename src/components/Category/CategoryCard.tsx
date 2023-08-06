import { HiMenuAlt4 } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { TodoType } from '../../atoms/todoAtom';
import IconImageHolder from '../UI/general/IconImageHolder';
import { Barmargin, ItemSize } from './CategoryComponents';

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

export const CategoryCard = ({
  icon_image_path,
  title,
  cur_time,
  category_name,
}: TodoType) => {
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
        {icon_image_path}
      </IconImageHolder>
      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category_name}</span>
        <h6>{cur_time}</h6>
      </div>
    </ItemWrapper>
  );
};

export default CategoryCard;
