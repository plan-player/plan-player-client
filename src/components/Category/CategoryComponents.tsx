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

export interface CategoryProps {
  category_name: string;
  tagName?: string[];
  emoji?: string;
  category_id?: number;
  star?: boolean;
}

export interface CategoryGroupsProps {
  category_group_name: string;
  category_group_id: number;
  color: string;
  category_list?: CategoryProps[];
}
