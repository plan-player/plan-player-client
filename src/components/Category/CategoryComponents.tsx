import { styled } from 'styled-components';

export const categoryItemSize = '6.125rem';
export const categoryItemSizeBig = '8.125rem';
export const categoryBarMarginSize = '0.375rem';

export const Circle = styled.div`
  width: 0.313rem;
  height: 0.313rem;
  border-radius: 0.656rem;
  margin-right: 0.313rem;
  background-color: var(--gray-200);
`;

export interface CategoryProps {
  category_group_id: number;
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

export interface ViewProps {
  todos: any;
}

export const ViewWrapper = styled.div`
  margin: 0 auto;
  margin-top: 1.25rem;
  grid-row-gap: 0.75rem;
  @media screen and (min-width: 500px) {
    grid-row-gap: 1.5rem;
  }
`;
