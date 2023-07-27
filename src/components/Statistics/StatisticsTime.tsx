import { styled } from 'styled-components';
import { StatisticsTimeProps } from './StatisticsDay';

const Wrapper = styled.div<BarSizeProps>`
  width: ${({ $widthSize }) => `${$widthSize}`};
`;

const Bar = styled.div`
  height: 0.75rem;
  overflow: hidden;
`;

interface BarSizeProps {
  $widthSize: string;
}

const formatTime = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}:${formattedMinutes}`;
};

const StatisticsTime = ({ time, size, categoryColor }: StatisticsTimeProps) => {
  const formattedTime = formatTime(time);
  return (
    <Wrapper $widthSize={size} className="flex-column i-center gap-xs">
      <Bar className="bg-light round-xs w-100" />
      <span className="text-xs extra-bold">{formattedTime}</span>
    </Wrapper>
  );
};

export default StatisticsTime;
