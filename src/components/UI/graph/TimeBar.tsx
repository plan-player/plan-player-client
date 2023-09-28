import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ProgressBar from './ProgressBar';
import { useRecoilState } from 'recoil';
import { timeSliderValueAtom } from '../../../atoms/timeSliderAtom';

interface TimeBarPros {
  height?: string;
}

interface TimeBarWrapperProps {
  $height?: string;
}

const TimeBarWrapper = styled(motion.div)<TimeBarWrapperProps>`
  height: ${({ $height }) => $height || '100%'};
`;

const TimeBar = ({ height }: TimeBarPros) => {
  const [timeValue, setTimeValue] = useRecoilState(timeSliderValueAtom);

  // NOTE: 5분마다 타임바 자동 업데이트
  useEffect(() => {
    setTimeout(() => {
      setTimeValue(new Date().getTime());
    }, 300000);
  }, [timeValue]);

  return (
    <TimeBarWrapper layout $height={height}>
      <ProgressBar isVertical={true} current={new Date(timeValue).getHours()} total={24} />
    </TimeBarWrapper>
  );
};

export default TimeBar;
