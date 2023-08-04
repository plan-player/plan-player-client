import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { SizeType } from '../../../types/size';
import LoadingSpinner from '../general/LoadingSpinner';

interface ButtonProps {
  className?: string;
  styleClass?: 'primary' | 'extra'; // 'secondary' | 'gray'
  sizeClass?: SizeType;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  value?: string;
  isFit?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
  isPending?: boolean;
  disabled?: boolean;
}

interface StyledButtonProps {
  $height: string;
  $fontSize: string;
  $color: string;
  $bg: string;
  $isFit?: boolean;
}

const StyledButton = styled(motion.button)<StyledButtonProps>`
  ${({ $isFit }) => ($isFit ? 'width: fit-content; padding: 0 1rem;' : '')}
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
  isFit,
  name,
  value,
  children,
}: PropsWithChildren<ButtonProps>) {
  let height = '3rem';
  let fontSize = 'var(--text-md)';
  let color = 'var(--white)';
  let bg = 'var(--primary)';

  switch (styleClass) {
    case 'extra':
      color = 'var(--primary)';
      bg = 'transparent';
      break;
  }

  switch (sizeClass) {
    case 'lg':
      height = '3.5rem';
      fontSize = 'var(--text-root)';
      break;
    case 'sm':
      height = '1.5rem';
      fontSize = 'var(--text-sm)';
      break;
  }

  return (
    <StyledButton
      layout
      type={type || 'button'}
      className={`flex-center w-100 bold round-sm ${className || ''}`}
      onClick={onClick}
      name={name}
      value={value}
      disabled={isPending || disabled}
      $height={height}
      $fontSize={fontSize}
      $color={color}
      $bg={bg}
      $isFit={isFit}
    >
      {isPending ? <LoadingSpinner size={40} width={4} /> : children}
    </StyledButton>
  );
}

export default Button;
