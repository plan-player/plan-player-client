import { BsThreeDots } from 'react-icons/bs';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 6.25rem;
`;

const GroupTitle = () => {
  return (
    <Wrapper className="w-60 flex-center relative">
      <span className="text-xl heavy">Categories</span>
      <div className="absolute text-xs pointer right-0 mt-sm">
        <BsThreeDots />
      </div>
    </Wrapper>
  );
};

export default GroupTitle;
