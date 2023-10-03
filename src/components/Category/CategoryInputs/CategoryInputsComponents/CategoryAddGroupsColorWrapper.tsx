import { Form } from 'react-router-dom';
import CategoryAddGroupColor from '../Colors/CategoryAddGroupColor';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../UI/overlay/Backdrop';

interface CategoryAddGroupsColorWrapperProps {
  refProps: any;
  closeHandler: any;
}

const CategoryAddGroupsColorWrapper = (data: CategoryAddGroupsColorWrapperProps) => {
  const { refProps, closeHandler } = data;
  return (
    <Form method="POST" action="/category" className="hide" ref={refProps}>
      <CategoryAddGroupColor />
      <AnimatePresence>
        <Backdrop onClose={closeHandler} />
      </AnimatePresence>
    </Form>
  );
};

export default CategoryAddGroupsColorWrapper;
