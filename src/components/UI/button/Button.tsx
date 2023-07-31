import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { SizeType } from '../../../types/size';
// import LoadingSpinner from './LoadingSpinner';

interface ButtonProps {
  className?: string;
  styleClass?: 'primary' | 'extra'; // 'secondary' | 'gray'
  sizeClass?: SizeType;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event?: React.MouseEvent) => void;
  isPending?: boolean;
  disabled?: boolean;
}

interface StyledButtonProps {
  $height: string;
  $fontSize: string;
  $color: string;
  $bg: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  height: ${({ $height }) => $height};
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${({ $color }) => $color};
  background-color: ${({ $bg }) => $bg};
`;

function Button({
  type,
  className,
  onClick,
  isPending,
  disabled,
  styleClass,
  sizeClass,
  children,
}: PropsWithChildren<ButtonProps>) {
  let height = '3.5rem';
  let fontSize = 'var(--text-root)';
  let color = 'var(--white)';
  let bg = 'var(--primary)';

  switch (styleClass) {
    case 'extra':
      color = 'var(--primary)';
      bg = 'transparent';
      break;
  }

  switch (sizeClass) {
    case 'md':
      height = '3rem';
      fontSize = 'var(--text-md)';
      break;
    case 'sm':
      height = '2rem';
      fontSize = 'var(--text-sm)';
      break;
  }

  return (
    <StyledButton
      type={type || 'button'}
      className={`flex-center w-100 bold round-sm ${className || ''}`}
      onClick={onClick}
      disabled={isPending || disabled}
      $height={height}
      $fontSize={fontSize}
      $color={color}
      $bg={bg}
    >
      {/* {isPending ? <LoadingSpinner size="1.5rem" /> : children} */}
      {children}
    </StyledButton>
  );
}

export default Button;
