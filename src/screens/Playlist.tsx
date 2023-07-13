import { styled } from 'styled-components';
import TodoListItem, { TodoListItemProps } from '../components/Todo/TodoListItem';
import DateNav from '../components/UI/nav/DateNav';

const DUMMY_TODOS: TodoListItemProps[] = [
  {
    cover: '🖇',
    category: 'Category Name 1',
    title: 'Main Title Main Todo 1',
    time: '00:00:00',
  },
  {
    cover: '📑',
    category: 'Category Name 2',
    title: 'Main Title Main Todo 2',
    time: '00:00:00',
  },
  {
    cover: '📚',
    category: 'Category Name 3',
    title: 'Main Title Main Todo 3',
    time: '00:00:00',
  },
  {
    cover: '💻',
    category: 'Category Name 4',
    title: 'Main Title Main Todo 4',
    time: '00:00:00',
  },
];

const PlaylistWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const Playlist = () => {
  return (
    <PlaylistWrapper className="flex-column gap-3xl">
      <DateNav />
      {/* TODO: DraggableList 컴포넌트 개발 */}
      <ol className="flex-column gap-md">
        {DUMMY_TODOS.map((todo) => (
          <TodoListItem {...todo} />
        ))}
      </ol>
    </PlaylistWrapper>
  );
};

export default Playlist;
