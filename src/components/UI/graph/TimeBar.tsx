import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ProgressBar from './ProgressBar';

interface TimeBarPros {
  height?: string;
}

interface TimeBarWrapperProps {
  $height?: string;
}

const TimeBarWrapper = styled.div<TimeBarWrapperProps>`
  height: ${({ $height }) => $height || '100%'};
`;

const TimeBar = ({ height }: TimeBarPros) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // NOTE: 10분마다 타임바 자동 업데이트
  useEffect(() => {
    setTimeout(() => {
      setCurrentHour(new Date().getHours());
    }, 600000);
  }, [currentHour]);

  return (
    <TimeBarWrapper $height={height}>
      <ProgressBar isVertical={true} current={currentHour} total={24} />
    </TimeBarWrapper>
  );
};

export default TimeBar;
