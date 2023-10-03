import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategoryGroups } from '../../../util/categoryQueries';
import { useMatch } from 'react-router';
import { Circle } from '../CategoryComponents';
import Label from '../../UI/general/Label';

const Wrapper = styled.div`
  width: 13.5rem;
  height: 11.5rem;
  span:first-child {
    margin-top: 1.25rem;
  }
`;

const CategoryDetailMain = () => {
  const { data: getCategory } = useQuery(['categoryGroups'], getCategoryGroups);

  const pathMatch = useMatch('/category/:groupId/:categoryId');
  const selectedGroupId = pathMatch?.params.groupId;
  const selectedCategoryId = pathMatch?.params.categoryId;

  const currentGroup = getCategory?.filter(
    (current: { category_group_id: number | string }) =>
      current.category_group_id == selectedGroupId
  );

  const data = currentGroup[0]?.category_list?.filter(
    (current: { category_id: string | number }) =>
      current.category_id == selectedCategoryId
  );

  return (
    <Wrapper className="mx-auto flex-column i-center j-around">
      <span className="text-xxl">{data[0]?.emoji}</span>
      <span className="text-3xl extra-bold text-black">{data[0]?.category_name}</span>
      <span className="flex regular text-sm text-black">
        <Circle style={{ position: 'relative', marginTop: '0.313rem' }} />
        {data[0]?.category_group_name}
      </span>
      <div className="flex gap-xs">
        {data[0]?.tagName?.map((tag: string, idx: number) => (
          <Label key={idx} size="sm">
            #{tag}
          </Label>
        ))}
      </div>
    </Wrapper>
  );
};

export default CategoryDetailMain;
