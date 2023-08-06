import { useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { styled } from 'styled-components';
import { SizeType } from '../../../types/size';
import IconButton from './IconButton';

interface PlayPauseButtonProps {
  onPlay?: () => void;
  onPause?: () => void;
  isTriggered?: boolean;
  size?: SizeType;
}

interface PlayPauseIconWrapperProps {
  $isPlaying?: boolean;
}

const PlayPauseIconWrapper = styled.div<PlayPauseIconWrapperProps>`
  padding-top: ${({ $isPlaying }) => ($isPlaying ? '4%' : '5%')};
  padding-left: ${({ $isPlaying }) => ($isPlaying ? 0 : '7%')};
`;

const PlayPauseButton = ({
  onPlay,
  onPause,
  isTriggered,
  size,
}: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(isTriggered);

  // NOTE: play/pause 버튼이 아닌 다른 외부 동작으로 인해 재생될 경우의 상태 업데이트를 위한 처리
  useEffect(() => {
    setIsPlaying(isTriggered);
  }, [isTriggered]);

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

  let buttonSize: SizeType = 'sm';
  let iconSize: SizeType = 'xs';

  switch (size) {
    case 'lg':
      buttonSize = '2xl';
      iconSize = 'lg';
      break;
    case 'md':
      buttonSize = 'md';
      iconSize = 'sm';
      break;
    case 'sm':
      buttonSize = 'sm';
      iconSize = 'xs';
      break;
    case 'xs':
      buttonSize = 'xs';
      iconSize = 'xs';
      break;
  }

  return (
    <IconButton onClick={togglePlayPause} size={buttonSize} text={iconSize}>
      <PlayPauseIconWrapper $isPlaying={isPlaying}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayPauseIconWrapper>
    </IconButton>
  );
};

export default PlayPauseButton;
