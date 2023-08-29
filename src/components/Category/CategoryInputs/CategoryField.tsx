import { PropsWithChildren } from 'react';
import InputField from '../../UI/input/InputField';
import Tag from './Tag';
import { styled } from 'styled-components';

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

const Field = ({
  children,
  labelName,
  height,
  onClick,
  isInput,
}: PropsWithChildren<fieldProps>) => {
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
      {isInput && <input onClick={onClick} readOnly />}
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
        <Tag>Tag2</Tag>
        <Tag>Tag3입니다</Tag>
      </Field>
    </div>
  );
};

export default CategoryField;
