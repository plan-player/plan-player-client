import { styled } from "styled-components";
// 폰트사이즈 우회
// -webkit-transform:scale(0.5); //0.5 -> 50%
// display: inline-block;

export const Circle = styled.div`
  width: 0.313rem;
  height: 0.313rem;
  border-radius: 0.656rem;
  margin-right: 0.313rem;
  background-color: #c3c5cc;
`;

export const Label = styled.div`
  border-radius: 0.25rem;
  background-color: #c3c5cc;
  display: inline-block;
  font-size: var(--text-xxs);
  color: #fff;
  font-family: SUIT Variable;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export interface LabelProps {
  labelID: number;
  labelName: string;
}

export interface CategoryProps {
  id: number;
  categoryName: string;
  categoryIcon: string;
  labels?: LabelProps[];
}

export interface CategoryMockDataProps {
  name: string;
  category?: CategoryProps[];
}
