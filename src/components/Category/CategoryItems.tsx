import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryMockDataProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';

const Itemgap = '0.25rem';

const ItemWrapper = styled.div`
  padding: ${Itemgap};
  grid-row-gap: ${Itemgap};
`;

const CategoryItems = ({ name, category, id }: CategoryMockDataProps) => {
  return (
    <div className="flex-column j-center i-center w-100 h-70">
      <div className="flex j-start i-center w-70 h-10">
        <CircleLabel>{name}</CircleLabel>
      </div>

      <ItemWrapper className="grid-cols-2 g-center w-80 h-80 scroll">
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
    </div>
  );
};

export default CategoryItems;
