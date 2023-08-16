import { styled } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { PropsWithChildren } from 'react';

interface CategoryTagProps {
  id: number;
}

const TagWrapper = styled.div`
  min-width: 3.125rem;
  min-height: 2rem;
`;

const CategoryTag = ({ children, id }: PropsWithChildren<CategoryTagProps>) => {
  const onDelete = (id: number) => {
    console.log(`Tag id=${id} 삭제`);
  };
  return (
    <TagWrapper className="flex i-center j-between gap-xs bg-white text-xs round-md border-box p-sm">
      <span className="">{children}</span>
      <div
        onClick={() => {
          onDelete(id);
        }}
      >
        <AiOutlineClose />
      </div>
    </TagWrapper>
  );
};

export default CategoryTag;
