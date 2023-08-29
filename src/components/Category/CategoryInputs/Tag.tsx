import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const TagsWrapper = styled.span`
  min-height: 30px;

  white-space: nowrap;
`;

const Tag = ({ children }: PropsWithChildren) => {
  return (
    <TagsWrapper className="flex-between text-xs border-box p-md bg-white round-lg">
      {children}
    </TagsWrapper>
  );
};

export default Tag;
