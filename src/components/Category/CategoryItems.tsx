import { styled } from "styled-components";
import CategoryItem from "./CategoryItem";
import { CategoryMockDataProps, Circle } from "./CategoryComponents";

const Wrapper = styled.div`
  width: 80vw;
  height: 30vh;
`;
const CircleTextWrapper = styled.div`
  span {
    color: var(--black);
    font-size: var(--text-md);
    font-weight: 800;
  }
`;
const Text = styled.div`
  width: 75vw;
  height: 4vh;
`;
const ItemWrapper = styled.div`
  width: 80vw;
  height: 26vh;
  grid-gap: 0.625rem;
`;

const CategoryItems = ({ name, category }: CategoryMockDataProps) => {
  return (
    <Wrapper>
      <Text className="flex-i-center j-between">
        <CircleTextWrapper className="flex-center">
          <Circle />
          <span>{name}</span>
        </CircleTextWrapper>
        <span>↑</span>
      </Text>

      <ItemWrapper className="grid-cols-3 mx-auto">
        {category?.map((a) => (
          <CategoryItem
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
