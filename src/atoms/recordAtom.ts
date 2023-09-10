import { selector } from 'recoil';
import { fetchRequest } from '../util/request';
import { timeSliderValueAtom } from './timeSliderAtom';
import { todayAtom } from './todoAtom';

export interface RecordDataType {
  id: number;
  start_date: string;
  end_date: string;
  duration: number;
  daily_todo: {
    daily_todo_id: number;
    title: string;
    todo_emoji: string;
    color: string;
  };
}

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

export const recordsAtom = selector<RecordType[]>({
  key: 'records',
  get: async ({ get }) => {
    const today = get(todayAtom).toLocaleDateString('sv-SE'); // yyyy-mm-dd
    const recordData = await fetchRequest<RecordDataType[]>({
      url: `/api/daily-todos/time-sequence/${today}`,
      method: 'get',
    });

    const records = recordData.map((record) => {
      const { id, start_date, end_date, duration, daily_todo } = record;
      return {
        id,
        start: new Date(start_date).getMilliseconds(),
        end: new Date(end_date).getMilliseconds(),
        duration,
        todo_id: daily_todo.daily_todo_id,
        category_icon: daily_todo.todo_emoji,
        category_group_color: daily_todo.color,
      } as RecordType;
    });

    return records;
  },
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
