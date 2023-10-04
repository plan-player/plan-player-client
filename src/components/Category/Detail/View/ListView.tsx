import { DailyTodoType } from '../../../../atoms/todoAtom';
import TodoListItem from '../../../Todo/TodoListItem';
import { ViewProps, ViewWrapper } from '../../CategoryComponents';

const ListView = ({ todos }: ViewProps) => {
  return (
    <ViewWrapper className="w-100 scroll flex-column gap-3xl">
      <ol className="flex-column gap-md">
        {todos.map((todo: DailyTodoType, index: number) => (
          <TodoListItem key={index} {...todo} />
        ))}
      </ol>
    </ViewWrapper>
  );
};

export default ListView;
