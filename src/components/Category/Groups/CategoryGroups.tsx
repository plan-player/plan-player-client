import { useQuery } from 'react-query';
import { getCategoryGroups } from '../../../util/categoryQueries';
import { CategoryGroupsProps } from '../CategoryComponents';
import CategoryItems from '../CategoryItems';

const CategoryGroups = () => {
  const { data: categoryGroups } = useQuery(['categoryGroups'], getCategoryGroups);
  return (
    <>
      {categoryGroups?.map(
        ({
          category_group_id,
          category_group_name,
          category_list,
          color,
        }: CategoryGroupsProps) => (
          <CategoryItems
            key={category_group_id}
            category_group_name={category_group_name}
            category_list={category_list}
            category_group_id={category_group_id}
            color={color}
          />
        )
      )}
    </>
  );
};

export default CategoryGroups;
