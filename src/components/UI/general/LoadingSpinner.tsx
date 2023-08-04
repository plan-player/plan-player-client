import { motion } from 'framer-motion';
import { styled } from 'styled-components';

interface LoadingSpinnerProps {
  size?: number;
  width?: number;
  isFull?: boolean;
}

interface WrapperProps {
  $isFull?: boolean;
  $r: number;
}

const LoadingContainer = styled.div<WrapperProps>`
  --radius: ${({ $r }) => $r};
  --PI: 3.14159265358979;
  --circumference: calc(var(--PI) * var(--radius) * 2px);

  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $isFull }) =>
    $isFull
      ? 'position: fixed; top: 0; width: 100vw; height: 100vh;'
      : 'width: 100%; height: 100%'};
`;

const Spinner = styled(motion.circle)`
  display: block;
  stroke-dasharray: var(--circumference);
  stroke: var(--gray-100);
  stroke-linecap: round;
  border-radius: 50%;
  transform-origin: center;
  animation: spinner 2s ease-out infinite;

  @keyframes spinner {
    from {
      stroke-dashoffset: var(--circumference);
      transform: rotateZ(0deg);
    }
    to {
      stroke-dashoffset: calc(var(--circumference) * -1);
      transform: rotateZ(720deg);
    }
  }
`;

export default function LoadingSpinner({
  size: propsSize,
  width: propsWidth,
  isFull,
}: LoadingSpinnerProps) {
  const size = propsSize || 100;
  const r = size / 4;
  const width = propsWidth || 6;

  return (
    <LoadingContainer $isFull={isFull} $r={r}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <Spinner
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={width}
        />
      </svg>
    </LoadingContainer>
  );
}
