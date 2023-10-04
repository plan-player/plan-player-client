import CategoryAddGroups from '../Groups/CategoryAddGroups';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../UI/overlay/Backdrop';
import { LegacyRef } from 'react';
import { CategoryGroupsProps } from '../../CategoryComponents';

interface CategoryAddGroupsWrapperProps {
  refProps: LegacyRef<HTMLDivElement>;
  categoryGroups: CategoryGroupsProps[];
  openAddColors: (event: any) => void;
  closeAddGroups: () => void;
  closeHandler: () => void;
}

const CategoryAddGroupsWrapper = (data: CategoryAddGroupsWrapperProps) => {
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

export default CategoryAddGroupsWrapper;
