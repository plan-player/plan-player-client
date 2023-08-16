import IconImageHolder from '../UI/general/IconImageHolder';

const CategoryInput = () => {
  return (
    <div className="flex gap-sm i-center">
      <IconImageHolder size="xl"></IconImageHolder>
      <span className="text-lg text-gray-200 regular">Add new Category</span>
    </div>
  );
};

export default CategoryInput;
