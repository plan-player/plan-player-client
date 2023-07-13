import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa6';
import IconButton from './IconButton';

interface PlayPauseButtonProps {
  onPlay?: () => void;
  onPause?: () => void;
}

const PlayPauseButton = ({ onPlay, onPause }: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => {
      if (prevIsPlaying) {
        onPause && onPause();
      } else {
        onPlay && onPlay();
      }

      return !prevIsPlaying;
    });
  };

  return (
    <IconButton onClick={togglePlayPause}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </IconButton>
  );
};

export default PlayPauseButton;
