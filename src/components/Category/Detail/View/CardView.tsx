import CategoryCard from './CategoryCard';
import { ViewProps, ViewWrapper } from '../../CategoryComponents';
import { DailyTodoType } from '../../../../atoms/todoAtom';

const CardView = ({ todos }: ViewProps) => {
  return (
    <ViewWrapper className="w-100 scroll gap-sm grid-cols-3 grid-center">
      {todos.map((todo: DailyTodoType, index: number) => (
        <CategoryCard key={index} {...todo} />
      ))}
    </ViewWrapper>
  );
};

export default CardView;
