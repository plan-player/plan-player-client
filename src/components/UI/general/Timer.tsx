import ContextButton from '../button/ContextButton';
import PlayPauseButton from '../button/PlayPauseButton';

interface TimerProps {
  className?: string;
}

const Timer = ({ className }: TimerProps) => {
  return (
    <div className={`w-100 flex j-between i-center ${className || ''}`}>
      <PlayPauseButton size="lg" />
      <span className="timer-time text-xxl extra-bold">00:00:00</span>
      <ContextButton size="lg" />
    </div>
  );
};

export default Timer;
