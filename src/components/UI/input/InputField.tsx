import React, { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface InputFieldProps {
  isLabelFloat?: boolean;
  className?: string;
}

interface InputFieldWrapperProps {
  $isLabelFloat?: boolean;
}

const InputFieldWrapper = styled.div<InputFieldWrapperProps>`
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: var(--text-md);
    font-weight: 600;
  }
`;

const InputField = ({
  className,
  isLabelFloat,
  children,
}: PropsWithChildren<InputFieldProps>) => {
  return (
    <InputFieldWrapper className={className || ''} $isLabelFloat={isLabelFloat}>
      {children}
    </InputFieldWrapper>
  );
};

export default InputField;
