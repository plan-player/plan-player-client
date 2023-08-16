import { styled } from 'styled-components';
import InputField from '../UI/input/InputField';
import { PropsWithChildren } from 'react';
import CategoryTag from './CategoryTag';

interface FieldDivProps {
  $heightSize: string;
}

interface FieldProps {
  onClickHandler?: () => void;
  heightSize: string;
  labelName: string;
}

interface CategoryFieldProps {
  onClickHandler?: () => void;
}

const FieldDiv = styled.div<FieldDivProps>`
  height: ${({ $heightSize }) => ($heightSize ? $heightSize : '')};
`;

const Field = ({
  children,
  onClickHandler,
  heightSize,
  labelName,
}: PropsWithChildren<FieldProps>) => {
  return (
    <InputField isInnerLabel={true}>
      <label>{labelName}</label>
      <FieldDiv
        $heightSize={heightSize}
        className="w-100 h-100 bg-gray-50 round-md flex j-start gap-md i-center auto wrap border-box p-root pt-xl"
        onClick={onClickHandler}
      >
        {children}
      </FieldDiv>
    </InputField>
  );
};

const CategoryField = ({ onClickHandler }: CategoryFieldProps) => {
  return (
    <div className="w-80 mx-auto flex-column gap-md">
      <Field labelName="그룹" heightSize="3rem" onClickHandler={onClickHandler}></Field>
      <Field labelName="태그" heightSize="7rem">
        {TagsMockData.map(({ id, text }) => (
          <CategoryTag id={id}>{text}</CategoryTag>
        ))}
      </Field>
    </div>
  );
};

export default CategoryField;

interface TagsMockDataProps {
  id: number;
  text: string;
}

const TagsMockData: TagsMockDataProps[] = [
  {
    id: 0,
    text: 'Tags0',
  },
  {
    id: 1,
    text: 'This is Tags1',
  },
  {
    id: 2,
    text: 'I am Tags 2',
  },
  {
    id: 3,
    text: 'Hi Tags 3',
  },
];
