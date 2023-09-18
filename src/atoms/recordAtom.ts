import { atom, selector } from 'recoil';
import { timeSliderValueAtom } from './timeSliderAtom';

// TODO: 서버에서 todo_id 반환 작업 완료 시 키 확인
export interface RecordDataType {
  record_id: number;
  daily_todo_id: number;
  start_date: string;
  end_date: string;
  duration: number;
  todo_title: string;
  emoji: string;
  color: string;
  _history: false;
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

export const recordsAtom = atom<RecordType[]>({
  key: 'records',
  default: [],
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
