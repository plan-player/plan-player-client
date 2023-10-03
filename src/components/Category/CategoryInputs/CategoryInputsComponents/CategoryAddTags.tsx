import styled from 'styled-components';
import Tag from './Tag';
import { ChangeEvent, useState } from 'react';

interface CategoryAddTagsProps {
  onClick: any;
}

interface TagProps {
  id: Date;
  text: string;
}

const Wrapper = styled.div`
  input {
    bottom: 0.313rem;
  }
`;

const Tags = styled.div`
  margin-top: -0.625rem;
  height: 5rem;

  @media screen and (min-width: 960px) {
    height: 5.5rem;
  }
`;

const CategoryAddTags = ({ onClick }: CategoryAddTagsProps) => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<TagProps[]>([]);

  const tag = tags.map((tag) => tag.text).join('/');

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setText(value);

    if (value.endsWith('/') || value.endsWith(',')) {
      const newTag = value.slice(0, -1);
      setTags([...tags, { id: new Date(), text: newTag }]);
      setText('');
    }
  };

  const deleteTag = (id: Date) => {
    const deletedTags = tags.filter((tag) => tag.id !== id);
    setTags(deletedTags);
  };
  return (
    <Wrapper
      onClick={onClick}
      className="round-sm border-box p-md flex-col bg scroll h-100"
    >
      <Tags className="flex i-start gap-md">
        {tags?.map((tag: TagProps, idx: number) => (
          <Tag onDelete={() => deleteTag(tag.id)} key={idx}>
            {tag.text}
          </Tag>
        ))}
      </Tags>
      <input
        placeholder="태그를 입력하세요. / or ,을 입력하여 등록할 수 있습니다."
        className="absolute text-xs extra-bold w-100 left-0"
        type="text"
        value={text}
        onChange={handleText}
      />
      <input type="hidden" value={tag} name="tag" />
    </Wrapper>
  );
};

export default CategoryAddTags;
