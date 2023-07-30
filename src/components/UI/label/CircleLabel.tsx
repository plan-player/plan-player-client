import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface CircleLabelProps {
  className?: string;
  color?: string;
  size?: string;
}

interface CircleWrapperProps {
  $color: string;
  $size: string;
}

const CircleWrapper = styled.div<CircleWrapperProps>`
  position: relative;

  &::before {
    content: '';
    flex-shrink: 0;
    width: ${({ $size }) => `var(--size-${$size})`};
    height: ${({ $size }) => `var(--size-${$size})`};
    border-radius: 100%;
    background-color: ${({ $color }) => `var(--${$color})`};
  }
`;

// 0.25rem

const CircleLabel = ({
  className,
  color,
  size,
  children,
}: PropsWithChildren<CircleLabelProps>) => {
  return (
    <CircleWrapper
      className={className}
      $color={color || 'primary'}
      $size={size || '2xxs'}
    >
      {children}
    </CircleWrapper>
  );
};

export default CircleLabel;
