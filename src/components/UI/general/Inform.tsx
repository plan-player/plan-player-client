import { PropsWithChildren } from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';
import { styled } from 'styled-components';

interface InformProps {
  isError?: boolean;
  className?: string;
  hideIcon?: boolean;
  isLeft?: boolean;
  isFlex?: boolean;
}

interface InformWrapperProps {
  $isError?: boolean;
  $isLeft?: boolean;
}

const InformWrapper = styled.div<InformWrapperProps>`
  padding: 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
  ${({ $isError }) =>
    $isError
      ? `color: var(--error-text);
    background-color: var(--error-bg);`
      : ''}
  ${({ $isLeft }) =>
    `text-align: ${$isLeft ? 'left' : 'center'}; display: flex; gap: 0.25rem;`}

    svg, path {
    color: inherit;
  }
`;

const Inform = ({
  isError,
  className,
  hideIcon,
  isLeft,
  children,
}: PropsWithChildren<InformProps>) => {
  return (
    <InformWrapper
      $isError={isError}
      $isLeft={isLeft}
      className={`text-sm ${className || ''}`}
    >
      {!hideIcon && <FaCircleExclamation />}
      {children}
    </InformWrapper>
  );
};

export default Inform;
