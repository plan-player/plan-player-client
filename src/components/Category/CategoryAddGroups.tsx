import CircleLabel from '../UI/label/CircleLabel';
import { GroupsMockData } from './CategoryComponents';

const CategoryAddGroups = () => {
  return (
    <div className="w-80 h-80 grid-cols-2 scroll border-box p-md">
      {GroupsMockData.map(({ groupName, color }) => (
        <CircleLabel color={color}>{groupName}</CircleLabel>
      ))}
    </div>
  );
};

export default CategoryAddGroups;
