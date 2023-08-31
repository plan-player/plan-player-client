import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isPlayingAtom } from '../../../atoms/uiAtom';
import { formatTime } from '../../../util/time';
import ContextButton from '../button/ContextButton';
import PlayPauseButton from '../button/PlayPauseButton';

interface TimerProps {
  id?: number;
  className?: string;
  defaultTime?: number;
  disabled?: boolean;
}

const Timer = ({ className, defaultTime, id }: TimerProps) => {
  const [time, setTime] = useState(defaultTime || 0);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  // NOTE: 다른 todo의 타이머가 시작될 때 해당 todo의 기존 시간으로 재설정
  useEffect(() => {
    setTime(defaultTime || 0);
  }, [id]);

  // NOTE: 1000밀리초마다 1000씩 더하여 시간 측정 (1초 주기)
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isPlaying) {
      intervalId = setInterval(() => setTime(time + 1000), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, time]);

  // NOTE: 밀리초 기반 시, 분, 초 계산
  const h = Math.floor(time / 3600000);
  const m = Math.floor((time % 3600000) / 60000);
  const s = Math.floor((time % 60000) / 1000);

  // NOTE: 타이머 동작 함수
  const startAndStop = () => {
    setIsPlaying(!isPlaying);
  };

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`w-100 flex j-between i-center ${className || ''}`}>
      <PlayPauseButton isTriggered={isPlaying} size="lg" onPlay={start} onPause={stop} />
      <span className="timer-time text-xxl extra-bold" onClick={startAndStop}>
        {formatTime({ h, m, s })}
      </span>
      <ContextButton size="lg" />
    </div>
  );
};

export default Timer;
