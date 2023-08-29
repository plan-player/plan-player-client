import { styled } from 'styled-components';
import CircleLabel from '../../UI/label/CircleLabel';
import { PropsWithChildren } from 'react';

const CategoryAddGroup = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper className="flex-j-center text-root">
      <CircleLabel>{children}</CircleLabel>
    </Wrapper>
  );
};

export default CategoryAddGroup;

const Wrapper = styled.div`
  min-height: 50px;

  white-space: nowrap;
`;
