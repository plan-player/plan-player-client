import { atom, selector } from 'recoil';
import { timeSliderValueAtom } from './timeSliderAtom';

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
  key: 'record',
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

export const scheduleSelector = selector({
  key: 'getSchedules',
  get: ({ get }) => {
    return get(recordsAtom).filter((record) => !record.is_history);
  },
});

// 현재 타임슬라이더 값에 따라 이전으로는 history, 이후로는 schedule을 반환하는 selector
export const dividedRecordsSelector = selector({
  key: 'getDividedRecords',
  get: ({ get }) => {
    const current = get(timeSliderValueAtom);
    const records = get(recordsAtom);
    return records
      .reduce((acc, record) => {
        const { start, end, is_history } = record;

        // history의 end값이 현재보다 클 경우 - end를 현재로
        if (start < current && current < end && is_history) {
          return [...acc, { ...record, end: current }];
        }

        // schedule의 start값이 현재보다 작을 경우 - start를 현재로
        if (current < end && start < current && !is_history) {
          return [...acc, { ...record, start: current }];
        }

        // history가 현재 시각 이전의 구간일 경우 포함
        if (end <= current && is_history) {
          return [...acc, record];
        }

        // schedule이 현재 시각 이후의 구간일 경우 포함
        if (current < start && !is_history) {
          return [...acc, record];
        }

        return acc;
      }, [] as RecordType[])
      .sort((a, b) => a.start - b.start);
  },
});
