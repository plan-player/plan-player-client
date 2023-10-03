import InputField from '../../../UI/input/InputField';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  currentCategoryGroupAtom,
  currentCategoryGroupNameAtom,
} from '../../../../atoms/categoryAtom';
import CategoryAddTags from './CategoryAddTags';

interface fieldProps {
  labelName: string;
  height?: string;
  iamGroupField?: boolean;

  onClick?: () => void;
}

const FieldInput = styled.input`
  text-align: center;
`;

const Field = ({ labelName, onClick, iamGroupField }: fieldProps) => {
  const currentCategoryGroupName = useRecoilValue(currentCategoryGroupNameAtom);
  const currentCategoryGroupId = useRecoilValue(currentCategoryGroupAtom);

  return (
    <InputField isInnerLabel={true}>
      <label>{labelName}</label>

      {iamGroupField && (
        <>
          <FieldInput
            onClick={onClick}
            readOnly
            className="text-md semi-bold"
            placeholder={
              currentCategoryGroupName ? currentCategoryGroupName : '그룹을 선택해주세요.'
            }
          />
          <input type="hidden" name="categoryId" value={currentCategoryGroupId} />
        </>
      )}

      {!iamGroupField && <CategoryAddTags onClick={onClick} />}
    </InputField>
  );
};

interface CategoryFieldProps {
  openAddGroups?: () => void;
}

const CategoryField = ({ openAddGroups }: CategoryFieldProps) => {
  return (
    <div className="w-80 mx-auto flex-column gap-md">
      <Field onClick={openAddGroups} labelName="그룹" iamGroupField={true}></Field>
      <Field labelName="태그" />
    </div>
  );
};

export default CategoryField;
