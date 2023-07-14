import React from "react";
import { styled } from "styled-components";

const InputWrapper = styled.label`
  font-size: var(--text-lg);
  background-color: var(--white);
  width: 22.125rem;
  height: 4rem;
  border-radius: 0.563rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 80%;
    height: 70%;
    border: 0px solid var(--white);
    &::placeholder {
      color: #c3c5cc;
      font-family: SUIT Variable;
      font-size: var(--text-lg);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  input:focus {
    outline: none;
    font-size: var(--text-xl);
  }
  button {
    width: 2.875rem;
    height: 2rem;
    background-color: var(--black);
    position: relative;
    right: 3%;
    border-radius: 0.563rem;
    color: var(--white);
    font-family: SUIT Variable;
    font-size: var(--text-md);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

// '● Add new Category'
const AddCategory = () => {
  return (
    <nav
      style={{
        position: "absolute",
        zIndex: 99,
        marginBottom: "80px",
        bottom: 0,
      }}
      className="w-100 bg-primary flex-i-center j-between"
    >
      <InputWrapper>
        <input placeholder="●  Add New Category" />
        <button>Add</button>
      </InputWrapper>
    </nav>
  );
};

export default AddCategory;
