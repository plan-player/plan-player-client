import { atom, selector } from 'recoil';

// 타임 슬라이더의 값을 timestamp (milliseconds) 타입으로 저장
export const timeSliderValueAtom = atom({
  key: 'timeSliderValue',
  default: new Date().getTime(),
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
