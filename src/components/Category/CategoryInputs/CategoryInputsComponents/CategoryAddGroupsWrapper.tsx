import CategoryAddGroups from '../Groups/CategoryAddGroups';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../UI/overlay/Backdrop';

interface CategoryAddGroupsWrapperProps {
  refProps: any;
  categoryGroups: any;
  openAddColors: any;
  closeAddGroups: any;
  closeHandler: any;
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
