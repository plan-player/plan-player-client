import styled from 'styled-components';

const Wrapper = styled.div`
  button {
    margin-right: 0.625rem;
    width: 3.75rem;
    height: 1.875rem;
  }
`;

const CategoryAddGroupColorInput = () => {
  return (
    <Wrapper className="flex-i-center j-between round-lg">
      <input
        name="groupName"
        className="text-md semi-bold"
        placeholder="●   추가할 그룹 이름을 입력해 주세요."
      />
      <button
        type="submit"
        value="addColor"
        name="intent"
        className="round-sm text-white bg-primary"
      >
        추가
      </button>
    </Wrapper>
  );
};

export default CategoryAddGroupColorInput;
