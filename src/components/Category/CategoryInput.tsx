import IconImageHolder from '../UI/general/IconImageHolder';

const CategoryInput = () => {
  return (
    <div className="flex gap-sm i-center">
      <IconImageHolder size="xl"></IconImageHolder>
      <span className="text-lg text-gray-200 regular">새로운 카테고리 추가</span>
    </div>
  );
};

export default CategoryInput;
