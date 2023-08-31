import { styled } from 'styled-components';
import CategoryAddGroup from './CategoryAddGroup';
import { useRecoilValue } from 'recoil';
import { categoryGroupAtom } from '../../../atoms/categoryAtom';

interface CategoryAddGroupsProps {
  onClick?: (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  selectGroup: () => void;
}

const CategoryAddGroups = ({ onClick, selectGroup }: CategoryAddGroupsProps) => {
  const categoryGroups: any = useRecoilValue(categoryGroupAtom);

  return (
    <AddGroupWrapper className="w-100 flex-column j-between i-center absolute bottom-0 border-box p-lg bg-white">
      <GroupsWrapper className="grid-cols-2 w-100 border-box">
        {categoryGroups?.map((cateGroup: any) => (
          <CategoryAddGroup
            onClick={selectGroup}
            categoryId={cateGroup.category_group_id}
            color={cateGroup.color}
            key={cateGroup.category_group_id}
          >
            {cateGroup.category_group_name}
          </CategoryAddGroup>
        ))}
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

  box-shadow: inset 0 0 10px var(--gray-100);
`;

const GroupsWrapper = styled.div`
  padding-top: 20px;

  place-items: center;
`;

const AddGroupButton = styled.button`
  height: 3.125rem;
`;
