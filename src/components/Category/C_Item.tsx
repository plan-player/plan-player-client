import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { CategoryProps, Label } from "./UseCategoryScreen";

const Item = styled.div`
  width: 5.25rem;
  height: 5.25rem;
  border-radius: 0.5rem;
  background-color: #f7f7f7;
  // position: relative;
  // top: 2vh;
  // left: 1vw;
`;
const ItemMain = styled.div`
  position: relative;
  top: 1.5vh;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80%;
  height: 60%;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: var(--text-md);
  }
  span:last-child {
    -webkit-transform: scale(0.7);
    display: inline-block;
    font-size: var(--text-xs);
    color: #828794;
    font-family: SUIT Variable;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    white-space: nowrap;
  }
`;
const ItemLabel = styled.div`
  width: 80%;
  height: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: relative;
  bottom: -0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-transform: scale(0.7);
  flex-wrap: wrap; //임시 방편
`;

const C_Item = ({ id, categoryName, categoryIcon, labels }: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <Item onClick={() => navigate(`/category/${id}`)}>
      <ItemMain>
        <span>{categoryIcon}</span>
        <span>{categoryName}</span>
      </ItemMain>
      <ItemLabel>
        {labels?.map((a) => (
          <Label key={a.labelID}>#{a.labelName}</Label>
        ))}
      </ItemLabel>
    </Item>
  );
};

export default C_Item;
