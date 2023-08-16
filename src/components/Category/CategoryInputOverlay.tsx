import InputOverlay, { InputOverlayProps } from '../UI/overlay/InputOverlay';
import CategoryField from './CategoryField';
import CategoryInput from './CategoryInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryAddGroupAtom, categoryColorsAtom } from '../../atoms/categoryAtom';
import CategoryAddGroups from './CategoryAddGroups';
import CategoryAddColors from './CategoryAddColors';

const TodoInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  const setCategoryAddGroupAtom = useSetRecoilState(categoryAddGroupAtom);
  const cateColorsAtom = useRecoilValue(categoryColorsAtom);

  const categoryAddGroupAtomHandler = () => {
    setCategoryAddGroupAtom(true);
  };

  return (
    <InputOverlay isOpen={isOpen} setIsOpen={setIsOpen} setHideNav={setHideNav}>
      <CategoryInput />
      <CategoryField onClickHandler={categoryAddGroupAtomHandler} />
      {cateColorsAtom ? <CategoryAddColors /> : <CategoryAddGroups />}
    </InputOverlay>
  );
};

export default TodoInputOverlay;
