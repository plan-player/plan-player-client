import { styled } from "styled-components";
import CategoryItems from "../components/Category/CategoryItems";
import AddCategory from "../components/UI/nav/AddCategory";

const Wrapper = styled.div`
  width: 80vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-y: scroll;
`;

export interface CNameProps {
  id: number;
  CName: string;
}

export interface CategoryProps {
  name: string;
  Cate: CNameProps[];
}

const CategoryTestData: { name: string; Cate: CNameProps[] }[] = [
  {
    name: "Study kim",
    Cate: [
      {
        id: 1,
        CName: "Learn React",
      },
      {
        id: 2,
        CName: "Algorithm",
      },
      {
        id: 3,
        CName: "Refactoring 2E",
      },
    ],
  },
  {
    name: "Project Park",
    Cate: [
      {
        id: 1,
        CName: "During Budget",
      },
      {
        id: 2,
        CName: "Plan Player",
      },
    ],
  },
];

const CategoryGroup = () => {
  return (
    <Wrapper>
      {CategoryTestData.map((a, index) => (
        <CategoryItems key={index} name={a.name} Cate={a.Cate} />
      ))}
    </Wrapper>
  );
};

export default CategoryGroup;
