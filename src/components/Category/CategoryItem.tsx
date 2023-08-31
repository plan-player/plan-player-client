import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { CategoryProps } from './CategoryComponents';
import Label from '../UI/general/Label';

const squreSize = '8.25rem';
const squreBigSize = '11.5rem';

const Item = styled.div`
  width: ${squreSize};
  height: ${squreSize};

  @media screen and (min-width: 500px) {
    width: ${squreBigSize};
    height: ${squreBigSize};
  }
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

  flex-wrap: wrap;
`;

const CategoryItem = ({ category_id, category_name, tagName, emoji }: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <Item className="bg round-xs" onClick={() => navigate(`/category/${category_id}`)}>
      <ItemMain className="flex-column j-center i-center mx-auto h-60 w-80 relative gap-xs">
        <span className="text-md">{emoji}</span>
        <span className="text-gray-300 extra-bold text-root">{category_name}</span>
      </ItemMain>

      <ItemTags className="mx-auto flex-center gap-xs w-100 h-20 relative scroll">
        {tagName?.map((tag: string, index: number) => (
          <Label key={index}>#{tag}</Label>
        ))}
      </ItemTags>
    </Item>
  );
};

export default CategoryItem;
