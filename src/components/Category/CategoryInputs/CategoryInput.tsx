import { useEffect, useState } from 'react';
import IconImageHolder from '../../UI/general/IconImageHolder';
import InputEmoji from 'react-input-emoji';
import { styled } from 'styled-components';

const CategoryInput = () => {
  // const [emoji, setEmoji] = useState('');
  // const [savedEmoji, setSavedEmoji] = useState('');

  // const [openEmoji, setOpenEmoji] = useState(false);

  // useEffect(() => {
  //   setSavedEmoji(emoji);
  //   setOpenEmoji(false);
  // }, [emoji]);

  // const onOpen = () => {
  //   setOpenEmoji(true);
  // };

  return (
    <div className="flex gap-sm i-center relative">
      <IconImageHolder size="xl" />

      {/* {openEmoji && (
        <EmojiWrapper className="absolute round-md w-100 bg-white">
          <InputEmoji
            value={emoji}
            borderColor={'white'}
            maxLength="1"
            onChange={setEmoji}
            placeholder="이모지를 추가해주세요"
          />
          <input name="emoji" value={savedEmoji} />
        </EmojiWrapper>
      )} */}

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
  top: -70px;

  input {
    display: none;
  }
`;
