import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { CategoryGroupsProps, CategoryProps } from './CategoryComponents';
import CircleLabel from '../UI/label/CircleLabel';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const ItemWrapper = styled.div`
  grid-row-gap: 2.25rem;

  @media screen and (max-width: 500px) {
    grid-row-gap: 1rem;
  }

  margin-bottom: 1.25rem;
`;

const Title = styled.div`
  min-height: 1.25rem;

  margin-top: 0.313rem;
`;

const CategoryItems = ({
  category_group_name,
  category_group_id,
  category_list,
  color,
}: CategoryGroupsProps) => {
  const [close, setClose] = useState(false);
  const handleClose = () => {
    setClose((prev) => !prev);
  };

  return (
    <div className="flex-column j-center i-center w-100 h-100 scroll">
      <Title className="flex-i-center j-between w-85">
        <CircleLabel className="extra-bold" color={color}>
          {category_group_name}
        </CircleLabel>
        <span onClick={handleClose} className="text-md heavy pointer">
          {!close ? '↑' : '↓'}
        </span>
      </Title>

      <AnimatePresence>
        {!close && (
          <motion.div
            className="w-100"
            initial={{ opacity: 0.5, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.2, y: -30 }}
            transition={{ duration: '0.2' }}
          >
            <ItemWrapper className="grid-cols-2 grid-center scroll w-100 p-xl border-box h-100">
              {category_list?.map((item: CategoryProps, index: number) => (
                <CategoryItem
                  key={index}
                  emoji={item?.emoji}
                  category_name={item.category_name}
                  category_group_id={category_group_id}
                  tagName={item?.tagName}
                  category_id={item.category_id}
                />
              ))}
            </ItemWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryItems;
