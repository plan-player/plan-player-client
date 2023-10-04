import CategoryAddGroups from './CategoryAddGroups';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../UI/overlay/Backdrop';
import { LegacyRef } from 'react';
import { CategoryGroupsProps } from '../../CategoryComponents';

interface CategoryAddGroupsWrapperProps {
  refProps: LegacyRef<HTMLDivElement>;
  categoryGroups: CategoryGroupsProps[];
  openAddColors: (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  closeAddGroups: () => void;
  closeHandler: () => void;
}

const CategoryAddGroupsInput = (data: CategoryAddGroupsWrapperProps) => {
  const { refProps, categoryGroups, openAddColors, closeAddGroups, closeHandler } = data;
  return (
    <div className="hide" ref={refProps}>
      <CategoryAddGroups
        categoryGroups={categoryGroups}
        onClick={openAddColors}
        selectGroup={closeAddGroups}
      />
      <AnimatePresence>
        <Backdrop onClose={closeHandler} />
      </AnimatePresence>
    </div>
  );
};

export default CategoryAddGroupsInput;
