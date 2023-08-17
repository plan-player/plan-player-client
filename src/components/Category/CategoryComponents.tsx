import { styled } from 'styled-components';

export const ItemSize = '6.125rem';
export const Barmargin = 0.375;

export const Circle = styled.div`
  width: 0.313rem;
  height: 0.313rem;
  border-radius: 0.656rem;
  margin-right: 0.313rem;
  background-color: var(--gray-200);
`;

export interface LabelProps {
  labelID: number;
  labelName: string;
}

export interface CategoryProps {
  categoryName: string;
  categoryIcon: string;
  labels?: LabelProps[];
  id?: number;
}

export interface CategoryMockDataProps {
  name: string;
  id: number;
  category?: CategoryProps[];
}

interface TagsMockDataProps {
  id: number;
  text: string;
}

export const TagsMockData: TagsMockDataProps[] = [
  {
    id: 0,
    text: 'Tags0',
  },
  {
    id: 1,
    text: 'This is Tags1',
  },
  {
    id: 2,
    text: 'I am Tags 2',
  },
  {
    id: 3,
    text: 'Hi Tags 3',
  },
];

interface GroupsMockDataProps {
  groupName: string;
  color: string;
}

export const GroupsMockData: GroupsMockDataProps[] = [
  {
    groupName: 'Study kim',
    color: 'mint',
  },
  {
    groupName: 'Project park',
    color: 'yellow',
  },
  {
    groupName: 'Fitness choi',
    color: 'red',
  },
];
