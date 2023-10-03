import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { BsXLg } from 'react-icons/bs';

interface TagProps {
  onDelete: () => void;
}

const TagsWrapper = styled.span`
  min-height: 1.563rem;
`;

const Tag = ({ children, onDelete }: PropsWithChildren<TagProps>) => {
  return (
    <TagsWrapper className="flex-center gap-sm text-xs semi-bold border-box p-md bg-white round-lg nowrap">
      {children}
      <span onClick={onDelete} className="text-xs">
        <BsXLg />
      </span>
    </TagsWrapper>
  );
};

export default Tag;
