import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { CategoryProps, Label } from "./CategoryComponents";

const Item = styled.div`
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 0.525rem;
  background-color: var(--gray-50);
`;
const ItemMain = styled.div`
  width: 80%;
  height: 60%;
  position: relative;
  top: 2.5vh;
  span:first-child {
    font-size: var(--text-md);
  }
  span:last-child {
    -webkit-transform: scale(0.7);
    font-size: var(--text-md);
    font-weight: 800;
    color: var(--gray-300);
    white-space: nowrap;
  }
`;
const ItemLabel = styled.div`
  height: 20%;
  position: relative;
  bottom: -0.875rem;
  // 추후 label개수가 3개이상일경우 ...으로 표시되게 수정필요!
`;

const CategoryItem = ({
  id,
  categoryName,
  categoryIcon,
  labels,
}: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <Item onClick={() => navigate(`/category/${id}`)}>
      <ItemMain className="flex-column j-center i-center mx-auto">
        <span>{categoryIcon}</span>
        <span>{categoryName}</span>
      </ItemMain>
      <ItemLabel className="mx-auto flex-center">
        {labels?.map((a) => (
          <Label key={a.labelID}>#{a.labelName}</Label>
        ))}
      </ItemLabel>
    </Item>
  );
};

export default CategoryItem;
