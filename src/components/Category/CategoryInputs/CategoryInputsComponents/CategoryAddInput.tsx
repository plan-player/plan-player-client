import InputOverlay from '../../../UI/overlay/InputOverlay';
import CategoryInput from './CategoryInput';
import CategoryField from './CategoryField';

interface CategoryAddInputProps {
  refProps: any;
  isOpen: any;
  setIsOpen: any;
  setHideNav: any;
  openAddGroups: any;
}

const CategoryAddInput = ({
  refProps,
  isOpen,
  setIsOpen,
  setHideNav,
  openAddGroups,
}: CategoryAddInputProps) => {
  return (
    <div ref={refProps}>
      <InputOverlay
        formAction="/category"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setHideNav={setHideNav}
      >
        <CategoryInput isOpen={isOpen} />
        <CategoryField openAddGroups={openAddGroups} />
      </InputOverlay>
    </div>
  );
};

export default CategoryAddInput;
