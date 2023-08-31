import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryGroupsProps, CategoryProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';

const ItemWrapper = styled.div`
  grid-row-gap: 2.25rem;

  @media screen and (max-width: 500px) {
    grid-row-gap: 1.875rem;
  }

  margin-bottom: 1.25rem;
`;

const CategoryItems = ({
  category_group_name,
  category_list,
  color,
}: CategoryGroupsProps) => {
  return (
    <div className="flex-column j-center i-center w-100 h-100">
      <div className="flex-i-center j-between w-70 h-10">
        <CircleLabel color={color}>{category_group_name}</CircleLabel>
        <span className="text-sm extra-bold">↑</span>
      </div>

      <ItemWrapper className="grid-cols-2 grid-center scroll w-100 p-xl border-box h-100">
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
    </div>
  );
};

export default CategoryItems;
