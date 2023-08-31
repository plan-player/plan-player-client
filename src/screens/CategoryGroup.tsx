import CategoryItems from '../components/Category/CategoryItems';
import { CategoryGroupsProps } from '../components/Category/CategoryComponents';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { categoryGroupAtom } from '../atoms/categoryAtom';

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
  const categoryGroups: any = useRecoilValue(categoryGroupAtom);

  return (
    <div className="wrapper scroll w-100 h-90 flex-column i-center">
      {categoryGroups?.map(
        ({
          category_group_id,
          category_group_name,
          category_list,
          color,
        }: CategoryGroupsProps) => (
          <CategoryItems
            key={category_group_id}
            category_group_name={category_group_name}
            category_list={category_list}
            category_group_id={category_group_id}
            color={color}
          />
        )
      )}
    </div>
  );
};

export default CategoryGroup;
