import { styled } from 'styled-components';

interface ProgressBarProps {
  className?: string;
  current: number;
  total: number;
}

interface ProgressBarFgProps {
  $total: number;
  $current: number;
}

const BAR_HEIGHT = '0.375rem';

const ProgressBarBg = styled.div`
  height: ${BAR_HEIGHT};
`;
const ProgressBarFg = styled.div<ProgressBarFgProps>`
  height: ${BAR_HEIGHT};
  width: ${({ $current, $total }) => ($total ? `${($current / $total) * 100}%` : '0')};
`;

const ProgressBar = ({ className, current, total }: ProgressBarProps) => {
  return (
    <ProgressBarBg className={`w-100 bg round-sm ${className || ''}`}>
      <ProgressBarFg
        className="w-100 bg-primary round-sm"
        $current={current}
        $total={total}
      />
    </ProgressBarBg>
  );
};

export default ProgressBar;
