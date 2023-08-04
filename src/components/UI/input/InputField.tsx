import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface InputFieldProps {
  isLabelFloat?: boolean;
  className?: string;
}

interface InputFieldWrapperProps {
  $isLabelFloat?: boolean;
}

const InputFieldWrapper = styled(motion.div)<InputFieldWrapperProps>`
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
    <InputFieldWrapper layout className={className || ''} $isLabelFloat={isLabelFloat}>
      {children}
    </InputFieldWrapper>
  );
};

export default InputField;
