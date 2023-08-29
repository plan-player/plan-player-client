import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface InputFieldProps {
  isInnerLabel?: boolean;
  className?: string;
}

interface InputFieldWrapperProps {
  $isInnerLabel?: boolean;
}

const InputFieldWrapper = styled(motion.div)<InputFieldWrapperProps>`
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: ${({ $isInnerLabel }) =>
      $isInnerLabel ? 'var(--text-sm)' : 'var(--text-md)'};
    font-weight: 600;
  }

  ${({ $isInnerLabel }) =>
    $isInnerLabel
      ? `
      input, textarea, div { 
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
  isInnerLabel,
  children,
}: PropsWithChildren<InputFieldProps>) => {
  return (
    <InputFieldWrapper layout className={className || ''} $isInnerLabel={isInnerLabel}>
      {children}
    </InputFieldWrapper>
  );
};

export default InputField;
