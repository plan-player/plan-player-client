import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryMockDataProps, Circle } from './CategoryComponents';

const Itemgap = '0.25rem';

const Wrapper = styled.div`
  width: 80vw;
  height: 40vh;
`;
const Text = styled.div`
  width: 75vw;
  height: 4vh;
`;
const ItemWrapper = styled.div`
  width: 70vw;
  height: 30vh;
  padding: ${Itemgap};
  grid-row-gap: ${Itemgap};
  overflow: hidden; //이 부분도 추후 ...으로 표시해야할지 정해봐요!
`;

const CategoryItems = ({ name, category, id }: CategoryMockDataProps) => {
  return (
    <Wrapper className="flex-column j-center i-center">
      <Text className="flex-i-center j-between">
        <div className="flex-center extra-bold">
          <Circle />
          <span className="text-md">{name}</span>
        </div>
        <span className="text-sm extra-bold">↑</span>
      </Text>

      <ItemWrapper className="grid-cols-2">
        {category?.map((item, index) => (
          <CategoryItem
            key={index}
            categoryIcon={item.categoryIcon}
            categoryName={item.categoryName}
            labels={item?.labels}
            id={id}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
};

export default CategoryItems;
