import { styled } from 'styled-components';
import { FaGear } from 'react-icons/fa6';

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  svg {
    margin-right: 1.875rem;
    margin-top: 1.565rem;
  }
`;

const Setting = () => {
  return (
    <SettingWrapper>
      <FaGear color="" />
    </SettingWrapper>
  );
};

export default Setting;
