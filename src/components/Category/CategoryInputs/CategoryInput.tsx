import IconImageHolder from '../../UI/general/IconImageHolder';

const CategoryInput = () => {
  return (
    <div className="flex gap-sm i-center">
      <IconImageHolder size="xl" />

      <div className="flex i-center">
        <input placeholder="카테고리 추가" className="bold text-lg" />
      </div>
    </div>
  );
};

export default CategoryInput;
