import { styled } from 'styled-components';

export const Circle = styled.div`
  width: 0.313rem;
  height: 0.313rem;
  border-radius: 0.656rem;
  margin-right: 0.313rem;
  background-color: var(--gray-200);
`;

export const Label = styled.div`
  border-radius: 0.25rem;
  background-color: var(--gray-200);
  font-size: var(--text-2xs);
  font-weight: 600;
  color: var(--white);
  padding: 3px 2px;
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
