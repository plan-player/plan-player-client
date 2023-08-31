import { styled } from 'styled-components';
import CircleLabel from '../../UI/label/CircleLabel';
import { PropsWithChildren } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  currentCategoryGroupAtom,
  currentCategoryGroupNameAtom,
} from '../../../atoms/categoryAtom';

interface CategoryAddGroupProps {
  categoryId: string;
  color: string;
  onClick: () => void;
}

const CategoryAddGroup = ({
  children,
  categoryId,
  color,
  onClick,
}: PropsWithChildren<CategoryAddGroupProps>) => {
  const setCurrentCategoryGroup = useSetRecoilState(currentCategoryGroupAtom);
  const setCurrentCategoryGroupName = useSetRecoilState(currentCategoryGroupNameAtom);

  const handleClick = () => {
    setCurrentCategoryGroup(categoryId);
    setCurrentCategoryGroupName(children + '');
    onClick();
  };

  return (
    <Wrapper
      onClick={handleClick}
      className="flex i-center text-root pointer round-md border-box"
    >
      <CircleLabel color={color}>{children}</CircleLabel>
    </Wrapper>
  );
};

export default CategoryAddGroup;

const Wrapper = styled.div`
  min-height: 50px;
  padding: 0 0.625rem 0 0.625rem;

  white-space: nowrap;
  &:hover {
    background-color: var(--gray-50);
  }
`;
