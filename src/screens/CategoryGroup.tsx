import CategoryItems from "../components/Category/CategoryItems";
import { CategoryMockDataProps } from "../components/Category/CategoryComponents";
import { styled } from "styled-components";

const InputWrapper = styled.label`
  font-size: var(--text-lg);
  background-color: var(--white);
  width: 22.125rem;
  height: 4rem;
  border-radius: 0.563rem;
  input {
    width: 80%;
    height: 70%;
    border: 0px solid var(--white);
    &::placeholder {
      color: var(--gray-200);
      font-size: var(--text-lg);
      font-weight: 400;
    }
  }
  input:focus {
    outline: none;
    font-size: var(--text-xl);
  }
  button {
    width: 2.875rem;
    height: 2rem;
    border-radius: 0.563rem;
    background-color: var(--black);
    position: relative;
    right: 3%;
    color: var(--white);
    font-size: var(--text-md);
    font-weight: 800;
  }
`;

const CategoryTestData: CategoryMockDataProps[] = [
  {
    name: "Study kim",
    category: [
      {
        id: 0,
        categoryName: "Learn React",
        categoryIcon: "⚛",
        labels: [
          {
            labelID: 0,
            labelName: "React",
          },
          {
            labelID: 1,
            labelName: "Course",
          },
          {
            labelID: 2,
            labelName: "fe",
          },
        ],
      },
      {
        id: 1,
        categoryName: "Algorithm",
        categoryIcon: "🧮",
      },
      {
        id: 2,
        categoryName: "Refactoring 2E",
        categoryIcon: "📚",
      },
    ],
  },
  {
    name: "Project Park",
    category: [
      {
        id: 3,
        categoryName: "During Budget",
        categoryIcon: "🐈‍⬛",
      },
      {
        id: 4,
        categoryName: "Plan Player",
        categoryIcon: "⏯",
      },
    ],
  },
  {
    name: "Fitness Choi",
  },
];

export const AddCategory = () => {
  return (
    <div
      style={{
        height: "var(--nav-h)",
        position: "absolute",
        zIndex: 99,
        bottom: "var(--nav-h)",
      }}
      className="w-100 bg-primary flex-i-center j-between"
    >
      <InputWrapper className="flex-i-center j-between mx-auto">
        <input placeholder="●  Add New Category" />
        <button>Add</button>
      </InputWrapper>
    </div>
  );
};

const CategoryGroup = () => {
  return (
    <div className="wrapper scroll">
      {CategoryTestData.map((a, index) => (
        <CategoryItems key={index} name={a.name} category={a.category} />
      ))}
    </div>
  );
};

export default CategoryGroup;
