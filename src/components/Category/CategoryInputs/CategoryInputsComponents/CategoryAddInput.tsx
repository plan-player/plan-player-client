import InputOverlay, { InputOverlayProps } from '../../../UI/overlay/InputOverlay';
import CategoryInput from './CategoryInput';
import CategoryField from './CategoryField';
import { LegacyRef } from 'react';

interface CategoryAddInputProps extends InputOverlayProps {
  refProps: LegacyRef<HTMLDivElement>;
  openAddGroups: () => void;
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
