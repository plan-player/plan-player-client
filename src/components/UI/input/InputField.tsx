import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
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
    font-size: ${({ $isLabelFloat }) =>
      $isLabelFloat ? 'var(--text-sm)' : 'var(--text-md)'};
    font-weight: 600;
  }

  ${({ $isLabelFloat }) =>
    $isLabelFloat
      ? `
      input, textarea { 
        padding-top: 1.5rem; 
      }

      label { 
        position: absolute; 
        // top: 1.125rem; 
        top: 0.5rem;
        left: 0.625rem; 
        margin-bottom: 0; 
        color: var(--gray-300); 
        transition: top 0.3s var(--fast-in) 
      }
      
      // input:focus ~ label,
      // input:not([value='']) ~ label {
      //   top: 0.5rem;
      // }
      `
      : ''}
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
