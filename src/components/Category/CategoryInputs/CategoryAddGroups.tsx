import { styled } from 'styled-components';
import CategoryAddGroup from './CategoryAddGroup';

interface CategoryAddGroupsProps {
  onClick?: () => void;
}

const CategoryAddGroups = ({ onClick }: CategoryAddGroupsProps) => {
  return (
    <AddGroupWrapper className="flex-column j-between i-center w-100 absolute bottom-0 border-box p-lg bg-white">
      <GroupsWrapper className="grid-cols-2 w-100 border-box">
        <CategoryAddGroup>Study Kim</CategoryAddGroup>
      </GroupsWrapper>
      <AddGroupButton className="w-50 text-md semi-bold" onClick={onClick}>
        + 그룹 추가하기
      </AddGroupButton>
    </AddGroupWrapper>
  );
};

export default CategoryAddGroups;

const AddGroupWrapper = styled.div`
  min-height: 300px;

  border-radius: 10% 10% 0 0;
  z-index: 100;
`;

const GroupsWrapper = styled.div`
  padding-top: 20px;

  place-items: center;
`;

const AddGroupButton = styled.button`
  height: 3.125rem;
`;
