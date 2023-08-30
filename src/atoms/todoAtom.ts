import { atom, selector } from 'recoil';
import { fetchRequest } from '../util/request';

interface TodoBase {
  title: string;
  subtitle: string;
  memo?: string;
  star: boolean;
  category_name: string;
  color?: string;
}

export interface TodoType extends TodoBase {
  id: number;
  emoji: string;
  category_id: number;
  category_group_name: string;
}

export interface DailyTodoType extends TodoBase {
  daily_todo_id: number;
  todo_emoji: string;
  category_emoji?: string;
  status?: string;
  history_sum: number;
  schedule_sum: number;
}

const DUMMY_TODOS: DailyTodoType[] = [
  {
    daily_todo_id: 1,
    todo_emoji: '🖇',
    category_name: 'Category Name 1',
    title: 'Long Main Title Main Todo 1',
    subtitle: 'Subtitle',
    history_sum: 0,
    schedule_sum: 0,
    star: false,
  },
  {
    daily_todo_id: 2,
    todo_emoji: '📑',
    category_name: 'Category Name 2',
    title: 'Main Title Main Todo 2',
    subtitle: 'Subtitle',
    memo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies sem sapien, id ullamcorper mi mollis nec. Aenean velit lacus, volutpat et turpis ac, fermentum pharetra ante. Donec interdum ex sed arcu iaculis facilisis. Praesent arcu mauris, porta finibus nisl quis, posuere facilisis odio. Mauris mollis justo sit amet ante pellentesque feugiat. Sed volutpat arcu sit amet nunc commodo, non finibus tellus hendrerit. Donec mattis tristique risus quis ornare. Phasellus ullamcorper, tellus vitae consequat fermentum, urna nunc semper velit, id tristique enim tellus in nulla. Praesent at commodo leo. Donec mollis purus at pretium pretium. Nullam rutrum tempor leo in lacinia. Donec fringilla mauris in nisl mollis pulvinar. Maecenas aliquam sit amet leo et hendrerit. Maecenas accumsan neque efficitur lacus tincidunt dignissim. Sed mattis porttitor hendrerit. Vivamus gravida vehicula risus et laoreet. Ut sollicitudin ultricies dolor sed dictum. Aliquam pharetra commodo dui, vel maximus velit fringilla eget. Etiam quis ante et lectus vestibulum blandit eu sed urna. Vivamus gravida, lacus a ultricies interdum, erat lacus scelerisque erat, nec interdum odio massa eget arcu. Morbi commodo elit elit, quis euismod mauris placerat ut. I',
    history_sum: 0,
    schedule_sum: 0,
    star: false,
  },
  {
    daily_todo_id: 3,
    todo_emoji: '📚',
    category_name: 'Category Name 3',
    title: 'Main Title Main Todo 3',
    subtitle: 'Subtitle',
    history_sum: 0,
    schedule_sum: 0,
    star: false,
  },
  {
    daily_todo_id: 4,
    todo_emoji: '💻',
    category_name: 'Category Name 4',
    title: 'IfLongLongLongLongMainTitleMainTodo4',
    subtitle: 'Subtitle',
    history_sum: 0,
    schedule_sum: 0,
    star: false,
  },
];

export const todayAtom = atom({
  key: 'today',
  default: new Date(),
});

export const todosAtom = selector<DailyTodoType[]>({
  key: 'todos',
  get: async ({ get }) => {
    const today = get(todayAtom).toLocaleDateString('sv-SE'); // yyyy-mm-dd
    const todoData = await fetchRequest<DailyTodoType[]>({
      url: `/api/daily-todos/date/${today}`,
      method: 'get',
    });
    return todoData;
  },
});

export const todoAtom = atom<DailyTodoType | Record<string, never>>({
  key: 'todo',
  default: {},
});
