import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';

const SETTING_PADDING = 2;
const SETTING_TEXT = 1;
export const SETTING_SIZE = SETTING_PADDING * 2 + SETTING_TEXT;

const SettingWrapper = styled.div`
  svg {
    padding: ${SETTING_PADDING}rem;
    font-size: ${SETTING_TEXT}rem;
  }
`;

const Setting = () => {
  return (
    <SettingWrapper className="w-100 flex j-end">
      <FaGear />
    </SettingWrapper>
  );
};

export default Setting;
