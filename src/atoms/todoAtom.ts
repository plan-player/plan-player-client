import { atom } from 'recoil';

export interface TodoType {
  id: number | string;
  title: string;
  category_name: string;
  subtitle?: string;
  memo?: string;
  total_time: number; // plan..이 들어가면 좋겠다
  cur_time: number; // 현재까지 진행된 시간이 totalTime이면 좋을 듯?
  star: boolean; // 숫자..로 들어오는가
  icon_image_path: string;
  finished: boolean; // done이 좋지 않을까... 너무 길다
  // 현재 목표 기간을 설정하는 UI는 없음... 디자인 필요 이 기능이 필요할까? 있으면 좋을 거 같긴 한데....
  // 그냥 배열을 받는 date가 필요한 듯
  start_date?: number;
  end_date?: number;
  outdated?: boolean;
  category_id?: number;
}

export const todosAtom = atom<TodoType[]>({
  key: 'todos',
  default: [
    {
      id: 1,
      icon_image_path: '🖇',
      category_name: 'Category Name 1',
      title: 'Long Main Title Main Todo 1',
      subtitle: 'Subtitle',
      total_time: 0,
      cur_time: 0,
      star: false,
      finished: false,
      outdated: false,
    },
    {
      id: 2,
      icon_image_path: '📑',
      category_name: 'Category Name 2',
      title: 'Main Title Main Todo 2',
      subtitle: 'Subtitle',
      memo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies sem sapien, id ullamcorper mi mollis nec. Aenean velit lacus, volutpat et turpis ac, fermentum pharetra ante. Donec interdum ex sed arcu iaculis facilisis. Praesent arcu mauris, porta finibus nisl quis, posuere facilisis odio. Mauris mollis justo sit amet ante pellentesque feugiat. Sed volutpat arcu sit amet nunc commodo, non finibus tellus hendrerit. Donec mattis tristique risus quis ornare. Phasellus ullamcorper, tellus vitae consequat fermentum, urna nunc semper velit, id tristique enim tellus in nulla. Praesent at commodo leo. Donec mollis purus at pretium pretium. Nullam rutrum tempor leo in lacinia. Donec fringilla mauris in nisl mollis pulvinar. Maecenas aliquam sit amet leo et hendrerit. Maecenas accumsan neque efficitur lacus tincidunt dignissim. Sed mattis porttitor hendrerit. Vivamus gravida vehicula risus et laoreet. Ut sollicitudin ultricies dolor sed dictum. Aliquam pharetra commodo dui, vel maximus velit fringilla eget. Etiam quis ante et lectus vestibulum blandit eu sed urna. Vivamus gravida, lacus a ultricies interdum, erat lacus scelerisque erat, nec interdum odio massa eget arcu. Morbi commodo elit elit, quis euismod mauris placerat ut. I',
      total_time: 0,
      cur_time: 0,
      star: false,
      finished: false,
      outdated: false,
    },
    {
      id: 3,
      icon_image_path: '📚',
      category_name: 'Category Name 3',
      title: 'Main Title Main Todo 3',
      subtitle: 'Subtitle',
      total_time: 0,
      cur_time: 0,
      star: false,
      finished: false,
      outdated: false,
    },
    {
      id: 4,
      icon_image_path: '💻',
      category_name: 'Category Name 4',
      title: 'IfLongLongLongLongMainTitleMainTodo4',
      subtitle: 'Subtitle',
      total_time: 0,
      cur_time: 0,
      star: false,
      finished: false,
      outdated: false,
    },
  ],
});

export const todoAtom = atom<TodoType | Record<string, never>>({
  key: 'todo',
  default: {},
});
