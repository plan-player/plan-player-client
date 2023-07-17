import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { CategoryProps, Label } from './CategoryComponents';

const squreSize = '8.25rem';

const Item = styled.div`
  width: ${squreSize};
  height: ${squreSize};
  border-radius: 1rem;
  background-color: var(--gray-50);
`;
const ItemMain = styled.div`
  width: 80%;
  height: 60%;
  position: relative;
  top: 2.5vh;
  span:last-child {
    -webkit-transform: scale(0.7);
    white-space: nowrap;
  }
`;
const ItemLabel = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
  bottom: -1.25rem;
  flex-wrap: wrap;
  overflow: hidden;
  // 추후 label개수가 3개이상일경우 ...으로 표시되게 수정필요!
`;

const CategoryItem = ({ id, categoryName, categoryIcon, labels }: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <Item onClick={() => navigate(`/category/${id}`)}>
      <ItemMain className="flex-column j-center i-center mx-auto">
        <span className="text-md">{categoryIcon}</span>
        <span className="text-gray-300 extra-bold text-root">{categoryName}</span>
      </ItemMain>
      <ItemLabel className="mx-auto flex-center gap-xs">
        {labels?.map((a) => (
          <Label key={a.labelID}>#{a.labelName}</Label>
        ))}
      </ItemLabel>
    </Item>
  );
};

export default CategoryItem;
