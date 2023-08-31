import { atom } from 'recoil';

export const slideMainAtom = atom({
  key: 'slideMain',
  default: false,
});

export const isPlayingAtom = atom({
  key: 'isPlaying',
  default: false,
});

export const showInputAtom = atom({
  key: 'hideInput',
  default: true,
});
