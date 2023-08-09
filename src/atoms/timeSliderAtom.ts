import { atom, selector } from 'recoil';

// TODO: 추후 타임슬라이더 개발되면 현재 시간 new Date().getTime()을 기본값으로..
const getDummyDate = () => {
  const DUMMY_DATE = new Date();
  DUMMY_DATE.setFullYear(2023);
  DUMMY_DATE.setMonth(6);
  DUMMY_DATE.setDate(23);
  DUMMY_DATE.setHours(12);
  DUMMY_DATE.setMinutes(10);
  return DUMMY_DATE.getTime();
};

// 타임 슬라이더의 값을 timestamp (milliseconds) 타입으로 저장
export const timeSliderValueAtom = atom({
  key: 'timeSliderValue',
  default: getDummyDate(),
});

// '시간' 값, 즉 0 ~ 12의 숫자로 타임슬라이더 값을 반홚받고 & 설정하는 함수
export const timeSliderHourSelector = selector({
  key: 'timeSliderHour',
  get: ({ get }) => {
    const timestamp = get(timeSliderValueAtom);
    return new Date(timestamp).getHours();
  },
  set: ({ get, set }, newValue) => {
    const now = new Date();

    const selectedTime = new Date(get(timeSliderValueAtom));
    selectedTime.setHours(newValue as number);

    // 현재 시간과 같을 경우 분 포함, 아닐 경우 분 제외
    if (selectedTime.getHours() === now.getHours()) {
      selectedTime.setMinutes(now.getMinutes());
    } else {
      selectedTime.setMinutes(60);
    }

    set(timeSliderValueAtom, selectedTime.getTime());
  },
});
