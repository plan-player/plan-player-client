import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { CategoryProps } from './CategoryComponents';
import Label from '../UI/general/Label';
import { FaGripLines } from 'react-icons/fa';

const squreSize = '8.25rem';
const squreBigSize = '11.5rem';

const ItemWrapper = styled.div`
  width: ${squreSize};
  height: ${squreSize};

  @media screen and (min-width: 500px) {
    width: ${squreBigSize};
    height: ${squreBigSize};
  }
`;
const Tap = styled.div`
  right: 0.75rem;
`;
const ItemMain = styled.div`
  top: 3vh;

  span:last-child {
    -webkit-transform: scale(0.7);
    white-space: nowrap;
  }
`;
const ItemTags = styled.div`
  bottom: -1.25rem;

  flex-wrap: nowrap;
`;

const CategoryItem = ({
  category_group_id,
  category_id,
  category_name,
  tagName,
  emoji,
}: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <ItemWrapper className="bg round-md relative border-box p-md">
      <Tap
        onClick={() => navigate(`/category/${category_group_id}/${category_id}`)}
        className="absolute text-2xs pointer"
      >
        <FaGripLines />
      </Tap>

      <ItemMain className="flex-column j-center i-center mx-auto h-60 w-80 relative gap-xs">
        <span className="text-md">{emoji}</span>
        <span className="text-gray-300 extra-bold text-root">{category_name}</span>
      </ItemMain>

      <ItemTags className="mx-auto flex-center gap-xs w-100 h-20 relative scroll">
        {tagName?.map((tag: string, index: number) => (
          <Label key={index}>#{tag}</Label>
        ))}
      </ItemTags>
    </ItemWrapper>
  );
};

export default CategoryItem;
