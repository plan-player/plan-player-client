import { atom } from 'recoil';

export const slideMainAtom = atom({
  key: 'slideMain',
  default: false,
});

export const isPlayingAtom = atom({
  key: 'isPlaying',
  default: false,
});
