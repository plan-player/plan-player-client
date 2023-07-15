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

const AddCategory = () => {
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

export default AddCategory;
