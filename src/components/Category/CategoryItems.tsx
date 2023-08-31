import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryMockDataProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';

const ItemWrapper = styled.div`
  grid-row-gap: 2.25rem;

  @media screen and (max-width: 500px) {
    grid-row-gap: 1.875rem;
  }

  margin-bottom: 1.25rem;
`;

const CategoryItems = ({ name, category, id }: CategoryMockDataProps) => {
  return (
    <div className="flex-column j-center i-center w-100 h-100">
      <div className="flex j-start i-center w-70 h-10">
        <CircleLabel>{name}</CircleLabel>
      </div>

      <ItemWrapper className="grid-cols-2 grid-center scroll w-100 p-xl border-box">
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
