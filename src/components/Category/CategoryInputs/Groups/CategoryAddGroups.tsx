import { styled } from 'styled-components';
import Groups from './Groups';

interface CategoryAddGroupsProps {
  onClick?: (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  selectGroup: () => void;
  categoryGroups: any;
}

const Wrapper = styled.div`
  min-height: 18.75rem;

  border-radius: 10% 10% 0 0;
  z-index: 100;
  box-shadow: inset 0 0 10px var(--gray-100);
`;

const AddGroupButton = styled.button`
  height: 3.125rem;
`;

const CategoryAddGroups = ({
  onClick,
  selectGroup,
  categoryGroups,
}: CategoryAddGroupsProps) => {
  return (
    <Wrapper className="w-100 flex-column j-between i-center absolute bottom-0 border-box p-lg bg-white">
      <Groups categoryGroups={categoryGroups} selectGroup={selectGroup} />
      <AddGroupButton className="w-50 text-md semi-bold" onClick={onClick}>
        + 그룹 추가하기
      </AddGroupButton>
    </Wrapper>
  );
};

export default CategoryAddGroups;
