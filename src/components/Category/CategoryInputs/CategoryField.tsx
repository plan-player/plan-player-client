import { ChangeEvent, useState } from 'react';
import InputField from '../../UI/input/InputField';
import Tag from './Tag';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  currentCategoryGroupAtom,
  currentCategoryGroupNameAtom,
} from '../../../atoms/categoryAtom';

interface fieldProps {
  labelName: string;
  height?: string;
  isGroup?: boolean;

  onClick?: () => void;
}
interface fieldDivProps {
  $height?: string;
}
interface TagProps {
  id: Date;
  text: string;
}

const FieldDiv = styled.div<fieldDivProps>`
  height: ${({ $height }) => ($height ? $height : '100%')};

  input {
    bottom: 0.313rem;
    left: 0;
    width: 100%;
  }
`;

const FieldInput = styled.input`
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TagWrapper = styled.div`
  margin-top: -0.625rem;
  height: 5rem;

  @media screen and (min-width: 960px) {
    height: 5.5rem;
  }
`;

const Field = ({ labelName, height, onClick, isGroup }: fieldProps) => {
  const currentCategoryGroupName = useRecoilValue(currentCategoryGroupNameAtom);
  const currentCategoryGroupId = useRecoilValue(currentCategoryGroupAtom);

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
    <InputField isInnerLabel={true}>
      <label>{labelName}</label>

      {isGroup && (
        <>
          <FieldInput
            onClick={onClick}
            readOnly
            className="text-md semi-bold"
            placeholder={
              currentCategoryGroupName ? currentCategoryGroupName : '그룹을 선택해주세요.'
            }
          />
          <HiddenInput readOnly name="categoryId" value={currentCategoryGroupId} />
        </>
      )}

      {!isGroup && (
        <FieldDiv
          onClick={onClick}
          $height={height}
          className="round-sm border-box p-md flex-col bg scroll"
        >
          <TagWrapper className="flex i-start gap-md">
            {tags.map((tag: TagProps, idx: number) => (
              <Tag onDelete={() => deleteTag(tag.id)} key={idx}>
                {tag.text}
              </Tag>
            ))}
          </TagWrapper>
          <input
            placeholder="태그를 입력하세요. / or ,을 입력하여 등록할 수 있습니다."
            className="absolute text-xs extra-bold"
            type="text"
            value={text}
            onChange={handleText}
          />
          <HiddenInput readOnly value={tag} name="tag" />
        </FieldDiv>
      )}
    </InputField>
  );
};

interface CategoryFieldProps {
  onClick?: () => void;
}

const CategoryField = ({ onClick }: CategoryFieldProps) => {
  return (
    <div className="w-80 mx-auto flex-column gap-md">
      <Field onClick={onClick} labelName="그룹" isGroup={true}></Field>
      <Field labelName="태그" />
    </div>
  );
};

export default CategoryField;
