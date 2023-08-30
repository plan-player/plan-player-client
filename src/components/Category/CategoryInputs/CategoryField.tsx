import { PropsWithChildren } from 'react';
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
  isInput?: boolean;

  onClick?: () => void;
}

interface fieldDivProps {
  $height?: string;
}

const FieldDiv = styled.div<fieldDivProps>`
  height: ${({ $height }) => ($height ? $height : '100%')};
`;

const FieldInput = styled.input`
  text-align: center;
`;

const IDInput = styled.input`
  display: none;
`;

const Field = ({
  children,
  labelName,
  height,
  onClick,
  isInput,
}: PropsWithChildren<fieldProps>) => {
  const currentCategoryGroupName = useRecoilValue(currentCategoryGroupNameAtom);
  const currentCategoryGroupId = useRecoilValue(currentCategoryGroupAtom);

  return (
    <InputField isInnerLabel={true}>
      <label>{labelName}</label>
      {!isInput && (
        <FieldDiv
          onClick={onClick}
          $height={height}
          className="w-100 bg round-sm border-box p-md flex i-center gap-sm scroll"
        >
          {children}
        </FieldDiv>
      )}
      {isInput && (
        <>
          <FieldInput
            onClick={onClick}
            readOnly
            placeholder={
              currentCategoryGroupName ? currentCategoryGroupName : '그룹을 선택해주세요.'
            }
          />
          <IDInput name="categoryId" value={currentCategoryGroupId} />
        </>
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
      <Field onClick={onClick} labelName="그룹" isInput={true}></Field>

      <Field height={'120px'} labelName="태그">
        <Tag>Tag1</Tag>
      </Field>
    </div>
  );
};

export default CategoryField;
