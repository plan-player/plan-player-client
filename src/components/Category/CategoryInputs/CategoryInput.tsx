import { useEffect, useState } from 'react';
import IconImageHolder from '../../UI/general/IconImageHolder';
import { styled } from 'styled-components';
import EmojiPicker from 'emoji-picker-react';

interface CategoryInputProps {
  isOpen?: boolean;
}

interface EmojiPickerProps {
  activeSkinTone: string;
  emoji: string;
  getImageUrl: any;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
}

const CategoryInput = ({ isOpen }: CategoryInputProps) => {
  const [emoji, setEmoji] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);

  const onOpen = () => {
    setOpenEmoji(true);
  };
  const onClose = () => {
    setOpenEmoji(false);
  };
  const handleEmoji = (emoji: EmojiPickerProps) => {
    setEmoji(emoji.emoji);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) onClose();
  }, [isOpen]);

  return (
    <div className="flex gap-sm i-center relative">
      <div onClick={onOpen}>
        <IconImageHolder size="xl">{emoji}</IconImageHolder>
      </div>

      {openEmoji && (
        <EmojiWrapper className="absolute round-md w-100 bg-white">
          <EmojiPicker autoFocusSearch={false} onEmojiClick={handleEmoji} />
        </EmojiWrapper>
      )}
      <input name="emoji" value={emoji} readOnly className="hide" />

      <div className="flex i-center w-100">
        <input
          name="addCategory"
          placeholder="카테고리 이름을 입력해주세요."
          className="semi-bold text-md"
        />
      </div>
    </div>
  );
};

export default CategoryInput;

const EmojiWrapper = styled.div`
  left: -2.188rem;
  top: -6.25rem;

  z-index: 101;
`;
