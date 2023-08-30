import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryGroupsProps, CategoryProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';

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

const CategoryItems = ({
  category_group_name,
  category_list,
  color,
}: CategoryGroupsProps) => {
  return (
    <Wrapper className="flex-column j-center i-center">
      <Text className="flex-i-center j-between">
        <CircleLabel color={color}>{category_group_name}</CircleLabel>
        <span className="text-sm extra-bold">↑</span>
      </Text>

      <ItemWrapper className="grid-cols-2 scroll h-100">
        {category_list?.map((item: CategoryProps, index: number) => (
          <CategoryItem
            key={index}
            emoji={item?.emoji}
            category_name={item.category_name}
            tagName={item?.tagName}
            category_id={item.category_id}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
};

export default CategoryItems;
