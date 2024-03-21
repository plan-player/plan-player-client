import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { timeSliderValueAtom } from '../../../atoms/timeSliderAtom';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../../../css/timebar.css';

interface TimeBarPros {
  height?: string;
}

interface TimeBarWrapperProps {
  $height?: string;
}

const TimeBarWrapper = styled(motion.div)<TimeBarWrapperProps>`
  padding-left: 0.5rem;
  height: ${({ $height }) => $height || '100%'};
`;

const TimeBar = ({ height }: TimeBarPros) => {
  const [timeValue, setTimeValue] = useRecoilState(timeSliderValueAtom);
  const [sliderValue, setSliderValue] = useState([0, new Date(timeValue).getHours()]);

  // NOTE: 5분마다 타임바 자동 업데이트
  useEffect(() => {
    setTimeout(() => {
      setTimeValue(new Date().getTime());
    }, 300000);
  }, [timeValue]);

  useEffect(() => {
    setTimeValue((state) => {
      const date = new Date(state);
      date.setHours(sliderValue[1]);
      return date.getTime();
    });
  }, [sliderValue]);

  useEffect(() => {
    const slider = document.getElementsByClassName(
      'range-slider__range'
    )[0] as HTMLDivElement;
    slider.style.height = `${(sliderValue[1] / 24) * 100}%`;
  }, []);

  return (
    <TimeBarWrapper layout $height={height}>
      <RangeSlider
        orientation="vertical"
        value={sliderValue}
        thumbsDisabled={[true, false]}
        onInput={setSliderValue}
        max={24}
      />
      {/* <ProgressBar isVertical={true} current={new Date(timeValue).getHours()} total={24} /> */}
    </TimeBarWrapper>
  );
};

export default TimeBar;
