import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryGroupsProps, CategoryProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';

const ItemWrapper = styled.div`
  grid-row-gap: 2.25rem;

  @media screen and (max-width: 500px) {
    grid-row-gap: 1rem;
  }

  margin-bottom: 1.25rem;
`;

const CategoryItems = ({
  category_group_name,
  category_group_id,
  category_list,
  color,
}: CategoryGroupsProps) => {
  return (
    <div className="flex-column j-center i-center w-100 h-100 scroll">
      <div className="flex-i-center j-between w-85 h-10">
        <CircleLabel className="extra-bold" color={color}>
          {category_group_name}
        </CircleLabel>
        <span className="text-md heavy pointer">↑</span>
      </div>

      <ItemWrapper className="grid-cols-2 grid-center scroll w-100 p-xl border-box h-100">
        {category_list?.map((item: CategoryProps, index: number) => (
          <CategoryItem
            key={index}
            emoji={item?.emoji}
            category_name={item.category_name}
            category_group_id={category_group_id}
            tagName={item?.tagName}
            category_id={item.category_id}
          />
        ))}
      </ItemWrapper>
    </div>
  );
};

export default CategoryItems;
