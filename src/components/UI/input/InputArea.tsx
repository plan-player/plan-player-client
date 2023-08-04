import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const InputContainer = styled.div`
  position: absolute;
  margin: 1rem 2rem;
  height: 4.25rem;
  width: 80%;
  border-radius: var(--round-sm);
  background-color: var(--white);

  input {
    background-color: transparent;
    padding: 0;
  }
`;

interface InputAreaProps {
  onClick: () => void;
  isExpand: boolean;
}

const InputArea = ({ onClick, children }: PropsWithChildren<InputAreaProps>) => {
  return (
    <InputContainer onClick={onClick} className="flex i-center">
      <div className="w-90 mx-auto">{children}</div>
    </InputContainer>
  );
};

export default InputArea;
