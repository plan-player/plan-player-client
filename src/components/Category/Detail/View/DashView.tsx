import { ViewProps, ViewWrapper } from '../../CategoryComponents';
import CategoryDashlist from './CategoryDashlist';

const DashView = ({ todos }: ViewProps) => {
  return (
    <ViewWrapper className="w-100 scroll flex wrap gap-sm">
      {todos.map((todo: any, index: number) => (
        <CategoryDashlist key={index} {...todo} />
      ))}
    </ViewWrapper>
  );
};

export default DashView;
