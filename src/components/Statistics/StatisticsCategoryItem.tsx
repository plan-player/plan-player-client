import Rectangle from './Rectangle';

// 추후 api에 따라 수정
const StatisticsCategoryItem = () => {
  return (
    <div className="flex mt-xs p-md">
      <Rectangle />
      <span>Todo In Progress</span>
    </div>
  );
};

export default StatisticsCategoryItem;
