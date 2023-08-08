import { atom } from "recoil";

export interface RecordType {
  id: number | string;
  start: number;
  end: number;
  duration: number;
  is_history: boolean;
  todo_id: number;
  category_icon: string;
  category_group_color: string;
}

// 2023. 07. 23. GMT+9 기준
export const recordsAtom = atom<RecordType[]>({
  key: 'history',
  default: [
    {
      id: 10,
      start: 1690066800000, // 08:00
      end: 1690071600000, // 09:20
      is_history: false,
      todo_id: 1,
      duration: 0,
      category_icon: '🖇',
      category_group_color: 'blue',
    },
    {
      id: 20,
      start: 1690075800000, // 10:30
      end: 1690083000000, // 12:30
      is_history: false,
      todo_id: 2,
      duration: 0,
      category_icon: '📑',
      category_group_color: 'blue',
    },
    {
      id: 30,
      start: 1690094400000, // 15:40
      end: 1690097400000, // 16:30
      is_history: false,
      todo_id: 3,
      duration: 0,
      category_icon: '📚',
      category_group_color: 'blue',
    },
    {
      id: 40,
      start: 1690067537000, // 08:12:17
      end: 1690073246000, // 09:47:26
      is_history: true,
      todo_id: 1,
      duration: 0,
      category_icon: '🖇',
      category_group_color: 'blue',
    },
    {
      id: 50,
      start: 1690075819000, // 10:30:19
      end: 1690082340000, // 12:19:00
      is_history: true,
      todo_id: 2,
      duration: 0,
      category_icon: '📑',
      category_group_color: 'blue',
    },
    {
      id: 60,
      start: 1690095300000, // 15:55:00
      end: 1690097447000, // 16:30:47
      is_history: true,
      todo_id: 3,
      duration: 0,
      category_icon: '📚',
      category_group_color: 'blue',
    },
  ],
});
