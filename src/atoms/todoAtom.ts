import { atom } from 'recoil';

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

export const todosAtom = atom<DailyTodoType[]>({
  key: 'todos',
  default: []
});

export const todoAtom = atom<DailyTodoType | Record<string, never>>({
  key: 'todo',
  default: {},
});
