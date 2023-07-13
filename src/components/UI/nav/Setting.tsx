import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';

const SettingWrapper = styled.div`
  svg {
    margin-right: 1.875rem;
    margin-top: 1.565rem;
    margin-bottom: 5vh;
  }
`;

const Setting = () => {
  return (
    <SettingWrapper className="w-100 flex j-end">
      <FaGear color="" />
    </SettingWrapper>
  );
};

export default Setting;
