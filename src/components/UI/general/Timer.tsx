import { formatTime } from '../../../util/time';
import ContextButton from '../button/ContextButton';
import PlayPauseButton from '../button/PlayPauseButton';

interface TimerProps {
  className?: string;
  defaultTime?: number;
}

const Timer = ({ className, defaultTime }: TimerProps) => {
  return (
    <div className={`w-100 flex j-between i-center ${className || ''}`}>
      <PlayPauseButton size="lg" />
      <span className="timer-time text-xxl extra-bold">
        {formatTime(defaultTime || 0, true)}
      </span>
      <ContextButton size="lg" />
    </div>
  );
};

export default Timer;
