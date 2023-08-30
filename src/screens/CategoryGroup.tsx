import CategoryItems from '../components/Category/CategoryItems';
import { CategoryMockDataProps } from '../components/Category/CategoryComponents';
import { styled } from 'styled-components';

const InputWrapper = styled.label`
  width: 22.125rem;
  height: 4rem;
  border-radius: 0.563rem;
  input {
    width: 80%;
    height: 80%;
    border: 0px solid var(--white);
    margin-left: 0.375rem;
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
    position: relative;
    right: 3%;
  }
`;

export const CategoryTestData: CategoryMockDataProps[] = [
  {
    name: 'Study kim',
    id: 0,
    category: [
      {
        categoryName: 'Learn React',
        categoryIcon: '⚛',
        labels: [
          {
            labelID: 0,
            labelName: 'React',
          },
          {
            labelID: 1,
            labelName: 'Course',
          },
          {
            labelID: 2,
            labelName: 'fe',
          },
        ],
      },
      {
        categoryName: 'Algorithm',
        categoryIcon: '🧮',
      },
      {
        categoryName: 'Refactoring 2E',
        categoryIcon: '📚',
      },
    ],
  },
  {
    name: 'Project Park',
    id: 1,
    category: [
      {
        categoryName: 'During Budget',
        categoryIcon: '🐈‍⬛',
      },
      {
        categoryName: 'Plan Player',
        categoryIcon: '⏯',
      },
    ],
  },
  {
    name: 'Fitness Choi',
    id: 3,
  },
];

export const AddCategory = () => {
  return (
    <div
      style={{
        height: 'var(--nav-h)',
        position: 'absolute',
        bottom: 'var(--nav-h)',
      }}
      className="w-100 bg-primary flex-i-center j-between"
    >
      <InputWrapper className="flex-i-center j-between mx-auto text-lg bg-white">
        <input placeholder="●  Add New Category" />
        <button className="bg-primary text-white extra-bold text-md">Add</button>
      </InputWrapper>
    </div>
  );
};

const CategoryGroup = () => {
  return (
    <div className="scroll w-100 h-90 flex-column i-center">
      {CategoryTestData.map((a, index) => (
        <CategoryItems key={index} name={a.name} category={a.category} id={a.id} />
      ))}
    </div>
  );
};

export default CategoryGroup;
