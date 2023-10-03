import { styled } from 'styled-components';
import CategoryGroups from '../components/Category/Groups/CategoryGroups';
import GroupTitle from '../components/Category/Groups/GroupTitle';

const Wrapper = styled.div`
  padding: 0 1rem 3rem 1rem;
`;

const CategoryGroup = () => {
  return (
    <Wrapper className="scroll w-100 flex-column i-center border-box">
      <GroupTitle />
      <CategoryGroups />
    </Wrapper>
  );
};

export default CategoryGroup;
