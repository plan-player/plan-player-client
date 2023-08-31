import { styled } from 'styled-components';

export const ItemSize = '6.125rem';
export const ItemBigSize = '8.125rem';
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
