import { InputOverlayProps } from '../UI/overlay/InputOverlay';
import CategoryField from './CategoryField';
import CategoryInput from './CategoryInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryAddGroupAtom, categoryColorsAtom } from '../../atoms/categoryAtom';
import CategoryAddGroups from './CategoryAddGroups';
import CategoryAddColors from './CategoryAddColors';
import CategoryCustomInputOverlay from './CategoryCustomInputOverlay';

const TodoInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  const setCateAddGroupAtom = useSetRecoilState(categoryAddGroupAtom);
  const cateColorsAtom = useRecoilValue(categoryColorsAtom);

  const cateAddGroupAtomHandler = () => {
    setCateAddGroupAtom(true);
  };

  return (
    <CategoryCustomInputOverlay
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setHideNav={setHideNav}
    >
      <CategoryInput />
      <CategoryField onClickHandler={cateAddGroupAtomHandler} />
      {cateColorsAtom ? <CategoryAddColors /> : <CategoryAddGroups />}
    </CategoryCustomInputOverlay>
  );
};

export default TodoInputOverlay;
