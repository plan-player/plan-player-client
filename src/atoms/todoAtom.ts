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
  todo_id: number;
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
