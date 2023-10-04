import styled from 'styled-components';
import CategoryGroup from './CategoryGroup';
import { CategoryGroupsProps } from '../../CategoryComponents';

interface GroupsWrapperProps {
  categoryGroups: CategoryGroupsProps[];
  selectGroup: () => void;
}

const Wrapper = styled.div`
  padding-top: 1.25rem;
`;

const Groups = ({ categoryGroups, selectGroup }: GroupsWrapperProps) => {
  return (
    <Wrapper className="grid-cols-2 w-100 border-box grid-center">
      {categoryGroups?.map((cateGroup: CategoryGroupsProps) => (
        <CategoryGroup
          onClick={selectGroup}
          categoryId={cateGroup.category_group_id + ''}
          color={cateGroup.color}
          key={cateGroup.category_group_id}
        >
          {cateGroup.category_group_name}
        </CategoryGroup>
      ))}
    </Wrapper>
  );
};

export default Groups;
