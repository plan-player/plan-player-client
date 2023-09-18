import CategoryItems from '../components/Category/CategoryItems';
import { CategoryGroupsProps } from '../components/Category/CategoryComponents';
import { styled } from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { getCategoryGroups } from '../util/categoryQueries';

const Wrapper = styled.div`
  padding: 0 1rem 3rem 1rem;
`;

const Title = styled.div`
  height: 100px;

  div {
    right: 0;
    margin-top: 0.5rem;
  }
`;

const CategoryGroup = () => {
  const { data: categoryGroups } = useQuery(['categoryGroups'], getCategoryGroups);

  return (
    <Wrapper className="scroll w-100 flex-column i-center border-box">
      <Title className="w-60 flex-center relative">
        <span className="text-xl heavy">Categories</span>
        <div className="absolute text-xs pointer">
          <BsThreeDots />
        </div>
      </Title>

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
    </Wrapper>
  );
};

export default CategoryGroup;
