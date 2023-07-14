import { styled } from "styled-components";
import { AiOutlineUp } from "react-icons/ai";
import C_Item from "./C_Item";
import { CategoryMockDataProps, Circle } from "./UseCategoryScreen";

const Wrapper = styled.div`
  width: 80vw;
  height: 30vh;
`;
const CTW = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #313338;
    font-family: SUIT Variable;
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;
const Text = styled.div`
  width: 75vw;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemWrapper = styled.div`
  width: 70vw;
  height: 26vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const CategoryItems = ({ name, category }: CategoryMockDataProps) => {
  return (
    <Wrapper>
      <Text>
        <CTW>
          <Circle />
          <span>{name}</span>
        </CTW>
        <span>↑</span>
      </Text>

      <ItemWrapper>
        {category?.map((a) => (
          <C_Item
            key={a.id}
            id={a.id}
            categoryIcon={a.categoryIcon}
            categoryName={a.categoryName}
            labels={a?.labels}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
};

export default CategoryItems;
