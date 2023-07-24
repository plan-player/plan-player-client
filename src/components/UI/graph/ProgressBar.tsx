import { styled } from 'styled-components';

interface ProgressBarProps {
  className?: string;
  current: number;
  total: number;
  isVertical?: boolean;
}

interface ProgressBarBgProps {
  $isVertical?: boolean;
}

interface ProgressBarFgProps {
  $total: number;
  $current: number;
  $isVertical?: boolean;
}

export const PROGRESS_BAR_SIZE = '0.375rem';

const ProgressBarBg = styled.div<ProgressBarBgProps>`
  ${({ $isVertical }) => ($isVertical ? 'width' : 'hegiht')}: ${PROGRESS_BAR_SIZE};
`;
const ProgressBarFg = styled.div<ProgressBarFgProps>`
  ${({ $isVertical }) => ($isVertical ? 'width' : 'height')}: ${PROGRESS_BAR_SIZE};
  ${({ $isVertical }) => ($isVertical ? 'height' : 'width')}: ${({ $current, $total }) =>
    $total ? `${($current / $total) * 100}%` : '0'};
`;

const ProgressBar = ({ className, current, total, isVertical }: ProgressBarProps) => {
  const full = isVertical ? 'h-100' : 'w-100';
  return (
    <ProgressBarBg
      className={`${full} bg round-sm ${className || ''}`}
      $isVertical={isVertical}
    >
      <ProgressBarFg
        className={`${full} bg-primary round-sm`}
        $current={current}
        $total={total}
        $isVertical={isVertical}
      />
    </ProgressBarBg>
  );
};

export default ProgressBar;
